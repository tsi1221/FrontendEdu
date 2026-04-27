const AUTH_STORAGE_KEY = "edutwinAuth";

const getApiBaseUrl = () => {
  const configuredBase = import.meta.env.VITE_API_BASE_URL;
  return (configuredBase && configuredBase.trim()) || "/api";
};

const buildUrl = (path) => {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

const readAuthState = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || {};
  } catch (_error) {
    return {};
  }
};

export const getStoredAuth = () => readAuthState();

export const getAuthToken = () =>
  readAuthState().token || localStorage.getItem("authToken") || "";

export const saveStoredAuth = ({ token, user, profile }) => {
  const state = {
    token: token || null,
    user: user || null,
    profile: profile || null,
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));

  if (token) {
    localStorage.setItem("authToken", token);
  }

  if (user?.role) {
    localStorage.setItem("userRole", String(user.role).toLowerCase());
  }
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
};

export const requestJson = async (path, options = {}) => {
  const { method = "GET", body, headers = {}, auth = true, cache } = options;

  const requestHeaders = { ...headers };
  let requestBody = body;

  if (auth) {
    const token = getAuthToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  if (body && !(body instanceof FormData) && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...(cache ? { cache } : {}),
  });

  const contentType = response.headers.get("content-type") || "";
  const payload =
    response.status === 204
      ? null
      : contentType.includes("application/json")
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    const errorMessage = payload?.message || payload?.error || "Request failed";
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload;
};

export const loginUser = (email, password) =>
  requestJson("/auth/login", {
    method: "POST",
    auth: false,
    body: { email, password },
  });

export const registerStudent = (payload) =>
  requestJson("/auth/register", {
    method: "POST",
    auth: false,
    body: payload,
  });

export const fetchCurrentUser = () => requestJson("/users/me");

export const updateCurrentUser = (payload) =>
  requestJson("/users/me", {
    method: "PUT",
    body: payload,
  });

export const fetchTextbooks = () => requestJson("/textbooks");

export const fetchTextbookById = (textbookId) =>
  requestJson(`/textbooks/${textbookId}`);

export const fetchTextbookCatalog = ({ subject, grade } = {}) => {
  const query = new URLSearchParams();

  if (subject) query.set("subject", String(subject));
  if (grade !== undefined && grade !== null && grade !== "")
    query.set("grade", String(grade));

  const queryString = query.toString();
  return requestJson(
    `/textbooks/catalog${queryString ? `?${queryString}` : ""}`,
  );
};

export const fetchStudentGamification = (studentId) =>
  requestJson(`/gamification/student/${studentId}`);

export const fetchStudentAnalytics = (studentId) =>
  requestJson(`/analytics/student/${studentId}`);

export const fetchTeacherDashboard = () =>
  requestJson("/teachers/me/dashboard");

export const createQuiz = (payload) =>
  requestJson("/quizzes", {
    method: "POST",
    body: payload,
  });

export const fetchMyCreatedQuizzes = () => requestJson("/quizzes/mine");

export const fetchAdminGeneratedQuizzes = () =>
  requestJson("/quizzes/admin/generated");

export const fetchAdminSubscriptionStats = () =>
  requestJson("/users/subscription-stats");

export const fetchSchools = () => requestJson("/schools");

export const fetchPublicSchools = () =>
  requestJson("/schools/public", { auth: false });

export const createSchool = (payload) =>
  requestJson("/schools", {
    method: "POST",
    body: payload,
  });

export const approveQuiz = (quizId) =>
  requestJson(`/quizzes/${quizId}/approve`, {
    method: "PATCH",
  });

export const generatePracticeQuiz = (payload) =>
  requestJson("/quizzes/generate/ai-practice", {
    method: "POST",
    body: payload,
  });

export const submitPracticeQuiz = (payload) =>
  requestJson("/quizzes/submit", {
    method: "POST",
    body: payload,
  });

export const fetchPracticeLibraryQuizzes = () =>
  requestJson("/quizzes/library");

export const fetchMyPracticeQuizzes = () => requestJson("/quizzes/my-practice");

export const sendAiChatMessage = (payload) =>
  requestJson("/ai/chat", {
    method: "POST",
    body: payload,
  });

export const fetchLatestChatHistory = () =>
  requestJson("/ai/sessions/latest/messages");

export const fetchVirtualLabResources = ({
  subject,
  grade,
  interactionType = "CANVAS",
  refresh = false,
} = {}) => {
  const query = new URLSearchParams();

  if (subject) query.set("subject", subject);
  if (grade) query.set("grade", String(grade));
  if (interactionType) query.set("interaction_type", interactionType);
  if (refresh) query.set("refresh", "1");

  const queryString = query.toString();
  return requestJson(
    `/virtual-lab-resources${queryString ? `?${queryString}` : ""}`,
    {
      auth: false,
      cache: "no-store",
    },
  );
};

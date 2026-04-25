import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  Shield,
  User,
  Bell,
  Moon,
  Languages,
  FileText,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { fetchCurrentUser, updateCurrentUser } from "../services/api";
import { LanguageContext } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const SETTINGS_TEXT = {
  en: {
    title: "Settings",
    subtitle: "Manage your account, preferences, and learning experience.",
    loading: "Loading...",
    subscription: "Subscription",
    monthlyPlan: "Monthly Plan",
    notSubscribed: "Not subscribed",
    noActivePlan: "No active plan",
    manageSubscription: "Manage Subscription",
    account: "Account",
    profile: "Profile",
    profileSubtitle: "Update your personal information",
    open: "Open",
    privacy: "Privacy",
    privacySubtitle: "Terms and policy acceptance",
    preferences: "Preferences",
    notifications: "Notifications",
    notificationsSubtitle: "Reminders and updates",
    theme: "Theme",
    themeSubtitle: "Choose light or dark mode",
    light: "Light",
    dark: "Dark",
    language: "Language",
    languageSubtitle: "App language preference",
    support: "Support",
    helpCenter: "Help Center",
    helpCenterSubtitle: "FAQs and guidance",
    helpMessage:
      "If you need help, check your profile, sync your data, or revisit the textbook and lab sections from the sidebar.",
    termsPolicy: "Terms & Policy",
    termsPolicySubtitle: "Review the app terms and privacy policy.",
    policyMessage:
      "Terms & Policy\n\n1. Your subscription is personal and must not be shared with another user or used across unauthorized devices/accounts.\n2. If account/subscription sharing or misuse is detected, EduTwin may suspend or permanently ban the account.\n3. EduTwin is for educational use only. Cheating, abuse, harassment, and harmful behavior are prohibited.\n4. Learning content and resources are for study within the app and must not be copied/re-sold without permission.\n5. Privacy: EduTwin follows educational-app student data protection practices and uses your data only to deliver learning features, analytics, and support.",
    learningControls: "Learning Controls",
    dailyReminders: "Daily reminders",
    dailyRemindersSubtitle: "Stay consistent with learning",
    autoSync: "Auto-sync progress",
    autoSyncSubtitle: "Sync learning data in background",
    read: "Read",
    settingsUpdated: "Settings updated.",
    languageUpdated: "Language updated.",
    themeUpdated: "Theme updated.",
    helpTitle: "Help Center",
    policyTitle: "Terms & Policy",
    close: "Close",
  },
  om: {
    title: "Qindaa'inoota",
    subtitle: "Akkaawuntii, filannoo fi muuxannoo barnootaa kee qindeessi.",
    loading: "Fe'amaa jira...",
    subscription: "Galmee Kaffaltii",
    monthlyPlan: "Karoora Ji'aa",
    notSubscribed: "Hin galmoofne",
    noActivePlan: "Karoora hojiirra jiru hin jiru",
    manageSubscription: "Galmee Kaffaltii Bulchi",
    account: "Akkaawuntii",
    profile: "Profaayilii",
    profileSubtitle: "Odeeffannoo dhuunfaa kee haaromsi",
    open: "Bani",
    privacy: "Iccitii",
    privacySubtitle: "Waliigaltee fi heera dataa bulchi",
    preferences: "Filannoowwan",
    notifications: "Beeksisoota",
    notificationsSubtitle: "Yaadannoowwan fi odeeffannoo haarawaa",
    theme: "Bifa",
    themeSubtitle: "Bifa ifaa ykn dukkanaa fili",
    light: "Ifaa",
    dark: "Dukkanaa",
    language: "Afaan",
    languageSubtitle: "Filannoo afaan appii",
    support: "Deeggarsa",
    helpCenter: "Gara Fuula Gargaarsaa",
    helpCenterSubtitle:
      "Qajeelfama, furmaata rakkoo, fi gaaffiiwwan yeroo baay'ee deebi'anii ilaaluu.",
    helpMessage:
      "Yoo gargaarsi si barbaachise, profile kee ilaali, daataa kee wal-simsiisi, yookaan kutaa textbook fi lab sidebar irraa deebi'i ilaali.",
    termsPolicy: "Seeraa fi Imaammata",
    termsPolicySubtitle: "Seera appii fi imaammata dhoksinaa ilaali.",
    policyMessage:
      "Seeraa fi Imaammata\n\n1. Subscription kee dhuunfaa dha; nama biraaf qooduun yookaan account/device hin hayyamamne irratti fayyadamuun dhorkaadha.\n2. Yoo qooduun account/subscription yookaan faayidaa sirrii hin taane argame, EduTwin account kee yeroo muraasaaf cufu yookaan guutummaatti ban gochuu danda'a.\n3. EduTwin hojii barnootaa qofaaf. Sobuu qormaataa, arrabsoo, miidhaa fi hojii hammeenyaa ni dhorkama.\n4. Qabeenyi barnootaa app keessaa barnootaaf qofa; hayyama malee koppii gochuu yookaan gurguruu hin danda'amu.\n5. Dhoksina: EduTwin mala eegumsa daataa barataa appii barnootaa ni hordofa; daataa kee tajaajila barnootaa, analytics fi deeggarsaaf qofa ni fayyadama.",
    learningControls: "To'annoo Barnootaa",
    dailyReminders: "Yaadannoo guyyaa guyyaa",
    dailyRemindersSubtitle: "Barnoota kee itti fufiinsaan godhi",
    autoSync: "Wal-simsiisa ofumaan",
    autoSyncSubtitle: "Deetaa barnootaa ofumaan wal-simsiisi",
    read: "Dubbisi",
    settingsUpdated: "Qindaa'inootni haaromfamaniiru.",
    languageUpdated: "Afaan haaromfameera.",
    themeUpdated: "Bifni haaromfameera.",
    helpTitle: "Gara Fuula Gargaarsaa",
    policyTitle: "Seeraa fi Imaammata",
    close: "Cufi",
  },
};

/* =========================
   UI COMPONENTS
========================= */

const Card = ({ children }) => (
  <div className="border border-gray-200 bg-white p-6">{children}</div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
);

const Row = ({ icon: Icon, title, subtitle, action }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="text-gray-700" size={18} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>

    <div className="text-sm text-gray-600">{action}</div>
  </div>
);

/* =========================
   TOGGLE COMPONENT
========================= */

const Toggle = ({ enabled, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
        enabled ? "bg-[#0056D2]" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full transition transform ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
};

const SETTINGS_STORAGE_KEY = "edutwinLocalSettings";

const readLocalSettings = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_error) {
    return {};
  }
};

const writeLocalSettings = (settings) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

/* =========================
   SETTINGS PAGE
========================= */

const Settings = () => {
  const languageContext = useContext(LanguageContext);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState("");
  const [message, setMessage] = useState("");
  const [activeDialog, setActiveDialog] = useState("");

  const [profileData, setProfileData] = useState({
    fullName: "Student",
    subscriptionPlan: null,
    subscriptionStatus: null,
    isSubscribed: false,
  });

  const [settings, setSettings] = useState({
    notifications: true,
    reminders: true,
    autoSync: true,
    preferredLanguage: "en",
    hasAcceptedTermsPolicy: false,
    darkMode: theme === "dark",
  });

  const currentLanguage =
    languageContext?.language || settings.preferredLanguage || "en";
  const text = SETTINGS_TEXT[currentLanguage] || SETTINGS_TEXT.en;

  useEffect(() => {
    let active = true;

    const loadSettings = async () => {
      setLoading(true);
      setMessage("");

      try {
        const localSettings = readLocalSettings();
        const response = await fetchCurrentUser();

        if (!active) return;

        const user = response?.data?.user || {};
        const profile = response?.data?.profile || {};

        setProfileData({
          fullName: profile?.full_name || "Student",
          subscriptionPlan: profile?.subscription_plan || null,
          subscriptionStatus: profile?.subscription_status || null,
          isSubscribed: !!profile?.is_subscribed,
        });

        setSettings((prev) => ({
          ...prev,
          notifications: localSettings.notifications ?? prev.notifications,
          reminders: localSettings.reminders ?? prev.reminders,
          autoSync: localSettings.autoSync ?? prev.autoSync,
          preferredLanguage:
            profile?.language ||
            languageContext?.language ||
            prev.preferredLanguage,
          hasAcceptedTermsPolicy: !!user?.has_accepted_terms_policy,
          darkMode: theme === "dark",
        }));

        if (
          profile?.language &&
          languageContext?.setLanguage &&
          profile.language !== languageContext?.language
        ) {
          languageContext.setLanguage(profile.language);
        }
      } catch (error) {
        if (!active) return;
        const localSettings = readLocalSettings();
        setSettings((prev) => ({
          ...prev,
          notifications: localSettings.notifications ?? prev.notifications,
          reminders: localSettings.reminders ?? prev.reminders,
          autoSync: localSettings.autoSync ?? prev.autoSync,
          darkMode: theme === "dark",
        }));
        setMessage(error.message || "Unable to load settings from backend.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSettings();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      preferredLanguage: languageContext?.language || prev.preferredLanguage,
    }));
  }, [languageContext?.language]);

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      darkMode: theme === "dark",
    }));
  }, [theme]);

  const saveLocalToggle = (key) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        [key]: !prev[key],
      };

      writeLocalSettings({
        notifications: next.notifications,
        reminders: next.reminders,
        autoSync: next.autoSync,
      });

      return next;
    });
  };

  const saveBackendSetting = async (key, payloadBuilder) => {
    if (savingKey) return;
    const previousValue = settings[key];
    const nextValue = !previousValue;

    setSettings((prev) => ({
      ...prev,
      [key]: nextValue,
    }));
    setSavingKey(key);
    setMessage("");

    try {
      const payload = payloadBuilder(nextValue);
      await updateCurrentUser(payload);
      setMessage(text.settingsUpdated);
    } catch (error) {
      setSettings((prev) => ({
        ...prev,
        [key]: previousValue,
      }));
      setMessage(error.message || "Unable to save setting.");
    } finally {
      setSavingKey("");
    }
  };

  const handleLanguageChange = async (language) => {
    if (savingKey || settings.preferredLanguage === language) return;

    const previousLanguage = settings.preferredLanguage;
    setSettings((prev) => ({
      ...prev,
      preferredLanguage: language,
    }));
    setSavingKey("preferredLanguage");
    setMessage("");
    languageContext?.setLanguage?.(language);

    try {
      await updateCurrentUser({ preferred_language: language });
      setMessage((SETTINGS_TEXT[language] || SETTINGS_TEXT.en).languageUpdated);
    } catch (error) {
      languageContext?.setLanguage?.(previousLanguage);
      setSettings((prev) => ({
        ...prev,
        preferredLanguage: previousLanguage,
      }));
      setMessage(error.message || "Unable to update language.");
    } finally {
      setSavingKey("");
    }
  };

  const handleThemeChange = (nextTheme) => {
    if (!nextTheme || nextTheme === theme) return;

    setTheme(nextTheme);
    setMessage(text.themeUpdated);
  };

  const subscriptionLabel = profileData.isSubscribed
    ? profileData.subscriptionPlan || "Subscribed"
    : text.notSubscribed;

  const subscriptionStatusLabel = profileData.subscriptionStatus
    ? String(profileData.subscriptionStatus).replace(/_/g, " ")
    : text.noActivePlan;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-6 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="text-gray-500" size={18} />
          <h1 className="text-3xl font-bold text-gray-900">{text.title}</h1>
        </div>

        <p className="text-sm text-gray-500">{text.subtitle}</p>

        {message && <p className="text-xs text-gray-600 mt-2">{message}</p>}
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* SUBSCRIPTION */}
        <Card>
          <SectionTitle title={text.subscription} />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">{text.monthlyPlan}</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? text.loading : subscriptionLabel}
              </p>
            </div>

            <span className="text-xs border border-gray-200 px-3 py-1 w-fit text-gray-600">
              {loading ? text.loading : subscriptionStatusLabel}
            </span>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="w-full md:w-1/2 bg-[#0056D2] hover:bg-[#0045b0] text-white py-3 font-medium transition"
          >
            {text.manageSubscription}
          </button>
        </Card>

        {/* ACCOUNT */}
        <Card>
          <SectionTitle title={text.account} />

          <Row
            icon={User}
            title={text.profile}
            subtitle={text.profileSubtitle}
            action={
              <button
                onClick={() => navigate("/profile")}
                className="text-xs text-[#0056D2] hover:underline"
              >
                {text.open}
              </button>
            }
          />

          <Row
            icon={Shield}
            title={text.privacy}
            subtitle={text.privacySubtitle}
            action={
              <Toggle
                enabled={settings.hasAcceptedTermsPolicy}
                onToggle={() =>
                  saveBackendSetting("hasAcceptedTermsPolicy", (nextValue) => ({
                    has_accepted_terms_policy: nextValue,
                  }))
                }
              />
            }
          />
        </Card>

        {/* PREFERENCES */}
        <Card>
          <SectionTitle title={text.preferences} />

          <Row
            icon={Bell}
            title={text.notifications}
            subtitle={text.notificationsSubtitle}
            action={
              <Toggle
                enabled={settings.notifications}
                onToggle={() => saveLocalToggle("notifications")}
              />
            }
          />

          <Row
            icon={Moon}
            title={text.theme}
            subtitle={text.themeSubtitle}
            action={
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`px-2 py-1 text-xs border ${theme === "light" ? "border-[#0056D2] text-[#0056D2]" : "border-gray-300 text-gray-600"}`}
                >
                  {text.light}
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`px-2 py-1 text-xs border ${theme === "dark" ? "border-[#0056D2] text-[#0056D2]" : "border-gray-300 text-gray-600"}`}
                >
                  {text.dark}
                </button>
              </div>
            }
          />

          <Row
            icon={Languages}
            title={text.language}
            subtitle={text.languageSubtitle}
            action={
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleLanguageChange("en")}
                  disabled={savingKey === "preferredLanguage"}
                  className={`px-2 py-1 text-xs border ${settings.preferredLanguage === "en" ? "border-[#0056D2] text-[#0056D2]" : "border-gray-300 text-gray-600"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("om")}
                  disabled={savingKey === "preferredLanguage"}
                  className={`px-2 py-1 text-xs border ${settings.preferredLanguage === "om" ? "border-[#0056D2] text-[#0056D2]" : "border-gray-300 text-gray-600"}`}
                >
                  OM
                </button>
              </div>
            }
          />
        </Card>

        {/* SUPPORT */}
        <Card>
          <SectionTitle title={text.support} />

          <Row
            icon={HelpCircle}
            title={text.helpCenter}
            subtitle={text.helpCenterSubtitle}
            action={
              <button
                onClick={() => setActiveDialog("help")}
                className="text-xs text-[#0056D2] hover:underline"
              >
                {text.open}
              </button>
            }
          />

          <Row
            icon={FileText}
            title={text.termsPolicy}
            subtitle={text.termsPolicySubtitle}
            action={
              <button
                onClick={() => setActiveDialog("policy")}
                className="text-xs text-[#0056D2] hover:underline"
              >
                {text.read}
              </button>
            }
          />
        </Card>

        {/* LEARNING CONTROLS */}
        <Card>
          <SectionTitle title={text.learningControls} />

          <Row
            icon={Bell}
            title={text.dailyReminders}
            subtitle={text.dailyRemindersSubtitle}
            action={
              <Toggle
                enabled={settings.reminders}
                onToggle={() => saveLocalToggle("reminders")}
              />
            }
          />

          <Row
            icon={CreditCard}
            title={text.autoSync}
            subtitle={text.autoSyncSubtitle}
            action={
              <Toggle
                enabled={settings.autoSync}
                onToggle={() => saveLocalToggle("autoSync")}
              />
            }
          />
        </Card>
      </div>

      {activeDialog ? (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {activeDialog === "help" ? text.helpTitle : text.policyTitle}
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-5">
              {activeDialog === "help" ? text.helpMessage : text.policyMessage}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveDialog("")}
                className="px-4 py-2 bg-[#0056D2] text-white text-sm font-medium hover:bg-[#0045b0]"
              >
                {text.close}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Settings;

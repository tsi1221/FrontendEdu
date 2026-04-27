import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Building2,
  Columns,
  GraduationCap,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import logo from "../../src/assets/logo.png";
import {
  fetchPublicSchools,
  registerStudent,
  saveStoredAuth,
} from "../services/api";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    school: "",
    grade: "",
    section: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadSchools = async () => {
      try {
        setSchoolsLoading(true);
        const response = await fetchPublicSchools();
        if (!active) return;
        setSchools(Array.isArray(response?.data) ? response.data : []);
      } catch {
        if (!active) return;
        setSchools([]);
      } finally {
        if (active) setSchoolsLoading(false);
      }
    };

    void loadSchools();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.school) newErrors.school = "Please select a school";
    if (!formData.grade) newErrors.grade = "Please select a grade";
    if (!formData.section) newErrors.section = "Please select a section";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await registerStudent({
        email: formData.email,
        password: formData.password,
        role: "STUDENT",
        full_name: formData.fullName,
        language: "en",
        grade_level: Number(formData.grade),
        school_id: formData.school,
        section: formData.section,
      });

      const user = response?.data?.user || null;
      const token = response?.data?.token || null;

      if (user && token) {
        saveStoredAuth({
          token,
          user,
          profile: response?.data?.profile || null,
        });
      }

      navigate("/dashbored");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err.message || "Unable to create your account right now.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="w-full max-w-md border border-gray-200 bg-white p-6">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="EduTwin Logo"
            className="w-10 h-10 object-contain mb-3"
          />
          <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
          <p className="text-xs text-gray-500 mt-1">
            Join our community and start learning
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* School */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Select School
            </label>
            <div className="relative">
              <Building2
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                disabled={schoolsLoading}
                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm appearance-none focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              >
                <option value="">
                  {schoolsLoading ? "Loading schools..." : "Choose your school"}
                </option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.school && (
              <p className="text-xs text-red-600 mt-1">{errors.school}</p>
            )}
          </div>

          {/* Grade & Section – Two columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Grade
              </label>
              <div className="relative">
                <GraduationCap
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm appearance-none focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                >
                  <option value="">Grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              {errors.grade && (
                <p className="text-xs text-red-600 mt-1">{errors.grade}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Section
              </label>
              <div className="relative">
                <Columns
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm appearance-none focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                >
                  <option value="">Section</option>
                  <option value="a">Section A</option>
                  <option value="b">Section B</option>
                  <option value="c">Section C</option>
                </select>
              </div>
              {errors.section && (
                <p className="text-xs text-red-600 mt-1">{errors.section}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password fields with eye toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-8 pr-8 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-8 pr-8 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#0056D2] text-white text-sm font-medium hover:bg-[#0045b0] transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {errors.form && (
          <p className="text-xs text-red-600 mt-3">{errors.form}</p>
        )}

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#0056D2] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

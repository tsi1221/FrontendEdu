import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  CreditCard,
  LogOut,
  Camera,
  Save,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import {
  clearStoredAuth,
  fetchCurrentUser,
  updateCurrentUser,
} from "../services/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    name: "Student",
    email: "student@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student",
    subscription: "Not subscribed",
    expiry: "Unavailable",
    phone: "",
    location: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const response = await fetchCurrentUser();
        const user = response?.data?.user || null;
        const studentProfile = response?.data?.profile || null;

        if (!mounted) return;

        setProfile((prev) => ({
          ...prev,
          name: studentProfile?.full_name || prev.name,
          email: user?.email || prev.email,
          avatar: studentProfile?.student_photo_url || prev.avatar,
          subscription: studentProfile?.is_subscribed
            ? "Subscribed"
            : "Not subscribed",
          expiry: studentProfile?.subscription_period_end
            ? new Date(
                studentProfile.subscription_period_end,
              ).toLocaleDateString()
            : "Unavailable",
          phone: studentProfile?.phone_number || "",
          location: "",
        }));
      } catch (error) {
        if (mounted) {
          setMessage(error.message || "Unable to load profile from backend.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    clearStoredAuth();
    navigate("/");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await updateCurrentUser({
        full_name: profile.name,
      });

      const updatedProfile = response?.data?.profile || null;
      if (updatedProfile) {
        setProfile((prev) => ({
          ...prev,
          name: updatedProfile.full_name || prev.name,
          avatar: updatedProfile.student_photo_url || prev.avatar,
        }));
      }

      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col md:flex-row h-full">
        {message && (
          <div className="absolute top-4 right-4 z-20 border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
            {message}
          </div>
        )}

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-8 h-8 object-cover border border-gray-200"
            />
            <div>
              <h2 className="font-medium text-sm text-gray-900">
                {profile.name}
              </h2>
              <p className="text-xs text-gray-500">{profile.subscription}</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-gray-600 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* LEFT SIDEBAR */}
        <div
          className={`
          ${mobileMenuOpen ? "block" : "hidden"} 
          md:block w-full md:w-64 border-r border-gray-200 bg-white p-4
        `}
        >
          {/* Desktop Avatar with upload */}
          <div className="hidden md:block relative w-16 h-16 mx-auto mb-4">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-full h-full object-cover border border-gray-200"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 p-1 bg-[#0056D2] text-white translate-x-1 translate-y-1 hover:bg-[#0045b0] transition-colors"
            >
              <Camera size={12} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="hidden md:block text-center mb-6">
            <h2 className="font-semibold text-gray-900 text-base">
              {profile.name}
            </h2>
            <p className="text-xs text-gray-500">{profile.subscription}</p>
          </div>

          <nav className="space-y-1">
            <TabButton
              active={activeTab === "details"}
              onClick={() => {
                setActiveTab("details");
                setMobileMenuOpen(false);
              }}
              icon={<User size={16} />}
              label="Edit Profile"
            />
            <TabButton
              active={activeTab === "password"}
              onClick={() => {
                setActiveTab("password");
                setMobileMenuOpen(false);
              }}
              icon={<ShieldCheck size={16} />}
              label="Security"
            />
            <TabButton
              active={activeTab === "billing"}
              onClick={() => {
                setActiveTab("billing");
                setMobileMenuOpen(false);
              }}
              icon={<CreditCard size={16} />}
              label="Subscription"
            />
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full mt-8 p-2 text-red-600 hover:bg-red-50 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 pt-10 pl-10 overflow-y-auto">
          {activeTab === "details" && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Profile Details
              </h3>
              <div className="space-y-5">
                {/* Mobile avatar upload (visible only on mobile) */}
                <div className="md:hidden flex items-center gap-4 pb-3 border-b border-gray-200">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-12 h-12 object-cover border border-gray-200"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-3 py-1 border border-gray-300 text-sm hover:bg-gray-50"
                  >
                    Change Photo
                  </button>
                </div>

                <InputGroup
                  label="Full Name"
                  value={profile.name}
                  onChange={(val) => handleProfileUpdate("name", val)}
                  placeholder="Enter your name"
                />
                <InputGroup
                  label="Email Address"
                  value={profile.email}
                  onChange={(val) => handleProfileUpdate("email", val)}
                  placeholder="Enter your email"
                  type="email"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputGroup
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(val) => handleProfileUpdate("phone", val)}
                    placeholder="Enter phone number"
                    type="tel"
                  />
                  <InputGroup
                    label="Location"
                    value={profile.location}
                    onChange={(val) => handleProfileUpdate("location", val)}
                    placeholder="Enter location"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving || loading}
                  className="w-full sm:w-auto px-5 py-2 bg-[#0056D2] text-white text-sm font-medium hover:bg-[#0045b0] flex items-center gap-2 justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Change Password
              </h3>
              <div className="space-y-5">
                <InputGroup
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputGroup
                    label="New Password"
                    type="password"
                    placeholder="Min. 8 characters"
                  />
                  <InputGroup
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="w-full sm:w-auto px-5 py-2 bg-[#0056D2] text-white text-sm font-medium hover:bg-[#0045b0] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Subscription
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Manage your billing and plan details.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                <div className="border border-gray-200 p-5 bg-white">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                    Active Plan
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mt-1 mb-3">
                    {profile.subscription}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ShieldCheck size={14} />
                    <span>Next billing: {profile.expiry}</span>
                  </div>
                </div>

                <div className="border border-gray-200 p-5 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 text-sm mb-3">
                    Plan Features
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#0056D2]"></div>
                      Unlimited Projects
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#0056D2]"></div>
                      Priority Support
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#0056D2]"></div>
                      Advanced Analytics
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#0056D2]"></div>
                      Custom Integrations
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0056D2]/10 text-[#0056D2]">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        Update Payment Method
                      </p>
                      <p className="text-xs text-gray-500">
                        Visa ending in •••• 4242
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0056D2]/10 text-[#0056D2]">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        Billing History
                      </p>
                      <p className="text-xs text-gray-500">
                        View past invoices
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Flat, no-rounded helper components
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 w-full p-2 text-sm font-medium transition-colors ${
      active
        ? "bg-gray-100 text-[#0056D2] border-l-2 border-[#0056D2]"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const InputGroup = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] transition-all"
    />
  </div>
);

export default ProfilePage;

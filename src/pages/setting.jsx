import { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
  User,
  Bell,
  Moon,
  Sun,
  FileText,
  HelpCircle,
  CreditCard,
} from "lucide-react";

/* =========================
   UI COMPONENTS
========================= */

const Card = ({ children }) => (
  <div className="border border-gray-200 bg-white p-6">
    {children}
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    {title}
  </h2>
);

const Row = ({ icon: Icon, title, subtitle, action }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-none">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="text-gray-700" size={18} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
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

/* =========================
   SETTINGS PAGE
========================= */

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    reminders: true,
    autoSync: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-6 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="text-gray-500" size={18} />
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>
        </div>

        <p className="text-sm text-gray-500">
          Manage your account, preferences, and learning experience.
        </p>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* SUBSCRIPTION */}
        <Card>
          <SectionTitle title="Subscription" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Monthly Plan</p>
              <p className="text-2xl font-bold text-gray-900">
                149 ETB{" "}
                <span className="text-sm text-gray-500">/ month</span>
              </p>
            </div>

            <span className="text-xs border border-gray-200 px-3 py-1 w-fit text-gray-600">
              Not subscribed
            </span>
          </div>

          <button className="w-full md:w-1/2 bg-[#0056D2] hover:bg-[#0045b0] text-white py-3 font-medium transition">
            Subscribe
          </button>
        </Card>

        {/* ACCOUNT */}
        <Card>
          <SectionTitle title="Account" />

          <Row
            icon={User}
            title="Profile"
            subtitle="Update your personal information"
            action="Open"
          />

          <Row
            icon={Shield}
            title="Privacy"
            subtitle="Manage data and permissions"
            action="Review"
          />
        </Card>

        {/* PREFERENCES */}
        <Card>
          <SectionTitle title="Preferences" />

          <Row
            icon={Bell}
            title="Notifications"
            subtitle="Reminders and updates"
            action={
              <Toggle
                enabled={settings.notifications}
                onToggle={() => toggle("notifications")}
              />
            }
          />

          <Row
            icon={Sun}
            title="Theme"
            subtitle="Light or dark mode"
            action={
              <div className="flex gap-3">
                <Sun className="text-gray-900" size={18} />
                <Moon className="text-gray-400" size={18} />
              </div>
            }
          />
        </Card>

        {/* SUPPORT */}
        <Card>
          <SectionTitle title="Support" />

          <Row
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs and guidance"
            action="Open"
          />

          <Row
            icon={FileText}
            title="Terms & Policy"
            subtitle="Legal information"
            action="Read"
          />
        </Card>

        {/* LEARNING CONTROLS */}
        <Card>
          <SectionTitle title="Learning Controls" />

          <Row
            icon={Bell}
            title="Daily reminders"
            subtitle="Stay consistent with learning"
            action={
              <Toggle
                enabled={settings.reminders}
                onToggle={() => toggle("reminders")}
              />
            }
          />

          <Row
            icon={CreditCard}
            title="Auto-sync progress"
            subtitle="Sync learning data in background"
            action={
              <Toggle
                enabled={settings.autoSync}
                onToggle={() => toggle("autoSync")}
              />
            }
          />
        </Card>

      </div>
    </div>
  );
};

export default Settings;
import React, { useState, createContext, useContext } from "react";
import {
  Moon,
  Sun,
  User,
  Mail,
  Phone,
  Building2,
  Lock,
  Bell,
  Shield,
  Database,
  Globe,
  ChevronRight,
  Save,
  Key,
  UserCog,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Light Theme Function
const getLightTheme = () => ({
  background: "bg-gradient-to-br from-slate-50 to-slate-100",
  cardBg: "bg-white",
  cardBorder: "border-slate-200",
  cardShadow: "shadow-md",
  cardHoverShadow: "hover:shadow-lg",
  textPrimary: "text-slate-900",
  textSecondary: "text-slate-600",
  textTertiary: "text-slate-400",
  inputBg: "bg-white",
  inputBorder: "border-slate-300",
  inputFocus: "focus:border-blue-500 focus:ring-blue-500",
  inputText: "text-slate-900",
  inputPlaceholder: "placeholder:text-slate-400",
  iconBg: "bg-slate-100",
  iconText: "text-slate-600",
  dividerBorder: "border-slate-200",
  toggleBg: "bg-slate-200",
  toggleActive: "bg-blue-600",
  sectionHeaderBg: "bg-slate-50",
  buttonSecondaryBg: "bg-slate-100",
  buttonSecondaryHover: "hover:bg-slate-200",
  buttonSecondaryText: "text-slate-700",
});

// Dark Theme Function
const getDarkTheme = () => ({
  background: "bg-gradient-to-br from-slate-950 to-slate-900",
  cardBg: "bg-slate-900",
  cardBorder: "border-slate-700",
  cardShadow: "shadow-lg shadow-black/20",
  cardHoverShadow: "hover:shadow-xl hover:shadow-black/30",
  textPrimary: "text-slate-50",
  textSecondary: "text-slate-400",
  textTertiary: "text-slate-500",
  inputBg: "bg-slate-950",
  inputBorder: "border-slate-600",
  inputFocus: "focus:border-blue-400 focus:ring-blue-400",
  inputText: "text-slate-50",
  inputPlaceholder: "placeholder:text-slate-500",
  iconBg: "bg-slate-800",
  iconText: "text-slate-400",
  dividerBorder: "border-slate-700",
  toggleBg: "bg-slate-700",
  toggleActive: "bg-blue-600",
  sectionHeaderBg: "bg-slate-800/50",
  buttonSecondaryBg: "bg-slate-800",
  buttonSecondaryHover: "hover:bg-slate-700",
  buttonSecondaryText: "text-slate-300",
});

// Settings Component
const SettingsContent = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@tpc.edu",
    phone: "+91 98765 43210",
    department: "Training & Placement Cell",
    role: "Coordinator",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    placementAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
  });

  const [saveStatus, setSaveStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveProfile = () => {
    setSaveStatus("Profile settings saved successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleChangePassword = () => {
    if (!formData.currentPassword) {
      setPasswordStatus("Please enter your current password");
      setTimeout(() => setPasswordStatus(""), 3000);
      return;
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      setPasswordStatus("Please fill in all password fields");
      setTimeout(() => setPasswordStatus(""), 3000);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordStatus("New passwords do not match!");
      setTimeout(() => setPasswordStatus(""), 3000);
      return;
    }

    if (formData.newPassword.length < 8) {
      setPasswordStatus("Password must be at least 8 characters");
      setTimeout(() => setPasswordStatus(""), 3000);
      return;
    }

    setPasswordStatus("Password changed successfully!");
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setTimeout(() => setPasswordStatus(""), 3000);
  };

  return (
    <div
      className={`min-h-screen ${themeStyles.background} p-6 transition-colors duration-300`}
    >
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Settings
            </h1>
            <p className={`mt-2 ${themeStyles.textSecondary}`}>
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {saveStatus && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
            <p className="text-green-800 dark:text-green-200">{saveStatus}</p>
          </div>
        )}

        {passwordStatus && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              passwordStatus.includes("successfully")
                ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                : "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
            } border`}
          >
            <p
              className={
                passwordStatus.includes("successfully")
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
              }
            >
              {passwordStatus}
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Information */}
          <div
            className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all`}
          >
            <div
              className={`p-6 border-b ${themeStyles.dividerBorder} ${themeStyles.sectionHeaderBg}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${themeStyles.iconBg}`}>
                  <User className={`w-5 h-5 ${themeStyles.iconText}`} />
                </div>
                <div>
                  <h2
                    className={`text-xl font-semibold ${themeStyles.textPrimary}`}
                  >
                    Profile Information
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>
                    Update your personal and contact information
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Department
                  </label>
                  <div className="relative">
                    <Building2
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Role
                  </label>
                  <div className="relative">
                    <UserCog
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div
            className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all`}
          >
            <div
              className={`p-6 border-b ${themeStyles.dividerBorder} ${themeStyles.sectionHeaderBg}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${themeStyles.iconBg}`}>
                  <Shield className={`w-5 h-5 ${themeStyles.iconText}`} />
                </div>
                <div>
                  <h2
                    className={`text-xl font-semibold ${themeStyles.textPrimary}`}
                  >
                    Security Settings
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Key
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Key
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputFocus} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-colors focus:outline-none focus:ring-2`}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Settings component with ThemeProvider
export default function Settings() {
  return <SettingsContent />;
}

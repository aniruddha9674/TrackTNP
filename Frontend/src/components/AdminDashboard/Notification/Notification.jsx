import React, { useState, useMemo } from "react";
import {
  Bell,
  Send,
  Users,
  UserCheck,
  GraduationCap,
  Building2,
  FileText,
  Award,
  Briefcase,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Search,
  Eye,
  Trash2,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// ── Badge ─────────────────────────────────────────────────────────────────────
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors shadow-sm";
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// ── Reusable Alert / Confirm Modal ────────────────────────────────────────────
const AppModal = ({ isOpen, type = "alert", title, message, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;
  const isConfirm = type === "confirm";
  return (
    <div className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-[60]`}>
      <div className={`w-full max-w-md rounded-2xl shadow-2xl border ${t.modalBg} ${t.cardBorder} p-6`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${isConfirm ? "bg-red-100" : "bg-blue-100"}`}>
            {isConfirm
              ? <Trash2 className="h-5 w-5 text-red-600" />
              : <CheckCircle2 className="h-5 w-5 text-blue-600" />}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${t.textPrimary} mb-1`}>{title}</h3>
            <p className={`text-sm ${t.textSecondary}`}>{message}</p>
          </div>
          <button
            onClick={onCancel}
            className={`p-1 rounded-lg ${t.buttonHover} ${t.textSecondary} transition-colors`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          {isConfirm && (
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
            >
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg font-medium transition-all text-white ${isConfirm ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isConfirm ? "Delete" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Field Error ───────────────────────────────────────────────────────────────
const FieldError = ({ error, errorText }) =>
  error ? (
    <p className={`flex items-center gap-1.5 text-xs mt-1.5 ${errorText}`}>
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {error}
    </p>
  ) : null;

// ── Main Component ────────────────────────────────────────────────────────────
const NotificationAdmin = () => {
  const { theme } = useTheme();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRecipient, setFilterRecipient] = useState("all");
  const [fieldErrors, setFieldErrors] = useState({});

  // App modal state (replaces all alert / confirm)
  const [appModal, setAppModal] = useState({
    isOpen: false, type: "alert", title: "", message: "", onConfirm: null,
  });

  const showAlert = (title, message) =>
    setAppModal({ isOpen: true, type: "alert", title, message, onConfirm: () => setAppModal(m => ({ ...m, isOpen: false })) });

  const showConfirm = (title, message, onConfirm) =>
    setAppModal({
      isOpen: true, type: "confirm", title, message,
      onConfirm: () => { setAppModal(m => ({ ...m, isOpen: false })); onConfirm(); },
    });

  // Notification Form State
  const [notificationForm, setNotificationForm] = useState({
    title: "", message: "", recipientType: "students",
    college: "", department: "", year: "", category: "general",
  });

  const colleges = [
    "Pimpri Chinchwad College of Engineering PCCOE",
    "Pimpri Chinchwad College of Engineering & Research PCCOER",
    "Nutan Maharashtra Institute of Engineering and Technology NMIET",
  ];
  const departments = [
    "Computer Science", "Information Technology",
    "Electronics & Telecommunication", "Mechanical", "Civil",
  ];
  const years = ["Third Year", "Final Year"];

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Complete Your Profile - Urgent", message: "Please update your profile with latest CGPA, skills, and resume before the placement season begins.", recipientType: "students", targetGroup: "College of Engineering - Computer Science - Final Year", category: "profile", status: "sent", sentAt: "2024-11-20T10:30:00", recipientCount: 245, readCount: 189 },
    { id: 2, title: "Google Drive Scheduled - Dec 5th", message: "Google is visiting campus for SDE roles. Package: 45 LPA. Eligibility: CGPA 7.5+. Register before Nov 30th.", recipientType: "students", targetGroup: "College of Engineering - All Departments - Final Year", category: "placement", status: "sent", sentAt: "2024-11-19T14:20:00", recipientCount: 312, readCount: 298 },
    { id: 3, title: "Upload Offer Letters", message: "Students who received job offers must upload their offer letters to the placement portal by this Friday.", recipientType: "students", targetGroup: "All Colleges - All Departments - Final Year", category: "documents", status: "sent", sentAt: "2024-11-18T09:15:00", recipientCount: 87, readCount: 65 },
    { id: 4, title: "Coordinator Meeting - December", message: "Monthly coordinator meeting scheduled for discussion on upcoming placement activities.", recipientType: "college coordinators", targetGroup: "College of Engineering", category: "meeting", status: "sent", sentAt: "2024-11-17T11:45:00", recipientCount: 5, readCount: 5 },
    { id: 5, title: "Department Review Meeting", message: "Review of department placement statistics and upcoming drives.", recipientType: "department coordinators", targetGroup: "College of Engineering - Computer Science", category: "meeting", status: "sent", sentAt: "2024-11-16T16:00:00", recipientCount: 3, readCount: 3 },
    { id: 6, title: "Volunteer Training Session", message: "Training session for placement drive volunteers on Dec 1st.", recipientType: "volunteers", targetGroup: "All Volunteers", category: "general", status: "sent", sentAt: "2024-11-15T10:00:00", recipientCount: 28, readCount: 24 },
  ]);

  // ── Themes ──────────────────────────────────────────────────────────────────
  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-slate-50 to-slate-100",
    cardBg: "bg-white", cardBorder: "border-slate-200", cardShadow: "shadow-md", cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-slate-900", textSecondary: "text-slate-600", textTertiary: "text-slate-400",
    inputBg: "bg-white", inputBorder: "border-slate-300", inputErrorBorder: "border-red-400",
    inputText: "text-slate-900", inputPlaceholder: "placeholder:text-slate-400",
    modalOverlay: "bg-black/60", modalBg: "bg-white", modalHeader: "bg-slate-100", modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-slate-100", emptyStateIcon: "text-slate-400",
    statCard1Gradient: "from-white to-blue-50", statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-purple-50", statCard4Gradient: "from-white to-amber-50",
    statIcon1Bg: "bg-blue-100", statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100", statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-purple-100", statIcon3Text: "text-purple-600",
    statIcon4Bg: "bg-amber-100", statIcon4Text: "text-amber-600",
    dividerBorder: "border-slate-200", buttonBg: "bg-white", buttonBorder: "border-slate-300", buttonHover: "hover:bg-slate-50",
    notificationCardBg: "bg-white", notificationCardBorder: "border-gray-100", notificationCardHover: "hover:border-gray-200",
    iconGradient: "from-blue-50 to-blue-100",
    errorText: "text-red-500", errorBg: "bg-red-50", errorBorder: "border-red-200",
  });

  const getDarkTheme = () => ({
    background: "bg-gradient-to-br from-slate-950 to-slate-900",
    cardBg: "bg-slate-900", cardBorder: "border-slate-700", cardShadow: "shadow-lg shadow-black/20", cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
    textPrimary: "text-slate-50", textSecondary: "text-slate-400", textTertiary: "text-slate-500",
    inputBg: "bg-slate-950", inputBorder: "border-slate-600", inputErrorBorder: "border-red-500",
    inputText: "text-slate-50", inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80", modalBg: "bg-slate-900", modalHeader: "bg-slate-800", modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-800", emptyStateIcon: "text-slate-500",
    statCard1Gradient: "from-slate-800 to-blue-900/30", statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30", statCard4Gradient: "from-slate-800 to-amber-900/30",
    statIcon1Bg: "bg-blue-900/30", statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30", statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30", statIcon3Text: "text-purple-400",
    statIcon4Bg: "bg-amber-900/30", statIcon4Text: "text-amber-400",
    dividerBorder: "border-slate-700", buttonBg: "bg-slate-700", buttonBorder: "border-slate-600", buttonHover: "hover:bg-slate-600",
    notificationCardBg: "bg-slate-800", notificationCardBorder: "border-slate-700", notificationCardHover: "hover:border-slate-600",
    iconGradient: "from-blue-900/30 to-blue-800/30",
    errorText: "text-red-400", errorBg: "bg-red-900/20", errorBorder: "border-red-700",
  });

  const t = theme === "dark" ? getDarkTheme() : getLightTheme();

  // ── Stats ───────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    totalNotifications: notifications.length,
    sentNotifications: notifications.filter(n => n.status === "sent").length,
    scheduledNotifications: notifications.filter(n => n.status === "scheduled").length,
    totalRecipients: notifications.reduce((sum, n) => sum + n.recipientCount, 0),
  }), [notifications]);

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filteredNotifications = useMemo(() =>
    notifications.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || n.status === filterStatus;
      const matchesRecipient = filterRecipient === "all" || n.recipientType === filterRecipient;
      return matchesSearch && matchesStatus && matchesRecipient;
    }), [notifications, searchQuery, filterStatus, filterRecipient]);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    const title = notificationForm.title.trim();
    if (!title) errors.title = "Notification title is required.";
    else if (title.length < 5) errors.title = "Title must be at least 5 characters.";
    else if (title.length > 100) errors.title = "Title must not exceed 100 characters.";

    const message = notificationForm.message.trim();
    if (!message) errors.message = "Message is required.";
    else if (message.length < 10) errors.message = "Message must be at least 10 characters.";
    else if (message.length > 1000) errors.message = "Message must not exceed 1000 characters.";

    const { recipientType, college, department } = notificationForm;
    if (recipientType === "college coordinators" && !college)
      errors.college = "Please select a college for college coordinator notifications.";
    if (recipientType === "department coordinators") {
      if (!college) errors.college = "Please select a college.";
      if (!department) errors.department = "Please select a department.";
    }
    return errors;
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const handleRecipientTypeChange = (type) => {
    setNotificationForm({ ...notificationForm, recipientType: type, college: "", department: "", year: "" });
    setFieldErrors({});
  };

  const clearFieldError = (name) => {
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const buildTargetGroup = () => {
    const { recipientType, college, department, year } = notificationForm;
    if (recipientType === "students") {
      return [(college || "All Colleges"), (department || "All Departments"), (year || "All Years")].join(" - ");
    } else if (recipientType === "college coordinators") {
      return college || "All Colleges";
    } else if (recipientType === "department coordinators") {
      return [college, department].filter(Boolean).join(" - ") || "All";
    } else if (recipientType === "volunteers") {
      return "All Volunteers";
    }
    return "All";
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setFieldErrors({});
    setNotificationForm({ title: "", message: "", recipientType: "students", college: "", department: "", year: "", category: "general" });
  };

  const handleCreateNotification = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    const newNotification = {
      id: Date.now(),
      title: notificationForm.title.trim(),
      message: notificationForm.message.trim(),
      recipientType: notificationForm.recipientType,
      targetGroup: buildTargetGroup(),
      category: notificationForm.category,
      status: "sent",
      sentAt: new Date().toISOString(),
      recipientCount: Math.floor(Math.random() * 300) + 50,
      readCount: 0,
    };
    setNotifications([newNotification, ...notifications]);
    handleCloseCreateModal();
    showAlert("Notification Sent!", "Your notification has been successfully sent to the selected recipients.");
  };

  const handleDeleteNotification = (id) => {
    showConfirm(
      "Delete Notification",
      "Are you sure you want to delete this notification? This action cannot be undone.",
      () => setNotifications(notifications.filter(n => n.id !== id))
    );
  };

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const getCategoryIcon = (category) => {
    const iconMap = { placement: Building2, profile: UserCheck, documents: FileText, internship: Briefcase, feedback: MessageSquare, meeting: Calendar, attendance: Clock, general: Bell };
    return iconMap[category] || Bell;
  };

  const getRecipientIcon = (recipientType) => {
    const iconMap = { students: GraduationCap, "college coordinators": Building2, "department coordinators": Award, volunteers: UserCheck };
    return iconMap[recipientType] || Users;
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen ${t.background}`}>
      <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${t.textPrimary}`}>Notification Management</h1>
            <p className={`mt-2 text-sm sm:text-base ${t.textSecondary}`}>
              Send and manage notifications to students, staff, and volunteers
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Create Notification
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { label: "Total Notifications", value: stats.totalNotifications, gradient: t.statCard1Gradient, iconBg: t.statIcon1Bg, iconColor: t.statIcon1Text, Icon: Bell },
            { label: "Sent", value: stats.sentNotifications, gradient: t.statCard2Gradient, iconBg: t.statIcon2Bg, iconColor: t.statIcon2Text, Icon: CheckCircle2 },
            { label: "Scheduled", value: stats.scheduledNotifications, gradient: t.statCard3Gradient, iconBg: t.statIcon3Bg, iconColor: t.statIcon3Text, Icon: Clock },
            { label: "Total Recipients", value: stats.totalRecipients, gradient: t.statCard4Gradient, iconBg: t.statIcon4Bg, iconColor: t.statIcon4Text, Icon: Users },
          ].map(({ label, value, gradient, iconBg, iconColor, Icon }) => (
            <div key={label} className={`rounded-xl border ${t.cardBorder} ${t.cardShadow} bg-gradient-to-br ${gradient} transition-all`}>
              <div className="p-4 sm:p-6 flex items-center justify-between">
                <div>
                  <p className={`text-xs sm:text-sm font-semibold ${t.textSecondary} uppercase tracking-wide`}>{label}</p>
                  <h3 className={`text-xl sm:text-3xl font-bold ${t.textPrimary} mt-1 sm:mt-2`}>{value}</h3>
                </div>
                <div className={`h-8 w-8 sm:h-12 sm:w-12 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className={`rounded-2xl border ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}>
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.textTertiary} h-4 w-4`} />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 border ${t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} ${t.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-4 py-2.5 border ${t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}>
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="scheduled">Scheduled</option>
                </select>
                <select value={filterRecipient} onChange={(e) => setFilterRecipient(e.target.value)}
                  className={`px-4 py-2.5 border ${t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}>
                  <option value="all">All Recipients</option>
                  <option value="students">Students</option>
                  <option value="college coordinators">College Coordinators</option>
                  <option value="department coordinators">Department Coordinators</option>
                  <option value="volunteers">Volunteers</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className={`rounded-2xl border ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}>
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-lg sm:text-xl font-bold ${t.textPrimary}`}>Recent Notifications</h2>
              <span className={`text-sm ${t.textSecondary}`}>{filteredNotifications.length} notifications</span>
            </div>
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const CategoryIcon = getCategoryIcon(notification.category);
                const RecipientIcon = getRecipientIcon(notification.recipientType);
                const readPercentage = notification.status === "sent"
                  ? Math.round((notification.readCount / notification.recipientCount) * 100) : 0;
                return (
                  <div key={notification.id}
                    className={`border ${t.notificationCardBorder} rounded-2xl p-4 sm:p-6 ${t.cardHoverShadow} transition-all duration-200 ${t.notificationCardBg} ${t.notificationCardHover}`}>
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 bg-gradient-to-br ${t.iconGradient} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                        <CategoryIcon className={`h-6 w-6 ${t.statIcon1Text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-lg font-bold ${t.textPrimary} mb-1`}>{notification.title}</h3>
                            <p className={`${t.textSecondary} text-sm line-clamp-2`}>{notification.message}</p>
                          </div>
                          <button onClick={() => handleDeleteNotification(notification.id)}
                            className={`p-2 rounded-lg ${t.buttonBg} border ${t.buttonBorder} ${t.buttonHover} transition-colors`}>
                            <Trash2 className={`h-4 w-4 ${t.textSecondary}`} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant={notification.status === "sent" ? "success" : "warning"} className="text-xs">
                            {notification.status === "sent" ? "✓ Sent" : "⏰ Scheduled"}
                          </Badge>
                          <Badge variant="default" className="text-xs flex items-center gap-1">
                            <RecipientIcon className="h-3 w-3" />
                            {notification.recipientType}
                          </Badge>
                          <Badge variant="info" className="text-xs">{notification.targetGroup}</Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className={`h-4 w-4 ${t.textTertiary}`} />
                            <span className={t.textSecondary}>{formatDateTime(notification.sentAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className={`h-4 w-4 ${t.textTertiary}`} />
                            <span className={t.textSecondary}>{notification.recipientCount} recipients</span>
                          </div>
                          {notification.status === "sent" && (
                            <div className="flex items-center gap-2">
                              <Eye className={`h-4 w-4 ${t.textTertiary}`} />
                              <span className={t.textSecondary}>{notification.readCount} read ({readPercentage}%)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredNotifications.length === 0 && (
              <div className={`text-center py-12 ${t.emptyStateBg} rounded-2xl`}>
                <Bell className={`h-12 w-12 ${t.emptyStateIcon} mx-auto mb-4`} />
                <h3 className={`text-lg font-semibold ${t.textPrimary} mb-2`}>No notifications found</h3>
                <p className={t.textSecondary}>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Create Notification Modal ──────────────────────────────────────── */}
      {showCreateModal && (
        <div className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
          <div className={`${t.modalBg} border ${t.cardBorder} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden`}>

            {/* Header */}
            <div className={`sticky top-0 ${t.modalHeader} border-b ${t.modalHeaderBorder} px-6 py-4 flex items-center justify-between`}>
              <h2 className={`text-xl font-bold ${t.textPrimary}`}>Create New Notification</h2>
              <button onClick={handleCloseCreateModal} className={`p-2 rounded-lg ${t.buttonHover} transition-colors`}>
                <X className={`h-5 w-5 ${t.textPrimary}`} />
              </button>
            </div>

            {/* Validation Summary Banner */}
            {Object.keys(fieldErrors).length > 0 && (
              <div className={`mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                <p className={`text-sm ${t.errorText}`}>Please fix the highlighted fields before submitting.</p>
              </div>
            )}

            <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">

              {/* Title */}
              <div className="space-y-1.5">
                <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                  Notification Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => { setNotificationForm({ ...notificationForm, title: e.target.value }); clearFieldError("title"); }}
                  placeholder="Enter notification title"
                  className={`w-full px-4 py-3 border ${fieldErrors.title ? t.inputErrorBorder : t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} ${t.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                />
                <div className="flex justify-between items-center">
                  <FieldError error={fieldErrors.title} errorText={t.errorText} />
                  <span className={`text-xs ml-auto ${notificationForm.title.length > 100 ? t.errorText : t.textTertiary}`}>
                    {notificationForm.title.length}/100
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => { setNotificationForm({ ...notificationForm, message: e.target.value }); clearFieldError("message"); }}
                  placeholder="Enter notification message"
                  rows="4"
                  className={`w-full px-4 py-3 border ${fieldErrors.message ? t.inputErrorBorder : t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} ${t.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none`}
                />
                <div className="flex justify-between items-center">
                  <FieldError error={fieldErrors.message} errorText={t.errorText} />
                  <span className={`text-xs ml-auto ${notificationForm.message.length > 1000 ? t.errorText : t.textTertiary}`}>
                    {notificationForm.message.length}/1000
                  </span>
                </div>
              </div>

              {/* Recipient Type */}
              <div className="space-y-1.5">
                <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                  Recipient Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={notificationForm.recipientType}
                  onChange={(e) => handleRecipientTypeChange(e.target.value)}
                  className={`w-full px-4 py-3 border ${t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                >
                  <option value="students">Students</option>
                  <option value="volunteers">Volunteers</option>
                  <option value="college coordinators">College Coordinators</option>
                  <option value="department coordinators">Department Coordinators</option>
                </select>
              </div>

              {/* Students: College + Department + Year (all optional) */}
              {notificationForm.recipientType === "students" && (
                <div className="space-y-4">
                  {[
                    { label: "College", name: "college", options: colleges, placeholder: "All Colleges" },
                    { label: "Department", name: "department", options: departments, placeholder: "All Departments" },
                    { label: "Year", name: "year", options: years, placeholder: "All Years" },
                  ].map(({ label, name, options, placeholder }) => (
                    <div key={name} className="space-y-1.5">
                      <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                        {label}
                        <span className={`ml-1.5 text-xs font-normal ${t.textTertiary}`}>(optional)</span>
                      </label>
                      <select
                        value={notificationForm[name]}
                        onChange={(e) => setNotificationForm({ ...notificationForm, [name]: e.target.value })}
                        className={`w-full px-4 py-3 border ${t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                      >
                        <option value="">{placeholder}</option>
                        {options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* College Coordinators: College required */}
              {notificationForm.recipientType === "college coordinators" && (
                <div className="space-y-1.5">
                  <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                    College <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={notificationForm.college}
                    onChange={(e) => { setNotificationForm({ ...notificationForm, college: e.target.value }); clearFieldError("college"); }}
                    className={`w-full px-4 py-3 border ${fieldErrors.college ? t.inputErrorBorder : t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                  >
                    <option value="">Select College</option>
                    {colleges.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <FieldError error={fieldErrors.college} errorText={t.errorText} />
                </div>
              )}

              {/* Department Coordinators: College + Department both required */}
              {notificationForm.recipientType === "department coordinators" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                      College <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={notificationForm.college}
                      onChange={(e) => { setNotificationForm({ ...notificationForm, college: e.target.value }); clearFieldError("college"); }}
                      className={`w-full px-4 py-3 border ${fieldErrors.college ? t.inputErrorBorder : t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">Select College</option>
                      {colleges.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <FieldError error={fieldErrors.college} errorText={t.errorText} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-semibold ${t.textPrimary}`}>
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={notificationForm.department}
                      onChange={(e) => { setNotificationForm({ ...notificationForm, department: e.target.value }); clearFieldError("department"); }}
                      className={`w-full px-4 py-3 border ${fieldErrors.department ? t.inputErrorBorder : t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">Select Department</option>
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <FieldError error={fieldErrors.department} errorText={t.errorText} />
                  </div>
                </div>
              )}

              {/* Volunteers: info banner */}
              {notificationForm.recipientType === "volunteers" && (
                <div className={`p-4 rounded-xl border ${t.inputBorder} ${t.inputBg}`}>
                  <p className={`text-sm ${t.textSecondary}`}>
                    This notification will be sent to all registered volunteers.
                  </p>
                </div>
              )}

              {/* Category */}
              <div className="space-y-1.5">
                <label className={`block text-sm font-semibold ${t.textPrimary}`}>Category</label>
                <select
                  value={notificationForm.category}
                  onChange={(e) => setNotificationForm({ ...notificationForm, category: e.target.value })}
                  className={`w-full px-4 py-3 border ${t.inputBorder} rounded-xl ${t.inputBg} ${t.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                >
                  <option value="general">General</option>
                  <option value="placement">Placement Drive</option>
                  <option value="profile">Profile Update</option>
                  <option value="documents">Document Upload</option>
                  <option value="internship">Internship</option>
                  <option value="feedback">Feedback</option>
                  <option value="meeting">Meeting</option>
                  <option value="attendance">Attendance</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleCloseCreateModal}
                  className={`flex-1 px-6 py-3 rounded-xl border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} font-semibold ${t.buttonHover} transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNotification}
                  className="flex-1 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── App Modal (Alert / Confirm) ────────────────────────────────────── */}
      <AppModal
        isOpen={appModal.isOpen}
        type={appModal.type}
        title={appModal.title}
        message={appModal.message}
        onConfirm={appModal.onConfirm}
        onCancel={() => setAppModal(m => ({ ...m, isOpen: false }))}
        t={t}
      />
    </div>
  );
};

export default NotificationAdmin;
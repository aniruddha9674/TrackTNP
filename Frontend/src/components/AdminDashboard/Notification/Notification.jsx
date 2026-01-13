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
  Filter,
  ChevronDown,
  Eye,
  Trash2,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Custom Badge Component
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
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

const NotificationAdmin = () => {
  const { theme } = useTheme();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRecipient, setFilterRecipient] = useState("all");

  // Notification Form State
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    recipientType: "students",
    college: "",
    department: "",
    year: "",
    category: "general",
  });

  // Sample data
  const colleges = [
    "Pimpri Chinchwad College of Engineering PCCOE",
    "Pimpri Chinchwad College of Engineering & Research PCCOER",
    "Nutan Maharashtra Institute of Engineering and Technology NMIET",
  ];
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics & Telecommunication",
    "Mechanical",
    "Civil",
  ];
  const years = ["Third Year", "Final Year"];

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Complete Your Profile - Urgent",
      message:
        "Please update your profile with latest CGPA, skills, and resume before the placement season begins.",
      recipientType: "students",
      targetGroup: "College of Engineering - Computer Science - Final Year",
      category: "profile",
      status: "sent",
      sentAt: "2024-11-20T10:30:00",
      recipientCount: 245,
      readCount: 189,
    },
    {
      id: 2,
      title: "Google Drive Scheduled - Dec 5th",
      message:
        "Google is visiting campus for SDE roles. Package: 45 LPA. Eligibility: CGPA 7.5+. Register before Nov 30th.",
      recipientType: "students",
      targetGroup: "College of Engineering - All Departments - Final Year",
      category: "placement",
      status: "sent",
      sentAt: "2024-11-19T14:20:00",
      recipientCount: 312,
      readCount: 298,
    },
    {
      id: 3,
      title: "Upload Offer Letters",
      message:
        "Students who received job offers must upload their offer letters to the placement portal by this Friday.",
      recipientType: "students",
      targetGroup: "All Colleges - All Departments - Final Year",
      category: "documents",
      status: "sent",
      sentAt: "2024-11-18T09:15:00",
      recipientCount: 87,
      readCount: 65,
    },
    {
      id: 4,
      title: "Coordinator Meeting - December",
      message:
        "Monthly coordinator meeting scheduled for discussion on upcoming placement activities.",
      recipientType: "college coordinators",
      targetGroup: "College of Engineering",
      category: "meeting",
      status: "sent",
      sentAt: "2024-11-17T11:45:00",
      recipientCount: 5,
      readCount: 5,
    },
    {
      id: 5,
      title: "Department Review Meeting",
      message: "Review of department placement statistics and upcoming drives.",
      recipientType: "department coordinators",
      targetGroup: "College of Engineering - Computer Science",
      category: "meeting",
      status: "sent",
      sentAt: "2024-11-16T16:00:00",
      recipientCount: 3,
      readCount: 3,
    },
    {
      id: 6,
      title: "Volunteer Training Session",
      message: "Training session for placement drive volunteers on Dec 1st.",
      recipientType: "volunteers",
      targetGroup: "All Volunteers",
      category: "general",
      status: "sent",
      sentAt: "2024-11-15T10:00:00",
      recipientCount: 28,
      readCount: 24,
    },
  ]);

  // Light Theme Function
  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-slate-50 to-slate-100",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardShadow: "shadow-md",
    cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textTertiary: "text-slate-400",
    inputBg: "bg-white",
    inputBorder: "border-slate-300",
    inputDisabled: "disabled:bg-slate-100",
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
    modalOverlay: "bg-black/60",
    modalBg: "bg-white",
    modalHeader: "bg-slate-100",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-slate-100",
    emptyStateIcon: "text-slate-400",
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-purple-50",
    statCard4Gradient: "from-white to-amber-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-purple-100",
    statIcon3Text: "text-purple-600",
    statIcon4Bg: "bg-amber-100",
    statIcon4Text: "text-amber-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    notificationCardBg: "bg-white",
    notificationCardBorder: "border-gray-100",
    notificationCardHover: "hover:border-gray-200",
    iconGradient: "from-blue-50 to-blue-100",
  });

  // Dark Theme Function
  const getDarkTheme = () => ({
    background: "bg-gradient-to-br from-slate-950 to-slate-900",
    cardBg: "bg-slate-900",
    cardBorder: "border-slate-700",
    cardShadow: "shadow-lg shadow-black/20",
    cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
    textPrimary: "text-slate-50",
    textSecondary: "text-slate-400",
    textTertiary: "text-slate-500",
    inputBg: "bg-slate-950",
    inputBorder: "border-slate-600",
    inputDisabled: "disabled:bg-slate-800",
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80",
    modalBg: "bg-slate-900",
    modalHeader: "bg-slate-800",
    modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-800",
    emptyStateIcon: "text-slate-500",
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30",
    statCard4Gradient: "from-slate-800 to-amber-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30",
    statIcon3Text: "text-purple-400",
    statIcon4Bg: "bg-amber-900/30",
    statIcon4Text: "text-amber-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    notificationCardBg: "bg-slate-800",
    notificationCardBorder: "border-slate-700",
    notificationCardHover: "hover:border-slate-600",
    iconGradient: "from-blue-900/30 to-blue-800/30",
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  // Calculate statistics
  const stats = useMemo(() => {
    const totalNotifications = notifications.length;
    const sentNotifications = notifications.filter(
      (n) => n.status === "sent"
    ).length;
    const scheduledNotifications = notifications.filter(
      (n) => n.status === "scheduled"
    ).length;
    const totalRecipients = notifications.reduce(
      (sum, n) => sum + n.recipientCount,
      0
    );

    return {
      totalNotifications,
      sentNotifications,
      scheduledNotifications,
      totalRecipients,
    };
  }, [notifications]);

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (filterStatus !== "all") {
        matchesStatus = notification.status === filterStatus;
      }

      let matchesRecipient = true;
      if (filterRecipient !== "all") {
        matchesRecipient = notification.recipientType === filterRecipient;
      }

      return matchesSearch && matchesStatus && matchesRecipient;
    });
  }, [notifications, searchQuery, filterStatus, filterRecipient]);

  const handleRecipientTypeChange = (type) => {
    setNotificationForm({
      ...notificationForm,
      recipientType: type,
      college: "",
      department: "",
      year: "",
    });
  };

  const buildTargetGroup = () => {
    const { recipientType, college, department, year } = notificationForm;

    if (recipientType === "students") {
      const parts = [];
      if (college) parts.push(college);
      else parts.push("All Colleges");

      if (department) parts.push(department);
      else parts.push("All Departments");

      if (year) parts.push(year);
      else parts.push("All Years");

      return parts.join(" - ");
    } else if (recipientType === "college coordinators") {
      return college || "All Colleges";
    } else if (recipientType === "department coordinators") {
      const parts = [];
      if (college) parts.push(college);
      if (department) parts.push(department);
      return parts.join(" - ") || "All";
    } else if (recipientType === "volunteers") {
      return "All Volunteers";
    }
    return "All";
  };

  const handleCreateNotification = () => {
    if (!notificationForm.title || !notificationForm.message) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate based on recipient type
    if (notificationForm.recipientType === "students") {
      if (
        !notificationForm.college &&
        !notificationForm.department &&
        !notificationForm.year
      ) {
        alert(
          "Please select at least one target criterion (College, Department, or Year)"
        );
        return;
      }
    } else if (notificationForm.recipientType === "college coordinators") {
      if (!notificationForm.college) {
        alert("Please select a college");
        return;
      }
    } else if (notificationForm.recipientType === "department coordinators") {
      if (!notificationForm.college || !notificationForm.department) {
        alert("Please select both college and department");
        return;
      }
    }

    const newNotification = {
      id: notifications.length + 1,
      title: notificationForm.title,
      message: notificationForm.message,
      recipientType: notificationForm.recipientType,
      targetGroup: buildTargetGroup(),
      category: notificationForm.category,
      status: "sent",
      sentAt: new Date().toISOString(),
      recipientCount: Math.floor(Math.random() * 300) + 50,
      readCount: 0,
    };

    setNotifications([newNotification, ...notifications]);
    setShowCreateModal(false);
    setNotificationForm({
      title: "",
      message: "",
      recipientType: "students",
      college: "",
      department: "",
      year: "",
      category: "general",
    });
    alert("Notification sent successfully!");
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotifications(notifications.filter((n) => n.id !== id));
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      placement: Building2,
      profile: UserCheck,
      documents: FileText,
      internship: Briefcase,
      feedback: MessageSquare,
      meeting: Calendar,
      attendance: Clock,
      general: Bell,
    };
    return iconMap[category] || Bell;
  };

  const getRecipientIcon = (recipientType) => {
    const iconMap = {
      students: GraduationCap,
      "college coordinators": Building2,
      "department coordinators": Award,
      volunteers: UserCheck,
    };
    return iconMap[recipientType] || Users;
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}
            >
              Notification Management
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}
            >
              Send and manage notifications to students, staff, and volunteers
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Create Notification
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Total Notifications
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.totalNotifications}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}
                >
                  <Bell
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient} transition-all`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Sent
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.sentNotifications}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}
                >
                  <CheckCircle2
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon2Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient} transition-all`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Scheduled
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.scheduledNotifications}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon3Bg} rounded-xl flex items-center justify-center`}
                >
                  <Clock
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon3Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard4Gradient} transition-all`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Total Recipients
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.totalRecipients}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon4Bg} rounded-xl flex items-center justify-center`}
                >
                  <Users
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon4Text}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
        >
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} h-4 w-4`}
                />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="scheduled">Scheduled</option>
                </select>
                <select
                  value={filterRecipient}
                  onChange={(e) => setFilterRecipient(e.target.value)}
                  className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                >
                  <option value="all">All Recipients</option>
                  <option value="students">Students</option>
                  <option value="college coordinators">
                    College Coordinators
                  </option>
                  <option value="department coordinators">
                    Department Coordinators
                  </option>
                  <option value="volunteers">Volunteers</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
        >
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary}`}
              >
                Recent Notifications
              </h2>
              <span className={`text-sm ${themeStyles.textSecondary}`}>
                {filteredNotifications.length} notifications
              </span>
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const CategoryIcon = getCategoryIcon(notification.category);
                const RecipientIcon = getRecipientIcon(
                  notification.recipientType
                );
                const readPercentage =
                  notification.status === "sent"
                    ? Math.round(
                        (notification.readCount / notification.recipientCount) *
                          100
                      )
                    : 0;

                return (
                  <div
                    key={notification.id}
                    className={`border ${themeStyles.notificationCardBorder} rounded-2xl p-4 sm:p-6 ${themeStyles.cardHoverShadow} transition-all duration-200 ${themeStyles.notificationCardBg} ${themeStyles.notificationCardHover}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 bg-gradient-to-br ${themeStyles.iconGradient} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}
                      >
                        <CategoryIcon
                          className={`h-6 w-6 ${themeStyles.statIcon1Text}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-lg font-bold ${themeStyles.textPrimary} mb-1`}
                            >
                              {notification.title}
                            </h3>
                            <p
                              className={`${themeStyles.textSecondary} text-sm line-clamp-2`}
                            >
                              {notification.message}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleDeleteNotification(notification.id)
                              }
                              className={`p-2 rounded-lg ${themeStyles.buttonBg} border ${themeStyles.buttonBorder} ${themeStyles.buttonHover} transition-colors`}
                            >
                              <Trash2
                                className={`h-4 w-4 ${themeStyles.textSecondary}`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge
                            variant={
                              notification.status === "sent"
                                ? "success"
                                : "warning"
                            }
                            className="text-xs"
                          >
                            {notification.status === "sent"
                              ? "✓ Sent"
                              : "⏰ Scheduled"}
                          </Badge>
                          <Badge
                            variant="default"
                            className="text-xs flex items-center gap-1"
                          >
                            <RecipientIcon className="h-3 w-3" />
                            {notification.recipientType}
                          </Badge>
                          <Badge variant="info" className="text-xs">
                            {notification.targetGroup}
                          </Badge>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock
                              className={`h-4 w-4 ${themeStyles.textTertiary}`}
                            />
                            <span className={themeStyles.textSecondary}>
                              {formatDateTime(notification.sentAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users
                              className={`h-4 w-4 ${themeStyles.textTertiary}`}
                            />
                            <span className={themeStyles.textSecondary}>
                              {notification.recipientCount} recipients
                            </span>
                          </div>
                          {notification.status === "sent" && (
                            <div className="flex items-center gap-2">
                              <Eye
                                className={`h-4 w-4 ${themeStyles.textTertiary}`}
                              />
                              <span className={themeStyles.textSecondary}>
                                {notification.readCount} read ({readPercentage}
                                %)
                              </span>
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
              <div
                className={`text-center py-12 ${themeStyles.emptyStateBg} rounded-2xl`}
              >
                <Bell
                  className={`h-12 w-12 ${themeStyles.emptyStateIcon} mx-auto mb-4`}
                />
                <h3
                  className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No notifications found
                </h3>
                <p className={themeStyles.textSecondary}>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div
          className={`fixed inset-0 ${themeStyles.modalOverlay} flex items-center justify-center p-4 z-50`}
        >
          <div
            className={`${themeStyles.modalBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div
              className={`sticky top-0 ${themeStyles.modalHeader} border-b ${themeStyles.modalHeaderBorder} px-6 py-4 flex items-center justify-between`}
            >
              <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                Create New Notification
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-colors`}
              >
                <X className={`h-5 w-5 ${themeStyles.textPrimary}`} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label
                  className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  Notification Title *
                </label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter notification title"
                  className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  Message *
                </label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      message: e.target.value,
                    })
                  }
                  placeholder="Enter notification message"
                  rows="4"
                  className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none`}
                />
              </div>

              {/* Recipient Type */}
              <div>
                <label
                  className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  Recipient Type *
                </label>
                <select
                  value={notificationForm.recipientType}
                  onChange={(e) => handleRecipientTypeChange(e.target.value)}
                  className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                >
                  <option value="students">Students</option>
                  <option value="volunteers">Volunteers</option>
                  <option value="college coordinators">
                    College Coordinators
                  </option>
                  <option value="department coordinators">
                    Department Coordinators
                  </option>
                </select>
              </div>

              {/* Target Group based on Recipient Type */}
              {notificationForm.recipientType === "students" && (
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      College (Optional)
                    </label>
                    <select
                      value={notificationForm.college}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          college: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">All Colleges</option>
                      {colleges.map((college) => (
                        <option key={college} value={college}>
                          {college}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      Department (Optional)
                    </label>
                    <select
                      value={notificationForm.department}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          department: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      Year (Optional)
                    </label>
                    <select
                      value={notificationForm.year}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          year: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">All Years</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {notificationForm.recipientType === "college coordinators" && (
                <div>
                  <label
                    className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                  >
                    College *
                  </label>
                  <select
                    value={notificationForm.college}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        college: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                  >
                    <option value="">Select College</option>
                    {colleges.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {notificationForm.recipientType === "department coordinators" && (
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      College *
                    </label>
                    <select
                      value={notificationForm.college}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          college: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">Select College</option>
                      {colleges.map((college) => (
                        <option key={college} value={college}>
                          {college}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      Department *
                    </label>
                    <select
                      value={notificationForm.department}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          department: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {notificationForm.recipientType === "volunteers" && (
                <div className={`p-4 rounded-xl ${themeStyles.emptyStateBg}`}>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>
                    This notification will be sent to all registered volunteers.
                  </p>
                </div>
              )}

              {/* Category */}
              <div>
                <label
                  className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  Category
                </label>
                <select
                  value={notificationForm.category}
                  onChange={(e) =>
                    setNotificationForm({
                      ...notificationForm,
                      category: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 px-6 py-3 rounded-xl border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} font-semibold transition-all shadow-sm`}
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
    </div>
  );
};

export default NotificationAdmin;

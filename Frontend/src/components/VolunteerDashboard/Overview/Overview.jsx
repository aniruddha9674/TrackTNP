import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  AlertCircle,
  MapPin,
  Bell,
  ChevronRight,
  Globe,
  UserCheck,
} from "lucide-react";
import { useTheme } from '../../../Utils/context/ThemeContext';

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

const Badge = ({ children, variant = "default", className = "", theme, ...props }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors shadow-sm";

  const lightVariants = {
    default: "bg-gray-200 text-gray-800 border border-gray-300",
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-amber-600 text-white",
    info: "bg-blue-600 text-white",
  };

  const darkVariants = {
    default: "bg-gray-800 text-gray-300",
    success: "bg-green-900/30 text-green-400",
    error: "bg-red-900/30 text-red-400",
    warning: "bg-amber-900/30 text-amber-400",
    info: "bg-blue-900/30 text-blue-400",
  };

  const variants = theme === "dark" ? darkVariants : lightVariants;

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

const VolunteerOverview = () => {
  const {theme} = useTheme();
  const isDarkTheme = theme === "dark";

  const themeStyles = isDarkTheme
    ? {
        background: "bg-gradient-to-br from-slate-950 to-slate-900",
        cardBg: "bg-slate-900",
        cardBorder: "border-slate-700",
        cardShadow: "shadow-lg shadow-black/20",
        cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        textTertiary: "text-slate-500",
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
        progressBg: "bg-slate-800",
        progressFill: "bg-blue-500",
      }
    : {
        background: "bg-gradient-to-br from-slate-50 to-slate-100",
        cardBg: "bg-white",
        cardBorder: "border-slate-200",
        cardShadow: "shadow-md",
        cardHoverShadow: "hover:shadow-xl",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-600",
        textTertiary: "text-slate-400",
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
        progressBg: "bg-slate-200",
        progressFill: "bg-blue-600",
      };

  const [upcomingDrives] = useState([
    {
      id: 1,
      companyName: "Google",
      role: "Software Engineer",
      driveDate: "2024-02-15",
      location: "Main Auditorium",
      mode: "Offline",
      status: "upcoming",
      totalRegistered: 245,
      myRole: "Registration Desk",
    },
    {
      id: 2,
      companyName: "Microsoft",
      role: "SDE-1",
      driveDate: "2024-01-28",
      location: "Building A, Room 301",
      mode: "Offline",
      status: "ongoing",
      totalRegistered: 312,
      myRole: "Student Coordination",
    },
    {
      id: 3,
      companyName: "Amazon",
      role: "Software Development Engineer",
      driveDate: "2024-02-20",
      location: "Online",
      mode: "Online",
      status: "upcoming",
      totalRegistered: 289,
      myRole: "Technical Support",
    },
  ]);

  const [recentNotifications] = useState([
    {
      id: 1,
      title: "New Drive Assignment",
      message: "You've been assigned to the Google campus drive",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Volunteer Meeting",
      message: "Monthly coordination meeting tomorrow at 10 AM",
      time: "5 hours ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Task Completed",
      message: "Microsoft drive attendance successfully submitted",
      time: "1 day ago",
      isRead: true,
    },
  ]);

  const [volunteerHistory] = useState([
    {
      id: 1,
      companyName: "Tech Corp",
      driveDate: "2024-01-10",
      studentsAttended: 180,
    },
    {
      id: 2,
      companyName: "Innovation Labs",
      driveDate: "2023-12-15",
      studentsAttended: 220,
    },
    {
      id: 3,
      companyName: "DataSoft Inc",
      driveDate: "2023-11-20",
      studentsAttended: 195,
    },
  ]);

  const stats = useMemo(() => {
    return {
      totalDrives: upcomingDrives.length,
      upcomingCount: upcomingDrives.filter((d) => d.status === "upcoming").length,
      completedDrives: volunteerHistory.length,
      totalStudentsHelped: volunteerHistory.reduce((acc, d) => acc + d.studentsAttended, 0),
      unreadNotifications: recentNotifications.filter((n) => !n.isRead).length,
    };
  }, [upcomingDrives, volunteerHistory, recentNotifications]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "ongoing":
        return "warning";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}>
              Welcome Back, Volunteer! 👋
            </h1>
            <p className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}>
              Here's an overview of your volunteering activities
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Drives */}
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Assigned Drives
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.totalDrives}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}
                >
                  <Building2 className={`h-6 w-6 ${themeStyles.statIcon1Text}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Drives */}
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Upcoming
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.upcomingCount}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}
                >
                  <Calendar className={`h-6 w-6 ${themeStyles.statIcon2Text}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Completed Drives */}
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Completed
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.completedDrives}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon3Bg} rounded-xl flex items-center justify-center`}
                >
                  <CheckCircle2 className={`h-6 w-6 ${themeStyles.statIcon3Text}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Students Helped */}
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard4Gradient}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                  >
                    Students Helped
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.totalStudentsHelped}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon4Bg} rounded-xl flex items-center justify-center`}
                >
                  <Users className={`h-6 w-6 ${themeStyles.statIcon4Text}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Drives - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                    Your Upcoming Drives
                  </h2>
                  <button
                    className={`text-sm ${themeStyles.textSecondary} hover:${themeStyles.textPrimary} flex items-center gap-1 transition-colors`}
                  >
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {upcomingDrives.slice(0, 3).map((drive) => (
                    <div
                      key={drive.id}
                      className={`border ${themeStyles.cardBorder} rounded-xl p-5 ${themeStyles.cardHoverShadow} transition-all cursor-pointer`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <Building2 className={`h-6 w-6 ${themeStyles.statIcon1Text}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <h3 className={`font-bold ${themeStyles.textPrimary} truncate`}>
                                {drive.companyName}
                              </h3>
                              <p className={`text-sm ${themeStyles.textSecondary} truncate`}>
                                {drive.role}
                              </p>
                            </div>
                            <Badge variant={getStatusColor(drive.status)} theme={theme}>
                              {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-3">
                            <div className="flex items-center gap-2">
                              <Calendar className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                              <span className={themeStyles.textSecondary}>
                                {formatDate(drive.driveDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {drive.mode === "Online" ? (
                                <Globe className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                              ) : (
                                <MapPin className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                              )}
                              <span className={`${themeStyles.textSecondary} truncate`}>
                                {drive.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                              <span className={themeStyles.textSecondary}>
                                {drive.totalRegistered} students
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserCheck className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                              <span className={themeStyles.textSecondary}>{drive.myRole}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications - Takes 1 column */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                    Notifications
                  </h2>
                  {stats.unreadNotifications > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {stats.unreadNotifications}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${themeStyles.cardBorder} ${
                        !notification.isRead
                          ? "bg-blue-50 dark:bg-blue-900/10"
                          : "bg-transparent"
                      } cursor-pointer hover:shadow-md transition-shadow`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`p-2 rounded-lg h-fit ${
                            !notification.isRead
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <Bell
                            className={`w-4 h-4 ${
                              !notification.isRead
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-semibold ${themeStyles.textPrimary} mb-1 ${
                              !notification.isRead ? "font-bold" : ""
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <p className={`text-xs ${themeStyles.textSecondary} mb-2`}>
                            {notification.message}
                          </p>
                          <span className={`text-xs ${themeStyles.textTertiary}`}>
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full mt-4 text-sm ${themeStyles.textSecondary} hover:${themeStyles.textPrimary} flex items-center justify-center gap-1 transition-colors`}
                >
                  View All Notifications
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>Recent Activity</h2>
              <button
                className={`text-sm ${themeStyles.textSecondary} hover:${themeStyles.textPrimary} flex items-center gap-1 transition-colors`}
              >
                View History
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {volunteerHistory.map((drive) => (
                <div
                  key={drive.id}
                  className={`border ${themeStyles.cardBorder} rounded-xl p-5 ${themeStyles.cardHoverShadow} transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${themeStyles.statIcon3Bg} rounded-lg`}>
                      <CheckCircle2 className={`h-5 w-5 ${themeStyles.statIcon3Text}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${themeStyles.textPrimary}`}>
                        {drive.companyName}
                      </h3>
                      <p className={`text-xs ${themeStyles.textSecondary}`}>
                        {formatDate(drive.driveDate)}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${themeStyles.textSecondary}`}>
                    <Users className="h-4 w-4" />
                    <span>{drive.studentsAttended} students attended</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerOverview;
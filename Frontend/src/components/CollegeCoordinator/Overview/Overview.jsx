import React, { useState, useMemo } from "react";
import {
    Building2,
    Users,
    FileText,
    TrendingUp,
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    Award,
    Briefcase,
    GraduationCap,
    MapPin,
    Download,
    Eye,
    ArrowRight,
    UserCheck,
    XCircle,
    Mail,
    Phone,
    Globe,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

const CoordinatorOverview = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkTheme = theme === "dark";

    // Theme styles
    const getLightTheme = () => ({
        background: "bg-gradient-to-br from-slate-50 to-slate-100",
        cardBg: "bg-white",
        cardBorder: "border-slate-200",
        cardShadow: "shadow-md",
        cardHoverShadow: "hover:shadow-xl",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-600",
        textTertiary: "text-slate-400",
        buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: "bg-slate-200 hover:bg-slate-300 text-slate-700",
        divider: "border-slate-200",
        iconBlue: "text-blue-600",
        iconGreen: "text-green-600",
        iconPurple: "text-purple-600",
        iconAmber: "text-amber-600",
        iconRed: "text-red-600",
        badgeUpcoming: "bg-blue-100 text-blue-700 border-blue-200",
        badgeOngoing: "bg-green-100 text-green-700 border-green-200",
        badgeCompleted: "bg-gray-100 text-gray-700 border-gray-200",
        badgeSelected: "bg-green-100 text-green-700 border-green-200",
        badgeRejected: "bg-red-100 text-red-700 border-red-200",
        badgeWaiting: "bg-amber-100 text-amber-700 border-amber-200",
        activityBg: "bg-slate-50",
    });

    const getDarkTheme = () => ({
        background: "bg-gradient-to-br from-slate-950 to-slate-900",
        cardBg: "bg-slate-900/50",
        cardBorder: "border-slate-800",
        cardShadow: "shadow-lg shadow-black/20",
        cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40 hover:border-slate-700",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        textTertiary: "text-slate-500",
        buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
        divider: "border-slate-800",
        iconBlue: "text-blue-400",
        iconGreen: "text-green-400",
        iconPurple: "text-purple-400",
        iconAmber: "text-amber-400",
        iconRed: "text-red-400",
        iconCyan: "text-cyan-400",
        badgeUpcoming: "bg-blue-900/30 text-blue-400 border-blue-900/20",
        badgeOngoing: "bg-green-900/30 text-green-400 border-green-900/20",
        badgeCompleted: "bg-gray-700 text-gray-400 border-gray-600",
        badgeSelected: "bg-green-900/30 text-green-400 border-green-900/20",
        badgeRejected: "bg-red-900/30 text-red-400 border-red-900/20",
        badgeWaiting: "bg-amber-900/30 text-amber-400 border-amber-900/20",
        activityBg: "bg-slate-800/50",
        contentCardBg: "bg-slate-900/70",
        contentCardHover: "hover:bg-slate-800/70",
    });

    const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

    // Sample data
    const overviewStats = {
        totalDrives: 12,
        upcomingDrives: 5,
        ongoingDrives: 2,
        totalStudents: 487,
        eligibleStudents: 342,
        totalPlacements: 156,
    };

    const recentDrives = [
        {
            id: 1,
            company: "Tech Corp Solutions",
            role: "Software Engineer",
            date: "2024-12-05",
            status: "upcoming",
            registered: 145,
            package: "12",
        },
        {
            id: 2,
            company: "Innovation Labs",
            role: "Full Stack Developer",
            date: "2024-11-28",
            status: "ongoing",
            registered: 89,
            package: "15",
        },
        {
            id: 3,
            company: "Digital Solutions Inc",
            role: "Data Analyst",
            date: "2024-11-15",
            status: "completed",
            registered: 203,
            package: "10",
        },
    ];

    const recentResults = [
        {
            id: 1,
            student: "Rahul Sharma",
            company: "TCS",
            result: "Selected",
            package: "7.5",
        },
        {
            id: 2,
            student: "Priya Patel",
            company: "TCS",
            result: "Selected",
            package: "7.5",
        },
        {
            id: 3,
            student: "Amit Kumar",
            company: "TCS",
            result: "Rejected",
            package: "-",
        },
        {
            id: 4,
            student: "Vikram Singh",
            company: "Infosys",
            result: "Selected",
            package: "8.0",
        },
    ];

    const pendingTasks = [
        {
            id: 1,
            task: "Review student eligibility for Tech Corp drive",
            priority: "high",
            dueDate: "2024-12-03",
        },
        {
            id: 2,
            task: "Download attendance sheet for Innovation Labs",
            priority: "medium",
            dueDate: "2024-11-29",
        },
        {
            id: 3,
            task: "Verify offer letters for Digital Solutions",
            priority: "low",
            dueDate: "2024-12-10",
        },
    ];

    const placementStats = {
        byDepartment: [
            { dept: "Computer Science", count: 67, percentage: 43 },
            { dept: "Information Technology", count: 45, percentage: 29 },
            { dept: "Electronics", count: 28, percentage: 18 },
            { dept: "Mechanical", count: 16, percentage: 10 },
        ],
        topRecruiters: [
            { company: "TCS", placements: 34 },
            { company: "Infosys", placements: 28 },
            { company: "Wipro", placements: 22 },
            { company: "Cognizant", placements: 18 },
        ],
    };

    const getStatusBadge = (status) => {
        const styles = {
            upcoming: { bg: themeStyles.badgeUpcoming, icon: Clock },
            ongoing: { bg: themeStyles.badgeOngoing, icon: AlertCircle },
            completed: { bg: themeStyles.badgeCompleted, icon: CheckCircle2 },
        };
        const { bg, icon: Icon } = styles[status];
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${bg}`}>
                <Icon size={10} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getResultBadge = (result) => {
        const styles = {
            Selected: { bg: themeStyles.badgeSelected, icon: CheckCircle2 },
            Rejected: { bg: themeStyles.badgeRejected, icon: XCircle },
            Waiting: { bg: themeStyles.badgeWaiting, icon: Clock },
        };
        const { bg, icon: Icon } = styles[result];
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${bg}`}>
                <Icon size={10} />
                {result}
            </span>
        );
    };

    const getPriorityColor = (priority) => {
        if (isDarkTheme) {
            switch (priority) {
                case "high":
                    return "bg-red-900/30 text-red-400 border-red-900/20";
                case "medium":
                    return "bg-amber-900/30 text-amber-400 border-amber-900/20";
                case "low":
                    return "bg-blue-900/30 text-blue-400 border-blue-900/20";
                default:
                    return "bg-gray-700 text-gray-400 border-gray-600";
            }
        } else {
            switch (priority) {
                case "high":
                    return "bg-red-100 text-red-700 border-red-200";
                case "medium":
                    return "bg-amber-100 text-amber-700 border-amber-200";
                case "low":
                    return "bg-blue-100 text-blue-700 border-blue-200";
                default:
                    return "bg-gray-100 text-gray-700 border-gray-200";
            }
        }
    };

    // Dark theme stat card configurations
    const darkThemeStatCards = [
        {
            icon: Building2,
            label: "Total Drives",
            value: overviewStats.totalDrives,
            sublabel: `${overviewStats.upcomingDrives} upcoming`,
            bgGradient: "from-blue-950/40 to-slate-900/40",
            borderColor: "border-blue-900/30",
            iconBg: "bg-white",
            iconColor: "text-blue-600",
        },
        {
            icon: Users,
            label: "Total Students",
            value: overviewStats.totalStudents,
            sublabel: `${overviewStats.eligibleStudents} eligible`,
            bgGradient: "from-green-950/40 to-slate-900/40",
            borderColor: "border-green-900/30",
            iconBg: "bg-white",
            iconColor: "text-green-600",
        },
        {
            icon: Award,
            label: "Total Placements",
            value: overviewStats.totalPlacements,
            sublabel: `${((overviewStats.totalPlacements / overviewStats.totalStudents) * 100).toFixed(1)}% placement rate`,
            bgGradient: "from-purple-950/40 to-slate-900/40",
            borderColor: "border-purple-900/30",
            iconBg: "bg-white",
            iconColor: "text-purple-600",
        },
        {
            icon: Clock,
            label: "Upcoming Drives",
            value: overviewStats.upcomingDrives,
            sublabel: null,
            bgGradient: "from-amber-950/40 to-slate-900/40",
            borderColor: "border-amber-900/30",
            iconBg: "bg-white",
            iconColor: "text-amber-600",
        },
        {
            icon: AlertCircle,
            label: "Ongoing Drives",
            value: overviewStats.ongoingDrives,
            sublabel: null,
            bgGradient: "from-pink-950/40 to-slate-900/40",
            borderColor: "border-pink-900/30",
            iconBg: "bg-white",
            iconColor: "text-pink-600",
        },
        {
            icon: UserCheck,
            label: "Eligible Students",
            value: overviewStats.eligibleStudents,
            sublabel: null,
            bgGradient: "from-cyan-950/40 to-slate-900/40",
            borderColor: "border-cyan-900/30",
            iconBg: "bg-white",
            iconColor: "text-cyan-600",
        },
    ];

    // Light theme stat card configurations
    const lightThemeStatCards = [
        {
            icon: Building2,
            label: "Total Drives",
            value: overviewStats.totalDrives,
            sublabel: `${overviewStats.upcomingDrives} upcoming`,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            icon: Users,
            label: "Total Students",
            value: overviewStats.totalStudents,
            sublabel: `${overviewStats.eligibleStudents} eligible`,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            icon: Award,
            label: "Total Placements",
            value: overviewStats.totalPlacements,
            sublabel: `${((overviewStats.totalPlacements / overviewStats.totalStudents) * 100).toFixed(1)}% placement rate`,
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            icon: Clock,
            label: "Upcoming Drives",
            value: overviewStats.upcomingDrives,
            sublabel: null,
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600",
        },
        {
            icon: AlertCircle,
            label: "Ongoing Drives",
            value: overviewStats.ongoingDrives,
            sublabel: null,
            bgColor: "bg-pink-50",
            iconColor: "text-pink-600",
        },
        {
            icon: UserCheck,
            label: "Eligible Students",
            value: overviewStats.eligibleStudents,
            sublabel: null,
            bgColor: "bg-cyan-50",
            iconColor: "text-cyan-600",
        },
    ];

    const statCards = isDarkTheme ? darkThemeStatCards : lightThemeStatCards;

    return (
        <div className={`min-h-screen ${themeStyles.background} p-6`}>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                            Overview Dashboard
                        </h1>
                        <p className={`mt-2 ${themeStyles.textSecondary}`}>
                            Welcome back! Here's what's happening with placements
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-sm ${themeStyles.textSecondary}`}>
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {statCards.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`${isDarkTheme ? `bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor}` : `${themeStyles.cardBg} border ${themeStyles.cardBorder}`} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300`}
                        >
                            <div className={`h-14 w-14 ${isDarkTheme ? stat.iconBg : stat.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                                <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
                            </div>
                            <p className={`text-sm font-medium ${themeStyles.textSecondary} mb-1`}>
                                {stat.label}
                            </p>
                            <h3 className={`text-2xl font-bold ${themeStyles.textPrimary} mb-1`}>
                                {stat.value}
                            </h3>
                            {stat.sublabel && (
                                <p className={`text-xs ${themeStyles.textTertiary}`}>
                                    {stat.sublabel}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Recent Drives & Pending Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Drives */}
                    <div className={`${isDarkTheme ? themeStyles.contentCardBg : themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl ${themeStyles.cardShadow} overflow-hidden transition-all duration-300 ${isDarkTheme ? 'hover:bg-slate-800/80 hover:border-slate-700' : ''}`}>
                        <div className={`p-6 border-b ${themeStyles.divider}`}>
                            <div className="flex items-center justify-between">
                                <h2 className={`text-lg font-semibold ${themeStyles.textPrimary} flex items-center gap-2`}>
                                    <Calendar size={20} className={themeStyles.iconBlue} />
                                    Recent Drives
                                </h2>
                                <button className={`text-sm ${themeStyles.iconBlue} hover:underline font-medium`}>
                                    View All
                                </button>
                            </div>
                        </div>
                        <div className={`divide-y ${themeStyles.divider}`}>
                            {recentDrives.map((drive) => (
                                <div key={drive.id} className={`p-4 ${isDarkTheme ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className={`font-semibold ${themeStyles.textPrimary}`}>
                                                {drive.company}
                                            </h3>
                                            <p className={`text-sm ${themeStyles.textSecondary}`}>
                                                {drive.role}
                                            </p>
                                        </div>
                                        {getStatusBadge(drive.status)}
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-4 text-xs">
                                            <span className={`flex items-center gap-1 ${themeStyles.textTertiary}`}>
                                                <Calendar size={12} />
                                                {new Date(drive.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                            <span className={`flex items-center gap-1 ${themeStyles.textTertiary}`}>
                                                <Users size={12} />
                                                {drive.registered} registered
                                            </span>
                                        </div>
                                        <span className={`text-xs font-semibold ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>
                                            ₹{drive.package} LPA
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Tasks */}
                    <div className={`${isDarkTheme ? themeStyles.contentCardBg : themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl ${themeStyles.cardShadow} overflow-hidden transition-all duration-300 ${isDarkTheme ? 'hover:bg-slate-800/80 hover:border-slate-700' : ''}`}>
                        <div className={`p-6 border-b ${themeStyles.divider}`}>
                            <div className="flex items-center justify-between">
                                <h2 className={`text-lg font-semibold ${themeStyles.textPrimary} flex items-center gap-2`}>
                                    <CheckCircle2 size={20} className={isDarkTheme ? 'text-green-400' : 'text-green-600'} />
                                    Pending Tasks
                                </h2>
                                <span className={`text-sm ${themeStyles.textSecondary}`}>
                                    {pendingTasks.length} tasks
                                </span>
                            </div>
                        </div>
                        <div className={`divide-y ${themeStyles.divider}`}>
                            {pendingTasks.map((task) => (
                                <div key={task.id} className={`p-4 ${isDarkTheme ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className={`font-medium ${themeStyles.textPrimary}`}>
                                                {task.task}
                                            </p>
                                            <p className={`text-xs ${themeStyles.textTertiary} mt-1 flex items-center gap-1`}>
                                                <Clock size={10} />
                                                Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Results & Placement Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Results */}
                    <div className={`${isDarkTheme ? themeStyles.contentCardBg : themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl ${themeStyles.cardShadow} overflow-hidden transition-all duration-300 ${isDarkTheme ? 'hover:bg-slate-800/80 hover:border-slate-700' : ''}`}>
                        <div className={`p-6 border-b ${themeStyles.divider}`}>
                            <div className="flex items-center justify-between">
                                <h2 className={`text-lg font-semibold ${themeStyles.textPrimary} flex items-center gap-2`}>
                                    <FileText size={20} className={themeStyles.iconPurple} />
                                    Recent Results
                                </h2>
                                <button className={`text-sm ${themeStyles.iconBlue} hover:underline font-medium`}>
                                    View All
                                </button>
                            </div>
                        </div>
                        <div className={`divide-y ${themeStyles.divider}`}>
                            {recentResults.map((result) => (
                                <div key={result.id} className={`p-4 ${isDarkTheme ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {result.student.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className={`font-semibold ${themeStyles.textPrimary} text-sm`}>
                                                    {result.student}
                                                </h3>
                                                <p className={`text-xs ${themeStyles.textSecondary}`}>
                                                    {result.company}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {getResultBadge(result.result)}
                                            {result.package !== "-" && (
                                                <p className={`text-xs font-semibold ${isDarkTheme ? 'text-green-400' : 'text-green-600'} mt-1`}>
                                                    ₹{result.package} LPA
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placement by Department */}
                    <div className={`${isDarkTheme ? themeStyles.contentCardBg : themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl ${themeStyles.cardShadow} overflow-hidden transition-all duration-300 ${isDarkTheme ? 'hover:bg-slate-800/80 hover:border-slate-700' : ''}`}>
                        <div className={`p-6 border-b ${themeStyles.divider}`}>
                            <div className="flex items-center justify-between">
                                <h2 className={`text-lg font-semibold ${themeStyles.textPrimary} flex items-center gap-2`}>
                                    <GraduationCap size={20} className={themeStyles.iconAmber} />
                                    Placement by Department
                                </h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {placementStats.byDepartment.map((dept, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-sm font-medium ${themeStyles.textPrimary}`}>
                                            {dept.dept}
                                        </span>
                                        <span className={`text-sm font-bold ${themeStyles.textPrimary}`}>
                                            {dept.count}
                                        </span>
                                    </div>
                                    <div className={`w-full ${isDarkTheme ? 'bg-slate-800' : 'bg-slate-200'} rounded-full h-2 overflow-hidden`}>
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                                            style={{ width: `${dept.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Recruiters */}
                <div className={`${isDarkTheme ? themeStyles.contentCardBg : themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl ${themeStyles.cardShadow} overflow-hidden transition-all duration-300 ${isDarkTheme ? 'hover:bg-slate-800/80 hover:border-slate-700' : ''}`}>
                    <div className={`p-6 border-b ${themeStyles.divider}`}>
                        <h2 className={`text-lg font-semibold ${themeStyles.textPrimary} flex items-center gap-2`}>
                            <TrendingUp size={20} className={isDarkTheme ? 'text-green-400' : 'text-green-600'} />
                            Top Recruiters
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {placementStats.topRecruiters.map((recruiter, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-lg border ${themeStyles.cardBorder} ${themeStyles.activityBg} ${isDarkTheme ? 'hover:bg-slate-800/70' : 'hover:shadow-md'} transition-all`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`h-12 w-12 ${isDarkTheme ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                                            <Building2 size={24} className={themeStyles.iconBlue} />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${themeStyles.textPrimary}`}>
                                                {recruiter.company}
                                            </h3>
                                            <p className={`text-sm ${themeStyles.textSecondary}`}>
                                                {recruiter.placements} placements
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Building2, label: "View Drives", color: "blue" },
                        { icon: Users, label: "Student List", color: "green" },
                        { icon: FileText, label: "View Results", color: "purple" },
                        { icon: Download, label: "Download Reports", color: "amber" },
                    ].map((action, idx) => (
                        <button
                            key={idx}
                            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all hover:scale-105 flex items-center justify-between group`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 bg-${action.color}-100 rounded-lg flex items-center justify-center`}>
                                    <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                                </div>
                                <span className={`font-semibold ${themeStyles.textPrimary}`}>
                                    {action.label}
                                </span>
                            </div>
                            <ArrowRight className={`h-5 w-5 ${themeStyles.textTertiary} group-hover:translate-x-1 transition-transform`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoordinatorOverview;
import React, { useState, useMemo } from "react";
import {
    Building2,
    Users,
    CheckCircle2,
    Calendar,
    IndianRupee,
    Search,
    Filter,
    Clock,
    UserCheck,
    MapPin,
    TrendingUp,
    Moon,
    Sun,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const Badge = ({ children, variant = "default", className = "", ...props }) => {
    const baseStyles =
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors shadow-sm";

    const variants = {
        default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
};

const CoordinatorCompanyDrives = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const { theme } = useTheme();

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
        inputText: "text-slate-900",
        inputPlaceholder: "placeholder:text-slate-400",
        emptyStateBg: "bg-slate-100",
        emptyStateIcon: "text-slate-400",
        statCard1Gradient: "from-white to-blue-50",
        statCard2Gradient: "from-white to-green-50",
        statCard3Gradient: "from-white to-purple-50",
        statIcon1Bg: "bg-blue-100",
        statIcon1Text: "text-blue-600",
        statIcon2Bg: "bg-green-100",
        statIcon2Text: "text-green-600",
        statIcon3Bg: "bg-purple-100",
        statIcon3Text: "text-purple-600",
        buttonBg: "bg-white",
        buttonBorder: "border-slate-300",
        companyCardBg: "bg-white",
        companyCardBorder: "border-gray-100",
        companyCardHover: "hover:border-gray-200",
        iconGradient: "from-blue-50 to-blue-100",
        statsBg: "bg-slate-50",
        statsBorder: "border-slate-200",
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
        inputText: "text-slate-50",
        inputPlaceholder: "placeholder:text-slate-500",
        emptyStateBg: "bg-slate-800",
        emptyStateIcon: "text-slate-500",
        statCard1Gradient: "from-slate-800 to-blue-900/30",
        statCard2Gradient: "from-slate-800 to-green-900/30",
        statCard3Gradient: "from-slate-800 to-purple-900/30",
        statIcon1Bg: "bg-blue-900/30",
        statIcon1Text: "text-blue-400",
        statIcon2Bg: "bg-green-900/30",
        statIcon2Text: "text-green-400",
        statIcon3Bg: "bg-purple-900/30",
        statIcon3Text: "text-purple-400",
        buttonBg: "bg-slate-700",
        buttonBorder: "border-slate-600",
        companyCardBg: "bg-slate-800",
        companyCardBorder: "border-slate-700",
        companyCardHover: "hover:border-slate-600",
        iconGradient: "from-blue-900/30 to-blue-800/30",
        statsBg: "bg-slate-800",
        statsBorder: "border-slate-700",
    });

    const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

    const [companyDrives] = useState([
        {
            id: 1,
            companyName: "Google",
            package: "45 LPA",
            role: "Software Engineer",
            driveDate: "2024-02-15",
            deadline: "2024-02-10",
            status: "upcoming",
            location: "Main Auditorium",
            totalApplicants: 245,
            eligible: 198,
            shortlisted: 45,
            selected: 0,
        },
        {
            id: 2,
            companyName: "Microsoft",
            package: "42 LPA",
            role: "SDE-1",
            driveDate: "2024-01-28",
            deadline: "2024-01-20",
            status: "ongoing",
            location: "Building A, Room 301",
            totalApplicants: 312,
            eligible: 267,
            shortlisted: 68,
            selected: 12,
        },
        {
            id: 3,
            companyName: "Amazon",
            package: "38 LPA",
            role: "Software Development Engineer",
            driveDate: "2024-01-10",
            deadline: "2024-01-05",
            status: "completed",
            location: "Engineering Block",
            totalApplicants: 289,
            eligible: 234,
            shortlisted: 54,
            selected: 18,
        },
        {
            id: 4,
            companyName: "Goldman Sachs",
            package: "35 LPA",
            role: "Analyst",
            driveDate: "2024-03-05",
            deadline: "2024-02-28",
            status: "upcoming",
            location: "Seminar Hall",
            totalApplicants: 178,
            eligible: 142,
            shortlisted: 0,
            selected: 0,
        },
        {
            id: 5,
            companyName: "Adobe",
            package: "40 LPA",
            role: "Software Engineer",
            driveDate: "2024-01-15",
            deadline: "2024-01-08",
            status: "completed",
            location: "Computer Lab 1",
            totalApplicants: 198,
            eligible: 176,
            shortlisted: 42,
            selected: 15,
        },
        {
            id: 6,
            companyName: "Flipkart",
            package: "28 LPA",
            role: "SDE-1",
            driveDate: "2024-02-20",
            deadline: "2024-02-15",
            status: "upcoming",
            location: "Innovation Center",
            totalApplicants: 267,
            eligible: 223,
            shortlisted: 0,
            selected: 0,
        },
        {
            id: 7,
            companyName: "TCS",
            package: "7 LPA",
            role: "Assistant System Engineer",
            driveDate: "2023-12-20",
            deadline: "2023-12-15",
            status: "completed",
            location: "Main Auditorium",
            totalApplicants: 456,
            eligible: 412,
            shortlisted: 187,
            selected: 95,
        },
        {
            id: 8,
            companyName: "Infosys",
            package: "6.5 LPA",
            role: "Systems Engineer",
            driveDate: "2024-01-05",
            deadline: "2023-12-28",
            status: "completed",
            location: "Building B, Hall 2",
            totalApplicants: 389,
            eligible: 367,
            shortlisted: 156,
            selected: 82,
        },
    ]);

    const stats = useMemo(() => {
        const totalDrives = companyDrives.length;
        const upcoming = companyDrives.filter((d) => d.status === "upcoming").length;
        const ongoing = companyDrives.filter((d) => d.status === "ongoing").length;
        const completed = companyDrives.filter((d) => d.status === "completed").length;
        const totalApplicants = companyDrives.reduce((sum, d) => sum + d.totalApplicants, 0);
        const totalSelected = companyDrives.reduce((sum, d) => sum + d.selected, 0);

        return { totalDrives, upcoming, ongoing, completed, totalApplicants, totalSelected };
    }, [companyDrives]);

    const filteredDrives = useMemo(() => {
        return companyDrives.filter((drive) => {
            const matchesSearch =
                drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                drive.role.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesFilter = true;
            if (filterStatus !== "all") {
                matchesFilter = drive.status === filterStatus;
            }

            return matchesSearch && matchesFilter;
        });
    }, [companyDrives, searchQuery, filterStatus]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
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

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className={`min-h-screen ${themeStyles.background}`}>
            <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}>
                            Company Placement Drives
                        </h1>
                        <p className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}>
                            Manage and monitor campus recruitment activities
                        </p>
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    <div className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}>
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}>
                                        Total Drives
                                    </p>
                                    <h3 className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}>
                                        {stats.totalDrives}
                                    </h3>
                                </div>
                                <div className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}>
                                    <Building2 className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient} transition-all`}>
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}>
                                        Total Applicants
                                    </p>
                                    <h3 className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}>
                                        {stats.totalApplicants}
                                    </h3>
                                </div>
                                <div className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}>
                                    <Users className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon2Text}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient} transition-all col-span-2 lg:col-span-1`}>
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}>
                                        Total Selected
                                    </p>
                                    <h3 className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}>
                                        {stats.totalSelected}
                                    </h3>
                                </div>
                                <div className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon3Bg} rounded-xl flex items-center justify-center`}>
                                    <CheckCircle2 className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon3Text}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}>
                    <div className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} h-4 w-4`} />
                                <input
                                    type="text"
                                    placeholder="Search companies or roles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="sm:hidden">
                                    <button
                                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                                        className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} flex items-center gap-2`}
                                    >
                                        <Filter className="h-4 w-4" />
                                        <span>Filter</span>
                                    </button>
                                </div>
                                <div className="hidden sm:block">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                                    >
                                        <option value="all">All Drives</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {showMobileFilters && (
                            <div className="mt-4 sm:hidden">
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setFilterStatus("all")}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium ${filterStatus === "all"
                                                ? "bg-blue-600 text-white"
                                                : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus("upcoming")}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium ${filterStatus === "upcoming"
                                                ? "bg-blue-600 text-white"
                                                : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                                            }`}
                                    >
                                        Upcoming
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus("ongoing")}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium ${filterStatus === "ongoing"
                                                ? "bg-blue-600 text-white"
                                                : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                                            }`}
                                    >
                                        Ongoing
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus("completed")}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium ${filterStatus === "completed"
                                                ? "bg-blue-600 text-white"
                                                : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                                            }`}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Company Drives List */}
                <div className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}>
                    <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary}`}>
                                Campus Drives
                            </h2>
                            <span className={`text-sm ${themeStyles.textSecondary}`}>
                                {filteredDrives.length} drives found
                            </span>
                        </div>

                        <div className="space-y-4">
                            {filteredDrives.map((drive) => (
                                <div
                                    key={drive.id}
                                    className={`border ${themeStyles.companyCardBorder} rounded-2xl p-4 sm:p-6 ${themeStyles.cardHoverShadow} transition-all duration-200 ${themeStyles.companyCardBg} ${themeStyles.companyCardHover}`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3 sm:gap-4 mb-3">
                                                <div className={`h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br ${themeStyles.iconGradient} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                                                    <Building2 className={`h-5 w-5 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} truncate`}>
                                                        {drive.companyName}
                                                    </h3>
                                                    <p className={`${themeStyles.textSecondary} truncate`}>{drive.role}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <Badge variant={getStatusColor(drive.status)} className="shadow-sm text-xs">
                                                    {getStatusText(drive.status)}
                                                </Badge>
                                                {drive.status === "completed" && drive.selected > 0 && (
                                                    <Badge variant="success" className="shadow-sm text-xs">
                                                        {drive.selected} Selected
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 ${themeStyles.statIcon2Bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <IndianRupee className={`h-4 w-4 ${themeStyles.statIcon2Text}`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className={`${themeStyles.textSecondary} text-xs font-semibold uppercase tracking-wide block`}>
                                                            Package
                                                        </span>
                                                        <p className={`font-bold ${themeStyles.textPrimary} text-base sm:text-lg truncate`}>
                                                            {drive.package}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 ${themeStyles.statIcon1Bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <Calendar className={`h-4 w-4 ${themeStyles.statIcon1Text}`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className={`${themeStyles.textSecondary} text-xs font-semibold uppercase tracking-wide block`}>
                                                            Drive Date
                                                        </span>
                                                        <p className={`font-semibold ${themeStyles.textPrimary} truncate`}>
                                                            {formatDate(drive.driveDate)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 ${themeStyles.statIcon3Bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <MapPin className={`h-4 w-4 ${themeStyles.statIcon3Text}`} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className={`${themeStyles.textSecondary} text-xs font-semibold uppercase tracking-wide block`}>
                                                            Location
                                                        </span>
                                                        <p className={`font-semibold ${themeStyles.textPrimary} truncate`}>
                                                            {drive.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Statistics Panel */}
                                        <div className={`lg:ml-6 ${themeStyles.statsBg} rounded-xl p-4 lg:min-w-[280px] border ${themeStyles.statsBorder}`}>
                                            <h4 className={`text-sm font-bold ${themeStyles.textPrimary} mb-3`}>
                                                Application Statistics
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Users className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                                                        <span className={`text-sm ${themeStyles.textSecondary}`}>
                                                            Total Applicants
                                                        </span>
                                                    </div>
                                                    <span className={`font-bold ${themeStyles.textPrimary}`}>
                                                        {drive.totalApplicants}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className={`h-4 w-4 ${themeStyles.statIcon2Text}`} />
                                                        <span className={`text-sm ${themeStyles.textSecondary}`}>Eligible</span>
                                                    </div>
                                                    <span className={`font-bold ${themeStyles.statIcon2Text}`}>
                                                        {drive.eligible}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <UserCheck className={`h-4 w-4 ${themeStyles.statIcon1Text}`} />
                                                        <span className={`text-sm ${themeStyles.textSecondary}`}>
                                                            Shortlisted
                                                        </span>
                                                    </div>
                                                    <span className={`font-bold ${themeStyles.statIcon1Text}`}>
                                                        {drive.shortlisted}
                                                    </span>
                                                </div>
                                                {drive.status === "completed" && (
                                                    <div className={`flex items-center justify-between pt-2 border-t ${themeStyles.statsBorder}`}>
                                                        <div className="flex items-center gap-2">
                                                            <TrendingUp className={`h-4 w-4 ${themeStyles.statIcon3Text}`} />
                                                            <span className={`text-sm font-semibold ${themeStyles.textPrimary}`}>
                                                                Selected
                                                            </span>
                                                        </div>
                                                        <span className={`font-bold ${themeStyles.statIcon3Text} text-lg`}>
                                                            {drive.selected}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredDrives.length === 0 && (
                            <div className={`text-center py-12 ${themeStyles.emptyStateBg} rounded-2xl`}>
                                <Search className={`h-12 w-12 ${themeStyles.emptyStateIcon} mx-auto mb-4`} />
                                <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}>
                                    No drives found
                                </h3>
                                <p className={themeStyles.textSecondary}>
                                    Try adjusting your search or filter criteria
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoordinatorCompanyDrives;
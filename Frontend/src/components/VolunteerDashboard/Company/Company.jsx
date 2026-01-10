import React, { useState, useMemo } from "react";
import {
    Building2,
    Users,
    CheckCircle2,
    Calendar,
    Download,
    Search,
    Filter,
    MapPin,
    UserCheck,
    Clock,
    AlertCircle,
    Mail,
    Phone,
    Hash,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

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

const VolunteerDashboard = () => {
    const {theme} = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDrive, setSelectedDrive] = useState(null);
    const [attendanceRecords, setAttendanceRecords] = useState({});

    // Theme Functions
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
        buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: "bg-slate-200 hover:bg-slate-300 text-slate-700",
        statCard1Gradient: "from-white to-blue-50",
        statCard2Gradient: "from-white to-green-50",
        statIcon1Bg: "bg-blue-100",
        statIcon1Text: "text-blue-600",
        statIcon2Bg: "bg-green-100",
        statIcon2Text: "text-green-600",
        tableBorder: "border-slate-200",
        tableHeaderBg: "bg-slate-50",
        tableRowHover: "hover:bg-slate-50",
    });

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
        buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
        statCard1Gradient: "from-slate-800 to-blue-900/30",
        statCard2Gradient: "from-slate-800 to-green-900/30",
        statIcon1Bg: "bg-blue-900/30",
        statIcon1Text: "text-blue-400",
        statIcon2Bg: "bg-green-900/30",
        statIcon2Text: "text-green-400",
        tableBorder: "border-slate-700",
        tableHeaderBg: "bg-slate-800",
        tableRowHover: "hover:bg-slate-800/50",
    });

    const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

    // Mock data for assigned drives
    const [assignedDrives] = useState([
        {
            id: 1,
            companyName: "Google",
            role: "Software Engineer",
            driveDate: "2024-02-15",
            location: "Main Auditorium",
            status: "upcoming",
            totalRegistered: 245,
        },
        {
            id: 2,
            companyName: "Microsoft",
            role: "SDE-1",
            driveDate: "2024-01-28",
            location: "Building A, Room 301",
            status: "ongoing",
            totalRegistered: 312,
        },
        {
            id: 3,
            companyName: "Amazon",
            role: "Software Development Engineer",
            driveDate: "2024-02-20",
            location: "Engineering Block",
            status: "upcoming",
            totalRegistered: 289,
        },
    ]);

    // Mock student data
    const [students] = useState([
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@college.edu",
            phone: "+91 98765 43210",
            driveId: 1,
            registeredDate: "2024-01-20",
        },
        {
            id: 2,
            name: "Priya Patel",
            email: "priya.patel@college.edu",
            phone: "+91 98765 43211",
            driveId: 1,
            registeredDate: "2024-01-21",
        },
        {
            id: 3,
            name: "Amit Kumar",
            email: "amit.kumar@college.edu",
            phone: "+91 98765 43212",
            driveId: 1,
            registeredDate: "2024-01-22",
        },
        {
            id: 4,
            name: "Sneha Reddy",
            email: "sneha.reddy@college.edu",
            phone: "+91 98765 43213",
            driveId: 1,
            registeredDate: "2024-01-23",
        },
        {
            id: 5,
            name: "Vikram Singh",
            email: "vikram.singh@college.edu",
            phone: "+91 98765 43214",
            driveId: 1,
            registeredDate: "2024-01-24",
        },
        {
            id: 6,
            name: "Anjali Gupta",
            email: "anjali.gupta@college.edu",
            phone: "+91 98765 43215",
            driveId: 2,
            registeredDate: "2024-01-20",
        },
        {
            id: 7,
            name: "Rajesh Verma",
            email: "rajesh.verma@college.edu",
            phone: "+91 98765 43216",
            driveId: 2,
            registeredDate: "2024-01-21",
        },
        {
            id: 8,
            name: "Pooja Mehta",
            email: "pooja.mehta@college.edu",
            phone: "+91 98765 43217",
            driveId: 2,
            registeredDate: "2024-01-22",
        },
    ]);

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

    const handleAttendanceChange = (studentId, round) => {
        setAttendanceRecords((prev) => {
            const key = `${selectedDrive.id}-${studentId}`;
            const currentRounds = prev[key] || [];

            if (currentRounds.includes(round)) {
                return {
                    ...prev,
                    [key]: currentRounds.filter((r) => r !== round),
                };
            } else {
                return {
                    ...prev,
                    [key]: [...currentRounds, round].sort((a, b) => a - b),
                };
            }
        });
    };

    const getRoundsAttended = (studentId) => {
        if (!selectedDrive) return [];
        const key = `${selectedDrive.id}-${studentId}`;
        return attendanceRecords[key] || [];
    };

    const driveStudents = useMemo(() => {
        if (!selectedDrive) return [];
        return students.filter((s) => s.driveId === selectedDrive.id);
    }, [selectedDrive, students]);

    const filteredStudents = useMemo(() => {
        return driveStudents.filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.phone.includes(searchQuery);
            return matchesSearch;
        });
    }, [driveStudents, searchQuery]);

    const exportToCSV = () => {
        if (!selectedDrive) return;

        const headers = ["Sr No", "Name", "Email", "Phone Number", "Rounds Attended"];
        const rows = filteredStudents.map((student, index) => {
            const rounds = getRoundsAttended(student.id);
            return [
                index + 1,
                student.name,
                student.email,
                student.phone,
                rounds.length > 0 ? rounds.join(", ") : "None",
            ];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedDrive.companyName}_Attendance_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const stats = useMemo(() => {
        const totalDrives = assignedDrives.length;
        const upcomingDrives = assignedDrives.filter((d) => d.status === "upcoming").length;
        return { totalDrives, upcomingDrives };
    }, [assignedDrives]);

    return (
        <div className={`min-h-screen ${themeStyles.background}`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}>
                            Volunteer Dashboard
                        </h1>
                        <p className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}>
                            Manage attendance for assigned company drives
                        </p>
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient}`}>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}>
                                        Assigned Drives
                                    </p>
                                    <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                                        {stats.totalDrives}
                                    </h3>
                                </div>
                                <div className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}>
                                    <Building2 className={`h-6 w-6 ${themeStyles.statIcon1Text}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient}`}>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}>
                                        Upcoming Drives
                                    </p>
                                    <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                                        {stats.upcomingDrives}
                                    </h3>
                                </div>
                                <div className={`h-12 w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}>
                                    <Calendar className={`h-6 w-6 ${themeStyles.statIcon2Text}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Drives */}
                <div className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}>
                    <div className="p-6">
                        <h2 className={`text-xl font-bold ${themeStyles.textPrimary} mb-6`}>
                            Your Assigned Drives
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {assignedDrives.map((drive) => (
                                <div
                                    key={drive.id}
                                    onClick={() => setSelectedDrive(drive)}
                                    className={`border ${themeStyles.cardBorder} rounded-xl p-5 cursor-pointer transition-all ${selectedDrive?.id === drive.id
                                            ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                            : `${themeStyles.cardHoverShadow}`
                                        }`}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className={`h-10 w-10 ${themeStyles.statIcon1Bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <Building2 className={`h-5 w-5 ${themeStyles.statIcon1Text}`} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className={`font-bold ${themeStyles.textPrimary} truncate`}>
                                                {drive.companyName}
                                            </h3>
                                            <p className={`text-sm ${themeStyles.textSecondary} truncate`}>
                                                {drive.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                                            <span className={themeStyles.textSecondary}>
                                                {formatDate(drive.driveDate)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                                            <span className={`${themeStyles.textSecondary} truncate`}>
                                                {drive.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                                            <span className={themeStyles.textSecondary}>
                                                {drive.totalRegistered} registered
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <Badge variant={getStatusColor(drive.status)} theme={theme}>
                                            {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Attendance Management */}
                {selectedDrive && (
                    <div className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}>
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                                        Attendance - {selectedDrive.companyName}
                                    </h2>
                                    <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
                                        {filteredStudents.length} students registered
                                    </p>
                                </div>
                                <button
                                    onClick={exportToCSV}
                                    className={`px-4 py-2 rounded-xl ${themeStyles.buttonPrimary} flex items-center gap-2 transition-colors shadow-sm`}
                                >
                                    <Download className="h-4 w-4" />
                                    Export CSV
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} h-4 w-4`} />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email or phone..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                                    />
                                </div>
                            </div>

                            {/* Students Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className={themeStyles.tableHeaderBg}>
                                        <tr>
                                            <th className={`px-4 py-3 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                                                Sr No
                                            </th>
                                            <th className={`px-4 py-3 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                                                Name
                                            </th>
                                            <th className={`px-4 py-3 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider hidden sm:table-cell`}>
                                                Email
                                            </th>
                                            <th className={`px-4 py-3 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider hidden md:table-cell`}>
                                                Phone Number
                                            </th>
                                            <th className={`px-4 py-3 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                                                Rounds Attended
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${themeStyles.tableBorder}`}>
                                        {filteredStudents.map((student, index) => {
                                            const rounds = getRoundsAttended(student.id);
                                            return (
                                                <tr key={student.id} className={themeStyles.tableRowHover}>
                                                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${themeStyles.textPrimary} font-medium`}>
                                                        {index + 1}
                                                    </td>
                                                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${themeStyles.textPrimary} font-medium`}>
                                                        {student.name}
                                                    </td>
                                                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary} hidden sm:table-cell`}>
                                                        {student.email}
                                                    </td>
                                                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary} hidden md:table-cell`}>
                                                        {student.phone}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex gap-2">
                                                            {[1, 2, 3, 4].map((round) => (
                                                                <button
                                                                    key={round}
                                                                    onClick={() => handleAttendanceChange(student.id, round)}
                                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${rounds.includes(round)
                                                                            ? "bg-green-500 text-white shadow-md"
                                                                            : `${themeStyles.buttonSecondary}`
                                                                        }`}
                                                                >
                                                                    {round}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {filteredStudents.length === 0 && (
                                    <div className={`text-center py-12`}>
                                        <AlertCircle className={`h-12 w-12 ${themeStyles.textTertiary} mx-auto mb-4`} />
                                        <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}>
                                            No students found
                                        </h3>
                                        <p className={themeStyles.textSecondary}>
                                            Try adjusting your search criteria
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* No Drive Selected State */}
                {!selectedDrive && (
                    <div className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}>
                        <div className="p-12 text-center">
                            <UserCheck className={`h-16 w-16 ${themeStyles.textTertiary} mx-auto mb-4`} />
                            <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}>
                                Select a Drive
                            </h3>
                            <p className={themeStyles.textSecondary}>
                                Choose a company drive from above to manage student attendance
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteerDashboard;
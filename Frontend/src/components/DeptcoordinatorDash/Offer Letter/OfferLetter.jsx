import React, { useState, useMemo } from "react";
import {
    FileText,
    Download,
    Search,
    Filter,
    CheckCircle2,
    Users,
    Award,
    X,
    Eye,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Mock Theme Context (replace with actual import)


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

const CoordinatorOfferLetters = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterYear, setFilterYear] = useState("all");
    const [filterDivision, setFilterDivision] = useState("all");
    const [letterType, setLetterType] = useState("offer"); // "offer" or "final"
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const { theme } = useTheme();

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
        tableBg: "bg-white",
        tableHeaderBg: "bg-slate-50",
        tableRowHover: "hover:bg-slate-50",
        tableBorder: "border-slate-200",
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
        tableBg: "bg-slate-900",
        tableHeaderBg: "bg-slate-800",
        tableRowHover: "hover:bg-slate-800",
        tableBorder: "border-slate-700",
    });

    const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

    // Mock student data with offer letters
    const [students] = useState([
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            year: "Fourth Year",
            division: "A",
            offerLetters: [
                { id: 1, company: "Google", package: "45 LPA", uploadDate: "2024-01-15" },
                { id: 2, company: "Microsoft", package: "42 LPA", uploadDate: "2024-01-20" },
            ],
            finalOffer: { company: "Google", package: "45 LPA", uploadDate: "2024-01-25" },
        },
        {
            id: 2,
            name: "Priya Patel",
            email: "priya.patel@example.com",
            year: "Fourth Year",
            division: "B",
            offerLetters: [
                { id: 3, company: "Amazon", package: "38 LPA", uploadDate: "2024-01-18" },
            ],
            finalOffer: { company: "Amazon", package: "38 LPA", uploadDate: "2024-01-22" },
        },
        {
            id: 3,
            name: "Amit Kumar",
            email: "amit.kumar@example.com",
            year: "Third Year",
            division: "A",
            offerLetters: [
                { id: 4, company: "Adobe", package: "40 LPA", uploadDate: "2024-01-10" },
                { id: 5, company: "Goldman Sachs", package: "35 LPA", uploadDate: "2024-01-12" },
                { id: 6, company: "Flipkart", package: "28 LPA", uploadDate: "2024-01-14" },
            ],
            finalOffer: null,
        },
        {
            id: 4,
            name: "Sneha Desai",
            email: "sneha.desai@example.com",
            year: "Fourth Year",
            division: "A",
            offerLetters: [
                { id: 7, company: "TCS", package: "7 LPA", uploadDate: "2024-01-05" },
            ],
            finalOffer: { company: "TCS", package: "7 LPA", uploadDate: "2024-01-08" },
        },
        {
            id: 5,
            name: "Vikram Singh",
            email: "vikram.singh@example.com",
            year: "Third Year",
            division: "B",
            offerLetters: [
                { id: 8, company: "Infosys", package: "6.5 LPA", uploadDate: "2024-01-16" },
            ],
            finalOffer: null,
        },
        {
            id: 6,
            name: "Anjali Mehta",
            email: "anjali.mehta@example.com",
            year: "Fourth Year",
            division: "C",
            offerLetters: [
                { id: 9, company: "Wipro", package: "6 LPA", uploadDate: "2024-01-11" },
                { id: 10, company: "Capgemini", package: "7.5 LPA", uploadDate: "2024-01-13" },
            ],
            finalOffer: { company: "Capgemini", package: "7.5 LPA", uploadDate: "2024-01-17" },
        },
        {
            id: 7,
            name: "Rohit Verma",
            email: "rohit.verma@example.com",
            year: "Third Year",
            division: "A",
            offerLetters: [
                { id: 11, company: "Oracle", package: "32 LPA", uploadDate: "2024-01-19" },
            ],
            finalOffer: null,
        },
        {
            id: 8,
            name: "Kavya Reddy",
            email: "kavya.reddy@example.com",
            year: "Fourth Year",
            division: "B",
            offerLetters: [
                { id: 12, company: "PayPal", package: "48 LPA", uploadDate: "2024-01-21" },
            ],
            finalOffer: { company: "PayPal", package: "48 LPA", uploadDate: "2024-01-24" },
        },
    ]);

    const stats = useMemo(() => {
        const totalStudents = students.length;
        const withOffers = students.filter((s) => s.offerLetters.length > 0).length;
        const withFinalOffer = students.filter((s) => s.finalOffer !== null).length;
        const totalOffers = students.reduce((sum, s) => sum + s.offerLetters.length, 0);

        return { totalStudents, withOffers, withFinalOffer, totalOffers };
    }, [students]);

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesYear = filterYear === "all" || student.year === filterYear;
            const matchesDivision = filterDivision === "all" || student.division === filterDivision;

            // Filter based on letter type
            let matchesLetterType = true;
            if (letterType === "final") {
                matchesLetterType = student.finalOffer !== null;
            } else {
                matchesLetterType = student.offerLetters.length > 0;
            }

            return matchesSearch && matchesYear && matchesDivision && matchesLetterType;
        });
    }, [students, searchQuery, filterYear, filterDivision, letterType]);

    const handleDownload = (studentName, fileName) => {
        alert(`Downloading ${fileName} for ${studentName}`);
        // Implement actual download logic here
    };

    return (
        <div className={`min-h-screen ${themeStyles.background}`}>
            <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}>
                            Offer Letters Management
                        </h1>
                        <p className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}>
                            Track and manage student placement offer letters
                        </p>
                    </div>
                </div>

                {/* Summary Statistics */}
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
                                        Total Students
                                    </p>
                                    <h3
                                        className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                                    >
                                        {stats.totalStudents}
                                    </h3>
                                </div>
                                <div
                                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}
                                >
                                    <Users className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`} />
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
                                        With Offers
                                    </p>
                                    <h3
                                        className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                                    >
                                        {stats.withOffers}
                                    </h3>
                                </div>
                                <div
                                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}
                                >
                                    <FileText className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon2Text}`} />
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
                                        Final Offers
                                    </p>
                                    <h3
                                        className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                                    >
                                        {stats.withFinalOffer}
                                    </h3>
                                </div>
                                <div
                                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon3Bg} rounded-xl flex items-center justify-center`}
                                >
                                    <CheckCircle2
                                        className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon3Text}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}
                    >
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                                    >
                                        Total Offers
                                    </p>
                                    <h3
                                        className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                                    >
                                        {stats.totalOffers}
                                    </h3>
                                </div>
                                <div
                                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}
                                >
                                    <Award className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Letter Type Toggle */}
                <div
                    className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
                >
                    <div className="p-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setLetterType("offer")}
                                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${letterType === "offer"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                                    }`}
                            >
                                Offer Letters
                            </button>
                            <button
                                onClick={() => setLetterType("final")}
                                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${letterType === "final"
                                        ? "bg-green-600 text-white shadow-lg"
                                        : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                                    }`}
                            >
                                Final Offer Letters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div
                    className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
                >
                    <div className="p-4">
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <Search
                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} h-4 w-4`}
                                />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                    className={`sm:hidden px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} flex items-center justify-center gap-2`}
                                >
                                    <Filter className="h-4 w-4" />
                                    <span>Filters</span>
                                </button>

                                <div className="hidden sm:block">
                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className={`w-full px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                                    >
                                        <option value="all">All Years</option>
                                        <option value="Third Year">Third Year</option>
                                        <option value="Fourth Year">Fourth Year</option>
                                    </select>
                                </div>

                                <div className="hidden sm:block">
                                    <select
                                        value={filterDivision}
                                        onChange={(e) => setFilterDivision(e.target.value)}
                                        className={`w-full px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                                    >
                                        <option value="all">All Divisions</option>
                                        <option value="A">Division A</option>
                                        <option value="B">Division B</option>
                                        <option value="C">Division C</option>
                                    </select>
                                </div>

                                <div className="hidden sm:block">
                                    <span
                                        className={`block px-4 py-2.5 text-center ${themeStyles.textSecondary} text-sm`}
                                    >
                                        {filteredStudents.length} students found
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Filters */}
                            {showMobileFilters && (
                                <div className="sm:hidden space-y-3">
                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className={`w-full px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                                    >
                                        <option value="all">All Years</option>
                                        <option value="Third Year">Third Year</option>
                                        <option value="Fourth Year">Fourth Year</option>
                                    </select>

                                    <select
                                        value={filterDivision}
                                        onChange={(e) => setFilterDivision(e.target.value)}
                                        className={`w-full px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
                                    >
                                        <option value="all">All Divisions</option>
                                        <option value="A">Division A</option>
                                        <option value="B">Division B</option>
                                        <option value="C">Division C</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Students Table */}
                <div
                    className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className={themeStyles.tableHeaderBg}>
                                <tr>
                                    <th
                                        className={`px-4 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}
                                    >
                                        PRN no
                                    </th>
                                    <th
                                        className={`px-4 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}
                                    >
                                        Name
                                    </th>
                                    <th
                                        className={`px-4 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider hidden sm:table-cell`}
                                    >
                                        Email
                                    </th>
                                    <th
                                        className={`px-4 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider hidden lg:table-cell`}
                                    >
                                        Year
                                    </th>
                                    <th
                                        className={`px-4 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider hidden lg:table-cell`}
                                    >
                                        Division
                                    </th>
                                    <th
                                        className={`px-4 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}
                                    >
                                        {letterType === "offer" ? "Offer Letters" : "Final Offer"}
                                    </th>
                                    <th
                                        className={`px-4 py-4 text-right text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${themeStyles.tableBorder}`}>
                                {filteredStudents.map((student, index) => (
                                    <tr
                                        key={student.id}
                                        className={`${themeStyles.tableRowHover} transition-colors`}
                                    >
                                        <td className={`px-4 py-4 ${themeStyles.textPrimary} font-medium`}>
                                            {index + 1}
                                        </td>
                                        <td className={`px-4 py-4`}>
                                            <div className="flex flex-col">
                                                <span className={`font-semibold ${themeStyles.textPrimary}`}>
                                                    {student.name}
                                                </span>
                                                <span
                                                    className={`text-xs ${themeStyles.textSecondary} sm:hidden`}
                                                >
                                                    {student.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td
                                            className={`px-4 py-4 ${themeStyles.textSecondary} hidden sm:table-cell`}
                                        >
                                            {student.email}
                                        </td>
                                        <td
                                            className={`px-4 py-4 ${themeStyles.textSecondary} hidden lg:table-cell`}
                                        >
                                            {student.year}
                                        </td>
                                        <td
                                            className={`px-4 py-4 ${themeStyles.textSecondary} hidden lg:table-cell`}
                                        >
                                            <Badge variant="info">{student.division}</Badge>
                                        </td>
                                        <td className={`px-4 py-4`}>
                                            {letterType === "offer" ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {student.offerLetters.map((offer) => (
                                                        <Badge key={offer.id} variant="success">
                                                            {offer.company}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : student.finalOffer ? (
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="purple">
                                                        {student.finalOffer.company}
                                                    </Badge>
                                                    <span
                                                        className={`text-sm ${themeStyles.textSecondary}`}
                                                    >
                                                        {student.finalOffer.package}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className={`text-sm ${themeStyles.textTertiary}`}>
                                                    Not submitted
                                                </span>
                                            )}
                                        </td>
                                        <td className={`px-4 py-4`}>
                                            <div className="flex justify-end gap-2">
                                                {letterType === "offer" ? (
                                                    student.offerLetters.map((offer, idx) => (
                                                        <button
                                                            key={offer.id}
                                                            onClick={() =>
                                                                handleDownload(
                                                                    student.name,
                                                                    `${offer.company}_Offer_Letter.pdf`
                                                                )
                                                            }
                                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                                            title={`Download ${offer.company} Offer Letter`}
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </button>
                                                    ))
                                                ) : student.finalOffer ? (
                                                    <button
                                                        onClick={() =>
                                                            handleDownload(
                                                                student.name,
                                                                `${student.finalOffer.company}_Final_Offer_Letter.pdf`
                                                            )
                                                        }
                                                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                                        title="Download Final Offer Letter"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredStudents.length === 0 && (
                        <div className={`text-center py-12 ${themeStyles.emptyStateBg}`}>
                            <Search className={`h-12 w-12 ${themeStyles.emptyStateIcon} mx-auto mb-4`} />
                            <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}>
                                No students found
                            </h3>
                            <p className={themeStyles.textSecondary}>
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoordinatorOfferLetters;
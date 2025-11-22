import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  Calendar,
  Shield,
  Briefcase,
  GraduationCap,
  BarChart3,
  Moon,
  Sun,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Award,
  FileText,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const PlacementOverviewDashboard = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Sample data
  const [data] = useState({
    companies: [
      {
        id: 1,
        name: "Incorbis",
        status: "Open",
        registered: 45,
        selected: 12,
        salary: 650000,
      },
      {
        id: 2,
        name: "TCS",
        status: "Closed",
        registered: 120,
        selected: 35,
        salary: 450000,
      },
      {
        id: 3,
        name: "Infosys",
        status: "Open",
        registered: 89,
        selected: 28,
        salary: 500000,
      },
      {
        id: 4,
        name: "Wipro",
        status: "Open",
        registered: 67,
        selected: 18,
        salary: 400000,
      },
    ],
    colleges: [
      { id: 1, name: "Engineering College", staffCount: 12, students: 450 },
      { id: 2, name: "Arts & Science College", staffCount: 8, students: 320 },
      { id: 3, name: "Commerce College", staffCount: 10, students: 280 },
    ],
    placements: [
      {
        id: 1,
        name: "Soham Pachpute",
        college: "Engineering College",
        company: "Incorbis",
        package: 650000,
      },
      {
        id: 2,
        name: "Rahul Sharma",
        college: "Engineering College",
        company: "TCS",
        package: 450000,
      },
      {
        id: 3,
        name: "Priya Patel",
        college: "Engineering College",
        company: "Infosys",
        package: 500000,
      },
      {
        id: 4,
        name: "Amit Kumar",
        college: "Arts & Science College",
        company: "Amazon",
        package: 1800000,
      },
      {
        id: 5,
        name: "Kavita Reddy",
        college: "Engineering College",
        company: "Meta",
        package: 2800000,
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "placement",
        message: "New placement: Kavita Reddy at Meta",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "drive",
        message: "Incorbis drive registration opened",
        time: "5 hours ago",
      },
      {
        id: 3,
        type: "staff",
        message: "New staff member added to Engineering College",
        time: "1 day ago",
      },
      {
        id: 4,
        type: "permission",
        message: "Permissions updated for Dr. Rajesh Kumar",
        time: "2 days ago",
      },
    ],
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-slate-50 to-slate-100",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardShadow: "shadow-md",
    cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textTertiary: "text-slate-400",
    modalOverlay: "bg-black/60",
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-purple-50",
    statCard4Gradient: "from-white to-amber-50",
    statCard5Gradient: "from-white to-pink-50",
    statCard6Gradient: "from-white to-cyan-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-purple-100",
    statIcon3Text: "text-purple-600",
    statIcon4Bg: "bg-amber-100",
    statIcon4Text: "text-amber-600",
    statIcon5Bg: "bg-pink-100",
    statIcon5Text: "text-pink-600",
    statIcon6Bg: "bg-cyan-100",
    statIcon6Text: "text-cyan-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
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
    modalOverlay: "bg-black/80",
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30",
    statCard4Gradient: "from-slate-800 to-amber-900/30",
    statCard5Gradient: "from-slate-800 to-pink-900/30",
    statCard6Gradient: "from-slate-800 to-cyan-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30",
    statIcon3Text: "text-purple-400",
    statIcon4Bg: "bg-amber-900/30",
    statIcon4Text: "text-amber-400",
    statIcon5Bg: "bg-pink-900/30",
    statIcon5Text: "text-pink-400",
    statIcon6Bg: "bg-cyan-900/30",
    statIcon6Text: "text-cyan-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    tableHeaderBg: "bg-slate-800",
    tableRowHover: "hover:bg-slate-800/50",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCompanies = data.companies.length;
    const openDrives = data.companies.filter((c) => c.status === "Open").length;
    const totalColleges = data.colleges.length;
    const totalStaff = data.colleges.reduce((sum, c) => sum + c.staffCount, 0);
    const totalStudents = data.colleges.reduce((sum, c) => sum + c.students, 0);
    const totalPlacements = data.placements.length;
    const packages = data.placements.map((p) => p.package);
    const highestPackage = Math.max(...packages);
    const averagePackage =
      packages.reduce((a, b) => a + b, 0) / packages.length;
    const placementRate = ((totalPlacements / totalStudents) * 100).toFixed(1);

    return {
      totalCompanies,
      openDrives,
      totalColleges,
      totalStaff,
      totalStudents,
      totalPlacements,
      highestPackage,
      averagePackage,
      placementRate,
    };
  }, [data]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} LPA`;
    } else {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
  };

  // Get top companies by placements
  const topCompanies = useMemo(() => {
    const companyCounts = {};
    data.placements.forEach((p) => {
      companyCounts[p.company] = (companyCounts[p.company] || 0) + 1;
    });
    return Object.entries(companyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [data.placements]);

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className={`text-4xl font-bold ${themeStyles.textPrimary}`}>
              Overview
            </h1>
            <p className={`text-sm ${themeStyles.textSecondary} mt-2`}>
              Complete insights into your campus placement ecosystem
            </p>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
          {[
            {
              icon: Building2,
              label: "Total Companies",
              value: stats.totalCompanies,
              subtitle: `${stats.openDrives} drives open`,
              bgColor: themeStyles.statCard1Gradient,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: GraduationCap,
              label: "Total Colleges",
              value: stats.totalColleges,
              subtitle: "institutions",
              bgColor: themeStyles.statCard2Gradient,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: Users,
              label: "Total Staff",
              value: stats.totalStaff,
              subtitle: "staff members",
              bgColor: themeStyles.statCard3Gradient,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: Target,
              label: "Total Students",
              value: stats.totalStudents,
              subtitle: "registered",
              bgColor: themeStyles.statCard4Gradient,
              iconBg: themeStyles.statIcon4Bg,
              iconColor: themeStyles.statIcon4Text,
            },
            {
              icon: Award,
              label: "Total Placements",
              value: stats.totalPlacements,
              subtitle: `${stats.placementRate}% rate`,
              bgColor: themeStyles.statCard5Gradient,
              iconBg: themeStyles.statIcon5Bg,
              iconColor: themeStyles.statIcon5Text,
            },
            {
              icon: TrendingUp,
              label: "Highest Package",
              value: formatCurrency(stats.highestPackage),
              subtitle: "top offer",
              bgColor: themeStyles.statCard6Gradient,
              iconBg: themeStyles.statIcon6Bg,
              iconColor: themeStyles.statIcon6Text,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${themeStyles.cardBorder} p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.bgColor}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`h-12 w-12 ${stat.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                {stat.label}
              </p>
              <h3
                className={`text-2xl font-bold ${themeStyles.textPrimary} mt-1`}
              >
                {stat.value}
              </h3>
              <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Active Drives */}
          <div
            className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
          >
            <div className={`p-6 border-b ${themeStyles.dividerBorder}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${themeStyles.statIcon1Bg}`}>
                    <Calendar
                      className={`h-5 w-5 ${themeStyles.statIcon1Text}`}
                    />
                  </div>
                  <div>
                    <h2
                      className={`text-xl font-bold ${themeStyles.textPrimary}`}
                    >
                      Active Drives
                    </h2>
                    <p className={`text-sm ${themeStyles.textSecondary}`}>
                      Current recruitment drives
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.companies
                  .filter((c) => c.status === "Open")
                  .map((company) => (
                    <div
                      key={company.id}
                      className={`p-4 rounded-xl border ${themeStyles.cardBorder} ${themeStyles.tableRowHover} transition-all`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3
                            className={`font-bold ${themeStyles.textPrimary}`}
                          >
                            {company.name}
                          </h3>
                          <p
                            className={`text-sm ${themeStyles.textSecondary} mt-1`}
                          >
                            {formatCurrency(company.salary)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={themeStyles.textSecondary}>
                          Registered: {company.registered}
                        </span>
                        <span
                          className={`font-semibold text-green-600 dark:text-green-400`}
                        >
                          Selected: {company.selected}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Top Companies */}
          <div
            className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
          >
            <div className={`p-6 border-b ${themeStyles.dividerBorder}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${themeStyles.statIcon2Bg}`}>
                  <BarChart3
                    className={`h-5 w-5 ${themeStyles.statIcon2Text}`}
                  />
                </div>
                <div>
                  <h2
                    className={`text-xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Top Companies
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>
                    By placement count
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topCompanies.map((company, idx) => (
                  <div
                    key={company.name}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${themeStyles.cardBorder} ${themeStyles.tableRowHover} transition-all`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${themeStyles.statIcon2Bg} ${themeStyles.statIcon2Text} font-bold`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${themeStyles.textPrimary}`}>
                        {company.name}
                      </h3>
                      <p className={`text-sm ${themeStyles.textSecondary}`}>
                        {company.count} placement
                        {company.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Recent Placements */}
          <div
            className={`lg:col-span-2 rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
          >
            <div className={`p-6 border-b ${themeStyles.dividerBorder}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${themeStyles.statIcon5Bg}`}>
                  <Award className={`h-5 w-5 ${themeStyles.statIcon5Text}`} />
                </div>
                <div>
                  <h2
                    className={`text-xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Recent Placements
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>
                    Latest successful placements
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={themeStyles.tableHeaderBg}>
                  <tr>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                    >
                      Student
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                    >
                      College
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                    >
                      Company
                    </th>
                    <th
                      className={`px-6 py-4 text-right text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                    >
                      Package
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${themeStyles.dividerBorder}`}>
                  {data.placements.slice(0, 5).map((placement) => (
                    <tr
                      key={placement.id}
                      className={`${themeStyles.tableRowHover} transition-colors`}
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeStyles.textPrimary}`}
                      >
                        {placement.name}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                      >
                        {placement.college}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                      >
                        {placement.company}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${themeStyles.textPrimary} text-right`}
                      >
                        {formatCurrency(placement.package)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
          >
            <div className={`p-6 border-b ${themeStyles.dividerBorder}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${themeStyles.statIcon4Bg}`}>
                  <Activity
                    className={`h-5 w-5 ${themeStyles.statIcon4Text}`}
                  />
                </div>
                <div>
                  <h2
                    className={`text-xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Recent Activity
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>
                    Latest updates
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex gap-3 p-3 rounded-xl ${themeStyles.tableRowHover} transition-all`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "placement"
                          ? themeStyles.statIcon5Bg
                          : activity.type === "drive"
                          ? themeStyles.statIcon1Bg
                          : activity.type === "staff"
                          ? themeStyles.statIcon3Bg
                          : themeStyles.statIcon6Bg
                      }`}
                    >
                      {activity.type === "placement" ? (
                        <Award
                          className={`h-4 w-4 ${
                            activity.type === "placement"
                              ? themeStyles.statIcon5Text
                              : ""
                          }`}
                        />
                      ) : activity.type === "drive" ? (
                        <Building2
                          className={`h-4 w-4 ${themeStyles.statIcon1Text}`}
                        />
                      ) : activity.type === "staff" ? (
                        <Users
                          className={`h-4 w-4 ${themeStyles.statIcon3Text}`}
                        />
                      ) : (
                        <Shield
                          className={`h-4 w-4 ${themeStyles.statIcon6Text}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${themeStyles.textPrimary} line-clamp-2`}
                      >
                        {activity.message}
                      </p>
                      <p className={`text-xs ${themeStyles.textTertiary} mt-1`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
        >
          <div className={`p-6 border-b ${themeStyles.dividerBorder}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${themeStyles.statIcon6Bg}`}>
                <FileText className={`h-5 w-5 ${themeStyles.statIcon6Text}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                  Quick Actions
                </h2>
                <p className={`text-sm ${themeStyles.textSecondary}`}>
                  Common management tasks
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  icon: Building2,
                  label: "Company Drives",
                  color: "blue",
                },
                {
                  icon: Users,
                  label: "Staff Details",
                  color: "green",
                },
                {
                  icon: Shield,
                  label: "Permissions",
                  color: "purple",
                },
                {
                  icon: Award,
                  label: "Placement Results",
                  color: "amber",
                },
                {
                  icon: GraduationCap,
                  label: "Student Details",
                  color: "pink",
                },
                {
                  icon: BarChart3,
                  label: "Analytics",
                  color: "cyan",
                },
              ].map((action, idx) => (
                <button
                  key={idx}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border ${themeStyles.cardBorder} ${themeStyles.buttonHover} transition-all group`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all group-hover:scale-110 ${
                      action.color === "blue"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : action.color === "green"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : action.color === "purple"
                        ? "bg-purple-100 dark:bg-purple-900/30"
                        : action.color === "amber"
                        ? "bg-amber-100 dark:bg-amber-900/30"
                        : action.color === "pink"
                        ? "bg-pink-100 dark:bg-pink-900/30"
                        : "bg-cyan-100 dark:bg-cyan-900/30"
                    }`}
                  >
                    <action.icon
                      className={`h-6 w-6 ${
                        action.color === "blue"
                          ? "text-blue-600 dark:text-blue-400"
                          : action.color === "green"
                          ? "text-green-600 dark:text-green-400"
                          : action.color === "purple"
                          ? "text-purple-600 dark:text-purple-400"
                          : action.color === "amber"
                          ? "text-amber-600 dark:text-amber-400"
                          : action.color === "pink"
                          ? "text-pink-600 dark:text-pink-400"
                          : "text-cyan-600 dark:text-cyan-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${themeStyles.textPrimary} text-center`}
                  >
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementOverviewDashboard;

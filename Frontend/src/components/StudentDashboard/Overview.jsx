import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Award,
  FolderGit2,
  Briefcase,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  Users,
  Building2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

// Add Urbanist font and CSS variables
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

const Overview = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

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
    headerBg: "bg-white",
    headerBorder: "border-slate-300",
    headerHover: "hover:bg-slate-50",
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
    sectionHeaderBg: "bg-white",
    offerCardBg: "bg-white",
    offerCardBorder: "border-slate-200",
    offerCardHover: "hover:border-blue-600",
    offerIconBg: "bg-blue-100",
    offerIconColor: "text-blue-600",
    statusFinalBg: "bg-green-500",
    statusPendingBg: "bg-gray-500",
    summaryDivider: "border-slate-200",
    projectCardBg: "bg-white",
    projectCardBorder: "border-slate-200",
    projectCardHover: "hover:border-purple-600",
    projectIconBg: "bg-slate-100",
    techBadgeBg: "bg-purple-100",
    techBadgeText: "text-purple-600",
    certCardBg: "bg-white",
    certCardBorder: "border-slate-200",
    certCardHover: "hover:border-green-600",
    internCardBg: "bg-white",
    internCardBorder: "border-slate-200",
    internCardHover: "hover:border-amber-600",
    activeBadgeBg: "bg-green-100",
    activeBadgeText: "text-green-600",
    activeBadgeBorder: "border-green-200",
    dividerBorder: "border-slate-200",
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
    headerBg: "bg-slate-950",
    headerBorder: "border-slate-700",
    headerHover: "hover:bg-slate-800",
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
    sectionHeaderBg: "bg-slate-900",
    offerCardBg: "bg-slate-950",
    offerCardBorder: "border-slate-800",
    offerCardHover: "hover:border-blue-400",
    offerIconBg: "bg-blue-900/30",
    offerIconColor: "text-blue-400",
    statusFinalBg: "bg-green-600",
    statusPendingBg: "bg-gray-400",
    summaryDivider: "border-slate-800",
    projectCardBg: "bg-slate-950",
    projectCardBorder: "border-slate-800",
    projectCardHover: "hover:border-purple-400",
    projectIconBg: "bg-slate-800",
    techBadgeBg: "bg-purple-900/30",
    techBadgeText: "text-purple-400",
    certCardBg: "bg-slate-950",
    certCardBorder: "border-slate-800",
    certCardHover: "hover:border-green-400",
    internCardBg: "bg-slate-950",
    internCardBorder: "border-slate-700",
    internCardHover: "hover:border-amber-400",
    activeBadgeBg: "bg-green-900/30",
    activeBadgeText: "text-green-400",
    activeBadgeBorder: "border-green-900/20",
    dividerBorder: "border-slate-700",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const [offers] = useState([
    {
      id: 1,
      companyName: "Tech Corp",
      packageValue: "12",
      companyType: "Product",
      status: "offer",
      offerLetterFile: "offer.pdf",
      createdAt: new Date("2024-10-15"),
    },
    {
      id: 2,
      companyName: "Innovation Labs",
      packageValue: "15",
      companyType: "Startup",
      status: "final",
      offerLetterFile: "offer2.pdf",
      joiningLetterFile: "joining.pdf",
      createdAt: new Date("2024-11-01"),
    },
    {
      id: 3,
      companyName: "Digital Solutions",
      packageValue: "10",
      companyType: "Service",
      status: "offer",
      offerLetterFile: "offer3.pdf",
      createdAt: new Date("2024-09-20"),
    },
  ]);

  const [certifications] = useState([
    {
      id: 1,
      certificationName: "React Advanced Patterns",
      platform: "Coursera",
      duration: "8",
      certificate: "cert1.pdf",
    },
    {
      id: 2,
      certificationName: "AWS Solutions Architect",
      platform: "Udemy",
      duration: "12",
      certificate: "cert2.pdf",
    },
    {
      id: 3,
      certificationName: "Data Structures & Algorithms",
      platform: "edX",
      duration: "10",
      certificate: "cert3.pdf",
    },
    {
      id: 4,
      certificationName: "Machine Learning Specialization",
      platform: "Coursera",
      duration: "16",
      certificate: "cert4.pdf",
    },
  ]);

  const [projects] = useState([
    {
      id: 1,
      projectTitle: "E-Commerce Platform",
      technologies: "React, Node.js, MongoDB, Redis",
      groupMembers: "4",
      description: "Full-stack e-commerce application with real-time inventory",
    },
    {
      id: 2,
      projectTitle: "AI Chatbot",
      technologies: "Python, TensorFlow, Flask",
      groupMembers: "2",
      description: "NLP-based customer service chatbot",
    },
    {
      id: 3,
      projectTitle: "Task Management System",
      technologies: "Vue.js, Django, PostgreSQL",
      groupMembers: "3",
      description: "Collaborative project management tool",
    },
  ]);

  const [internships] = useState([
    {
      id: 1,
      companyName: "Google",
      stipend: "50000",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      offerLetter: "google.pdf",
    },
    {
      id: 2,
      companyName: "Microsoft",
      stipend: "45000",
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      offerLetter: "microsoft.pdf",
    },
    {
      id: 3,
      companyName: "Amazon",
      stipend: "55000",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      offerLetter: "amazon.pdf",
    },
  ]);

  const overallStats = useMemo(() => {
    const totalOffers = offers.length;
    const finalOffers = offers.filter((o) => o.status === "final").length;
    const totalCertifications = certifications.length;
    const totalProjects = projects.length;
    const totalInternships = internships.length;
    const avgPackage =
      offers.length > 0
        ? offers.reduce(
            (sum, offer) => sum + parseFloat(offer.packageValue),
            0
          ) / offers.length
        : 0;
    const highestPackage =
      offers.length > 0
        ? Math.max(...offers.map((o) => parseFloat(o.packageValue)))
        : 0;
    const totalLearningWeeks = certifications.reduce(
      (sum, cert) => sum + parseFloat(cert.duration),
      0
    );
    const uniqueTechs = new Set(
      projects.flatMap((p) => p.technologies.split(",").map((t) => t.trim()))
    ).size;
    const today = new Date();
    const activeInternships = internships.filter((i) => {
      const start = new Date(i.startDate);
      const end = new Date(i.endDate);
      return start <= today && end >= today;
    }).length;
    const totalStipend = internships.reduce(
      (sum, i) => sum + parseFloat(i.stipend),
      0
    );
    return {
      totalOffers,
      finalOffers,
      totalCertifications,
      totalProjects,
      totalInternships,
      avgPackage,
      highestPackage,
      totalLearningWeeks,
      activeInternships,
      uniqueTechs,
      totalStipend,
    };
  }, [offers, certifications, projects, internships]);

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Overview Dashboard
            </h1>
            <p className={`mt-2 ${themeStyles.textSecondary}`}>
              Track your offers, projects, certifications, and internships
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: FileText,
              label: "Total Offers",
              value: overallStats.totalOffers,
              subtitle: `${overallStats.finalOffers} final offer${
                overallStats.finalOffers !== 1 ? "s" : ""
              }`,
              bgColor: themeStyles.statCard1Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: Award,
              label: "Certifications",
              value: overallStats.totalCertifications,
              subtitle: `${overallStats.totalLearningWeeks} weeks total`,
              bgColor: themeStyles.statCard2Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: FolderGit2,
              label: "Projects",
              value: overallStats.totalProjects,
              subtitle: `${overallStats.uniqueTechs} technologies`,
              bgColor: themeStyles.statCard3Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: Briefcase,
              label: "Internships",
              value: overallStats.totalInternships,
              subtitle: `${overallStats.activeInternships} active`,
              bgColor: themeStyles.statCard4Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon4Bg,
              iconColor: themeStyles.statIcon4Text,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${stat.borderColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    {stat.label}
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${themeStyles.textTertiary} mt-1`}>
                    {stat.subtitle}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 ${stat.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Offers */}
            <div
              className={`${themeStyles.sectionHeaderBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Building2 size={20} className={themeStyles.statIcon1Text} />
                <h2
                  className={`text-xl font-semibold ${themeStyles.textPrimary}`}
                >
                  Job Offers
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`flex items-center justify-between p-5 ${themeStyles.offerCardBg} rounded-xl border ${themeStyles.offerCardBorder} hover:shadow-md ${themeStyles.offerCardHover} transition-all`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 ${themeStyles.offerIconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Building2
                          size={24}
                          className={themeStyles.offerIconColor}
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${themeStyles.textPrimary} text-base`}
                        >
                          {offer.companyName}
                        </h3>
                        <p className={`text-sm ${themeStyles.textSecondary}`}>
                          {offer.companyType}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${themeStyles.textPrimary} text-lg mb-1`}
                      >
                        ₹{offer.packageValue} LPA
                      </p>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          offer.status === "final"
                            ? themeStyles.statusFinalBg
                            : themeStyles.statusPendingBg
                        } text-white`}
                      >
                        {offer.status === "final" ? "✓ Final Offer" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div
              className={`${themeStyles.sectionHeaderBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={20} className={themeStyles.statIcon1Text} />
                <h2
                  className={`text-xl font-semibold ${themeStyles.textPrimary}`}
                >
                  Summary
                </h2>
              </div>
              <div>
                {[
                  {
                    label: "Highest Package",
                    value: `₹${overallStats.highestPackage} LPA`,
                  },
                  {
                    label: "Average Package",
                    value: `₹${overallStats.avgPackage.toFixed(1)} LPA`,
                  },
                  {
                    label: "Total Stipend",
                    value: `₹${overallStats.totalStipend.toLocaleString()}`,
                  },
                  {
                    label: "Placement Rate",
                    value: `${(
                      (overallStats.finalOffers /
                        Math.max(overallStats.totalOffers, 1)) *
                      100
                    ).toFixed(0)}%`,
                    icon: TrendingUp,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-4 ${
                      idx < 3 ? `border-b ${themeStyles.summaryDivider}` : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${themeStyles.textSecondary}`}
                    >
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${themeStyles.textPrimary} text-lg`}
                      >
                        {item.value}
                      </span>
                      {item.icon && (
                        <item.icon
                          size={16}
                          className={themeStyles.statIcon2Text}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div
            className={`${themeStyles.sectionHeaderBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-shadow`}
          >
            <div className="flex items-center gap-2 mb-6">
              <FolderGit2 size={20} className={themeStyles.statIcon3Text} />
              <h2
                className={`text-xl font-semibold ${themeStyles.textPrimary}`}
              >
                Projects
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-5 ${themeStyles.projectCardBg} rounded-xl border ${themeStyles.projectCardBorder} hover:shadow-md ${themeStyles.projectCardHover} transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${themeStyles.textPrimary} text-base mb-2`}
                      >
                        {project.projectTitle}
                      </h3>
                      <p
                        className={`text-sm ${themeStyles.textSecondary} leading-relaxed`}
                      >
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1 px-3 py-1 text-xs border ${themeStyles.cardBorder} rounded-full ${themeStyles.textSecondary} ml-3 flex-shrink-0 ${themeStyles.projectIconBg}`}
                    >
                      <Users size={12} />
                      {project.groupMembers}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(",").map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${themeStyles.techBadgeBg} ${themeStyles.techBadgeText}`}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Certifications */}
            <div
              className={`${themeStyles.sectionHeaderBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className={themeStyles.statIcon2Text} />
                <h2
                  className={`text-xl font-semibold ${themeStyles.textPrimary}`}
                >
                  Certifications
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {certifications.slice(0, 3).map((cert) => (
                  <div
                    key={cert.id}
                    className={`p-4 ${themeStyles.certCardBg} rounded-xl border ${themeStyles.certCardBorder} hover:shadow-md ${themeStyles.certCardHover} transition-all`}
                  >
                    <h4
                      className={`font-semibold ${themeStyles.textPrimary} text-sm mb-2`}
                    >
                      {cert.certificationName}
                    </h4>
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`${themeStyles.textSecondary} font-medium`}
                      >
                        {cert.platform}
                      </span>
                      <div
                        className={`flex items-center gap-1 ${themeStyles.textSecondary}`}
                      >
                        <Clock size={12} />
                        <span>{cert.duration} weeks</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internships */}
            <div
              className={`${themeStyles.sectionHeaderBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={20} className={themeStyles.statIcon4Text} />
                <h2
                  className={`text-xl font-semibold ${themeStyles.textPrimary}`}
                >
                  Internships
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {internships.map((intern) => {
                  const start = new Date(intern.startDate);
                  const end = new Date(intern.endDate);
                  const today = new Date();
                  const isActive = start <= today && end >= today;
                  return (
                    <div
                      key={intern.id}
                      className={`p-4 ${themeStyles.internCardBg} rounded-xl border ${themeStyles.internCardBorder} hover:shadow-md ${themeStyles.internCardHover} transition-all`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4
                          className={`font-semibold ${themeStyles.textPrimary} text-sm`}
                        >
                          {intern.companyName}
                        </h4>
                        {isActive && (
                          <span
                            className={`px-2 py-0.5 text-xs ${themeStyles.activeBadgeBg} ${themeStyles.activeBadgeText} border ${themeStyles.activeBadgeBorder} rounded-full`}
                          >
                            ● Active
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${themeStyles.textSecondary} mb-2`}
                      >
                        <Calendar size={12} />
                        <span>
                          {start.toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {end.toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p
                        className={`text-sm font-medium ${themeStyles.textPrimary}`}
                      >
                        ₹{parseFloat(intern.stipend).toLocaleString()}/month
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

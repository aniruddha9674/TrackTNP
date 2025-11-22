import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "../../Utils/context/ThemeContext";
import {
  Users,
  Briefcase,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  Shield,
  LineChart,
  Database,
  FileText,
  UserCheck,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react";

const ServicesPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const getThemeStyles = () => {
    if (theme === "dark") {
      return {
        background: "bg-slate-950",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        cardBg: "bg-slate-900",
        cardBorder: "border-slate-800",
        cardShadow: "shadow-lg shadow-slate-900/50",
        cardHoverShadow: "hover:shadow-2xl hover:shadow-slate-900/50",
        buttonBg: "bg-slate-800",
        buttonBorder: "border-slate-700",
        buttonHover: "hover:bg-slate-700",
        emptyStateBg: "bg-slate-900/50",
        statIcon1Bg: "bg-blue-900/30",
        statIcon1Text: "text-blue-400",
      };
    }
    return {
      background: "bg-slate-50",
      textPrimary: "text-slate-900",
      textSecondary: "text-slate-600",
      cardBg: "bg-white",
      cardBorder: "border-slate-200",
      cardShadow: "shadow-lg",
      cardHoverShadow: "hover:shadow-2xl",
      buttonBg: "bg-white",
      buttonBorder: "border-slate-200",
      buttonHover: "hover:bg-slate-50",
      emptyStateBg: "bg-slate-100",
      statIcon1Bg: "bg-blue-100",
      statIcon1Text: "text-blue-600",
    };
  };

  const themeStyles = getThemeStyles();

  const services = [
    {
      icon: Users,
      title: "Student Dashboard",
      description:
        "Self-service portal for students to manage their entire training journey - from enrollment to placement.",
      features: [
        "Online registration & profile management",
        "Course enrollment & tracking",
        "Submit assignments & projects",
        "View placement opportunities",
        "Track attendance & progress",
        "Download certificates digitally",
      ],
      lightIconBg: "bg-blue-100",
      darkIconBg: "bg-blue-900/30",
      lightIconText: "text-blue-600",
      darkIconText: "text-blue-400",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: UserCheck,
      title: "Staff Dashboard",
      description:
        "Streamlined interface for trainers and coordinators to manage training activities and student progress.",
      features: [
        "Mark attendance digitally",
        "Grade assignments & assessments",
        "Schedule classes & sessions",
        "Generate student reports",
        "Communicate with students",
        "Track batch performance",
      ],
      lightIconBg: "bg-purple-100",
      darkIconBg: "bg-purple-900/30",
      lightIconText: "text-purple-600",
      darkIconText: "text-purple-400",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: Shield,
      title: "Admin Dashboard",
      description:
        "Comprehensive control center to oversee all operations across 4 training camps with real-time analytics.",
      features: [
        "Manage all 4 camps centrally",
        "Approve enrollments & placements",
        "Generate automated reports",
        "Monitor staff & student activity",
        "Access real-time analytics",
        "Configure system settings",
      ],
      lightIconBg: "bg-green-100",
      darkIconBg: "bg-green-900/30",
      lightIconText: "text-green-600",
      darkIconText: "text-green-400",
      gradient: "from-green-600 to-emerald-600",
    },
    {
      icon: Database,
      title: "Centralized Data Management",
      description:
        "All student, training, and placement data in one secure system - eliminating paperwork and manual tracking.",
      features: [
        "Digital student records",
        "Automated data backup",
        "Advanced search & filters",
        "Document management system",
        "Secure data storage",
        "Export reports to Excel/PDF",
      ],
      lightIconBg: "bg-amber-100",
      darkIconBg: "bg-amber-900/30",
      lightIconText: "text-amber-600",
      darkIconText: "text-amber-400",
      gradient: "from-amber-600 to-orange-600",
    },
    {
      icon: Briefcase,
      title: "Placement Management",
      description:
        "End-to-end placement tracking from company partnerships to student job offers and follow-ups.",
      features: [
        "Track company partnerships",
        "Post job opportunities",
        "Manage interview schedules",
        "Record placement outcomes",
        "Student-company matching",
        "Placement analytics & reports",
      ],
      lightIconBg: "bg-indigo-100",
      darkIconBg: "bg-indigo-900/30",
      lightIconText: "text-indigo-600",
      darkIconText: "text-indigo-400",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      icon: FileText,
      title: "Automated Reporting",
      description:
        "Generate comprehensive reports instantly - no more manual data compilation or spreadsheet management.",
      features: [
        "One-click report generation",
        "Custom report templates",
        "Attendance & performance reports",
        "Placement statistics",
        "Revenue & enrollment reports",
        "Email automated reports",
      ],
      lightIconBg: "bg-rose-100",
      darkIconBg: "bg-rose-900/30",
      lightIconText: "text-rose-600",
      darkIconText: "text-rose-400",
      gradient: "from-rose-600 to-red-600",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "4",
      label: "Training Camps",
    },
    {
      icon: Database,
      value: "100%",
      label: "Paperless Operations",
    },
    {
      icon: TrendingUp,
      value: "80%",
      label: "Time Saved",
    },
    {
      icon: CheckCircle2,
      value: "3",
      label: "Smart Dashboards",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Eliminate Paperwork",
      description:
        "Go completely digital - no more physical forms, files, or manual record-keeping",
    },
    {
      icon: Shield,
      title: "Reduce Admin Workload",
      description:
        "Automate repetitive tasks and free up staff time for meaningful work",
    },
    {
      icon: LineChart,
      title: "Real-Time Insights",
      description:
        "Make data-driven decisions with live dashboards and analytics",
    },
    {
      icon: Target,
      title: "Multi-Camp Management",
      description: "Manage all 4 training camps from one centralized platform",
    },
  ];

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      {/* Back & Theme Toggle */}
      <div className="fixed top-6 left-6 right-6 z-50 flex justify-between">
        <button
          onClick={() => window.history.back()}
          className={`p-3 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all shadow-lg hover:shadow-xl transform hover:scale-105`}
          aria-label="Go back"
        >
          <ArrowLeft className={`h-5 w-5 ${themeStyles.textPrimary}`} />
        </button>
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all shadow-lg hover:shadow-xl transform hover:scale-105`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className={`h-5 w-5 ${themeStyles.textPrimary}`} />
          ) : (
            <Moon className={`h-5 w-5 ${themeStyles.textPrimary}`} />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="animate-fadeInUp">
            <h1
              className={`text-5xl md:text-7xl font-bold ${themeStyles.textPrimary} mb-6 leading-tight`}
            >
              Training & Placement
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Management System
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl ${themeStyles.textSecondary} mb-12 max-w-3xl mx-auto leading-relaxed`}
            >
              Streamline your training operations across 4 camps with our
              all-in-one digital platform
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 px-6 ${themeStyles.emptyStateBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-8 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2 text-center`}
              >
                <div
                  className={`w-14 h-14 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon
                    className={`h-7 w-7 ${themeStyles.statIcon1Text}`}
                  />
                </div>
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className={`text-sm ${themeStyles.textSecondary}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2
              className={`text-4xl md:text-5xl font-bold ${themeStyles.textPrimary} mb-6`}
            >
              Platform
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p
              className={`text-lg ${themeStyles.textSecondary} max-w-2xl mx-auto`}
            >
              Everything you need to manage training and placements efficiently
              - all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isDark = theme === "dark";
              const iconText = isDark
                ? service.darkIconText
                : service.lightIconText;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`group ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl overflow-hidden ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2`}
                >
                  {/* Image placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                    <div className="text-center">
                      <Icon
                        className={`h-16 w-16 ${iconText} mx-auto mb-2 opacity-50`}
                      />
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Image placeholder
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3
                      className={`text-xl font-bold ${themeStyles.textPrimary} mb-3`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`${themeStyles.textSecondary} leading-relaxed mb-6`}
                    >
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                          </div>
                          <span
                            className={`text-sm ${themeStyles.textSecondary} leading-relaxed`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-500`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-20 px-6 ${themeStyles.emptyStateBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2
              className={`text-4xl md:text-5xl font-bold ${themeStyles.textPrimary} mb-6`}
            >
              Why Go
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital
              </span>
            </h2>
            <p
              className={`text-lg ${themeStyles.textSecondary} max-w-2xl mx-auto`}
            >
              Transform your training operations with automation and smart
              workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-8 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2 text-center`}
              >
                <div
                  className={`w-14 h-14 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center mx-auto mb-6`}
                >
                  <benefit.icon
                    className={`h-7 w-7 ${themeStyles.statIcon1Text}`}
                  />
                </div>
                <h3
                  className={`text-xl font-bold ${themeStyles.textPrimary} mb-3`}
                >
                  {benefit.title}
                </h3>
                <p
                  className={`${themeStyles.textSecondary} leading-relaxed text-sm`}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer themeStyles={themeStyles} />
    </div>
  );
};

export default ServicesPage;

import React, { useState, useEffect } from "react";
import {
  Shield,
  UserCheck,
  GraduationCap,
  Target,
  Zap,
  BarChart3,
  FileText,
  Building2,
  Moon,
  Sun,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  ArrowLeft,
  Rocket,
} from "lucide-react";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "../../Utils/context/ThemeContext";

const AboutUs = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

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
    inputDisabled: "disabled:bg-slate-800",
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80",
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
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  const features = [
    {
      icon: Target,
      title: "Streamlined Process",
      description:
        "Simplify recruitment workflows with automated processes and intuitive interfaces",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with encrypted data storage and secure authentication",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Instant notifications and live status updates for all placement activities",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights with visual reports and placement statistics",
    },
    {
      icon: FileText,
      title: "Document Management",
      description:
        "Centralized storage for resumes, certificates, and placement documents",
    },
    {
      icon: Building2,
      title: "Company Portal",
      description:
        "Dedicated interface for recruiters to post jobs and review applications",
    },
  ];

  const dashboards = [
    {
      icon: Shield,
      title: "Admin Dashboard",
      points: [
        "Complete control center for Training & Placement ecosystem",
        "Oversee student profiles and manage company registrations",
        "Generate comprehensive reports and analytics",
        "Configure system-wide settings and permissions",
        "Real-time monitoring of placement statistics",
        "Coordinate effectively between staff and students",
      ],
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      gradient: "from-blue-500/10 to-blue-500/5",
    },
    {
      icon: UserCheck,
      title: "Staff Dashboard",
      points: [
        "Essential tools for volunteer coordinators",
        "Assist students with profile completion",
        "Facilitate company-student interactions",
        "Manage interview schedules and appointments",
        "Track applications and their status",
        "Provide guidance throughout placement journey",
      ],
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      gradient: "from-green-500/10 to-green-500/5",
    },
    {
      icon: GraduationCap,
      title: "Student Dashboard",
      points: [
        "Personal placement portal for career preparation",
        "Build comprehensive profiles with achievements",
        "Add certifications and showcase projects",
        "Apply for on-campus opportunities",
        "Real-time application tracking",
        "Access valuable placement resources",
      ],
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      gradient: "from-purple-500/10 to-purple-500/5",
    },
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Excellence",
      description:
        "Committed to delivering the highest quality placement services",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Building strong partnerships between students and companies",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparent and ethical practices in all our operations",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging technology to streamline placement processes",
    },
  ];

  return (
    <div className={`min-h-screen ${themeStyles.bg}`}>
      {/* Back & Theme Toggle */}
      <div className="hidden md:flex fixed top-6 left-6 right-6 z-50 justify-between">
        <button
          onClick={() => window.history.back()}
          className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all`}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
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
              About
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TRACKTNP
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl ${themeStyles.textSecondary} mb-12 max-w-3xl mx-auto leading-relaxed`}
            >
              Empowering careers through intelligent placement management.
              Connecting talent with opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${themeStyles.text}`}
            >
              Our Mission
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${themeStyles.textSecondary}`}
            >
              To revolutionize campus recruitment by creating seamless
              connections between talented students and leading companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <p
                className={`text-lg leading-relaxed ${themeStyles.textSecondary}`}
              >
                Track TNP was born from the vision of simplifying the complex
                world of campus placements. We understand the challenges faced
                by students, placement coordinators, and recruiters alike.
              </p>
              <p
                className={`text-lg leading-relaxed ${themeStyles.textSecondary}`}
              >
                Our platform brings together cutting-edge technology and
                user-centric design to create an ecosystem where opportunities
                meet preparation, and success becomes inevitable.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {values.map((value, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <value.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${themeStyles.text}`}>
                        {value.title}
                      </h3>
                      <p className={`text-sm ${themeStyles.textSecondary}`}>
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className={`py-20 px-6 ${themeStyles.sectionBg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${themeStyles.text}`}
            >
              Our Vision
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${themeStyles.textSecondary}`}
            >
              Building the future of campus placements where every student finds
              their perfect career match and every company discovers exceptional
              talenthemeStyles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-6">
              <p
                className={`text-lg leading-relaxed ${themeStyles.textSecondary}`}
              >
                To create a future where every student has equal access to
                career opportunities, where institutions can seamlessly manage
                their Training & Placement operations, and where companies can
                connect with the right talent effortlessly.
              </p>
              <p
                className={`text-lg leading-relaxed ${themeStyles.textSecondary}`}
              >
                Track TNP envisions a unified digital ecosystem that breaks
                geographical barriers, promotes transparency, and empowers
                students, institutions, and recruiters through smart technology
                and insightful data.
              </p>
              <p
                className={`text-lg leading-relaxed ${themeStyles.textSecondary}`}
              >
                Our commitment extends beyond placements to fostering career
                growth, skill development, and creating lasting professional
                relationships that shape successful futures.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
                alt="Future vision"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: "10K+", label: "Students Placed", icon: GraduationCap },
              { number: "500+", label: "Partner Companies", icon: Building2 },
              { number: "95%", label: "Success Rate", icon: TrendingUp },
              { number: "50+", label: "Institutions", icon: Award },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 text-center border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${themeStyles.card} ${themeStyles.border}`}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 ${themeStyles.text}`}
                >
                  {stat.number}
                </div>
                <div className={`text-sm ${themeStyles.textSecondary}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${themeStyles.text}`}
            >
              Powerful Dashboards
            </h2>
            <p className={`text-xl ${themeStyles.textSecondary}`}>
              Tailored experiences for every role in the placement ecosystem
            </p>
          </div>

          <div className="space-y-12">
            {dashboards.map((dashboard, idx) => (
              <div
                key={idx}
                className={`group rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300 ${
                  themeStyles.card
                } ${themeStyles.border} ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex flex-col md:flex`}
              >
                <div className="md:w-1/2 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${dashboard.gradient} opacity-40 z-10`}
                  />
                  <img
                    src={dashboard.image}
                    alt={dashboard.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 mb-6">
                    <dashboard.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className={`text-3xl font-bold mb-4 ${themeStyles.text}`}>
                    {dashboard.title}
                  </h3>
                  <ul className="space-y-3">
                    {dashboard.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span
                          className={`leading-relaxed ${themeStyles.textSecondary}`}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer themeStyles={themeStyles} />
    </div>
  );
};

export default AboutUs;

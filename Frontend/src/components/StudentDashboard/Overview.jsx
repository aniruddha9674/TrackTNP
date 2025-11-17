import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Award,
  FolderGit2,
  Briefcase,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  BarChart3,
  Users,
  Building2,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

// Color themes
const lightTheme = {
  background: "#ffffff",
  textPrimary: "#101828",
  textSecondary: "#667085",
  surface: "#F2F4F7",
  brand: "#465FFF",
  brandHover: "#3641F5",
  blueLight: "#0BA5EC",
  success: "#32D583",
  error: "#F04438",
  border: "#E2E8F0",
};

const darkTheme = {
  background: "#0C111D",
  textPrimary: "#F9FAFB",
  textSecondary: "#98A2B3",
  surface: "#1D2939",
  brand: "#7592FF",
  brandHover: "#465FFF",
  blueLight: "#36BFFA",
  success: "#6CE9A6",
  error: "#F97066",
  border: "#374151",
};

const Overview = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage ("dark" / "light")
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update Tailwind + save to localStorage when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // theme object
  const colors = darkMode ? darkTheme : lightTheme;

  // Your existing data arrays remain exactly the same...
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

  // The rest of your component JSX remains exactly the same...
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.textPrimary,
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Header with Theme Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                background: `linear-gradient(to right, ${colors.brand}, ${colors.blueLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Overview
            </h1>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: "0.75rem",
              color: colors.textPrimary,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.brand;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.surface;
              e.currentTarget.style.color = colors.textPrimary;
            }}
          >
            {darkMode ? (
              <>
                <Sun size={16} />
                Light Mode
              </>
            ) : (
              <>
                <Moon size={16} />
                Dark Mode
              </>
            )}
          </button>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              icon: FileText,
              label: "Total Offers",
              value: overallStats.totalOffers,
              subtitle: `${overallStats.finalOffers} final offer${
                overallStats.finalOffers !== 1 ? "s" : ""
              }`,
              color: colors.brand,
            },
            {
              icon: Award,
              label: "Certifications",
              value: overallStats.totalCertifications,
              subtitle: `${overallStats.totalLearningWeeks} weeks total`,
              color: colors.success,
            },
            {
              icon: FolderGit2,
              label: "Projects",
              value: overallStats.totalProjects,
              subtitle: `${overallStats.uniqueTechs} technologies`,
              color: colors.blueLight,
            },
            {
              icon: Briefcase,
              label: "Internships",
              value: overallStats.totalInternships,
              subtitle: `${overallStats.activeInternships} active`,
              color: colors.error,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: colors.textSecondary,
                      marginBottom: "0.25rem",
                      fontWeight: "500",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: colors.textPrimary,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: colors.textSecondary,
                    }}
                  >
                    {stat.subtitle}
                  </p>
                </div>
                <div
                  style={{
                    height: "3.5rem",
                    width: "3.5rem",
                    background: `${stat.color}15`,
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <stat.icon size={28} color={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Offers */}
            <div
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <Building2 size={20} color={colors.brand} />
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: colors.textPrimary,
                  }}
                >
                  Job Offers
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem",
                      background: `${colors.textSecondary}10`,
                      borderRadius: "0.75rem",
                      border: `1px solid ${colors.border}`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.1)";
                      e.currentTarget.style.background = `${colors.brand}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = `${colors.textSecondary}10`;
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          height: "3rem",
                          width: "3rem",
                          background: `${colors.brand}15`,
                          borderRadius: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Building2 size={24} color={colors.brand} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontWeight: "600",
                            color: colors.textPrimary,
                            fontSize: "1.125rem",
                          }}
                        >
                          {offer.companyName}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: colors.textSecondary,
                          }}
                        >
                          {offer.companyType}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          color: colors.textPrimary,
                          fontSize: "1.25rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        ₹{offer.packageValue} LPA
                      </p>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          background:
                            offer.status === "final"
                              ? colors.success
                              : colors.textSecondary,
                          color: "white",
                        }}
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
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <BarChart3 size={20} color={colors.brand} />
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: colors.textPrimary,
                  }}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem 0",
                      borderBottom:
                        idx < 3 ? `1px solid ${colors.border}` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: colors.textSecondary,
                        fontWeight: "500",
                      }}
                    >
                      {item.label}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: colors.textPrimary,
                          fontSize: "1.125rem",
                        }}
                      >
                        {item.value}
                      </span>
                      {item.icon && (
                        <item.icon size={16} color={colors.success} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <FolderGit2 size={20} color={colors.blueLight} />
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: colors.textPrimary,
                }}
              >
                Projects
              </h2>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: "1.25rem",
                    background: `${colors.textSecondary}10`,
                    borderRadius: "0.75rem",
                    border: `1px solid ${colors.border}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.1)";
                    e.currentTarget.style.background = `${colors.blueLight}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = `${colors.textSecondary}10`;
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontWeight: "600",
                          color: colors.textPrimary,
                          fontSize: "1.125rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {project.projectTitle}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: colors.textSecondary,
                          lineHeight: "1.5",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.25rem 0.75rem",
                        border: `1px solid ${colors.border}`,
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        color: colors.textSecondary,
                        marginLeft: "0.75rem",
                        flexShrink: 0,
                        background: colors.surface,
                      }}
                    >
                      <Users size={12} />
                      {project.groupMembers}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {project.technologies.split(",").map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: "0.25rem 0.75rem",
                          background: `${colors.blueLight}15`,
                          color: colors.blueLight,
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Certifications */}
            <div
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <Award size={20} color={colors.success} />
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: colors.textPrimary,
                  }}
                >
                  Certifications
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {certifications.slice(0, 3).map((cert) => (
                  <div
                    key={cert.id}
                    style={{
                      padding: "1rem",
                      background: `${colors.textSecondary}10`,
                      borderRadius: "0.5rem",
                      border: `1px solid ${colors.border}`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.1)";
                      e.currentTarget.style.background = `${colors.success}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = `${colors.textSecondary}10`;
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: "600",
                        fontSize: "0.875rem",
                        color: colors.textPrimary,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cert.certificationName}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          color: colors.textSecondary,
                          fontWeight: "500",
                        }}
                      >
                        {cert.platform}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          color: colors.textSecondary,
                        }}
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
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <Briefcase size={20} color={colors.error} />
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: colors.textPrimary,
                  }}
                >
                  Internships
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {internships.map((intern) => {
                  const start = new Date(intern.startDate);
                  const end = new Date(intern.endDate);
                  const today = new Date();
                  const isActive = start <= today && end >= today;

                  return (
                    <div
                      key={intern.id}
                      style={{
                        padding: "1rem",
                        background: `${colors.textSecondary}10`,
                        borderRadius: "0.5rem",
                        border: `1px solid ${colors.border}`,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0,0,0,0.1)";
                        e.currentTarget.style.background = `${colors.error}08`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = `${colors.textSecondary}10`;
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "space-between",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <h4
                          style={{
                            fontWeight: "600",
                            fontSize: "0.875rem",
                            color: colors.textPrimary,
                          }}
                        >
                          {intern.companyName}
                        </h4>
                        {isActive && (
                          <span
                            style={{
                              padding: "0.125rem 0.5rem",
                              background: `${colors.success}15`,
                              color: colors.success,
                              border: `1px solid ${colors.success}30`,
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                            }}
                          >
                            ● Active
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.75rem",
                          color: colors.textSecondary,
                          marginBottom: "0.5rem",
                        }}
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
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: colors.textPrimary,
                        }}
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

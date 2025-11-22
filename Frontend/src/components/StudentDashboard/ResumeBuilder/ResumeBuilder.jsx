import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { exportAsLatex } from "./LatexExporter";

import {
  ATSClassicTable,
  ATSMinimalist,
  ATSStructuredBlocks,
  ModernTwoColumn,
  ModernCleanSingleColumn,
  ModernAccentLines,
  CreativeBoldSidebar,
  CreativeColorfulHeader,
  CreativeDecorative,
} from "./templates";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Template Components
export default function ResumeBuilder() {
  // UI state
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [template, setTemplate] = useState("ats-classic-table");
  const { theme } = useTheme();
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Data state
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    address: "",
    education: [],
    technicalSkills: [],
    programmingLanguages: [],
    frameworks: [],
    tools: [],
    softSkills: [],
    languages: [],
    projects: [],
    internships: [],
    certifications: [],
    achievements: [],
  });

  // New entry states
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newSkill, setNewSkill] = useState({ type: "technical", name: "" });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
  });
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newCertification, setNewCertification] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
  });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
  });

  const tabs = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "💼" },
    { id: "experience", label: "Experience", icon: "🏢" },
    { id: "certifications", label: "Certifications", icon: "📜" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
  ];

  // Template options
  const templateOptions = [
    { value: "ats-classic-table", label: "ATS: Classic Table" },
    { value: "ats-minimalist", label: "ATS: Minimalist" },
    { value: "ats-structured-blocks", label: "ATS: Structured Blocks" },
    { value: "modern-two-column", label: "Modern: Two-Column Elegant" },
    {
      value: "modern-clean-single-column",
      label: "Modern: Clean Single-Column",
    },
    { value: "modern-accent-lines", label: "Modern: Accent Lines" },
    { value: "creative-bold-sidebar", label: "Creative: Bold Sidebar (Photo)" },
    {
      value: "creative-colorful-header",
      label: "Creative: Colorful Header (Photo)",
    },
    { value: "creative-decorative", label: "Creative: Decorative (Photo)" },
  ];

  // Helpers
  const handleInputChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
    setNewEducation({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowEducationModal(false);
  };

  const addSkill = () => {
    if (newSkill.type === "technical") {
      setResumeData((prev) => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, newSkill.name],
      }));
    } else {
      setResumeData((prev) => ({
        ...prev,
        softSkills: [...prev.softSkills, newSkill.name],
      }));
    }
    setNewSkill({ type: "technical", name: "" });
    setShowSkillModal(false);
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
    setNewProject({ title: "", description: "", technologies: "", link: "" });
    setShowProjectModal(false);
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      internships: [...prev.internships, newExperience],
    }));
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowExperienceModal(false);
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }));
    setNewCertification({ title: "", issuer: "", date: "", description: "" });
    setShowCertificationModal(false);
  };

  const addAchievement = () => {
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }));
    setNewAchievement({ title: "", description: "", date: "" });
    setShowAchievementModal(false);
  };

  const removeItem = (field, index) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // PDF generator
  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview-content");
    let previewWasOpen = showPreview;
    if (!element) {
      setShowPreview(true);
      await new Promise((resolve) => setTimeout(resolve, 450));
    }
    const el = document.getElementById("resume-preview-content");
    if (!el) {
      alert(
        "Could not find resume preview element to export. Please try again."
      );
      if (!previewWasOpen) setShowPreview(false);
      return;
    }
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      if (!previewWasOpen) setShowPreview(false);
    }
  };

  // Theme

  const light = () => ({
    background: "#F9FAFB",
    surface: "#FFFFFF",
    textPrimary: "#101828",
    textSecondary: "#667085",
    border: "#E5E7EB",
    brand: "#465FFF",
    brandHover: "#3641F5",
    info: "#0BA5EC",
    success: "#32D583",
    error: "#F04438",
    overlay: "#00000080",
    softBg: "#F2F4F7",
  });
  const dark = () => ({
    background: "#020617",
    surface: "#1D2939",
    textPrimary: "#F9FAFB",
    textSecondary: "#98A2B3",
    border: "#2B3440",
    brand: "#7592FF",
    brandHover: "#465FFF",
    info: "#36BFFA",
    success: "#6CE9A6",
    error: "#F97066",
    overlay: "#00000080",
    softBg: "#0F1724",
  });

  const colors = theme === "dark" ? dark() : light();

  // UI helpers
  const cardStyle = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
  };

  const panelStyle = {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
  };

  // Render the selected template
  const renderTemplate = () => {
    switch (template) {
      case "ats-classic-table":
        return <ATSClassicTable resumeData={resumeData} />;

      case "ats-minimalist":
        return <ATSMinimalist resumeData={resumeData} />;

      case "ats-structured-blocks":
        return <ATSStructuredBlocks resumeData={resumeData} />;

      case "modern-two-column":
        return <ModernTwoColumn resumeData={resumeData} />;

      case "modern-clean-single-column":
        return <ModernCleanSingleColumn resumeData={resumeData} />;

      case "modern-accent-lines":
        return <ModernAccentLines resumeData={resumeData} />;

      case "creative-bold-sidebar":
        return <CreativeBoldSidebar resumeData={resumeData} photo={photo} />;

      case "creative-colorful-header":
        return <CreativeColorfulHeader resumeData={resumeData} photo={photo} />;

      case "creative-decorative":
        return <CreativeDecorative resumeData={resumeData} photo={photo} />;

      default:
        return <ATSClassicTable resumeData={resumeData} />;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: colors.background,
        color: colors.textPrimary,
        fontFamily:
          "Urbanist, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <style>{`
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-left { animation: slideInFromLeft 0.45s ease-out both; }
        .animate-slide-in-right { animation: slideInFromRight 0.45s ease-out both; }
        .animate-fade-in-up { animation: fadeInUp 0.45s ease-out both; }
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px #00000014; }
        .input-field { transition: box-shadow 0.18s ease; }
        .input-field:focus { box-shadow: 0 6px 18px #0000000a; outline: none; }
        .glass-effect-safe {
          border-radius: 24px;
          box-shadow: 0 8px 30px #00000014;
        }
        @media (max-width: 1024px) {
          .sticky-desktop { position: static; top: auto; }
        }
        .resume-light,
        .resume-light * {
          background-color: #ffffff !important;
          color: #101828 !important;
          border-color: #e5e7eb !important;
        }
        .resume-light a {
          color: #465FFF !important;
        }
      `}</style>

      {/* Header */}
      <div className="py-5 px-6">
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{ fontSize: 28, fontWeight: 700, color: colors.textPrimary }}
          >
            Resume Builder
          </h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                color: colors.textPrimary,
              }}
            >
              {templateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => exportAsLatex(resumeData)}
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "#6B7280", // Gray color for distinction
                color: "#ffffff",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              className="hover-lift"
            >
              Export as LaTeX
            </button>
            <button
              onClick={() => exportAsDocx(resumeData)}
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: "#6B7280", // Gray color for distinction
                color: "#ffffff",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              className="hover-lift"
            >
              Export as DOCX/TXT
            </button>
            <button
              onClick={downloadPDF}
              style={{
                padding: "10px 16px",
                borderRadius: 12,
                background: colors.brand,
                color: "#ffffff",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              className="hover-lift"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {/* Left sidebar */}
          <div
            className="animate-slide-in-left"
            style={{ gridColumn: "span 1" }}
          >
            <div
              className="glass-effect-safe"
              style={{ padding: 24, ...cardStyle }}
            >
              <h3
                style={{
                  marginBottom: 14,
                  fontWeight: 700,
                  color: colors.textPrimary,
                }}
              >
                Sections
              </h3>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      textAlign: "left",
                      padding: "10px 14px",
                      borderRadius: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background:
                        activeTab === tab.id ? colors.brand : "transparent",
                      color:
                        activeTab === tab.id ? "#fff" : colors.textSecondary,
                      border:
                        activeTab === tab.id
                          ? `1px solid ${colors.brand}`
                          : "none",
                      cursor: "pointer",
                    }}
                    className="animate-fade-in-up"
                  >
                    <span style={{ fontSize: 18 }}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
              <button
                onClick={() => setShowPreview((s) => !s)}
                style={{
                  marginTop: 18,
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  background: "#32D583",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                className="hover-lift"
              >
                {showPreview ? "📝 Edit Resume" : "Preview Resume"}
              </button>
            </div>
          </div>

          {/* Main form */}
          <div
            className="animate-slide-in-right"
            style={{ gridColumn: "span 2" }}
          >
            <div
              className="glass-effect-safe"
              style={{ padding: 28, ...panelStyle, minHeight: 520 }}
            >
              {/* PERSONAL */}
              {activeTab === "personal" && (
                <div style={{ display: "grid", gap: 16 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Personal Information
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Let's start with your basic details
                    </p>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 12,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        value={resumeData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="John Doe"
                        className="input-field"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        value={resumeData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className="input-field"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        value={resumeData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+1 234 567 8900"
                        className="input-field"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        LinkedIn
                      </label>
                      <input
                        value={resumeData.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        placeholder="linkedin.com/in/johndoe"
                        className="input-field"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        GitHub
                      </label>
                      <input
                        value={resumeData.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        placeholder="github.com/johndoe"
                        className="input-field"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        Portfolio
                      </label>
                      <input
                        value={resumeData.portfolio}
                        onChange={(e) =>
                          handleInputChange("portfolio", e.target.value)
                        }
                        placeholder="johndoe.com"
                        className="input-field"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: 8,
                        color: colors.textPrimary,
                        fontWeight: 600,
                      }}
                    >
                      Address
                    </label>
                    <textarea
                      value={resumeData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      rows="3"
                      placeholder="Your full address"
                      className="input-field"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: `1px solid ${colors.border}`,
                        background: colors.surface,
                        color: colors.textPrimary,
                      }}
                    />
                  </div>
                  {template.startsWith("creative-") && (
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: 8,
                          color: colors.textPrimary,
                          fontWeight: 600,
                        }}
                      >
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      <button
                        onClick={() => fileInputRef.current.click()}
                        style={{
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                          cursor: "pointer",
                        }}
                      >
                        {photo ? "Change Photo" : "Upload Photo"}
                      </button>
                      {photo && (
                        <img
                          src={photo}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            marginTop: "12px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* EDUCATION */}
              {activeTab === "education" && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Education
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Add your educational background
                    </p>
                  </div>
                  {resumeData.education.length > 0 ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {resumeData.education.map((edu, index) => (
                        <div
                          key={index}
                          style={{
                            ...cardStyle,
                            padding: 16,
                            borderRadius: 12,
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => removeItem("education", index)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: "transparent",
                              border: "none",
                              color: colors.error,
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                          <h3
                            style={{
                              fontWeight: 700,
                              color: colors.textPrimary,
                            }}
                          >
                            {edu.degree}
                          </h3>
                          <p style={{ color: colors.textSecondary }}>
                            {edu.institution}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              fontSize: 13,
                            }}
                          >
                            {edu.startDate} - {edu.endDate}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              marginTop: 8,
                            }}
                          >
                            {edu.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: 12,
                        padding: 18,
                        ...cardStyle,
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: colors.textSecondary,
                          marginBottom: 12,
                        }}
                      >
                        No education entries yet
                      </p>
                      <button
                        onClick={() => setShowEducationModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.brand,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add Education
                      </button>
                    </div>
                  )}
                  {resumeData.education.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => setShowEducationModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.success,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add More Education
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SKILLS */}
              {activeTab === "skills" && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Skills
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Showcase your technical and soft skills
                    </p>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{ ...cardStyle, padding: 16, borderRadius: 12 }}
                    >
                      <h3
                        style={{ fontWeight: 700, color: colors.textPrimary }}
                      >
                        💻 Technical Skills
                      </h3>
                      {resumeData.technicalSkills.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            marginTop: 8,
                          }}
                        >
                          {resumeData.technicalSkills.map((s, i) => (
                            <div
                              key={i}
                              style={{
                                background: "#E6F0FF",
                                color: "#0B4CE1",
                                padding: "6px 10px",
                                borderRadius: 999,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span style={{ fontSize: 13 }}>{s}</span>
                              <button
                                onClick={() => removeItem("technicalSkills", i)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color: colors.brand,
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: colors.textSecondary }}>
                          No technical skills added yet
                        </p>
                      )}
                      <div style={{ marginTop: 12 }}>
                        <button
                          onClick={() => {
                            setNewSkill({ type: "technical", name: "" });
                            setShowSkillModal(true);
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: "#fff",
                            border: `1px solid ${colors.brand}`,
                            color: colors.brand,
                            cursor: "pointer",
                          }}
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>
                    <div
                      style={{ ...cardStyle, padding: 16, borderRadius: 12 }}
                    >
                      <h3
                        style={{ fontWeight: 700, color: colors.textPrimary }}
                      >
                        🎯 Soft Skills
                      </h3>
                      {resumeData.softSkills.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            marginTop: 8,
                          }}
                        >
                          {resumeData.softSkills.map((s, i) => (
                            <div
                              key={i}
                              style={{
                                background: "#ECFDF5",
                                color: "#065F46",
                                padding: "6px 10px",
                                borderRadius: 999,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span style={{ fontSize: 13 }}>{s}</span>
                              <button
                                onClick={() => removeItem("softSkills", i)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#16A34A",
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: colors.textSecondary }}>
                          No soft skills added yet
                        </p>
                      )}
                      <div style={{ marginTop: 12 }}>
                        <button
                          onClick={() => {
                            setNewSkill({ type: "soft", name: "" });
                            setShowSkillModal(true);
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: "#fff",
                            border: `1px solid ${colors.success}`,
                            color: colors.success,
                            cursor: "pointer",
                          }}
                        >
                          + Add Skill
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROJECTS */}
              {activeTab === "projects" && (
                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Projects
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Add your best projects and work
                    </p>
                  </div>
                  {resumeData.projects.length > 0 ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {resumeData.projects.map((project, index) => (
                        <div
                          key={index}
                          style={{
                            ...cardStyle,
                            padding: 16,
                            borderRadius: 12,
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => removeItem("projects", index)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: "transparent",
                              border: "none",
                              color: colors.error,
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                          <h3
                            style={{
                              fontWeight: 700,
                              color: colors.textPrimary,
                            }}
                          >
                            {project.title}
                          </h3>
                          <p
                            style={{
                              color: colors.textSecondary,
                              fontSize: 13,
                            }}
                          >
                            {project.technologies}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              marginTop: 6,
                            }}
                          >
                            {project.description}
                          </p>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: colors.brand,
                                display: "inline-block",
                                marginTop: 8,
                              }}
                            >
                              View Project
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: 12,
                        padding: 18,
                        ...cardStyle,
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: colors.textSecondary,
                          marginBottom: 12,
                        }}
                      >
                        No projects added yet
                      </p>
                      <button
                        onClick={() => setShowProjectModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.brand,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add Project
                      </button>
                    </div>
                  )}
                  {resumeData.projects.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => setShowProjectModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.success,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add More Projects
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* EXPERIENCE */}
              {activeTab === "experience" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Work Experience
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Document your professional journey
                    </p>
                  </div>
                  {resumeData.internships.length > 0 ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {resumeData.internships.map((exp, index) => (
                        <div
                          key={index}
                          style={{
                            ...cardStyle,
                            padding: 16,
                            borderRadius: 12,
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => removeItem("internships", index)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: "transparent",
                              border: "none",
                              color: colors.error,
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                          <h3
                            style={{
                              fontWeight: 700,
                              color: colors.textPrimary,
                            }}
                          >
                            {exp.position}
                          </h3>
                          <p style={{ color: colors.textSecondary }}>
                            {exp.company}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              fontSize: 13,
                            }}
                          >
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              marginTop: 8,
                            }}
                          >
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: 12,
                        padding: 18,
                        ...cardStyle,
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: colors.textSecondary,
                          marginBottom: 12,
                        }}
                      >
                        No experience entries yet
                      </p>
                      <button
                        onClick={() => setShowExperienceModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: "#FB923C",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add Experience
                      </button>
                    </div>
                  )}
                  {resumeData.internships.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => setShowExperienceModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.success,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add More Experience
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CERTIFICATIONS */}
              {activeTab === "certifications" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Certifications
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Add your certifications
                    </p>
                  </div>
                  {resumeData.certifications.length > 0 ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {resumeData.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          style={{
                            ...cardStyle,
                            padding: 16,
                            borderRadius: 12,
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => removeItem("certifications", idx)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: "transparent",
                              border: "none",
                              color: colors.error,
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                          <h3
                            style={{
                              fontWeight: 700,
                              color: colors.textPrimary,
                            }}
                          >
                            {cert.title}
                          </h3>
                          <p style={{ color: colors.textSecondary }}>
                            {cert.issuer}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              fontSize: 13,
                            }}
                          >
                            {cert.date}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              marginTop: 6,
                            }}
                          >
                            {cert.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: 12,
                        padding: 18,
                        ...cardStyle,
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: colors.textSecondary,
                          marginBottom: 12,
                        }}
                      >
                        No certifications added yet
                      </p>
                      <button
                        onClick={() => setShowCertificationModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: "#F59E0B",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add Certification
                      </button>
                    </div>
                  )}
                  {resumeData.certifications.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => setShowCertificationModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.success,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add More Certifications
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ACHIEVEMENTS */}
              {activeTab === "achievements" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: colors.textPrimary,
                      }}
                    >
                      Achievements
                    </h2>
                    <p style={{ color: colors.textSecondary }}>
                      Highlight your accomplishments
                    </p>
                  </div>
                  {resumeData.achievements.length > 0 ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {resumeData.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          style={{
                            ...cardStyle,
                            padding: 16,
                            borderRadius: 12,
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => removeItem("achievements", idx)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              background: "transparent",
                              border: "none",
                              color: colors.error,
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                          <h3
                            style={{
                              fontWeight: 700,
                              color: colors.textPrimary,
                            }}
                          >
                            {ach.title}
                          </h3>
                          <p style={{ color: colors.textSecondary }}>
                            {ach.description}
                          </p>
                          <p
                            style={{
                              color: colors.textSecondary,
                              fontSize: 12,
                              marginTop: 6,
                            }}
                          >
                            {ach.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        borderRadius: 12,
                        padding: 18,
                        ...cardStyle,
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: colors.textSecondary,
                          marginBottom: 12,
                        }}
                      >
                        No achievements added yet
                      </p>
                      <button
                        onClick={() => setShowAchievementModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.success,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add Achievement
                      </button>
                    </div>
                  )}
                  {resumeData.achievements.length > 0 && (
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={() => setShowAchievementModal(true)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          background: colors.success,
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover-lift"
                      >
                        + Add More Achievements
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        {/* Education Modal */}
        {showEducationModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: 620,
                maxWidth: "100%",
                borderRadius: 16,
                ...cardStyle,
                padding: 18,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontWeight: 700, color: colors.textPrimary }}>
                  Add Education
                </h3>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      color: colors.textPrimary,
                    }}
                  >
                    Institution
                  </label>
                  <input
                    value={newEducation.institution}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        institution: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      color: colors.textPrimary,
                    }}
                  >
                    Degree
                  </label>
                  <input
                    value={newEducation.degree}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        degree: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <input
                    type="date"
                    value={newEducation.startDate}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        startDate: e.target.value,
                      })
                    }
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                  <input
                    type="date"
                    value={newEducation.endDate}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        endDate: e.target.value,
                      })
                    }
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 6,
                      color: colors.textPrimary,
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={newEducation.description}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowEducationModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addEducation}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Education
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Skill Modal */}
        {showSkillModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: 520,
                maxWidth: "100%",
                borderRadius: 16,
                ...cardStyle,
                padding: 18,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontWeight: 700, color: colors.textPrimary }}>
                  Add {newSkill.type === "technical" ? "Technical" : "Soft"}{" "}
                  Skill
                </h3>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <input
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  placeholder="e.g., React, Communication"
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowSkillModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addSkill}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Modal */}
        {showProjectModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: 720,
                maxWidth: "100%",
                borderRadius: 16,
                ...cardStyle,
                padding: 18,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontWeight: 700, color: colors.textPrimary }}>
                  Add Project
                </h3>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <input
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="Project Title"
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="Description"
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  value={newProject.technologies}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      technologies: e.target.value,
                    })
                  }
                  placeholder="Technologies used"
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  value={newProject.link}
                  onChange={(e) =>
                    setNewProject({ ...newProject, link: e.target.value })
                  }
                  placeholder="Project link (optional)"
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowProjectModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addProject}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experience Modal */}
        {showExperienceModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: 680,
                maxWidth: "100%",
                borderRadius: 16,
                ...cardStyle,
                padding: 18,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontWeight: 700, color: colors.textPrimary }}>
                  Add Experience
                </h3>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <input
                  value={newExperience.company}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      company: e.target.value,
                    })
                  }
                  placeholder="Company"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  value={newExperience.position}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      position: e.target.value,
                    })
                  }
                  placeholder="Position"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  <input
                    type="date"
                    value={newExperience.startDate}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        startDate: e.target.value,
                      })
                    }
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                  <input
                    type="date"
                    value={newExperience.endDate}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        endDate: e.target.value,
                      })
                    }
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  />
                </div>
                <textarea
                  value={newExperience.description}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="Description"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowExperienceModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addExperience}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Experience
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Certification Modal */}
        {showCertificationModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: 600,
                maxWidth: "100%",
                borderRadius: 16,
                ...cardStyle,
                padding: 18,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontWeight: 700, color: colors.textPrimary }}>
                  Add Certification
                </h3>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <input
                  value={newCertification.title}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      title: e.target.value,
                    })
                  }
                  placeholder="Certification title"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  value={newCertification.issuer}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      issuer: e.target.value,
                    })
                  }
                  placeholder="Issuer"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="date"
                  value={newCertification.date}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      date: e.target.value,
                    })
                  }
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <textarea
                  value={newCertification.description}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="Description"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowCertificationModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addCertification}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Certification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Modal */}
        {showAchievementModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: 600,
                maxWidth: "100%",
                borderRadius: 16,
                ...cardStyle,
                padding: 18,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontWeight: 700, color: colors.textPrimary }}>
                  Add Achievement
                </h3>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <input
                  value={newAchievement.title}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      title: e.target.value,
                    })
                  }
                  placeholder="Title"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <textarea
                  value={newAchievement.description}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  placeholder="Description"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
                <input
                  type="date"
                  value={newAchievement.date}
                  onChange={(e) =>
                    setNewAchievement({
                      ...newAchievement,
                      date: e.target.value,
                    })
                  }
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowAchievementModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    color: colors.textPrimary,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={addAchievement}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: colors.brand,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Add Achievement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: colors.overlay,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 60,
              padding: 16,
            }}
          >
            <div
              style={{
                width: "92%",
                maxWidth: 1080,
                borderRadius: 16,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 16,
                  borderBottom: `1px solid ${colors.border}`,
                  background: colors.surface,
                }}
              >
                <h3 style={{ fontWeight: 800, color: colors.textPrimary }}>
                  Resume Preview
                </h3>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={downloadPDF}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      background: colors.brand,
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                    className="hover-lift"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: `1px solid ${colors.border}`,
                      background: colors.surface,
                      color: colors.textPrimary,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div className="resume-light">
                  <div
                    id="resume-preview-content"
                    style={{
                      borderRadius: 12,
                      padding: 24,
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      color: "#101828",
                    }}
                  >
                    {renderTemplate()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

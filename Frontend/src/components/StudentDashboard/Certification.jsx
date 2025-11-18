import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const CertificationManager = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [certifications, setCertifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    certificationName: "",
    platform: "",
    duration: "",
    certificate: null,
  });

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
    inputDisabled: "disabled:bg-slate-100",
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
    modalOverlay: "bg-black/60",
    modalHeader: "bg-slate-100",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-white",
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
    calendarIcon: "text-slate-500",
    offerLetterText: "text-green-600",
    statusActiveBg: "bg-green-500",
    statusUpcomingBg: "bg-blue-500",
    statusCompletedBg: "bg-slate-200",
    statusCompletedText: "text-slate-700",
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
    inputDisabled: "disabled:bg-slate-800",
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80",
    modalHeader: "border-slate-200",
    modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-900",
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
    calendarIcon: "text-slate-400",
    offerLetterText: "text-green-400",
    statusActiveBg: "bg-green-600",
    statusUpcomingBg: "bg-blue-600",
    statusCompletedBg: "bg-slate-700",
    statusCompletedText: "text-slate-300",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = certifications.length;
    const totalWeeks = certifications.reduce(
      (sum, cert) => sum + (parseFloat(cert.duration) || 0),
      0
    );
    const platforms = new Set(certifications.map((c) => c.platform)).size;
    const avgDuration = total > 0 ? totalWeeks / total : 0;
    return { total, totalWeeks, platforms, avgDuration };
  }, [certifications]);

  const resetForm = () => {
    setFormData({
      certificationName: "",
      platform: "",
      duration: "",
      certificate: null,
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, certificate: file.name }));
    }
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setCertifications((prev) =>
        prev.map((cert) =>
          cert.id === editingId ? { ...formData, id: editingId } : cert
        )
      );
    } else {
      const newCertification = {
        ...formData,
        id: Date.now(),
      };
      setCertifications((prev) => [...prev, newCertification]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (certification) => {
    setFormData({
      certificationName: certification.certificationName,
      platform: certification.platform,
      duration: certification.duration,
      certificate: certification.certificate,
    });
    setEditingId(certification.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (certification) => {
    setFormData({
      certificationName: certification.certificationName,
      platform: certification.platform,
      duration: certification.duration,
      certificate: certification.certificate,
    });
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    }
  };

  const getPlatformColor = (platform) => {
    const key = platform.toLowerCase();
    return themeStyles.platformColor[key] || themeStyles.platformColor.default;
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Certification Details
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg  bg-blue-700 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: Award,
              label: "Total Certifications",
              value: stats.total,
              subtitle: "certificates earned",
              bgColor: themeStyles.statCard1Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: BookOpen,
              label: "Learning Platforms",
              value: stats.platforms,
              subtitle: "platforms used",
              bgColor: themeStyles.statCard2Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: TrendingUp,
              label: "Total Learning Time",
              value: `${stats.totalWeeks} wks`,
              subtitle: "time invested",
              bgColor: themeStyles.statCard3Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: Clock,
              label: "Avg Duration",
              value: `${stats.avgDuration.toFixed(1)} wks`,
              subtitle: "average per course",
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

        {/* Certification Cards */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Your Certifications
          </h2>

          {certifications.length === 0 ? (
            <div
              className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.emptyStateBg}`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <Award
                    className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No Certifications Yet
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Start building your professional portfolio by adding your
                  first certification
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Certification
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.cardBg}`}
                >
                  <div
                    className={`h-2 ${getPlatformColor(
                      certification.platform
                    )}`}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3
                        className={`text-xl font-bold ${themeStyles.textPrimary} flex-1 pr-2 line-clamp-2`}
                      >
                        {certification.certificationName}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] text-white whitespace-nowrap`}
                      >
                        {certification.duration}
                      </span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Platform
                        </span>
                        <span
                          className={`font-semibold ${themeStyles.textPrimary}`}
                        >
                          {certification.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock
                          className={`h-4 w-4 ${themeStyles.textTertiary}`}
                        />
                        <span className={`${themeStyles.textSecondary}`}>
                          Duration:
                        </span>
                        <span
                          className={`font-medium ${themeStyles.textPrimary}`}
                        >
                          {certification.duration} weeks
                        </span>
                      </div>
                      {certification.certificate && (
                        <div className="flex items-center gap-2 text-sm pt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span
                            className={`font-medium ${themeStyles.offerLetterText}`}
                          >
                            Certificate attached
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(certification)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(certification)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(certification.id)}
                        className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 border-[var(--color-error-500)] dark:border-[var(--color-error-400)] text-[var(--color-error-500)] dark:text-[var(--color-error-400)] hover:bg-[var(--color-error-500)] hover:dark:bg-[var(--color-error-400)] hover:text-white transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-lg border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              {/* HEADER */}
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <div className="flex items-center gap-3">
                  {viewMode && (
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <h2
                    className={`text-2xl font-bold ${themeStyles.textPrimary}`}
                  >
                    {viewMode
                      ? "Certification Details"
                      : editingId
                      ? "Edit Certification"
                      : "Add New Certification"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* BODY */}
              <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Certification Name */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Certification Name{" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="certificationName"
                    value={formData.certificationName}
                    onChange={handleInputChange}
                    placeholder="Enter Certification Name"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Platform */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Certification Platform{" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    placeholder="Eg. Udemy, Coursera"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Duration */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Certificate Duration (In weeks){" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Enter Certification Duration in weeks"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* File Upload */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Upload Certificate
                  </label>
                  {viewMode ? (
                    <div
                      className={`px-4 py-3 ${themeStyles.inputBg} rounded-lg ${themeStyles.textPrimary}`}
                    >
                      {formData.certificate || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand-500)] file:text-white hover:file:bg-[var(--color-brand-600)] file:cursor-pointer cursor-pointer ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                    />
                  )}
                  {formData.certificate && (
                    <p className={`text-sm ${themeStyles.textSecondary} mt-2`}>
                      Selected: {formData.certificate}
                    </p>
                  )}
                </div>
                {/* Buttons */}
                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                    >
                      {editingId ? "Update Certification" : "Add Certification"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationManager;

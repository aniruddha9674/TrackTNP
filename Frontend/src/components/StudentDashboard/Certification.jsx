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
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const CertificationManager = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [certifications, setCertifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
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
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
            Certification
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Add Certification
          </button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className={`bg-gradient-to-br ${stat.bgColor} ${themeStyles.cardBorder} border ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} p-6 rounded-xl transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.iconBg} p-3 rounded-lg ${themeStyles.cardShadow}`}
                >
                  <stat.icon className={stat.iconColor} size={24} />
                </div>
              </div>
              <div className={`text-sm ${themeStyles.textSecondary} mb-1`}>
                {stat.label}
              </div>
              <div className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${themeStyles.textTertiary} mt-1`}>
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>

        <h2 className={`text-xl font-bold ${themeStyles.textPrimary} mb-6`}>
          Your Certifications
        </h2>

        {/* Certification Cards */}
        <div
          className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border ${themeStyles.cardShadow} rounded-xl p-6`}
        >
          {certifications.length === 0 ? (
            <div
              className={`${themeStyles.emptyStateBg} ${themeStyles.cardBorder}   rounded-xl p-12 text-center`}
            >
              <Award
                className={`${themeStyles.emptyStateIcon} mx-auto mb-4`}
                size={64}
              />
              <h3
                className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
              >
                No Certifications Yet
              </h3>
              <p className={`${themeStyles.textSecondary} mb-6`}>
                Start building your professional portfolio by adding your first
                certification
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
              >
                <Plus size={20} className="mr-2" />
                Add Your First Certification
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} rounded-xl p-6 transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold ${themeStyles.textPrimary} mb-2`}
                      >
                        {certification.certificationName}
                      </h3>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700`}
                      >
                        <Clock size={14} className="mr-1" />
                        {certification.duration}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <BookOpen
                        size={16}
                        className={`${themeStyles.textSecondary} mr-2`}
                      />
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Platform
                      </span>
                      <span
                        className={`text-sm ${themeStyles.textPrimary} ml-auto font-medium`}
                      >
                        {certification.platform}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock
                        size={16}
                        className={`${themeStyles.textSecondary} mr-2`}
                      />
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Duration: {certification.duration} weeks
                      </span>
                    </div>
                  </div>

                  {certification.certificate && (
                    <div
                      className={`mb-4 p-3 rounded-lg ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}
                    >
                      <p
                        className={`text-xs ${themeStyles.offerLetterText} font-medium`}
                      >
                        📄 Certificate attached
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(certification)}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(certification)}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      <Edit2 size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(certification.id)}
                      className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm`}
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            />

            <div className="flex min-h-full items-center justify-center p-4">
              <div
                className={`relative ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl shadow-2xl w-full max-w-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* HEADER */}
                <div
                  className={`flex items-center justify-between p-6 border-b ${themeStyles.modalHeaderBorder}`}
                >
                  {viewMode && (
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
                    >
                      <ArrowLeft size={20} />
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
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6">
                  {/* Certification Name */}
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
                    >
                      Certification Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="certificationName"
                      value={formData.certificationName}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      placeholder="e.g., AWS Certified Solutions Architect"
                      className={`w-full px-4 py-3 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} ${themeStyles.inputDisabled} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    />
                  </div>

                  {/* Platform */}
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
                    >
                      Certification Platform{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      placeholder="e.g., Coursera, Udemy, AWS"
                      className={`w-full px-4 py-3 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} ${themeStyles.inputDisabled} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
                    >
                      Certificate Duration (In weeks){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      placeholder="e.g., 12"
                      className={`w-full px-4 py-3 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} ${themeStyles.inputDisabled} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
                    >
                      Upload Certificate
                    </label>
                    {viewMode ? (
                      <div
                        className={`w-full px-4 py-3 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.textSecondary}`}
                      >
                        {formData.certificate || "No file uploaded"}
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className={`w-full px-4 py-3 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.inputText} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all`}
                      />
                    )}
                    {formData.certificate && (
                      <p
                        className={`mt-2 text-sm ${themeStyles.textSecondary}`}
                      >
                        Selected: {formData.certificate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                {!viewMode && (
                  <div className="flex gap-3 p-6 ">
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
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
                    >
                      {editingId ? "Update Certification" : "Add Certification"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm`}
              onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteId(null);
              }}
            />

            <div
              className={`relative ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl shadow-2xl w-full max-w-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 pb-4">
                <h2
                  className={`text-2xl font-semibold ${themeStyles.textPrimary}`}
                >
                  Confirm Deletion
                </h2>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center p-1 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textSecondary}`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="px-6 pb-6">
                <p
                  className={`${themeStyles.textSecondary} mb-8 text-base leading-relaxed`}
                >
                  Are you sure you want to delete this certification? This
                  action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteId(null);
                    }}
                    className={`px-6 py-2.5 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationManager;

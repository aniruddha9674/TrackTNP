import React, { useState, useMemo, useEffect } from "react";
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
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";
import {
  fetchCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../Utils/api/certificationApi";

// map a backend certification object -> the shape this component works with
const fromApi = (c) => ({
  id: c.id,
  certificationName: c.certification_name,
  platform: c.platform,
  duration: c.duration,
  certificate: c.certificate_file, // Cloudinary URL string, or null
});

const CertificationManager = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    certificationName: "",
    platform: "",
    duration: "",
    certificate: null, // File object (new upload) or existing Cloudinary URL string
  });
  const [fieldErrors, setFieldErrors] = useState({});

  // ─── Load certifications from backend on mount ───────────────────────────
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await fetchCertifications();
        setCertifications(data.map(fromApi));
      } catch (err) {
        console.error("Failed to load certifications", err);
        setLoadError("Couldn't load your certifications. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ─── Themes ───────────────────────────────────────────────────────────────
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
    inputErrorBorder: "border-red-400",
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
    errorText: "text-red-500",
    errorBg: "bg-red-50",
    errorBorder: "border-red-200",
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
    inputErrorBorder: "border-red-500",
    inputDisabled: "disabled:bg-slate-800",
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80",
    modalHeader: "bg-slate-800",
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
    errorText: "text-red-400",
    errorBg: "bg-red-900/20",
    errorBorder: "border-red-700",
  });

  const t = isDarkTheme ? getDarkTheme() : getLightTheme();

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = certifications.length;
    const totalHours = certifications.reduce(
      (sum, cert) => sum + (parseFloat(cert.duration) || 0),
      0
    );
    const platforms = new Set(certifications.map((c) => c.platform)).size;
    const avgDuration = total > 0 ? totalHours / total : 0;
    return { total, totalHours, platforms, avgDuration };
  }, [certifications]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({ certificationName: "", platform: "", duration: "", certificate: null });
    setFieldErrors({});
    setSaveError("");
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // store the real File object so it can be uploaded as multipart/form-data
      setFormData((prev) => ({ ...prev, certificate: file }));
    }
  };

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};

    const certName = formData.certificationName.trim();
    if (!certName) {
      errors.certificationName = "Certification name is required.";
    } else if (certName.length < 3) {
      errors.certificationName = "Certification name must be at least 3 characters.";
    }

    const platform = formData.platform.trim();
    if (!platform) {
      errors.platform = "Platform name is required.";
    } else if (platform.length < 2) {
      errors.platform = "Platform name must be at least 2 characters.";
    }

    const duration = formData.duration.toString().trim();
    if (!duration) {
      errors.duration = "Duration is required.";
    } else if (isNaN(duration) || Number(duration) <= 0) {
      errors.duration = "Enter a valid positive number of hours (e.g. 100).";
    } else if (!Number.isInteger(Number(duration))) {
      errors.duration = "Duration must be a whole number of hours.";
    } else if (Number(duration) > 1000) {
      errors.duration = "Duration seems too long (max 1000 hours). Please verify.";
    }

    return errors;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSaving(true);
    setSaveError("");

    const payload = new FormData();
    payload.append("certification_name", formData.certificationName.trim());
    payload.append("platform", formData.platform.trim());
    payload.append("duration", formData.duration);
    // only attach the file field if a new File was actually chosen —
    // avoids overwriting an existing Cloudinary file with nothing on edit
    if (formData.certificate instanceof File) {
      payload.append("certificate_file", formData.certificate);
    }

    try {
      if (editingId !== null) {
        const updated = await updateCertification(editingId, payload);
        setCertifications((prev) =>
          prev.map((cert) => (cert.id === editingId ? fromApi(updated) : cert))
        );
      } else {
        const created = await createCertification(payload);
        setCertifications((prev) => [...prev, fromApi(created)]);
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
      setSaveError("Something went wrong while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (certification) => {
    setFormData({
      certificationName: certification.certificationName,
      platform: certification.platform,
      duration: certification.duration,
      certificate: certification.certificate, // existing Cloudinary URL until replaced
    });
    setFieldErrors({});
    setSaveError("");
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
    setFieldErrors({});
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteCertification(deleteId);
      setCertifications((prev) => prev.filter((cert) => cert.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(false);
    }
  };

  // ─── Reusable field error ──────────────────────────────────────────────────
  const FieldError = ({ error }) =>
    error ? (
      <p className={`flex items-center gap-1.5 text-xs mt-1.5 ${t.errorText}`}>
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        {error}
      </p>
    ) : null;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen ${t.background} p-4 md:p-6`}>
      <div className="max-w-full mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className={`text-2xl md:text-3xl font-bold ${t.textPrimary}`}>
            Certification
          </h1>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 font-medium transition-all shadow-lg whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            Add Certification
          </button>
        </div>

        {/* Load error banner */}
        {loadError && (
          <div className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
            <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
            <p className={`text-sm ${t.errorText}`}>{loadError}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              Icon: Award,
              label: "Total Certifications",
              value: stats.total,
              gradient: t.statCard1Gradient,
              iconBg: t.statIcon1Bg,
              iconColor: t.statIcon1Text,
            },
            {
              Icon: BookOpen,
              label: "Learning Platforms",
              value: stats.platforms,
              gradient: t.statCard2Gradient,
              iconBg: t.statIcon2Bg,
              iconColor: t.statIcon2Text,
            },
            {
              Icon: TrendingUp,
              label: "Total Learning Time",
              value: `${stats.totalHours} hrs`,
              gradient: t.statCard3Gradient,
              iconBg: t.statIcon3Bg,
              iconColor: t.statIcon3Text,
            },
            {
              Icon: Clock,
              label: "Avg Duration",
              value: `${stats.avgDuration.toFixed(1)} hrs`,
              gradient: t.statCard4Gradient,
              iconBg: t.statIcon4Bg,
              iconColor: t.statIcon4Text,
            },
          ].map(({ Icon, label, value, subtitle, gradient, iconBg, iconColor }) => (
            <div
              key={label}
              className={`rounded-xl border ${t.cardBorder} ${t.cardShadow} ${t.cardHoverShadow} bg-gradient-to-br ${gradient} transition-all`}
            >
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${t.textSecondary}`}>{label}</p>
                  <h3 className={`text-3xl font-bold ${t.textPrimary} mt-2`}>{value}</h3>
                  <p className={`text-xs ${t.textTertiary} mt-1`}>{subtitle}</p>
                </div>
                <div className={`h-12 w-12 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className={`text-xl font-bold ${t.textPrimary} mb-6`}>
          Your Certifications
        </h2>

        {/* Certification Cards */}
        {loading ? (
          <div className={`${t.cardBg} ${t.cardBorder} border ${t.cardShadow} rounded-xl p-4 md:p-6`}>
            <div className="p-8 md:p-12 text-center flex flex-col items-center">
              <Loader2 className={`h-8 w-8 animate-spin ${t.textTertiary} mb-3`} />
              <p className={t.textSecondary}>Loading your certifications...</p>
            </div>
          </div>
        ) : certifications.length === 0 ? (
          <div className={`${t.cardBg} ${t.cardBorder} border ${t.cardShadow} rounded-xl p-4 md:p-6`}>
            <div className={`${t.emptyStateBg} ${t.cardBorder} rounded-xl p-8 md:p-12 text-center`}>
              <Award className={`${t.emptyStateIcon} mx-auto mb-4`} size={64} />
              <h3 className={`text-xl font-semibold ${t.textPrimary} mb-2`}>
                No Certifications Yet
              </h3>
              <p className={`${t.textSecondary} mb-6`}>
                Start building your professional portfolio by adding your first certification
              </p>
              <button
                onClick={() => { resetForm(); setShowModal(true); }}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
              >
                <Plus size={20} className="mr-2" />
                Add Your First Certification
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className={`${t.cardBg} ${t.cardBorder} border ${t.cardShadow} ${t.cardHoverShadow} rounded-xl p-5 md:p-6 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base md:text-lg font-bold ${t.textPrimary} mb-2 break-words`}>
                      {certification.certificationName}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      <Clock size={14} className="mr-1" />
                      {certification.duration} Hrs
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <BookOpen size={16} className={`${t.textSecondary} mr-2 shrink-0`} />
                    <span className={`text-sm ${t.textSecondary}`}>Platform</span>
                    <span className={`text-sm ${t.textPrimary} ml-auto font-medium truncate max-w-[120px] md:max-w-none text-right`}>
                      {certification.platform}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className={`${t.textSecondary} mr-2 shrink-0`} />
                    <span className={`text-sm ${t.textSecondary}`}>
                      Duration: {certification.duration} Hours
                    </span>
                  </div>
                </div>

                {certification.certificate && (
                  <a
                    href={certification.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block mb-4 p-3 rounded-lg ${t.inputBg} border ${t.inputBorder} hover:underline`}
                  >
                    <p className={`text-xs ${t.offerLetterText} font-medium`}>
                      📄 View attached certificate
                    </p>
                  </a>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(certification)}
                    className={`flex-1 inline-flex items-center justify-center px-2 md:px-3 py-2 text-sm rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                  >
                    <Eye size={16} className="mr-1 shrink-0" />
                    <span className="truncate">View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(certification)}
                    className={`flex-1 inline-flex items-center justify-center px-2 md:px-3 py-2 text-sm rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                  >
                    <Edit2 size={16} className="mr-1 shrink-0" />
                    <span className="truncate">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(certification.id)}
                    className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Add / Edit / View Modal ───────────────────────────────────────── */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm`}
              onClick={() => { setShowModal(false); resetForm(); }}
            />
            <div className="flex min-h-full items-center justify-center p-3 md:p-4">
              <div
                className={`relative ${t.cardBg} ${t.cardBorder} border rounded-2xl shadow-2xl w-full max-w-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className={`flex items-center justify-between p-4 md:p-6 border-b ${t.modalHeader} ${t.modalHeaderBorder}`}>
                  {viewMode && (
                    <button
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <h2 className={`text-xl md:text-2xl font-bold ${t.textPrimary}`}>
                    {viewMode
                      ? "Certification Details"
                      : editingId
                        ? "Edit Certification"
                        : "Add New Certification"}
                  </h2>
                  <button
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className={`inline-flex items-center justify-center p-2 rounded-lg ${t.buttonHover} ${t.textPrimary}`}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Validation summary banner */}
                {!viewMode && Object.keys(fieldErrors).length > 0 && (
                  <div className={`mx-4 md:mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                    <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                    <p className={`text-sm ${t.errorText}`}>
                      Please fix the highlighted fields before submitting.
                    </p>
                  </div>
                )}

                {/* Save error banner */}
                {!viewMode && saveError && (
                  <div className={`mx-4 md:mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                    <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                    <p className={`text-sm ${t.errorText}`}>{saveError}</p>
                  </div>
                )}

                {/* Body */}
                <div className="p-4 md:p-6 space-y-4 md:space-y-5">

                  {/* Certification Name */}
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      Certification Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="certificationName"
                      value={formData.certificationName}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      placeholder="e.g., AWS Certified Solutions Architect"
                      className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.certificationName ? t.inputErrorBorder : t.inputBorder
                        } ${t.inputBg} ${t.inputText} ${t.inputPlaceholder} ${t.inputDisabled} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    />
                    <FieldError error={fieldErrors.certificationName} />
                  </div>

                  {/* Platform */}
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      Certification Platform <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      placeholder="e.g., Coursera, Udemy, AWS"
                      className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.platform ? t.inputErrorBorder : t.inputBorder
                        } ${t.inputBg} ${t.inputText} ${t.inputPlaceholder} ${t.inputDisabled} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    />
                    <FieldError error={fieldErrors.platform} />
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      Certificate Duration (in Hours) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      placeholder="e.g., 12"
                      min="1"
                      step="1"
                      className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.duration ? t.inputErrorBorder : t.inputBorder
                        } ${t.inputBg} ${t.inputText} ${t.inputPlaceholder} ${t.inputDisabled} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    />
                    <FieldError error={fieldErrors.duration} />
                  </div>

                  {/* Certificate Upload */}
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      Upload Certificate
                      <span className={`ml-1.5 text-xs font-normal ${t.textTertiary}`}>(optional)</span>
                    </label>
                    {viewMode ? (
                      <div className={`w-full px-4 py-3 rounded-lg border ${t.inputBorder} ${t.inputBg} ${t.textSecondary}`}>
                        {formData.certificate ? (
                          <a
                            href={formData.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View uploaded certificate
                          </a>
                        ) : (
                          "No file uploaded"
                        )}
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className={`w-full px-4 py-3 rounded-lg border ${t.inputBorder} ${t.inputBg} ${t.inputText} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer transition-all`}
                      />
                    )}
                    {formData.certificate && (
                      <p className={`mt-1 text-sm ${t.textSecondary}`}>
                        {formData.certificate instanceof File
                          ? `Selected: ${formData.certificate.name}`
                          : "Existing file on record — choose a new one to replace it."}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {!viewMode && (
                  <div className="flex gap-3 p-4 md:p-6 pt-0">
                    <button
                      onClick={() => { setShowModal(false); resetForm(); }}
                      disabled={saving}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={saving}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                      {saving ? "Saving..." : editingId ? "Update Certification" : "Add Certification"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Confirm Modal ──────────────────────────────────────────── */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
            <div
              className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm`}
              onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
            />
            <div
              className={`relative ${t.cardBg} ${t.cardBorder} border rounded-2xl shadow-2xl w-full max-w-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 md:p-6 pb-4">
                <h2 className={`text-xl md:text-2xl font-semibold ${t.textPrimary}`}>
                  Confirm Deletion
                </h2>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
                  disabled={deleting}
                  className={`inline-flex items-center justify-center p-1 rounded-lg ${t.buttonHover} ${t.textSecondary} disabled:opacity-60`}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className={`${t.textSecondary} mb-6 md:mb-8 text-base leading-relaxed`}>
                  Are you sure you want to delete this certification? This action cannot be undone.
                </p>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <button
                    onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
                    disabled={deleting}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-lg ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all disabled:opacity-60`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all disabled:opacity-60"
                  >
                    {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {deleting ? "Deleting..." : "Delete"}
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
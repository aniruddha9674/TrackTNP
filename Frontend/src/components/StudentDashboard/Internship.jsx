import { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    companyName: "",
    stipend: "",
    startDate: "",
    endDate: "",
    offerLetter: null,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = internships.length;
    const today = new Date();

    const active = internships.filter((i) => {
      const start = new Date(i.startDate);
      const end = new Date(i.endDate);
      return start <= today && end >= today;
    }).length;

    const totalStipend = internships.reduce(
      (sum, i) => sum + (parseFloat(i.stipend) || 0),
      0
    );

    const avgDuration =
      internships.length > 0
        ? internships.reduce((sum, i) => {
          const start = new Date(i.startDate);
          const end = new Date(i.endDate);
          const months =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
          return sum + months;
        }, 0) / internships.length
        : 0;

    return { total, active, totalStipend, avgDuration };
  }, [internships]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({
      companyName: "",
      stipend: "",
      startDate: "",
      endDate: "",
      offerLetter: null,
    });
    setFieldErrors({});
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Also re-validate endDate live when startDate changes
    if (name === "startDate" && fieldErrors.endDate) {
      setFieldErrors((prev) => ({ ...prev, endDate: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, offerLetter: file.name }));
      if (fieldErrors.offerLetter) {
        setFieldErrors((prev) => ({ ...prev, offerLetter: "" }));
      }
    }
  };

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};

    const companyName = formData.companyName.trim();
    if (!companyName) {
      errors.companyName = "Company name is required.";
    } else if (companyName.length < 2) {
      errors.companyName = "Company name must be at least 2 characters.";
    }

    const stipend = formData.stipend.toString().trim();
    if (!stipend) {
      errors.stipend = "Stipend amount is required.";
    } else if (isNaN(stipend) || Number(stipend) < 0) {
      errors.stipend = "Enter a valid non-negative number (e.g. 25000).";
    } else if (Number(stipend) > 10000000) {
      errors.stipend = "Stipend amount seems unusually high. Please verify.";
    }

    if (!formData.startDate) {
      errors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      errors.endDate = "End date is required.";
    } else if (
      formData.startDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      errors.endDate = "End date must be after the start date.";
    }

    return errors;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (editingId !== null) {
      setInternships((prev) =>
        prev.map((intern) =>
          intern.id === editingId ? { ...formData, id: editingId } : intern
        )
      );
    } else {
      setInternships((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (internship) => {
    setFormData({
      companyName: internship.companyName,
      stipend: internship.stipend,
      startDate: internship.startDate,
      endDate: internship.endDate,
      offerLetter: internship.offerLetter,
    });
    setFieldErrors({});
    setEditingId(internship.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (internship) => {
    setFormData({
      companyName: internship.companyName,
      stipend: internship.stipend,
      startDate: internship.startDate,
      endDate: internship.endDate,
      offerLetter: internship.offerLetter,
    });
    setFieldErrors({});
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setInternships((prev) => prev.filter((member) => member.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today < start) return "upcoming";
    if (today > end) return "completed";
    return "active";
  };

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

  const t = theme === "dark" ? getDarkTheme() : getLightTheme();

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
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className={`min-h-screen ${t.background}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Urbanist', sans-serif; }
      `}</style>

      <div className="max-w-full mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className={`text-3xl font-bold ${t.textPrimary}`}>Internship</h1>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Internship
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Internships",
              value: stats.total,
              gradient: t.statCard1Gradient,
              iconBg: t.statIcon1Bg,
              iconColor: t.statIcon1Text,
              Icon: Briefcase,
            },
            {
              label: "Active Now",
              value: stats.active,
              gradient: t.statCard2Gradient,
              iconBg: t.statIcon2Bg,
              iconColor: t.statIcon2Text,
              Icon: TrendingUp,
            },
            {
              label: "Total Stipend",
              value: `₹${stats.totalStipend.toLocaleString()}`,
              gradient: t.statCard3Gradient,
              iconBg: t.statIcon3Bg,
              iconColor: t.statIcon3Text,
              Icon: TrendingUp,
            },
            {
              label: "Avg Duration",
              value: (
                <>
                  {stats.avgDuration.toFixed(1)}
                  <span className={`text-lg ${t.textSecondary} ml-1`}>mo</span>
                </>
              ),
              gradient: t.statCard4Gradient,
              iconBg: t.statIcon4Bg,
              iconColor: t.statIcon4Text,
              Icon: Clock,
            },
          ].map(({ label, value, gradient, iconBg, iconColor, Icon }) => (
            <div
              key={label}
              className={`rounded-xl border ${t.cardBorder} ${t.cardShadow} ${t.cardHoverShadow} bg-gradient-to-br ${gradient} transition-all`}
            >
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${t.textSecondary}`}>{label}</p>
                  <h3 className={`text-3xl font-bold ${t.textPrimary} mt-2`}>{value}</h3>
                </div>
                <div className={`h-12 w-12 ${iconBg} rounded-full flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Internship Cards */}
        <div>
          <h2 className={`text-xl font-semibold ${t.textPrimary} mb-4`}>
            Your Internships
          </h2>
          {internships.length === 0 ? (
            <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-sm`}>
              <div className="p-12 text-center">
                <div className={`mx-auto w-24 h-24 ${t.emptyStateBg} rounded-full flex items-center justify-center mb-4`}>
                  <Briefcase className={`h-12 w-12 ${t.emptyStateIcon}`} />
                </div>
                <h3 className={`text-xl font-semibold ${t.textPrimary} mb-2`}>
                  No Internships Yet
                </h3>
                <p className={`${t.textSecondary} mb-6`}>
                  Start building your portfolio by adding your first internship
                </p>
                <button
                  onClick={() => { resetForm(); setShowModal(true); }}
                  className={`inline-flex items-center px-4 py-2 rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Internship
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship) => {
                const status = getStatus(internship.startDate, internship.endDate);
                return (
                  <div
                    key={internship.id}
                    className={`rounded-xl border overflow-hidden ${t.cardBg} ${t.cardBorder} ${t.cardShadow} ${t.cardHoverShadow} transition-all duration-300`}
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className={`text-xl font-bold ${t.textPrimary} truncate flex-1 pr-2`}>
                          {internship.companyName}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${status === "active"
                              ? t.statusActiveBg
                              : status === "upcoming"
                                ? t.statusUpcomingBg
                                : `${t.statusCompletedBg} ${t.statusCompletedText}`
                            }`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className={`flex items-center justify-between py-2 border-b ${t.dividerBorder}`}>
                          <span className={`text-sm ${t.textSecondary}`}>Stipend</span>
                          <span className={`font-semibold ${t.textPrimary}`}>
                            ₹{parseFloat(internship.stipend).toLocaleString()}/mo
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className={`h-4 w-4 ${t.calendarIcon}`} />
                          <span className={t.textSecondary}>Start:</span>
                          <span className={`font-medium ${t.textPrimary}`}>
                            {formatDate(internship.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className={`h-4 w-4 ${t.calendarIcon}`} />
                          <span className={t.textSecondary}>End:</span>
                          <span className={`font-medium ${t.textPrimary}`}>
                            {formatDate(internship.endDate)}
                          </span>
                        </div>
                        {internship.offerLetter && (
                          <div className="flex items-center gap-2 text-sm pt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className={`${t.offerLetterText} font-medium`}>
                              Offer letter attached
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(internship)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </button>
                        <button
                          onClick={() => handleEdit(internship)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                        >
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(internship.id)}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} text-red-600 hover:bg-red-600 hover:text-white transition-colors`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Add / Edit / View Modal ───────────────────────────────────────── */}
        {showModal && (
          <div
            className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border ${t.cardBg} ${t.cardBorder}`}
            >
              {/* Header */}
              <div
                className={`sticky top-0 ${t.modalHeader} ${t.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${t.textPrimary}`}>
                  {viewMode
                    ? "Internship Details"
                    : editingId
                      ? "Edit Internship"
                      : "Add New Internship"}
                </h2>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className={`p-2 rounded-lg ${t.buttonHover} transition-colors`}
                >
                  <X className={`h-5 w-5 ${t.textPrimary}`} />
                </button>
              </div>

              {/* Validation summary banner */}
              {!viewMode && Object.keys(fieldErrors).length > 0 && (
                <div className={`mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                  <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                  <p className={`text-sm ${t.errorText}`}>
                    Please fix the highlighted fields before submitting.
                  </p>
                </div>
              )}

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Google, Microsoft, Meta"
                    disabled={viewMode}
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.companyName ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.companyName} />
                </div>

                {/* Stipend */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Monthly Stipend (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g., 25000"
                    disabled={viewMode}
                    min="0"
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.stipend ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.stipend} />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.startDate ? t.inputErrorBorder : t.inputBorder
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} transition-all`}
                    />
                    <FieldError error={fieldErrors.startDate} />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      min={formData.startDate || undefined}
                      className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.endDate ? t.inputErrorBorder : t.inputBorder
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} transition-all`}
                    />
                    <FieldError error={fieldErrors.endDate} />
                  </div>
                </div>

                {/* Offer Letter */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Offer Letter
                    <span className={`ml-1.5 text-xs font-normal ${t.textTertiary}`}>(optional)</span>
                  </label>
                  {viewMode ? (
                    <div className={`px-4 py-3 ${t.emptyStateBg} rounded-lg ${t.textPrimary}`}>
                      {formData.offerLetter || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className={`w-full px-4 py-3 ${t.inputBg} border ${t.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer ${t.inputText} transition-all`}
                    />
                  )}
                  {formData.offerLetter && (
                    <p className={`text-sm ${t.textSecondary} mt-1`}>
                      Selected: {formData.offerLetter}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className={`flex-1 px-4 py-2 rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      {editingId ? "Update Internship" : "Add Internship"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Confirm Modal ──────────────────────────────────────────── */}
        {showDeleteConfirm && (
          <div
            className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${t.cardBg} ${t.cardBorder} p-6`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${t.textPrimary}`}>Confirm Deletion</h2>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${t.buttonHover} ${t.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className={`${t.textSecondary} mb-6`}>
                Are you sure you want to delete this internship? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipManager;
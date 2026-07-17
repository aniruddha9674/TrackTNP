import { useState, useMemo, useRef, useEffect } from "react";
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
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";
import {
  fetchInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../../Utils/api/internshipApi";

// ─── company_type mapping: backend uses lowercase codes, UI shows labels ─────
const COMPANY_TYPE_OPTIONS = [
  { value: "core", label: "Core" },
  { value: "service", label: "Service" },
  { value: "product", label: "Product" },
  { value: "other", label: "Other" },
];
const labelForType = (value) =>
  COMPANY_TYPE_OPTIONS.find((o) => o.value === value)?.label || "";
const valueForLabel = (label) =>
  COMPANY_TYPE_OPTIONS.find((o) => o.label === label)?.value || "";

// map a backend internship object -> the shape this component works with
const fromApi = (i) => ({
  id: i.id,
  companyName: i.company_name,
  companyType: labelForType(i.company_type),
  stipend: i.stipend,
  startDate: i.start_date,
  endDate: i.end_date,
  offerLetter: i.offer_letter, // Cloudinary URL string, or null
});

// ─── CustomSelect ─────────────────────────────────────────────────────────────
const CustomSelect = ({ value, onChange, options, hasError, disabled, t }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`w-full px-4 py-3 text-left flex items-center justify-between rounded-lg border
          ${hasError ? t.inputErrorBorder : t.inputBorder}
          ${t.inputBg} ${t.inputDisabled} disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
      >
        <span className={`${t.inputText} ${!value ? t.inputPlaceholder : ""}`}>
          {value || "Select an option"}
        </span>
        <ChevronDown
          className={`h-4 w-4 ${t.textTertiary} transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className={`absolute z-50 mt-1 w-full rounded-lg border ${t.cardBorder} ${t.cardBg} shadow-xl overflow-hidden`}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                ${value === opt
                  ? `bg-blue-50 text-blue-600 font-semibold`
                  : `${t.textPrimary} ${t.buttonHover}`
                }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── InternshipManager ────────────────────────────────────────────────────────
const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    companyName: "",
    stipend: "",
    companyType: "",
    startDate: "",
    endDate: "",
    offerLetter: null, // File object (new upload) or existing Cloudinary URL string
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Load internships from backend on mount ──────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await fetchInternships();
        setInternships(data.map(fromApi));
      } catch (err) {
        console.error("Failed to load internships", err);
        setLoadError("Couldn't load your internships. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ─── Stats ──────────────────────────────────────────────────────────────────
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

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({
      companyName: "",
      stipend: "",
      companyType: "",
      startDate: "",
      endDate: "",
      offerLetter: null,
    });
    setFieldErrors({});
    setSaveError("");
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "startDate" && fieldErrors.endDate)
      setFieldErrors((prev) => ({ ...prev, endDate: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // store the real File object so it can be uploaded as multipart/form-data
      setFormData((prev) => ({ ...prev, offerLetter: file }));
      if (fieldErrors.offerLetter)
        setFieldErrors((prev) => ({ ...prev, offerLetter: "" }));
    }
  };

  // ─── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};

    const companyName = formData.companyName.trim();
    if (!companyName) errors.companyName = "Company name is required.";
    else if (companyName.length < 2)
      errors.companyName = "Company name must be at least 2 characters.";

    const stipend = formData.stipend.toString().trim();
    if (!stipend) errors.stipend = "Stipend amount is required.";
    else if (isNaN(stipend) || Number(stipend) < 0)
      errors.stipend = "Enter a valid non-negative number (e.g. 25000).";
    else if (Number(stipend) > 10000000)
      errors.stipend = "Stipend amount seems unusually high. Please verify.";

    if (!formData.companyType) errors.companyType = "Company type is required.";

    if (!formData.startDate) errors.startDate = "Start date is required.";

    if (!formData.endDate) errors.endDate = "End date is required.";
    else if (
      formData.startDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    )
      errors.endDate = "End date must be after the start date.";

    return errors;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSaving(true);
    setSaveError("");

    const payload = new FormData();
    payload.append("company_name", formData.companyName.trim());
    payload.append("company_type", valueForLabel(formData.companyType));
    payload.append("stipend", formData.stipend);
    payload.append("start_date", formData.startDate);
    payload.append("end_date", formData.endDate);
    // only attach the file field if a new File was actually chosen —
    // avoids overwriting an existing Cloudinary file with nothing on edit
    if (formData.offerLetter instanceof File) {
      payload.append("offer_letter", formData.offerLetter);
    }

    try {
      if (editingId !== null) {
        const updated = await updateInternship(editingId, payload);
        setInternships((prev) =>
          prev.map((intern) => (intern.id === editingId ? fromApi(updated) : intern))
        );
      } else {
        const created = await createInternship(payload);
        setInternships((prev) => [...prev, fromApi(created)]);
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

  const handleEdit = (internship) => {
    setFormData({
      companyName: internship.companyName,
      stipend: internship.stipend,
      companyType: internship.companyType || "",
      startDate: internship.startDate,
      endDate: internship.endDate,
      offerLetter: internship.offerLetter, // existing Cloudinary URL (string) until replaced
    });
    setFieldErrors({});
    setSaveError("");
    setEditingId(internship.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (internship) => {
    setFormData({
      companyName: internship.companyName,
      stipend: internship.stipend,
      companyType: internship.companyType || "",
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

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteInternship(deleteId);
      setInternships((prev) => prev.filter((i) => i.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(false);
    }
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

  // ─── Themes ──────────────────────────────────────────────────────────────────
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

  const FieldError = ({ error }) =>
    error ? (
      <p className={`flex items-center gap-1.5 text-xs mt-1.5 ${t.errorText}`}>
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        {error}
      </p>
    ) : null;

  // ─── Render ──────────────────────────────────────────────────────────────────
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

        {/* Load error banner */}
        {loadError && (
          <div className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
            <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
            <p className={`text-sm ${t.errorText}`}>{loadError}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Internships", value: stats.total, gradient: t.statCard1Gradient, iconBg: t.statIcon1Bg, iconColor: t.statIcon1Text, Icon: Briefcase },
            { label: "Active Now", value: stats.active, gradient: t.statCard2Gradient, iconBg: t.statIcon2Bg, iconColor: t.statIcon2Text, Icon: TrendingUp },
            { label: "Total Stipend", value: `₹${stats.totalStipend.toLocaleString()}`, gradient: t.statCard3Gradient, iconBg: t.statIcon3Bg, iconColor: t.statIcon3Text, Icon: TrendingUp },
            {
              label: "Avg Duration",
              value: (<>{stats.avgDuration.toFixed(1)}<span className={`text-lg ${t.textSecondary} ml-1`}>mo</span></>),
              gradient: t.statCard4Gradient, iconBg: t.statIcon4Bg, iconColor: t.statIcon4Text, Icon: Clock
            },
          ].map(({ label, value, gradient, iconBg, iconColor, Icon }) => (
            <div key={label} className={`rounded-xl border ${t.cardBorder} ${t.cardShadow} ${t.cardHoverShadow} bg-gradient-to-br ${gradient} transition-all`}>
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
          <h2 className={`text-xl font-semibold ${t.textPrimary} mb-4`}>Your Internships</h2>

          {loading ? (
            <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-sm`}>
              <div className="p-12 text-center flex flex-col items-center">
                <Loader2 className={`h-8 w-8 animate-spin ${t.textTertiary} mb-3`} />
                <p className={t.textSecondary}>Loading your internships...</p>
              </div>
            </div>
          ) : internships.length === 0 ? (
            <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-sm`}>
              <div className="p-12 text-center">
                <div className={`mx-auto w-24 h-24 ${t.emptyStateBg} rounded-full flex items-center justify-center mb-4`}>
                  <Briefcase className={`h-12 w-12 ${t.emptyStateIcon}`} />
                </div>
                <h3 className={`text-xl font-semibold ${t.textPrimary} mb-2`}>No Internships Yet</h3>
                <p className={`${t.textSecondary} mb-6`}>Start building your portfolio by adding your first internship</p>
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
                  <div key={internship.id} className={`rounded-xl border overflow-hidden ${t.cardBg} ${t.cardBorder} ${t.cardShadow} ${t.cardHoverShadow} transition-all duration-300`}>
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-2">
                          <h3 className={`text-xl font-bold ${t.textPrimary} truncate`}>{internship.companyName}</h3>
                          {internship.companyType && (
                            <span className={`text-xs font-medium ${t.textSecondary} mt-0.5 block`}>{internship.companyType}</span>
                          )}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                          status === "active" ? t.statusActiveBg : status === "upcoming" ? t.statusUpcomingBg : `${t.statusCompletedBg} ${t.statusCompletedText}`
                        }`}>
                          {status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className={`flex items-center justify-between py-2 border-b ${t.dividerBorder}`}>
                          <span className={`text-sm ${t.textSecondary}`}>Stipend</span>
                          <span className={`font-semibold ${t.textPrimary}`}>₹{parseFloat(internship.stipend).toLocaleString()}/mo</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className={`h-4 w-4 ${t.calendarIcon}`} />
                          <span className={t.textSecondary}>Start:</span>
                          <span className={`font-medium ${t.textPrimary}`}>{formatDate(internship.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className={`h-4 w-4 ${t.calendarIcon}`} />
                          <span className={t.textSecondary}>End:</span>
                          <span className={`font-medium ${t.textPrimary}`}>{formatDate(internship.endDate)}</span>
                        </div>
                        {internship.offerLetter && (
                          <a
                            href={internship.offerLetter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm pt-2 hover:underline w-fit"
                          >
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className={`${t.offerLetterText} font-medium`}>View offer letter</span>
                          </a>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => handleView(internship)} className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </button>
                        <button onClick={() => handleEdit(internship)} className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </button>
                        <button onClick={() => handleDelete(internship.id)} className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} text-red-600 hover:bg-red-600 hover:text-white transition-colors`}>
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

        {/* ── Add / Edit / View Modal ─────────────────────────────────────────── */}
        {showModal && (
          <div className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
            <div className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border ${t.cardBg} ${t.cardBorder}`}>

              {/* Header */}
              <div className={`sticky top-0 ${t.modalHeader} ${t.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}>
                <h2 className={`text-2xl font-bold ${t.textPrimary}`}>
                  {viewMode ? "Internship Details" : editingId ? "Edit Internship" : "Add New Internship"}
                </h2>
                <button onClick={() => { setShowModal(false); resetForm(); }} className={`p-2 rounded-lg ${t.buttonHover} transition-colors`}>
                  <X className={`h-5 w-5 ${t.textPrimary}`} />
                </button>
              </div>

              {/* Validation banner */}
              {!viewMode && Object.keys(fieldErrors).length > 0 && (
                <div className={`mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                  <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                  <p className={`text-sm ${t.errorText}`}>Please fix the highlighted fields before submitting.</p>
                </div>
              )}

              {/* Save error banner */}
              {!viewMode && saveError && (
                <div className={`mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                  <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                  <p className={`text-sm ${t.errorText}`}>{saveError}</p>
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
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.companyName ? t.inputErrorBorder : t.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} ${t.inputPlaceholder} transition-all`}
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
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.stipend ? t.inputErrorBorder : t.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.stipend} />
                </div>

                {/* Company Type */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Company Type <span className="text-red-500">*</span>
                  </label>
                  {viewMode ? (
                    <div className={`px-4 py-3 ${t.emptyStateBg} rounded-lg ${t.textPrimary}`}>
                      {formData.companyType || "Not specified"}
                    </div>
                  ) : (
                    <CustomSelect
                      value={formData.companyType}
                      onChange={(value) => {
                        setFormData((prev) => ({ ...prev, companyType: value }));
                        if (fieldErrors.companyType)
                          setFieldErrors((prev) => ({ ...prev, companyType: "" }));
                      }}
                      hasError={!!fieldErrors.companyType}
                      options={COMPANY_TYPE_OPTIONS.map((o) => o.label)}
                      t={t}
                    />
                  )}
                  <FieldError error={fieldErrors.companyType} />
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
                      className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.startDate ? t.inputErrorBorder : t.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} transition-all`}
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
                      className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.endDate ? t.inputErrorBorder : t.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} transition-all`}
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
                      {formData.offerLetter ? (
                        <a
                          href={formData.offerLetter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View uploaded offer letter
                        </a>
                      ) : (
                        "No file uploaded"
                      )}
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
                      {formData.offerLetter instanceof File
                        ? `Selected: ${formData.offerLetter.name}`
                        : "Existing file on record — choose a new one to replace it."}
                    </p>
                  )}
                </div>

                {/* Actions */}
                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => { setShowModal(false); resetForm(); }}
                      disabled={saving}
                      className={`flex-1 px-4 py-2 rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={saving}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                      {saving ? "Saving..." : editingId ? "Update Internship" : "Add Internship"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Confirm Modal ────────────────────────────────────────────── */}
        {showDeleteConfirm && (
          <div className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
            <div className={`w-full max-w-md rounded-2xl shadow-2xl border ${t.cardBg} ${t.cardBorder} p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${t.textPrimary}`}>Confirm Deletion</h2>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
                  disabled={deleting}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${t.buttonHover} ${t.textPrimary} disabled:opacity-60`}
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
                  disabled={deleting}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all disabled:opacity-60`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all disabled:opacity-60"
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {deleting ? "Deleting..." : "Delete"}
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
import { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  FileText,
  Briefcase,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const OfferLetterManager = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalType, setModalType] = useState("offer");
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    companyName: "",
    packageValue: "",
    companyType: "",
    offerLetterFile: null,
    joiningLetterFile: null,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalOffers = offers.filter((o) => o.status === "offer").length;
    const finalOffers = offers.filter((o) => o.status === "final").length;
    const avgPackage =
      offers.length > 0
        ? offers.reduce(
          (sum, offer) => sum + (parseFloat(offer.packageValue) || 0),
          0
        ) / offers.length
        : 0;
    const uniqueCompanies = new Set(offers.map((o) => o.companyName)).size;
    return { totalOffers, finalOffers, avgPackage, uniqueCompanies };
  }, [offers]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({
      companyName: "",
      packageValue: "",
      companyType: "",
      offerLetterFile: null,
      joiningLetterFile: null,
    });
    setFieldErrors({});
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file.name }));
      if (fieldErrors[fieldName]) {
        setFieldErrors((prev) => ({ ...prev, [fieldName]: "" }));
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

    const pkg = formData.packageValue.trim();
    if (!pkg) {
      errors.packageValue = "Package value is required.";
    } else if (isNaN(pkg) || Number(pkg) <= 0) {
      errors.packageValue = "Enter a valid positive number (e.g. 12.5).";
    } else if (Number(pkg) > 500) {
      errors.packageValue = "Package value seems too high. Please verify.";
    }

    if (!formData.companyType) {
      errors.companyType = "Please select a company type.";
    }

    if (!formData.offerLetterFile) {
      errors.offerLetterFile = "Please upload the offer letter document.";
    }

    if (modalType === "final" && !formData.joiningLetterFile) {
      errors.joiningLetterFile =
        "Please upload the joining letter for a final offer.";
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
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === editingId
            ? {
              ...formData,
              id: editingId,
              status: modalType,
              createdAt: offer.createdAt,
            }
            : offer
        )
      );
    } else {
      const newOffer = {
        ...formData,
        id: Date.now(),
        status: modalType,
        createdAt: new Date(),
      };
      setOffers((prev) => [...prev, newOffer]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (offer) => {
    setFormData({
      companyName: offer.companyName,
      packageValue: offer.packageValue,
      companyType: offer.companyType,
      offerLetterFile: offer.offerLetterFile,
      joiningLetterFile: offer.joiningLetterFile || null,
    });
    setFieldErrors({});
    setEditingId(offer.id);
    setModalType(offer.status);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (offer) => {
    setFormData({
      companyName: offer.companyName,
      packageValue: offer.packageValue,
      companyType: offer.companyType,
      offerLetterFile: offer.offerLetterFile,
      joiningLetterFile: offer.joiningLetterFile || null,
    });
    setFieldErrors({});
    setModalType(offer.status);
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setOffers((prev) => prev.filter((cert) => cert.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleConvertToFinal = (offer) => {
    setFormData({
      companyName: offer.companyName,
      packageValue: offer.packageValue,
      companyType: offer.companyType,
      offerLetterFile: offer.offerLetterFile,
      joiningLetterFile: null,
    });
    setFieldErrors({});
    setEditingId(offer.id);
    setModalType("final");
    setViewMode(false);
    setShowModal(true);
  };

  const openAddModal = (type) => {
    resetForm();
    setModalType(type);
    setShowModal(true);
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
    offerLetterText: "text-green-600",
    statusOfferBg: "bg-blue-500",
    statusFinalBg: "bg-green-500",
    selectTriggerBg: "bg-white",
    selectContentBg: "bg-white",
    selectItemHover: "hover:bg-slate-100",
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
    offerLetterText: "text-green-400",
    statusOfferBg: "bg-blue-600",
    statusFinalBg: "bg-green-600",
    selectTriggerBg: "bg-slate-950",
    selectContentBg: "bg-slate-700",
    selectItemHover: "hover:bg-slate-800",
    errorText: "text-red-400",
    errorBg: "bg-red-900/20",
    errorBorder: "border-red-700",
  });

  const t = theme === "dark" ? getDarkTheme() : getLightTheme();

  // ─── Reusable error message ────────────────────────────────────────────────
  const FieldError = ({ error }) =>
    error ? (
      <p className={`flex items-center gap-1.5 text-xs mt-1.5 ${t.errorText}`}>
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        {error}
      </p>
    ) : null;

  // ─── Custom Select ─────────────────────────────────────────────────────────
  const CustomSelect = ({ value, onChange, disabled, options, hasError }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full flex items-center justify-between px-4 py-3 ${t.inputBg} border ${hasError ? t.inputErrorBorder : t.inputBorder
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputText} ${t.inputDisabled} disabled:cursor-not-allowed transition-all`}
        >
          <span className={value ? "" : t.inputPlaceholder}>
            {value || "Select an option"}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && !disabled && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div
              className={`absolute z-20 w-full mt-2 ${t.selectContentBg} border ${t.inputBorder} rounded-lg shadow-xl max-h-60 overflow-auto`}
            >
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer ${t.selectItemHover} ${t.textPrimary} ${value === option ? t.emptyStateBg : ""
                    }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

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
          <h1 className={`text-3xl font-bold ${t.textPrimary}`}>Offer Letter</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAddModal("offer")}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Offer Letter
            </button>
            <button
              onClick={() => openAddModal("final")}
              className={`inline-flex items-center px-4 py-2 rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Final Offer
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Offer Letters",
              value: stats.totalOffers,
              gradient: t.statCard1Gradient,
              iconBg: t.statIcon1Bg,
              iconColor: t.statIcon1Text,
              Icon: FileText,
            },
            {
              label: "Final Offers",
              value: stats.finalOffers,
              gradient: t.statCard2Gradient,
              iconBg: t.statIcon2Bg,
              iconColor: t.statIcon2Text,
              Icon: CheckCircle,
            },
            {
              label: "Avg Package",
              value: (
                <>
                  {stats.avgPackage.toFixed(1)}
                  <span className={`text-lg ${t.textSecondary} ml-1`}>LPA</span>
                </>
              ),
              gradient: t.statCard3Gradient,
              iconBg: t.statIcon3Bg,
              iconColor: t.statIcon3Text,
              Icon: TrendingUp,
            },
            {
              label: "Companies",
              value: stats.uniqueCompanies,
              gradient: t.statCard4Gradient,
              iconBg: t.statIcon4Bg,
              iconColor: t.statIcon4Text,
              Icon: Briefcase,
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

        {/* Offer list */}
        <div>
          <h2 className={`text-xl font-semibold ${t.textPrimary} mb-4`}>
            Your Offer Letters
          </h2>
          {offers.length === 0 ? (
            <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-sm`}>
              <div className="p-12 text-center">
                <div className={`mx-auto w-24 h-24 ${t.emptyStateBg} rounded-full flex items-center justify-center mb-4`}>
                  <FileText className={`h-12 w-12 ${t.emptyStateIcon}`} />
                </div>
                <h3 className={`text-xl font-semibold ${t.textPrimary} mb-2`}>
                  No Offer Letters Yet
                </h3>
                <p className={`${t.textSecondary} mb-6`}>
                  Start tracking your job offers by adding your first offer letter
                </p>
                <button
                  onClick={() => openAddModal("offer")}
                  className={`inline-flex items-center px-4 py-2 rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Offer Letter
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-xl border overflow-hidden ${t.cardBg} ${t.cardBorder} ${t.cardShadow} ${t.cardHoverShadow} transition-all duration-300`}
                >
                  <div
                    className={`h-2 ${offer.status === "final"
                        ? "bg-gradient-to-r from-green-600 to-green-400"
                        : "bg-gradient-to-r from-blue-600 to-blue-400"
                      }`}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={`text-xl font-bold ${t.textPrimary} truncate flex-1 pr-2`}>
                        {offer.companyName}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${offer.status === "final" ? t.statusFinalBg : t.statusOfferBg
                          }`}
                      >
                        {offer.status === "final" ? "Final" : "Offer"}
                      </span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className={`flex items-center justify-between py-2 border-b ${t.dividerBorder}`}>
                        <span className={`text-sm ${t.textSecondary}`}>Package</span>
                        <span className={`font-semibold ${t.textPrimary}`}>{offer.packageValue} LPA</span>
                      </div>
                      <div className={`flex items-center justify-between py-2 border-b ${t.dividerBorder}`}>
                        <span className={`text-sm ${t.textSecondary}`}>Type</span>
                        <span className={`font-medium ${t.textPrimary}`}>{offer.companyType}</span>
                      </div>
                      {offer.offerLetterFile && (
                        <div className="flex items-center gap-2 text-sm pt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className={`${t.offerLetterText} font-medium`}>Offer letter attached</span>
                        </div>
                      )}
                      {offer.joiningLetterFile && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className={`${t.offerLetterText} font-medium`}>Joining letter attached</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(offer)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </button>
                        <button
                          onClick={() => handleEdit(offer)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} ${t.buttonBg} ${t.textPrimary} ${t.buttonHover} transition-colors`}
                        >
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${t.buttonBorder} text-red-600 hover:bg-red-600 hover:text-white transition-colors`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {offer.status === "offer" && (
                        <button
                          onClick={() => handleConvertToFinal(offer)}
                          className="w-full inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Convert to Final Offer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
              {/* Modal header */}
              <div
                className={`sticky top-0 ${t.modalHeader} ${t.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${t.textPrimary}`}>
                  {viewMode
                    ? `${modalType === "final" ? "Final Offer Letter" : "Offer Letter"} Details`
                    : editingId
                      ? `Edit ${modalType === "final" ? "Final Offer Letter" : "Offer Letter"}`
                      : `Add ${modalType === "final" ? "Final Offer Letter" : "Offer Letter"}`}
                </h2>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className={`p-2 rounded-lg ${t.buttonHover} transition-colors`}
                >
                  <X className={`h-5 w-5 ${t.textPrimary}`} />
                </button>
              </div>

              {/* Validation summary banner — shown when there are errors */}
              {!viewMode && Object.keys(fieldErrors).length > 0 && (
                <div className={`mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-lg border ${t.errorBg} ${t.errorBorder}`}>
                  <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${t.errorText}`} />
                  <p className={`text-sm ${t.errorText}`}>
                    Please fix the highlighted fields before submitting.
                  </p>
                </div>
              )}

              {/* Modal body */}
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

                {/* Package Value */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Package Value (LPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="packageValue"
                    value={formData.packageValue}
                    onChange={handleInputChange}
                    placeholder="e.g., 12.5"
                    disabled={viewMode}
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.packageValue ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} disabled:cursor-not-allowed ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.packageValue} />
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
                      disabled={viewMode}
                      hasError={!!fieldErrors.companyType}
                      options={["Product", "Service", "Startup", "MNC", "Government"]}
                    />
                  )}
                  <FieldError error={fieldErrors.companyType} />
                </div>

                {/* Offer Letter Upload */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Offer Letter <span className="text-red-500">*</span>
                  </label>
                  {viewMode ? (
                    <div className={`px-4 py-3 ${t.emptyStateBg} rounded-lg ${t.textPrimary}`}>
                      {formData.offerLetterFile || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "offerLetterFile")}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.offerLetterFile ? t.inputErrorBorder : t.inputBorder
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer ${t.inputText} transition-all`}
                    />
                  )}
                  {formData.offerLetterFile && !fieldErrors.offerLetterFile && (
                    <p className={`text-sm ${t.textSecondary} mt-1`}>
                      Selected: {formData.offerLetterFile}
                    </p>
                  )}
                  <FieldError error={fieldErrors.offerLetterFile} />
                </div>

                {/* Joining Letter Upload — final offers only */}
                {modalType === "final" && (
                  <div className="space-y-1.5">
                    <label className={`block text-sm font-medium ${t.textPrimary}`}>
                      Joining Letter <span className="text-red-500">*</span>
                    </label>
                    {viewMode ? (
                      <div className={`px-4 py-3 ${t.emptyStateBg} rounded-lg ${t.textPrimary}`}>
                        {formData.joiningLetterFile || "No file uploaded"}
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "joiningLetterFile")}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.joiningLetterFile ? t.inputErrorBorder : t.inputBorder
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer ${t.inputText} transition-all`}
                      />
                    )}
                    {formData.joiningLetterFile && !fieldErrors.joiningLetterFile && (
                      <p className={`text-sm ${t.textSecondary} mt-1`}>
                        Selected: {formData.joiningLetterFile}
                      </p>
                    )}
                    <FieldError error={fieldErrors.joiningLetterFile} />
                  </div>
                )}

                {/* Action buttons */}
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
                      {editingId ? "Update" : "Add"}{" "}
                      {modalType === "final" ? "Final Offer" : "Offer Letter"}
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
                Are you sure you want to delete this offer letter? This action cannot be undone.
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

export default OfferLetterManager;
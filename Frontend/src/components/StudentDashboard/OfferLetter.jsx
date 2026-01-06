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
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const OfferLetterManager = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalType, setModalType] = useState("offer");
  const { theme, toggletheme } = useTheme();
  const [formData, setFormData] = useState({
    companyName: "",
    packageValue: "",
    companyType: "",
    offerLetterFile: null,
    joiningLetterFile: null,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const resetForm = () => {
    setFormData({
      companyName: "",
      packageValue: "",
      companyType: "",
      offerLetterFile: null,
      joiningLetterFile: null,
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file.name }));
    }
  };

  const handleSubmit = () => {
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
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  // Custom Select Component
  const CustomSelect = ({ value, onChange, disabled, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full flex items-center justify-between px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputDisabled} disabled:cursor-not-allowed transition-all`}
        >
          <span className={value ? "" : themeStyles.inputPlaceholder}>
            {value || "Select an option"}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>
        {isOpen && !disabled && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div
              className={`absolute z-20 w-full mt-2 ${themeStyles.selectContentBg} border ${themeStyles.inputBorder} rounded-lg shadow-xl max-h-60 overflow-auto`}
            >
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer ${themeStyles.selectItemHover
                    } ${themeStyles.textPrimary} ${value === option ? themeStyles.emptyStateBg : ""
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

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className={`min-h-screen ${themeStyles.background}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      <div className="max-w-full mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Offer Letter
            </h1>
          </div>
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
              className={`inline-flex items-center px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Final Offer
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Offer Letters
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.totalOffers}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-full flex items-center justify-center`}
                >
                  <FileText
                    className={`h-6 w-6 ${themeStyles.statIcon1Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Final Offers
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.finalOffers}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon2Bg} rounded-full flex items-center justify-center`}
                >
                  <CheckCircle
                    className={`h-6 w-6 ${themeStyles.statIcon2Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Avg Package
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.avgPackage.toFixed(1)}
                    <span
                      className={`text-lg ${themeStyles.textSecondary} ml-1`}
                    >
                      LPA
                    </span>
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon3Bg} rounded-full flex items-center justify-center`}
                >
                  <TrendingUp
                    className={`h-6 w-6 ${themeStyles.statIcon3Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard4Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Companies
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.uniqueCompanies}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon4Bg} rounded-full flex items-center justify-center`}
                >
                  <Briefcase
                    className={`h-6 w-6 ${themeStyles.statIcon4Text}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Letters */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Your Offer Letters
          </h2>
          {offers.length === 0 ? (
            <div
              className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-sm`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <FileText
                    className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No Offer Letters Yet
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Start tracking your job offers by adding your first offer
                  letter
                </p>
                <button
                  onClick={() => openAddModal("offer")}
                  className={`inline-flex items-center px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
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
                  className={`rounded-xl border overflow-hidden ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300`}
                >
                  <div
                    className={`h-2 ${offer.status === "final"
                        ? "bg-gradient-to-r from-green-600 to-green-400"
                        : "bg-gradient-to-r from-blue-600 to-blue-400"
                      }`}
                  />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3
                        className={`text-xl font-bold ${themeStyles.textPrimary} truncate flex-1 pr-2`}
                      >
                        {offer.companyName}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${offer.status === "final"
                            ? themeStyles.statusFinalBg
                            : themeStyles.statusOfferBg
                          }`}
                      >
                        {offer.status === "final" ? "Final" : "Offer"}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Package
                        </span>
                        <span
                          className={`font-semibold ${themeStyles.textPrimary}`}
                        >
                          {offer.packageValue} LPA
                        </span>
                      </div>

                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Type
                        </span>
                        <span
                          className={`font-medium ${themeStyles.textPrimary}`}
                        >
                          {offer.companyType}
                        </span>
                      </div>

                      {offer.offerLetterFile && (
                        <div className="flex items-center gap-2 text-sm pt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span
                            className={`${themeStyles.offerLetterText} font-medium`}
                          >
                            Offer letter attached
                          </span>
                        </div>
                      )}

                      {offer.joiningLetterFile && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span
                            className={`${themeStyles.offerLetterText} font-medium`}
                          >
                            Joining letter attached
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(offer)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(offer)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} text-red-600 hover:bg-red-600 hover:text-white transition-colors`}
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

        {/* Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              <div
                className={`sticky top-0 ${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  {viewMode
                    ? `${modalType === "final"
                      ? "Final Offer Letter"
                      : "Offer Letter"
                    } Details`
                    : editingId
                      ? `Edit ${modalType === "final"
                        ? "Final Offer Letter"
                        : "Offer Letter"
                      }`
                      : `Add ${modalType === "final"
                        ? "Final Offer Letter"
                        : "Offer Letter"
                      }`}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-colors`}
                >
                  <X className={`h-5 w-5 ${themeStyles.textPrimary}`} />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Google, Microsoft, Meta"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Package Value (LPA) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="packageValue"
                    value={formData.packageValue}
                    onChange={handleInputChange}
                    placeholder="e.g., 12.5"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Company Type <span className="text-red-600">*</span>
                  </label>
                  {viewMode ? (
                    <div
                      className={`px-4 py-3 ${themeStyles.emptyStateBg} rounded-lg ${themeStyles.textPrimary}`}
                    >
                      {formData.companyType || "Not specified"}
                    </div>
                  ) : (
                    <CustomSelect
                      value={formData.companyType}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, companyType: value }))
                      }
                      disabled={viewMode}
                      options={[
                        "Product",
                        "Service",
                        "Startup",
                        "MNC",
                        "Government",
                      ]}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Offer Letter
                  </label>
                  {viewMode ? (
                    <div
                      className={`px-4 py-3 ${themeStyles.emptyStateBg} rounded-lg ${themeStyles.textPrimary}`}
                    >
                      {formData.offerLetterFile || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "offerLetterFile")}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer ${themeStyles.inputText} transition-all`}
                    />
                  )}
                  {formData.offerLetterFile && (
                    <p className={`text-sm ${themeStyles.textSecondary} mt-2`}>
                      Selected: {formData.offerLetterFile}
                    </p>
                  )}
                </div>

                {modalType === "final" && (
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Joining Letter
                    </label>
                    {viewMode ? (
                      <div
                        className={`px-4 py-3 ${themeStyles.emptyStateBg} rounded-lg ${themeStyles.textPrimary}`}
                      >
                        {formData.joiningLetterFile || "No file uploaded"}
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "joiningLetterFile")
                        }
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer ${themeStyles.inputText} transition-all`}
                      />
                    )}
                    {formData.joiningLetterFile && (
                      <p
                        className={`text-sm ${themeStyles.textSecondary} mt-2`}
                      >
                        Selected: {formData.joiningLetterFile}
                      </p>
                    )}
                  </div>
                )}

                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
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

        {showDeleteConfirm && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} p-6`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                  Confirm Deletion
                </h2>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className={`${themeStyles.textSecondary} mb-6`}>
                Are you sure you want to delete this offer letter details? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
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

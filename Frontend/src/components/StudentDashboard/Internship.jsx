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
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    companyName: "",
    stipend: "",
    startDate: "",
    endDate: "",
    offerLetter: null,
  });

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

  const resetForm = () => {
    setFormData({
      companyName: "",
      stipend: "",
      startDate: "",
      endDate: "",
      offerLetter: null,
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
      setFormData((prev) => ({ ...prev, offerLetter: file.name }));
    }
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setInternships((prev) =>
        prev.map((intern) =>
          intern.id === editingId ? { ...formData, id: editingId } : intern
        )
      );
    } else {
      const newInternship = {
        ...formData,
        id: Date.now(),
      };
      setInternships((prev) => [...prev, newInternship]);
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
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      setInternships((prev) => prev.filter((intern) => intern.id !== id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
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
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

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

      <div className="ax-w-[1400px] mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Internship
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Internship
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
                    Total Internships
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.total}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-full flex items-center justify-center`}
                >
                  <Briefcase
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
                    Active Now
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.active}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon2Bg} rounded-full flex items-center justify-center`}
                >
                  <TrendingUp
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
                    Total Stipend
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    ₹{stats.totalStipend.toLocaleString()}
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
                    Avg Duration
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.avgDuration.toFixed(1)}
                    <span
                      className={`text-lg ${themeStyles.textSecondary} ml-1`}
                    >
                      mo
                    </span>
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon4Bg} rounded-full flex items-center justify-center`}
                >
                  <Clock className={`h-6 w-6 ${themeStyles.statIcon4Text}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internship Cards */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Your Internships
          </h2>
          {internships.length === 0 ? (
            <div
              className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-sm`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <Briefcase
                    className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No Internships Yet
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Start building your portfolio by adding your first internship
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className={`inline-flex items-center px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Internship
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship) => {
                const status = getStatus(
                  internship.startDate,
                  internship.endDate
                );
                return (
                  <div
                    key={internship.id}
                    className={`rounded-xl border overflow-hidden ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300`}
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400" />

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3
                          className={`text-xl font-bold ${themeStyles.textPrimary} truncate flex-1 pr-2`}
                        >
                          {internship.companyName}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                            status === "active"
                              ? themeStyles.statusActiveBg
                              : status === "upcoming"
                              ? themeStyles.statusUpcomingBg
                              : `${themeStyles.statusCompletedBg} ${themeStyles.statusCompletedText}`
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div
                          className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                        >
                          <span
                            className={`text-sm ${themeStyles.textSecondary}`}
                          >
                            Stipend
                          </span>
                          <span
                            className={`font-semibold ${themeStyles.textPrimary}`}
                          >
                            ₹{parseFloat(internship.stipend).toLocaleString()}
                            /mo
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar
                            className={`h-4 w-4 ${themeStyles.calendarIcon}`}
                          />
                          <span className={themeStyles.textSecondary}>
                            Start:
                          </span>
                          <span
                            className={`font-medium ${themeStyles.textPrimary}`}
                          >
                            {formatDate(internship.startDate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar
                            className={`h-4 w-4 ${themeStyles.calendarIcon}`}
                          />
                          <span className={themeStyles.textSecondary}>
                            End:
                          </span>
                          <span
                            className={`font-medium ${themeStyles.textPrimary}`}
                          >
                            {formatDate(internship.endDate)}
                          </span>
                        </div>

                        {internship.offerLetter && (
                          <div className="flex items-center gap-2 text-sm pt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span
                              className={`${themeStyles.offerLetterText} font-medium`}
                            >
                              Offer letter attached
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(internship)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(internship)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(internship.id)}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} text-red-600 hover:bg-red-600 hover:text-white transition-colors`}
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
                    ? "Internship Details"
                    : editingId
                    ? "Edit Internship"
                    : "Add New Internship"}
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
                    Monthly Stipend (₹) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g., 25000"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Start Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      required
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      End Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      required
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} transition-all`}
                    />
                  </div>
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
                      {formData.offerLetter || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer ${themeStyles.inputText} transition-all`}
                    />
                  )}
                  {formData.offerLetter && (
                    <p className={`text-sm ${themeStyles.textSecondary} mt-2`}>
                      Selected: {formData.offerLetter}
                    </p>
                  )}
                </div>

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
                      {editingId ? "Update Internship" : "Add Internship"}
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

export default InternshipManager;

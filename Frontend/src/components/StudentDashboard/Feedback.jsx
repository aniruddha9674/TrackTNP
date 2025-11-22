import { useState, useMemo } from "react";
import {
  Star,
  Building2,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const PlacementFeedbackSystem = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    packageValue: "",
    numberOfRounds: "",
    roundsInfo: "",
    jobProfile: "",
    preparation: "",
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
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-purple-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-purple-100",
    statIcon3Text: "text-purple-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    completedBadge: "bg-green-500",
    pendingBadge: "bg-slate-200",
    pendingBadgeText: "text-slate-700",
    formHeaderGradient: "bg-slate-100",
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
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30",
    statIcon3Text: "text-purple-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    completedBadge: "bg-green-600",
    pendingBadge: "bg-slate-700",
    pendingBadgeText: "text-slate-300",
    formHeaderGradient: "bg-slate-800",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Google",
      date: "2024-01-15",
      package: "45 LPA",
      role: "Software Engineer",
      feedbackCompleted: true,
    },
    {
      id: 2,
      name: "Microsoft",
      date: "2024-01-20",
      package: "42 LPA",
      role: "SDE-1",
      feedbackCompleted: false,
    },
    {
      id: 3,
      name: "Amazon",
      date: "2024-02-01",
      package: "38 LPA",
      role: "SDE",
      feedbackCompleted: true,
    },
    {
      id: 4,
      name: "Goldman Sachs",
      date: "2024-02-10",
      package: "35 LPA",
      role: "Analyst",
      feedbackCompleted: false,
    },
    {
      id: 5,
      name: "Adobe",
      date: "2024-01-25",
      package: "40 LPA",
      role: "Software Engineer",
      feedbackCompleted: false,
    },
    {
      id: 6,
      name: "Flipkart",
      date: "2024-01-18",
      package: "28 LPA",
      role: "SDE-1",
      feedbackCompleted: true,
    },
  ]);

  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const feedbackCompleted = companies.filter(
      (c) => c.feedbackCompleted
    ).length;
    const feedbackIncomplete = companies.filter(
      (c) => !c.feedbackCompleted
    ).length;
    return { totalCompanies, feedbackCompleted, feedbackIncomplete };
  }, [companies]);

  const resetForm = () => {
    setFormData({
      companyName: "",
      packageValue: "",
      numberOfRounds: "",
      roundsInfo: "",
      jobProfile: "",
      preparation: "",
    });
    setRating(0);
    setSelectedCompany(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setFormData({
      companyName: company.name,
      packageValue: company.package,
      numberOfRounds: "",
      roundsInfo: "",
      jobProfile: company.role,
      preparation: "",
    });
    setShowFeedbackForm(true);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting");
      return;
    }
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === selectedCompany.id ? { ...c, feedbackCompleted: true } : c
      )
    );
    alert("Feedback submitted successfully!");
    setShowFeedbackForm(false);
    resetForm();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      {!showFeedbackForm ? (
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                Placement Feedback
              </h1>
              <p className={`mt-2 ${themeStyles.textSecondary}`}>
                Provide feedback for placement drives you've participated in
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Building2,
                label: "Total Companies",
                value: stats.totalCompanies,
                subtitle: "placement drives",
                bgColor: themeStyles.statCard1Gradient,
                borderColor: themeStyles.dividerBorder,
                iconBg: themeStyles.statIcon1Bg,
                iconColor: themeStyles.statIcon1Text,
              },
              {
                icon: CheckCircle2,
                label: "Feedback Completed",
                value: stats.feedbackCompleted,
                subtitle: "submissions done",
                bgColor: themeStyles.statCard2Gradient,
                borderColor: themeStyles.dividerBorder,
                iconBg: themeStyles.statIcon2Bg,
                iconColor: themeStyles.statIcon2Text,
              },
              {
                icon: AlertCircle,
                label: "Feedback Incomplete",
                value: stats.feedbackIncomplete,
                subtitle: "pending submissions",
                bgColor: themeStyles.statCard3Gradient,
                borderColor: themeStyles.dividerBorder,
                iconBg: themeStyles.statIcon3Bg,
                iconColor: themeStyles.statIcon3Text,
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

          {/* Company Table */}
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-shadow`}
          >
            <div className="flex items-center gap-2 mb-6">
              <Building2 size={20} className={themeStyles.statIcon1Text} />
              <h2
                className={`text-xl font-semibold ${themeStyles.textPrimary}`}
              >
                Company Placement Drives
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`${themeStyles.cardBg} border-b ${themeStyles.dividerBorder}`}
                >
                  <tr>
                    <th
                      className={`px-6 py-4 text-left text-sm font-semibold ${themeStyles.textPrimary}`}
                    >
                      Sr No.
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-sm font-semibold ${themeStyles.textPrimary}`}
                    >
                      Company Name
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-sm font-semibold ${themeStyles.textPrimary}`}
                    >
                      Drive Date
                    </th>
                    <th
                      className={`px-6 py-4 text-center text-sm font-semibold ${themeStyles.textPrimary}`}
                    >
                      Status
                    </th>
                    <th
                      className={`px-6 py-4 text-center text-sm font-semibold ${themeStyles.textPrimary}`}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${themeStyles.dividerBorder}`}>
                  {companies.map((company, index) => (
                    <tr
                      key={company.id}
                      className={`${themeStyles.cardHoverShadow} transition-colors`}
                    >
                      <td
                        className={`px-6 py-4 text-sm ${themeStyles.textPrimary} font-medium`}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${themeStyles.textPrimary} font-medium`}
                      >
                        {company.name}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${themeStyles.textSecondary}`}
                      >
                        {formatDate(company.date)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {company.feedbackCompleted ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${themeStyles.completedBadge} text-white`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${themeStyles.pendingBadge} ${themeStyles.pendingBadgeText}`}
                          >
                            <AlertCircle className="h-3.5 w-3.5" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleCompanySelect(company)}
                          className={`inline-flex items-center justify-center px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                            company.feedbackCompleted
                              ? `${themeStyles.buttonBg} border ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary}`
                              : "bg-blue-700 text-white hover:bg-blue-800"
                          }`}
                        >
                          {company.feedbackCompleted ? "View/Edit" : "Feedback"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Feedback Form */
        <div className="max-w-[1400px] mx-auto">
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl ${themeStyles.cardShadow}`}
          >
            <div
              className={`bg-gradient-to-r ${themeStyles.formHeaderGradient} px-6 py-4 flex justify-between items-center rounded-t-2xl`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowFeedbackForm(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-colors`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  Placement Feedback Form
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowFeedbackForm(false);
                  resetForm();
                }}
                className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-colors`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Package Value */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Company Package Value{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="packageValue"
                    value={formData.packageValue}
                    onChange={handleInputChange}
                    placeholder="e.g., 12 LPA"
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Number of Rounds */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Number of Rounds <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfRounds"
                    value={formData.numberOfRounds}
                    onChange={handleInputChange}
                    placeholder="Enter number of rounds"
                    required
                    min="1"
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Information of Rounds */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Information of Rounds{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="roundsInfo"
                    value={formData.roundsInfo}
                    onChange={handleInputChange}
                    placeholder="Describe each round (e.g., Round 1: Online test, Round 2: Technical interview...)"
                    required
                    rows={4}
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all resize-none`}
                  />
                </div>
                {/* Job Profile */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Job Profile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobProfile"
                    value={formData.jobProfile}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Data Analyst"
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Preparation */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    How did you prepare for the interview?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="preparation"
                    value={formData.preparation}
                    onChange={handleInputChange}
                    placeholder="Share your preparation strategy, resources used, topics covered..."
                    required
                    rows={4}
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all resize-none`}
                  />
                </div>
                {/* Rating */}
                <div className="space-y-3">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Your Overall Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={36}
                        className={`cursor-pointer transition-all hover:scale-110 ${
                          rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : `${themeStyles.textTertiary} hover:text-yellow-300`
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                    {rating > 0 && (
                      <span
                        className={`ml-2 text-sm font-medium ${themeStyles.textSecondary}`}
                      >
                        {rating} out of 5 stars
                      </span>
                    )}
                  </div>
                </div>
                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowFeedbackForm(false);
                      resetForm();
                    }}
                    className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg font-medium transition-all bg-blue-600 text-white hover:bg-blue-700 ${
                      rating === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementFeedbackSystem;

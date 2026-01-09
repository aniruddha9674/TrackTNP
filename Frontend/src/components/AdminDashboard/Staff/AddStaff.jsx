import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

const CompanyManager = () => {
  const [theme, setTheme] = useState("light");
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([
    { id: 1, file: null },
  ]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    companyName: "",
    companyRelatedInfo: "",
    regEndDate: "",
    registrationTime: new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
    recruitmentMethod: "Everyone",
    placedBelow: "",
    eligibleBatchYears: [],
    eligibleBranches: [],
    jobOpenings: "",
    companyType: "",
    driveType: "",
    jobProfile: "",
    sscCriteria: "",
    hscCriteria: "",
    cgpaCriteria: "",
    backlogCriteria: "",
    venue: "",
    resumeRequired: "Required",
    registrationStatus: "Open",
    driveCompleted: "No",
  });

  const batchYears = ["2025", "2026", "2027", "2028", "2029"];
  const branches = [
    "Computer Engineering",
    "Computer Science & Engineering (AI & ML)",
    "Computer Engineering (Regional Language)",
    "Electronic and Telecommunication",
    "Civil",
    "Mechanical",
    "Information Technology",
    "Automobile Engineering",
  ];

  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-gray-50 to-white",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardShadow: "shadow-md",
    cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    textTertiary: "text-gray-400",
    inputBg: "bg-white",
    inputBorder: "border-gray-300",
    inputDisabled: "disabled:bg-gray-100",
    inputText: "text-gray-900",
    inputPlaceholder: "placeholder:text-gray-400",
    modalOverlay: "bg-black/60",
    modalHeader: "bg-slate-100",
    buttonBg: "bg-white",
    buttonBorder: "border-gray-300",
    buttonHover: "hover:bg-gray-50",
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
    sectionBg: "bg-gray-50",
    tableBg: "bg-white",
    tableHeaderBg: "bg-gray-50",
    tableHoverBg: "hover:bg-gray-50",
    tableBorder: "border-gray-200",
  });

  const getDarkTheme = () => ({
    background: "bg-gradient-to-br from-slate-950 to-slate-900",
    cardBg: "bg-gray-900",
    cardBorder: "border-slate-700",
    cardShadow: "shadow-lg shadow-black/20",
    cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
    textPrimary: "text-gray-50",
    textSecondary: "text-gray-400",
    textTertiary: "text-gray-500",
    inputBg: "bg-gray-950",
    inputBorder: "border-gray-700",
    inputDisabled: "disabled:bg-gray-800",
    inputText: "text-gray-50",
    inputPlaceholder: "placeholder:text-gray-500",
    modalOverlay: "bg-black/80",
    modalHeader: "border-slate-700",
    buttonBg: "bg-gray-800",
    buttonBorder: "border-gray-700",
    buttonHover: "hover:bg-gray-700",
    statCard1Gradient: "from-gray-800 to-blue-900/30",
    statCard2Gradient: "from-gray-800 to-green-900/30",
    statCard3Gradient: "from-gray-800 to-purple-900/30",
    statCard4Gradient: "from-gray-800 to-amber-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30",
    statIcon3Text: "text-purple-400",
    statIcon4Bg: "bg-amber-900/30",
    statIcon4Text: "text-amber-400",
    sectionBg: "bg-gray-800",
    tableBg: "bg-gray-900",
    tableHeaderBg: "bg-gray-800",
    tableHoverBg: "hover:bg-gray-800",
    tableBorder: "border-gray-700",
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  const stats = useMemo(() => {
    const total = companies.length;
    const openDrives = companies.filter(
      (c) => c.registrationStatus === "Open"
    ).length;
    const completed = companies.filter(
      (c) => c.driveCompleted === "Yes"
    ).length;
    return { total, openDrives, completed };
  }, [companies]);

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      companyName: "",
      companyRelatedInfo: "",
      regEndDate: "",
      registrationTime: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      recruitmentMethod: "Everyone",
      placedBelow: "",
      eligibleBatchYears: [],
      eligibleBranches: [],
      jobOpenings: "",
      companyType: "",
      driveType: "",
      jobProfile: "",
      sscCriteria: "",
      hscCriteria: "",
      cgpaCriteria: "",
      backlogCriteria: "",
      venue: "",
      resumeRequired: "Required",
      registrationStatus: "Open",
      driveCompleted: "No",
    });
    setAdditionalFiles([{ id: 1, file: null }]);
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "eligibleBatchYears" || name === "eligibleBranches") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    e.stopPropagation();
  };

  const handleSubmit = (action = "save") => {
    if (editingId !== null) {
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === editingId
            ? { ...formData, id: editingId, files: additionalFiles }
            : company
        )
      );
    } else {
      const newCompany = {
        ...formData,
        id: Date.now(),
        files: additionalFiles,
      };
      setCompanies((prev) => [...prev, newCompany]);
    }
    if (action === "save") {
      setShowModal(false);
      resetForm();
    } else if (action === "saveAndAdd") {
      resetForm();
    }
  };

  const handleEdit = (company) => {
    setFormData({ ...company });
    setAdditionalFiles(company.files || [{ id: 1, file: null }]);
    setEditingId(company.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (company) => {
    setFormData({ ...company });
    setAdditionalFiles(company.files || []);
    setViewMode(true);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCompanies((prev) => prev.filter((company) => company.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const addFileInput = () => {
    setAdditionalFiles((prev) => [...prev, { id: Date.now(), file: null }]);
  };

  const removeFileInput = (id) => {
    setAdditionalFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const FormSection = ({ title, children }) => (
    <div className={`p-6 rounded-xl ${themeStyles.sectionBg} space-y-4`}>
      <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
        {title}
      </h3>
      {children}
    </div>
  );

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    ...props
  }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeStyles.textPrimary}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name] || ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={viewMode}
          className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all resize-none`}
          rows={4}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={viewMode}
          className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
          {...props}
        />
      )}
    </div>
  );

  const SelectField = ({
    label,
    name,
    options,
    required = false,
    placeholder = "Select...",
  }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeStyles.textPrimary}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleInputChange}
        disabled={viewMode}
        className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Company Recruitment Drives
            </h1>
            <p className={`${themeStyles.textSecondary} mt-1`}>
              Manage campus recruitment and placement drives
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`px-4 py-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonHover} border ${themeStyles.buttonBorder} transition-all`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Company Drive
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: Building2,
              label: "Total Companies",
              value: stats.total,
              subtitle: "recruitment drives",
              bgColor: themeStyles.statCard1Gradient,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: Calendar,
              label: "Open Registrations",
              value: stats.openDrives,
              subtitle: "currently active",
              bgColor: themeStyles.statCard2Gradient,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: Briefcase,
              label: "Completed Drives",
              value: stats.completed,
              subtitle: "finished",
              bgColor: themeStyles.statCard3Gradient,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: TrendingUp,
              label: "Total Placements",
              value: "0",
              subtitle: "students placed",
              bgColor: themeStyles.statCard4Gradient,
              iconBg: themeStyles.statIcon4Bg,
              iconColor: themeStyles.statIcon4Text,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${themeStyles.cardBorder} p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.bgColor}`}
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
                  className={`h-12 w-12 ${stat.iconBg} rounded-full flex items-center justify-center`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Drives - Card Layout */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Recent Drives
          </h2>
          {companies.length === 0 ? (
            <div
              className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardBg}`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.sectionBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <Building2
                    className={`h-12 w-12 ${themeStyles.textTertiary}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No Company Drives Yet
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Start by adding your first company recruitment drive
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Company Drive
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.cardBg}`}
                >
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-bold ${themeStyles.textPrimary} line-clamp-2`}
                          >
                            {company.companyName}
                          </h3>
                          <p
                            className={`text-sm ${themeStyles.textSecondary} mt-1`}
                          >
                            {company.jobProfile || "No profile specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.tableBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Drive Type
                        </span>
                        <span
                          className={`font-semibold ${themeStyles.textPrimary}`}
                        >
                          {company.driveType || "N/A"}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.tableBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Date
                        </span>
                        <span
                          className={`font-semibold ${themeStyles.textPrimary}`}
                        >
                          {company.date}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.tableBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Venue
                        </span>
                        <span
                          className={`font-semibold ${themeStyles.textPrimary}`}
                        >
                          {company.venue || "N/A"}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between py-2`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Status
                        </span>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            company.registrationStatus === "Open"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {company.registrationStatus}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(company)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonHover} border ${themeStyles.buttonBorder} transition-all`}
                        title="View"
                      >
                        <Eye className={`h-4 w-4 ${themeStyles.textPrimary}`} />
                      </button>
                      <button
                        onClick={() => handleEdit(company)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonHover} border ${themeStyles.buttonBorder} transition-all`}
                        title="Edit"
                      >
                        <Edit2 className={`h-4 w-4 ${themeStyles.textPrimary}`} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(company.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        title="Delete"
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

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} overflow-hidden`}
            >
              <div className={`p-6`}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3
                  className={`text-xl font-bold text-center ${themeStyles.textPrimary} mb-2`}
                >
                  Delete Company Drive
                </h3>
                <p className={`text-center ${themeStyles.textSecondary} mb-6`}>
                  Are you sure you want to delete this company drive? This
                  action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteId(null);
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              <div
                className={`${themeStyles.modalHeader} border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10`}
              >
                <div className="flex items-center gap-3">
                  {viewMode && (
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <h2
                    className={`text-2xl font-bold ${themeStyles.textPrimary}`}
                  >
                    {viewMode
                      ? "Company Drive Details"
                      : editingId
                      ? "Edit Company Drive"
                      : "Add Company Drive"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-all`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <FormSection title="Basic Information">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField label="Date" name="date" type="date" required />
                    <InputField
                      label="Month"
                      name="month"
                      type="number"
                      min="1"
                      max="12"
                      required
                    />
                    <InputField
                      label="Year"
                      name="year"
                      type="number"
                      required
                    />
                  </div>
                  <InputField
                    label="Company Name"
                    name="companyName"
                    required
                    placeholder="Enter company name"
                  />
                  <InputField
                    label="Company Related Info"
                    name="companyRelatedInfo"
                    type="textarea"
                    placeholder="Additional company information"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Registration End Date"
                      name="regEndDate"
                      type="date"
                      required
                    />
                    <InputField
                      label="Registration Time"
                      name="registrationTime"
                      type="time"
                    />
                  </div>
                </FormSection>
                <FormSection title="Recruitment Details">
                  <SelectField
                    label="Recruitment Method"
                    name="recruitmentMethod"
                    required
                    options={[
                      {
                        value: "Everyone",
                        label: "Everyone - Everyone can apply",
                      },
                      {
                        value: "Unplaced",
                        label: "Unplaced - Only unplaced students",
                      },
                      {
                        value: "Placed Below XYZ Package",
                        label: "Placed Below Package",
                      },
                    ]}
                  />
                  {formData.recruitmentMethod ===
                    "Placed Below XYZ Package" && (
                    <InputField
                      label="Placed Below Package"
                      name="placedBelow"
                      placeholder="e.g., 5.0 LPA"
                    />
                  )}
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
                    >
                      Eligible Batch Years
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {batchYears.map((year) => (
                        <label
                          key={year}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="eligibleBatchYears"
                            value={year}
                            checked={formData.eligibleBatchYears.includes(year)}
                            onChange={handleInputChange}
                            disabled={viewMode}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm ${themeStyles.textPrimary}`}
                          >
                            {year}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
                    >
                      Eligible Branches
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {branches.map((branch) => (
                        <label
                          key={branch}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="eligibleBranches"
                            value={branch}
                            checked={formData.eligibleBranches.includes(branch)}
                            onChange={handleInputChange}
                            disabled={viewMode}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm ${themeStyles.textPrimary}`}
                          >
                            {branch}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </FormSection>
                <FormSection title="Job Details">
                  <InputField
                    label="Job Openings"
                    name="jobOpenings"
                    type="number"
                    placeholder="Number of openings"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Company Type"
                      name="companyType"
                      options={[
                        { value: "Product", label: "Product" },
                        { value: "Core", label: "Core" },
                        { value: "IT", label: "IT" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                    <SelectField
                      label="Drive Type"
                      name="driveType"
                      options={[
                        { value: "Internship", label: "Internship" },
                        { value: "Placement", label: "Placement" },
                        {
                          value: "Internship + PPO",
                          label: "Internship + PPO",
                        },
                      ]}
                    />
                  </div>
                  <InputField
                    label="Job Profile"
                    name="jobProfile"
                    placeholder="e.g., Software Engineer"
                  />
                </FormSection>
                <FormSection title="Eligibility Criteria">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="SSC Criteria (%)"
                      name="sscCriteria"
                      type="number"
                      placeholder="e.g., 60"
                    />
                    <InputField
                      label="HSC Criteria (%)"
                      name="hscCriteria"
                      type="number"
                      placeholder="e.g., 60"
                    />
                    <InputField
                      label="CGPA Criteria"
                      name="cgpaCriteria"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 7.0"
                    />
                    <InputField
                      label="Backlog Criteria"
                      name="backlogCriteria"
                      placeholder="e.g., No active backlogs"
                    />
                  </div>
                  <InputField
                    label="Venue"
                    name="venue"
                    placeholder="Interview venue"
                  />
                </FormSection>
                <FormSection title="Drive Status">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SelectField
                      label="Resume Required"
                      name="resumeRequired"
                      options={[
                        { value: "Required", label: "Required" },
                        { value: "Not Required", label: "Not Required" },
                      ]}
                    />
                    <SelectField
                      label="Registration Status"
                      name="registrationStatus"
                      options={[
                        { value: "Open", label: "Open" },
                        { value: "Closed", label: "Closed" },
                      ]}
                    />
                    <SelectField
                      label="Drive Completed"
                      name="driveCompleted"
                      options={[
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" },
                      ]}
                    />
                  </div>
                </FormSection>
                {!viewMode && (
                  <FormSection title="Additional Files">
                    <div className="space-y-3">
                      {additionalFiles.map((file, index) => (
                        <div key={file.id} className="flex items-center gap-3">
                          <input
                            type="file"
                            onChange={(e) => {
                              const newFiles = [...additionalFiles];
                              newFiles[index].file = e.target.files[0];
                              setAdditionalFiles(newFiles);
                            }}
                            className={`flex-1 px-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputText} transition-all`}
                          />
                          {additionalFiles.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFileInput(file.id)}
                              className="px-3 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFileInput}
                        className={`inline-flex items-center px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another File
                      </button>
                    </div>
                  </FormSection>
                )}
                {!viewMode && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => handleSubmit("save")}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleSubmit("saveAndAdd")}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all"
                    >
                      Save and Add Another
                    </button>
                    <button
                      onClick={() => handleSubmit("saveAndContinue")}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium transition-all"
                    >
                      Save and Continue Editing
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

export default CompanyManager;
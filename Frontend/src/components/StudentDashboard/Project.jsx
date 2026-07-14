import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  FolderGit2,
  Users,
  Code,
  TrendingUp,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const ProjectManager = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: "",
    technologies: "",
    groupMembers: "",
    description: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  // ─── Themes ───────────────────────────────────────────────────────────────
  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-slate-50 to-slate-100",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardShadow: "shadow-md",
    cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-slate-900",
    textSecondary: "text-gray-600",
    textTertiary: "text-gray-400",
    inputBg: "bg-white",
    inputBorder: "border-gray-300",
    inputErrorBorder: "border-red-400",
    inputDisabled: "disabled:bg-gray-100",
    inputText: "text-gray-900",
    inputPlaceholder: "placeholder:text-gray-400",
    modalOverlay: "bg-black/60",
    modalHeader: "bg-slate-100",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-white",
    emptyStateIcon: "text-gray-400",
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
    dividerBorder: "border-gray-200",
    buttonBg: "bg-white",
    buttonBorder: "border-gray-300",
    buttonHover: "hover:bg-gray-50",
    projectCardBg: "bg-white",
    projectCardBorder: "border-gray-200",
    projectCardHover: "hover:border-gray-300",
    iconGradient: "from-blue-50 to-blue-100",
    badgeBg: "bg-gray-100",
    detailsCardBg: "bg-gray-50",
    techBadgeBg: "bg-white",
    techBadgeBorder: "border-gray-300",
    techBadgeText: "text-gray-900",
    errorText: "text-red-500",
    errorBg: "bg-red-50",
    errorBorder: "border-red-200",
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
    inputErrorBorder: "border-red-500",
    inputDisabled: "disabled:bg-gray-800",
    inputText: "text-gray-50",
    inputPlaceholder: "placeholder:text-gray-500",
    modalOverlay: "bg-black/80",
    modalHeader: "bg-gray-800",
    modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-900",
    emptyStateIcon: "text-gray-500",
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
    dividerBorder: "border-gray-700",
    buttonBg: "bg-gray-800",
    buttonBorder: "border-gray-700",
    buttonHover: "hover:bg-gray-700",
    projectCardBg: "bg-gray-800",
    projectCardBorder: "border-gray-700",
    projectCardHover: "hover:border-gray-600",
    iconGradient: "from-blue-900/30 to-blue-800/30",
    badgeBg: "bg-gray-800",
    detailsCardBg: "bg-gray-800",
    techBadgeBg: "bg-gray-950",
    techBadgeBorder: "border-gray-700",
    techBadgeText: "text-gray-100",
    errorText: "text-red-400",
    errorBg: "bg-red-900/20",
    errorBorder: "border-red-700",
  });

  const t = theme === "dark" ? getDarkTheme() : getLightTheme();

  // ─── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = projects.length;
    const totalMembers = projects.reduce(
      (sum, project) => sum + (parseInt(project.groupMembers) || 0),
      0
    );
    const allTechs = projects.flatMap((p) =>
      p.technologies.split(",").map((tech) => tech.trim().toLowerCase())
    );
    const uniqueTechs = new Set(allTechs).size;
    const avgTeamSize = projects.length > 0 ? totalMembers / projects.length : 0;
    return { total, totalMembers, uniqueTechs, avgTeamSize };
  }, [projects]);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({ projectTitle: "", technologies: "", groupMembers: "", description: "" });
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
  };

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};

    const title = formData.projectTitle.trim();
    if (!title) {
      errors.projectTitle = "Project title is required.";
    } else if (title.length < 3) {
      errors.projectTitle = "Project title must be at least 3 characters.";
    }

    const techs = formData.technologies.trim();
    if (!techs) {
      errors.technologies = "Please enter at least one technology.";
    } else {
      const techList = techs.split(",").map((t) => t.trim()).filter(Boolean);
      if (techList.length === 0) {
        errors.technologies = "Please enter at least one valid technology.";
      } else if (techList.some((t) => t.length < 1)) {
        errors.technologies = "Remove any empty entries between commas.";
      }
    }

    const members = formData.groupMembers.toString().trim();
    if (!members) {
      errors.groupMembers = "Number of group members is required.";
    } else if (isNaN(members) || !Number.isInteger(Number(members)) || Number(members) < 1) {
      errors.groupMembers = "Enter a whole number of at least 1.";
    } else if (Number(members) > 100) {
      errors.groupMembers = "Team size seems unusually large (max 100). Please verify.";
    }

    const desc = formData.description.trim();
    if (!desc) {
      errors.description = "Project description is required.";
    } else if (desc.length < 20) {
      errors.description = "Description must be at least 20 characters.";
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
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingId ? { ...formData, id: editingId } : project
        )
      );
    } else {
      setProjects((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (project) => {
    setFormData({
      projectTitle: project.projectTitle,
      technologies: project.technologies,
      groupMembers: project.groupMembers,
      description: project.description,
    });
    setFieldErrors({});
    setEditingId(project.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (project) => {
    setFormData({
      projectTitle: project.projectTitle,
      technologies: project.technologies,
      groupMembers: project.groupMembers,
      description: project.description,
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
    setProjects((prev) => prev.filter((member) => member.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const getTechBadges = (technologies) =>
    technologies.split(",").map((tech) => tech.trim()).filter(Boolean);

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
    <div className={`min-h-screen ${t.background} p-6`}>
      <div className="max-w-full mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h1 className={`text-3xl font-bold ${t.textPrimary}`}>Projects</h1>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              Icon: FolderGit2,
              label: "Total Projects",
              value: stats.total,
              gradient: t.statCard1Gradient,
              iconBg: t.statIcon1Bg,
              iconColor: t.statIcon1Text,
            },
            {
              Icon: Users,
              label: "Team Members",
              value: stats.totalMembers,
              gradient: t.statCard2Gradient,
              iconBg: t.statIcon2Bg,
              iconColor: t.statIcon2Text,
            },
            {
              Icon: Code,
              label: "Technologies",
              value: stats.uniqueTechs,
              gradient: t.statCard3Gradient,
              iconBg: t.statIcon3Bg,
              iconColor: t.statIcon3Text,
            },
            {
              Icon: TrendingUp,
              label: "Avg Team Size",
              value: stats.avgTeamSize.toFixed(1),
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
                  <p className={`text-sm ${t.textTertiary} mt-1`}>{subtitle}</p>
                </div>
                <div className={`h-12 w-12 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Cards */}
        <div>
          <h2 className={`text-xl font-semibold ${t.textPrimary} mb-4`}>Your Projects</h2>

          {projects.length === 0 ? (
            <div className={`rounded-2xl border ${t.projectCardBorder} ${t.cardShadow} ${t.emptyStateBg}`}>
              <div className="p-12 text-center">
                <div className={`mx-auto w-24 h-24 ${t.emptyStateBg} rounded-full flex items-center justify-center mb-4`}>
                  <FolderGit2 className={`h-12 w-12 ${t.emptyStateIcon}`} />
                </div>
                <h3 className={`text-xl font-semibold ${t.textPrimary} mb-2`}>No Projects Yet</h3>
                <p className={`${t.textSecondary} mb-6`}>
                  Start building your portfolio by adding your first project
                </p>
                <button
                  onClick={() => { resetForm(); setShowModal(true); }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Project
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-2xl border ${t.projectCardBorder} ${t.cardShadow} ${t.cardHoverShadow} transition-all duration-300 overflow-hidden group ${t.projectCardBg}`}
                >
                  <div className="h-2 bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-400)]" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={`text-xl font-bold ${t.textPrimary} flex-1 pr-2 line-clamp-2`}>
                        {project.projectTitle}
                      </h3>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] text-white whitespace-nowrap">
                        {project.groupMembers}{" "}
                        {parseInt(project.groupMembers) === 1 ? "member" : "members"}
                      </span>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className={`text-sm ${t.textSecondary} mb-2 font-medium`}>Technologies</p>
                        <div className="flex flex-wrap gap-1.5">
                          {getTechBadges(project.technologies).slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${t.techBadgeBorder} ${t.techBadgeText} ${t.techBadgeBg}`}
                            >
                              {tech}
                            </span>
                          ))}
                          {getTechBadges(project.technologies).length > 3 && (
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${t.techBadgeBorder} ${t.techBadgeText} ${t.techBadgeBg}`}>
                              +{getTechBadges(project.technologies).length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm ${t.textSecondary} mb-1 font-medium`}>Description</p>
                        <p className={`text-sm ${t.textTertiary} line-clamp-3`}>{project.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(project)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                      >
                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

        {/* ── Add / Edit / View Modal ───────────────────────────────────────── */}
        {showModal && (
          <div className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
            <div className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-lg border ${t.cardBg} ${t.cardBorder}`}>

              {/* Header */}
              <div className={`${t.modalHeader} ${t.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  {viewMode && (
                    <button
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <h2 className={`text-2xl font-bold ${t.textPrimary}`}>
                    {viewMode ? "Project Details" : editingId ? "Edit Project" : "Add New Project"}
                  </h2>
                </div>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${t.buttonHover} transition-all ${t.textPrimary}`}
                >
                  <X className="h-5 w-5" />
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

                {/* Project Title */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Enter Project Title"
                    disabled={viewMode}
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.projectTitle ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.projectTitle} />
                </div>

                {/* Technologies */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Technologies Used <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="e.g., React, TypeScript, Node.js"
                    disabled={viewMode}
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.technologies ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  {!fieldErrors.technologies && (
                    <p className={`text-xs ${t.textTertiary}`}>
                      Separate multiple technologies with commas (e.g., React, TypeScript, Node.js)
                    </p>
                  )}
                  <FieldError error={fieldErrors.technologies} />
                </div>

                {/* Group Members */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Number of Group Members <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="groupMembers"
                    value={formData.groupMembers}
                    onChange={handleInputChange}
                    placeholder="e.g., 4"
                    disabled={viewMode}
                    min="1"
                    step="1"
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.groupMembers ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.groupMembers} />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project (at least 20 characters)"
                    disabled={viewMode}
                    rows={6}
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.description ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} ${t.inputText} ${t.inputPlaceholder} transition-all resize-none`}
                  />
                  {/* Live character count hint */}
                  {!viewMode && (
                    <p className={`text-xs text-right ${formData.description.trim().length < 20 ? t.errorText : t.textTertiary
                      }`}>
                      {formData.description.trim().length} / 20 min characters
                    </p>
                  )}
                  <FieldError error={fieldErrors.description} />
                </div>
{/* Project Title */}
                <div className="space-y-1.5">
                  <label className={`block text-sm font-medium ${t.textPrimary}`}>
                    Project Link/Github Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectLink"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Enter Project Link"
                    disabled={viewMode}
                    className={`w-full px-4 py-3 ${t.inputBg} border ${fieldErrors.projectTitle ? t.inputErrorBorder : t.inputBorder
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${t.inputDisabled} ${t.inputText} ${t.inputPlaceholder} transition-all`}
                  />
                  <FieldError error={fieldErrors.projectTitle} />
                </div>
                {/* Actions */}
                {!viewMode && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg border-2 ${t.buttonBorder} ${t.buttonBg} ${t.buttonHover} ${t.textPrimary} font-medium transition-all`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                    >
                      {editingId ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Confirm Modal ──────────────────────────────────────────── */}
        {showDeleteConfirm && (
          <div className={`fixed inset-0 ${t.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
            <div className={`w-full max-w-md rounded-2xl shadow-2xl border ${t.cardBg} ${t.cardBorder} p-6`}>
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
                Are you sure you want to delete this project? This action cannot be undone.
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

export default ProjectManager;
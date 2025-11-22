import React, { useState, useMemo, useEffect } from "react";
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

  // Light Theme Function
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
    projectCardBg: "bg-gray-100",
    projectCardBorder: "border-gray-200",
    projectCardHover: "hover:border-gray-300",
    iconGradient: "from-blue-50 to-blue-100",
    badgeBg: "bg-gray-100",
    detailsCardBg: "bg-gray-50",
    techBadgeBg: "bg-white",
    techBadgeBorder: "border-gray-300",
    techBadgeText: "text-gray-900",
  });

  // Dark Theme Function
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
    modalHeader: "border-slate-200",
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
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const totalMembers = projects.reduce(
      (sum, project) => sum + (parseInt(project.groupMembers) || 0),
      0
    );
    const allTechs = projects.flatMap((p) =>
      p.technologies.split(",").map((t) => t.trim().toLowerCase())
    );
    const uniqueTechs = new Set(allTechs).size;
    const avgTeamSize =
      projects.length > 0 ? totalMembers / projects.length : 0;
    return { total, totalMembers, uniqueTechs, avgTeamSize };
  }, [projects]);

  const resetForm = () => {
    setFormData({
      projectTitle: "",
      technologies: "",
      groupMembers: "",
      description: "",
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingId ? { ...formData, id: editingId } : project
        )
      );
    } else {
      const newProject = {
        ...formData,
        id: Date.now(),
      };
      setProjects((prev) => [...prev, newProject]);
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

  const getTechBadges = (technologies) => {
    return technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Projects
            </h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: FolderGit2,
              label: "Total Projects",
              value: stats.total,
              subtitle: "in portfolio",
              bgColor: themeStyles.statCard1Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: Users,
              label: "Team Members",
              value: stats.totalMembers,
              subtitle: "collaborators",
              bgColor: themeStyles.statCard2Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: Code,
              label: "Technologies",
              value: stats.uniqueTechs,
              subtitle: "unique techs",
              bgColor: themeStyles.statCard3Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: TrendingUp,
              label: "Avg Team Size",
              value: stats.avgTeamSize.toFixed(1),
              subtitle: "members per project",
              bgColor: themeStyles.statCard4Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon4Bg,
              iconColor: themeStyles.statIcon4Text,
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

        {/* Project Cards */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Your Projects
          </h2>

          {projects.length === 0 ? (
            <div
              className={`rounded-2xl border ${themeStyles.projectCardBorder} ${themeStyles.cardShadow} ${themeStyles.emptyStateBg}`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <FolderGit2
                    className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No Projects Yet
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Start building your portfolio by adding your first project
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
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
                  className={`rounded-2xl border ${themeStyles.projectCardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.projectCardBg}`}
                >
                  <div className="h-2 bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-400)]" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3
                        className={`text-xl font-bold ${themeStyles.textPrimary} flex-1 pr-2 line-clamp-2`}
                      >
                        {project.projectTitle}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] text-white whitespace-nowrap`}
                      >
                        {project.groupMembers}{" "}
                        {parseInt(project.groupMembers) === 1
                          ? "member"
                          : "members"}
                      </span>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p
                          className={`text-sm ${themeStyles.textSecondary} mb-2 font-medium`}
                        >
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {getTechBadges(project.technologies)
                            .slice(0, 3)
                            .map((tech, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${themeStyles.techBadgeBorder} ${themeStyles.techBadgeText} ${themeStyles.techBadgeBg}`}
                              >
                                {tech}
                              </span>
                            ))}
                          {getTechBadges(project.technologies).length > 3 && (
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${themeStyles.techBadgeBorder} ${themeStyles.techBadgeText} ${themeStyles.techBadgeBg}`}
                            >
                              +{getTechBadges(project.technologies).length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${themeStyles.textSecondary} mb-1 font-medium`}
                        >
                          Description
                        </p>
                        <p
                          className={`text-sm ${themeStyles.textTertiary} line-clamp-3`}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(project)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
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

        {/* Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50 scrollbar-hidden`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-lg border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <div className="flex items-center gap-3">
                  {viewMode && (
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <h2
                    className={`text-2xl font-bold ${themeStyles.textPrimary}`}
                  >
                    {viewMode
                      ? "Project Details"
                      : editingId
                      ? "Edit Project"
                      : "Add New Project"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} transition-all ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Project Title{" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Enter Project Title"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Technologies used{" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="Enter technologies used"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                  <p className={`text-xs ${themeStyles.textTertiary}`}>
                    Separate multiple technologies with commas (e.g., React,
                    TypeScript, Node.js)
                  </p>
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Number of group members{" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <input
                    type="number"
                    name="groupMembers"
                    value={formData.groupMembers}
                    onChange={handleInputChange}
                    placeholder="Enter number of group members"
                    disabled={viewMode}
                    required
                    min="1"
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Description{" "}
                    <span className="text-[var(--color-error-500)]">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project"
                    disabled={viewMode}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all resize-none`}
                  />
                </div>
                {!viewMode && (
                  <div className="flex gap-3 pt-4">
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
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
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
                Are you sure you want to delete this project? This action cannot
                be undone.
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

export default ProjectManager;

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
} from "lucide-react";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

// Custom Button Component
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg",
    outline:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    icon: "h-9 w-9",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Card Component
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Custom CardContent Component
const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

  const variants = {
    default: "bg-slate-900 text-slate-50",
    secondary: "bg-slate-100 text-slate-900",
    outline: "border border-slate-300 bg-transparent text-slate-900",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Custom Textarea Component
const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 ${className}`}
      {...props}
    />
  );
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: "",
    technologies: "",
    groupMembers: "",
    description: "",
  });

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
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  const getTechBadges = (technologies) => {
    return technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Project Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Manage and showcase your project portfolio
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Projects
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.total}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FolderGit2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-green-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Team Members
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.totalMembers}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Technologies
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.uniqueTechs}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Team Size
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.avgTeamSize.toFixed(1)}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Cards */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Your Projects
          </h2>
          {projects.length === 0 ? (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <FolderGit2 className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Projects Yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Start building your portfolio by adding your first project
                </p>
                <Button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  variant="outline"
                  className="border-slate-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-white border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400" />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 flex-1 pr-2 line-clamp-2">
                        {project.projectTitle}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-600 whitespace-nowrap"
                      >
                        {project.groupMembers}{" "}
                        {parseInt(project.groupMembers) === 1
                          ? "member"
                          : "members"}
                      </Badge>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-2">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {getTechBadges(project.technologies)
                            .slice(0, 3)
                            .map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs border-slate-300"
                              >
                                {tech}
                              </Badge>
                            ))}
                          {getTechBadges(project.technologies).length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-300"
                            >
                              +{getTechBadges(project.technologies).length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600 mb-1">
                          Description
                        </p>
                        <p className="text-sm text-slate-900 line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleView(project)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-300"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleEdit(project)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-300"
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-600 hover:text-white border-slate-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 bg-white">
              <div className="sticky top-0 bg-slate-100 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {viewMode
                    ? "Project Details"
                    : editingId
                    ? "Edit Project"
                    : "Add New Project"}
                </h2>
                <Button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Project Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="Enter Project Title"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Technologies used <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="Enter technologies used"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                  <p className="text-xs text-slate-600">
                    Separate multiple technologies with commas (e.g., React,
                    TypeScript, Node.js)
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Number of group members{" "}
                    <span className="text-red-600">*</span>
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
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project"
                    disabled={viewMode}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all resize-none"
                  />
                </div>

                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      variant="outline"
                      className="flex-1 border-slate-300"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1">
                      Submit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;

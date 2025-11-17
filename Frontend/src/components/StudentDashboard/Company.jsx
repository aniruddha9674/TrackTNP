import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Send,
  Calendar,
  IndianRupee,
  Briefcase,
  X,
  ArrowLeft,
  Search,
  Filter,
} from "lucide-react";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');
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
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
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
      disabled={disabled}
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
  };

  return (
    <span className={`${baseStyles} ${className}`} {...props}>
      {children}
    </span>
  );
};

const CompanyRegistration = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, eligible, notEligible, applied

  // Sample companies data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Google",
      package: "45 LPA",
      role: "Software Engineer",
      deadline: "2024-01-20",
      eligibilityCriteria: [
        "Minimum CGPA: 7.5",
        "No active backlogs",
        "B.Tech in Computer Science or related field",
        "Strong problem-solving skills",
        "Good communication skills",
      ],
      jobDescription:
        "Google is hiring for Software Engineering roles. Work on cutting-edge technology and solve complex problems at scale.",
      rounds: [
        "Online Test",
        "Technical Interview 1",
        "Technical Interview 2",
        "HR Interview",
      ],
      isEligible: true,
      hasApplied: false,
    },
    {
      id: 2,
      name: "Microsoft",
      package: "42 LPA",
      role: "SDE-1",
      deadline: "2024-01-25",
      eligibilityCriteria: [
        "Minimum CGPA: 7.0",
        "No active backlogs",
        "B.Tech/B.E. in any discipline",
        "Knowledge of data structures and algorithms",
        "Previous internship experience (preferred)",
      ],
      jobDescription:
        "Join Microsoft to work on cloud technologies and innovative solutions that impact millions of users worldwide.",
      rounds: [
        "Coding Assessment",
        "Technical Round 1",
        "Technical Round 2",
        "Managerial Round",
      ],
      isEligible: true,
      hasApplied: true,
    },
    {
      id: 3,
      name: "Amazon",
      package: "38 LPA",
      role: "Software Development Engineer",
      deadline: "2024-02-05",
      eligibilityCriteria: [
        "Minimum CGPA: 6.5",
        "Maximum 1 backlog allowed",
        "All engineering branches eligible",
        "Strong analytical skills",
        "Leadership qualities",
      ],
      jobDescription:
        "Amazon is looking for talented engineers to join their product development teams and build scalable solutions.",
      rounds: [
        "Online Assessment",
        "Technical Interview",
        "Bar Raiser Round",
        "HR Discussion",
      ],
      isEligible: false,
      hasApplied: false,
    },
    {
      id: 4,
      name: "Goldman Sachs",
      package: "35 LPA",
      role: "Analyst",
      deadline: "2024-02-15",
      eligibilityCriteria: [
        "Minimum CGPA: 8.0",
        "No backlogs throughout the program",
        "Strong mathematical aptitude",
        "Interest in finance and technology",
        "Team player with good work ethic",
      ],
      jobDescription:
        "Work with one of the leading investment banks in technology and financial services.",
      rounds: [
        "HireVue Assessment",
        "Technical Interview",
        "Case Study",
        "Final Interview",
      ],
      isEligible: false,
      hasApplied: false,
    },
    {
      id: 5,
      name: "Adobe",
      package: "40 LPA",
      role: "Software Engineer",
      deadline: "2024-01-30",
      eligibilityCriteria: [
        "Minimum CGPA: 7.5",
        "No backlogs",
        "Computer Science or IT background",
        "Creative problem-solving abilities",
        "Portfolio of projects (bonus)",
      ],
      jobDescription:
        "Adobe seeks creative problem solvers to build next-generation digital experiences.",
      rounds: [
        "Online Coding Test",
        "Technical Interview 1",
        "Technical Interview 2",
        "HR Round",
      ],
      isEligible: true,
      hasApplied: true,
    },
    {
      id: 6,
      name: "Flipkart",
      package: "28 LPA",
      role: "SDE-1",
      deadline: "2024-01-22",
      eligibilityCriteria: [
        "Minimum CGPA: 6.0",
        "Maximum 2 backlogs allowed",
        "All branches eligible",
        "Good coding skills",
        "Fast learner",
      ],
      jobDescription:
        "Be part of India's leading e-commerce platform and work on scalable systems.",
      rounds: [
        "Machine Coding Round",
        "Technical Interview",
        "Hiring Manager Round",
      ],
      isEligible: true,
      hasApplied: false,
    },
    {
      id: 7,
      name: "Atlassian",
      package: "50 LPA",
      role: "Software Engineer",
      deadline: "2024-02-10",
      eligibilityCriteria: [
        "Minimum CGPA: 8.0",
        "No backlogs",
        "Strong coding fundamentals",
        "Collaborative team player",
        "Experience with agile methodologies",
      ],
      jobDescription:
        "Join Atlassian to build collaborative tools used by teams worldwide.",
      rounds: [
        "Coding Challenge",
        "System Design",
        "Values Interview",
        "Hiring Manager Round",
      ],
      isEligible: true,
      hasApplied: false,
    },
    {
      id: 8,
      name: "Salesforce",
      package: "43 LPA",
      role: "MTS",
      deadline: "2024-02-08",
      eligibilityCriteria: [
        "Minimum CGPA: 7.0",
        "No active backlogs",
        "Strong programming skills",
        "Cloud computing knowledge",
        "Customer-first mindset",
      ],
      jobDescription:
        "Salesforce is hiring for cloud platform development and customer success roles.",
      rounds: [
        "Online Test",
        "Technical Round 1",
        "Technical Round 2",
        "HR Round",
      ],
      isEligible: false,
      hasApplied: false,
    },
    {
      id: 9,
      name: "Uber",
      package: "39 LPA",
      role: "Software Engineer",
      deadline: "2024-01-28",
      eligibilityCriteria: [
        "Minimum CGPA: 7.0",
        "No backlogs",
        "Strong DSA knowledge",
        "System design understanding",
        "Go-getter attitude",
      ],
      jobDescription:
        "Join Uber to work on real-time systems that connect millions of riders and drivers.",
      rounds: [
        "Phone Screen",
        "Technical Round 1",
        "Technical Round 2",
        "System Design",
        "Behavioral Round",
      ],
      isEligible: true,
      hasApplied: false,
    },
  ]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const eligible = companies.filter((c) => c.isEligible).length;
    const notEligible = companies.filter((c) => !c.isEligible).length;
    const applied = companies.filter((c) => c.hasApplied).length;

    return { totalCompanies, eligible, notEligible, applied };
  }, [companies]);

  // Filter companies based on search and filters
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Search filter
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.role.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      let matchesFilter = true;
      if (filterStatus === "eligible") {
        matchesFilter = company.isEligible && !company.hasApplied;
      } else if (filterStatus === "notEligible") {
        matchesFilter = !company.isEligible;
      } else if (filterStatus === "applied") {
        matchesFilter = company.hasApplied;
      }

      return matchesSearch && matchesFilter;
    });
  }, [companies, searchQuery, filterStatus]);

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

  const handleApply = () => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === selectedCompany.id ? { ...c, hasApplied: true } : c
      )
    );
    alert("Application submitted successfully!");
    setShowDetailsModal(false);
    setSelectedCompany(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!showDetailsModal ? (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Company Registration
            </h1>
            <p className="text-slate-600 mt-1">
              Browse and apply to placement opportunities
            </p>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-white to-blue-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Companies
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">
                      {stats.totalCompanies}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-green-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Eligible
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">
                      {stats.eligible}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-red-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Not Eligible
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">
                      {stats.notEligible}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-purple-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Applied
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-2">
                      {stats.applied}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Send className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Cards */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Available Opportunities
              </h2>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search companies or roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-48 pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Companies</option>
                    <option value="eligible">Eligible</option>
                    <option value="notEligible">Not Eligible</option>
                    <option value="applied">Applied</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-slate-600 mb-4">
              Showing {filteredCompanies.length} of {companies.length} companies
            </p>

            {/* Company Cards Grid - 3 per row */}
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => {
                  const daysLeft = getDaysLeft(company.deadline);
                  return (
                    <Card
                      key={company.id}
                      className="bg-white border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div
                        className={`h-2 ${
                          company.hasApplied
                            ? "bg-gradient-to-r from-purple-600 to-purple-400"
                            : company.isEligible
                            ? "bg-gradient-to-r from-green-600 to-green-400"
                            : "bg-gradient-to-r from-red-600 to-red-400"
                        }`}
                      />

                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">
                                {company.name}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {company.role}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {company.hasApplied && (
                            <Badge className="bg-purple-500 text-white">
                              Applied
                            </Badge>
                          )}
                          <Badge
                            className={
                              company.isEligible
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }
                          >
                            {company.isEligible ? "Eligible" : "Not Eligible"}
                          </Badge>
                          {daysLeft <= 3 && daysLeft > 0 && (
                            <Badge className="bg-amber-500 text-white">
                              {daysLeft} days left
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <IndianRupee className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Package:</span>
                            <span className="font-semibold text-slate-900">
                              {company.package}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Deadline:</span>
                            <span className="font-medium text-slate-900">
                              {formatDate(company.deadline)}
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleViewDetails(company)}
                          disabled={company.hasApplied}
                          className={`w-full ${
                            company.hasApplied
                              ? "bg-slate-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          } text-white`}
                        >
                          {company.hasApplied
                            ? "Already Applied"
                            : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-white border-slate-200">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No companies found
                  </h3>
                  <p className="text-slate-600">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        /* Details Modal */
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="w-full max-w-4xl bg-white border-slate-200 shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedCompany(null);
                  }}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold text-white">
                  {selectedCompany?.name} - Application Details
                </h2>
              </div>
              <Button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedCompany(null);
                }}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <CardContent className="p-8 space-y-6">
              {/* Company Info */}
              <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
                <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-8 w-8 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {selectedCompany?.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Role:</span>
                      <span className="text-sm font-medium text-slate-900">
                        {selectedCompany?.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Package:</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {selectedCompany?.package}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">Deadline:</span>
                      <span className="text-sm font-medium text-slate-900">
                        {formatDate(selectedCompany?.deadline)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          selectedCompany?.isEligible
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }
                      >
                        {selectedCompany?.isEligible
                          ? "You are Eligible"
                          : "Not Eligible"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">
                  Job Description
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {selectedCompany?.jobDescription}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {selectedCompany?.eligibilityCriteria.map(
                    (criteria, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{criteria}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Interview Rounds */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">
                  Interview Process
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCompany?.rounds.map((round, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {round}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedCompany(null);
                  }}
                  variant="outline"
                  className="flex-1 border-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApply}
                  disabled={!selectedCompany?.isEligible}
                  className={`flex-1 ${
                    selectedCompany?.isEligible
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-400 cursor-not-allowed"
                  } text-white`}
                >
                  {selectedCompany?.isEligible
                    ? "Apply Now"
                    : "Not Eligible to Apply"}
                </Button>
              </div>

              {!selectedCompany?.isEligible && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">
                    <strong>Note:</strong> You don't meet the eligibility
                    criteria for this role. Please check the requirements above.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CompanyRegistration;

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
    "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.05]",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/[0.05]",
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
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
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
  const [filterStatus, setFilterStatus] = useState("all");

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
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.role.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {!showDetailsModal ? (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Company Registration
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse and apply to placement opportunities
            </p>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Total Companies
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stats.totalCompanies}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Eligible
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stats.eligible}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Not Eligible
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stats.notEligible}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Applied
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stats.applied}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Send className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company List */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Available Opportunities
              </h2>

              <div className="space-y-4">
                {filteredCompanies.map((company) => {
                  const daysLeft = getDaysLeft(company.deadline);
                  return (
                    <div
                      key={company.id}
                      className="border border-gray-200 dark:border-gray-800 rounded-2xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {company.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {company.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                Package:
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {company.package}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                Deadline:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formatDate(company.deadline)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleViewDetails(company)}
                          disabled={company.hasApplied}
                          className={`ml-4 ${
                            company.hasApplied
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          } text-white`}
                        >
                          {company.hasApplied ? "Applied" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Details Modal */
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedCompany(null);
              }}
              variant="outline"
              size="icon"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedCompany?.name} - Application Details
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Review position details and submit your application
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Company Info */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedCompany?.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Role:
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedCompany?.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Package:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedCompany?.package}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Deadline:
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
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
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Job Description
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedCompany?.jobDescription}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {selectedCompany?.eligibilityCriteria.map(
                    (criteria, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {criteria}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Interview Rounds */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Interview Process
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCompany?.rounds.map((round, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
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
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApply}
                  disabled={!selectedCompany?.isEligible}
                  className={`flex-1 ${
                    selectedCompany?.isEligible
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white`}
                >
                  {selectedCompany?.isEligible
                    ? "Apply Now"
                    : "Not Eligible to Apply"}
                </Button>
              </div>

              {!selectedCompany?.isEligible && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-700 dark:text-red-400">
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

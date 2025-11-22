import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";

const PrivacyPolicy = () => {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("privacy-policy");
  const sectionRefs = useRef({});

  const isDarkTheme = theme === "dark";
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-slate-50 to-slate-100",
    navBg: "bg-white",
    navBorder: "border-slate-200",
    navItemHover: "hover:bg-slate-50",
    navItemActive: "bg-slate-50 border-l-4 border-blue-700 !text-black",
    navItemText: "text-slate-700",
    contentBg: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    headerBg: "bg-white",
    headerBorder: "border-slate-200",
    shadow: "shadow-sm",
    listMarker: "text-blue-500",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
  });

  const getDarkTheme = () => ({
    background: "bg-gradient-to-br from-slate-950 to-slate-900",
    navBg: "bg-slate-900",
    navBorder: "border-slate-800",
    navItemHover: "hover:bg-slate-800",
    navItemActive: "bg-slate-800 border-l-4 border-blue-700 !text-white",
    navItemText: "text-slate-300",
    contentBg: "bg-slate-900",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    headerBg: "bg-slate-900",
    headerBorder: "border-slate-800",
    shadow: "shadow-lg shadow-black/20",
    listMarker: "text-blue-500",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
  });

  const currentTheme = isDarkTheme ? getDarkTheme() : getLightTheme();

  const navigationItems = [
    { id: "privacy-policy", label: "Privacy Policy" },
    { id: "terms-conditions", label: "Terms & Conditions" },
    { id: "data-usage", label: "Data Usage Policy" },
    { id: "cookies", label: "Cookies Policy" },
    { id: "user-rights", label: "User Rights & Controls" },
    { id: "contact-support", label: "Contact & Support" },
  ];

  const getVisibleSectionOnLoad = () => {
    const ids = Object.keys(sectionRefs.current);
    let bestId = ids[0] || "privacy-policy";
    let bestVisible = 0;
    ids.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      );
      if (visibleHeight > bestVisible) {
        bestVisible = visibleHeight;
        bestId = id;
      }
    });
    return bestId;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => setActiveSection(entry.target.id), 0);
            }
          });
        },
        {
          root: null,
          threshold: 0.38,
          rootMargin: "-120px 0px -40% 0px",
        }
      );

      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }, 100);

    const initTimer = setTimeout(() => {
      const id = getVisibleSectionOnLoad();
      if (id) setActiveSection(id);
    }, 120);

    return () => {
      clearTimeout(timer);
      clearTimeout(initTimer);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    setActiveSection(id);

    const HEADER_OFFSET = 96;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen ${currentTheme.background}`}
      style={{ fontFamily: "'Urbanist', sans-serif" }}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 ${currentTheme.headerBg} border-b ${currentTheme.headerBorder} ${currentTheme.shadow}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => window.history.back()}
            className={`p-2 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonBorder} border ${currentTheme.buttonHover} ${currentTheme.textPrimary} transition-all flex-shrink-0`}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 text-center px-4">
            <h1
              className={`text-xl sm:text-2xl font-bold ${currentTheme.textPrimary}`}
            >
              TrackTNP
            </h1>
            <p className={`text-xs sm:text-sm ${currentTheme.textSecondary}`}>
              Privacy Policy and Legal Information
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${currentTheme.buttonBg} ${currentTheme.buttonBorder} border ${currentTheme.buttonHover} ${currentTheme.textPrimary} transition-all flex-shrink-0`}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Fixed Navigation Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav
            className={`sticky top-24 ${currentTheme.navBg} rounded-xl border ${currentTheme.navBorder} p-4 ${currentTheme.shadow}`}
          >
            <h3
              className={`text-sm font-semibold ${currentTheme.textSecondary} mb-3 px-3`}
            >
              Quick Navigation
            </h3>
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    activeSection === item.id
                      ? currentTheme.navItemActive
                      : `${currentTheme.navItemText} ${currentTheme.navItemHover}`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Mobile Navigation - Horizontal scroll */}
        <div className="lg:hidden w-full mb-6">
          <nav
            className={`${currentTheme.navBg} rounded-xl border ${currentTheme.navBorder} p-3 ${currentTheme.shadow} overflow-x-auto`}
          >
            <div className="flex gap-2 min-w-max">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : `${currentTheme.navItemText} ${currentTheme.navItemHover}`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div
            className={`${currentTheme.contentBg} rounded-xl border ${currentTheme.navBorder} p-4 sm:p-6 lg:p-8 ${currentTheme.shadow} space-y-12`}
          >
            {/* Privacy Policy Section */}
            <section
              id="privacy-policy"
              ref={(el) => (sectionRefs.current["privacy-policy"] = el)}
              className="scroll-mt-28"
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.textPrimary}`}
              >
                Privacy Policy
              </h2>

              <div className="space-y-6">
                <div>
                  <p className={currentTheme.textSecondary}>
                    Track TNP system is committed to protecting your privacy and
                    ensuring the confidentiality of the personal information you
                    provide. This Privacy Policy describes how we collect, use,
                    store, share, and protect your data when you access or use
                    the Track TNP Training & Placement Management System.
                  </p>
                  <p className={`${currentTheme.textSecondary} mt-4`}>
                    By using Track TNP, you agree to the practices described in
                    this Privacy Policy.
                  </p>
                  <p
                    className={`font-semibold ${currentTheme.textPrimary} mt-4 text-sm`}
                  >
                    Last Updated: November 21, 2025
                  </p>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
                  >
                    1. Information We Collect
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Personal Information
                      </h4>
                      <ul className="space-y-2 ml-4 sm:ml-6">
                        {[
                          "Full name, email address, phone number",
                          "Date of birth, gender, address (if provided by institution)",
                          "ID numbers (Roll No., Registration ID, Institution ID)",
                          "Profile picture (optional)",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                          >
                            <span className={`mr-2 ${currentTheme.listMarker}`}>
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Academic Information
                      </h4>
                      <ul className="space-y-2 ml-4 sm:ml-6">
                        {[
                          "Course, department, semester, batch",
                          "Attendance records, marks, grades",
                          "Skill sets, certifications, project records",
                          "Resume details uploaded by students",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                          >
                            <span className={`mr-2 ${currentTheme.listMarker}`}>
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Placement-Related Data
                      </h4>
                      <ul className="space-y-2 ml-4 sm:ml-6">
                        {[
                          "Eligibility criteria status",
                          "Application history, shortlisted status",
                          "Company assessments, interview results",
                          "Uploaded documents (resumes, cover letters, certificates)",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                          >
                            <span className={`mr-2 ${currentTheme.listMarker}`}>
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        System Usage & Log Data
                      </h4>
                      <ul className="space-y-2 ml-4 sm:ml-6">
                        {[
                          "Login history, browser type, device type",
                          "User interactions and navigation patterns",
                          "IP address for security monitoring",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                          >
                            <span className={`mr-2 ${currentTheme.listMarker}`}>
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p
                      className={`${currentTheme.textSecondary} italic text-sm sm:text-base`}
                    >
                      We do NOT collect biometric data, payment information, or
                      unnecessary personal identifiers.
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
                  >
                    2. How We Use Your Information
                  </h3>
                  <p
                    className={`${currentTheme.textSecondary} mb-4 text-sm sm:text-base`}
                  >
                    Your data is used strictly for improving Training &
                    Placement operations:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Platform Functionality
                      </h4>
                      <ul className="space-y-2 ml-4 sm:ml-6">
                        {[
                          "Creating personalized dashboards",
                          "Displaying placement opportunities based on eligibility",
                          "Automating workflows and notifications",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                          >
                            <span className={`mr-2 ${currentTheme.listMarker}`}>
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Academic & Placement Analysis
                      </h4>
                      <ul className="space-y-2 ml-4 sm:ml-6">
                        {[
                          "Generating performance analytics",
                          "Identifying skill gaps",
                          "Providing career readiness insights",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                          >
                            <span className={`mr-2 ${currentTheme.listMarker}`}>
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p
                      className={`font-semibold ${currentTheme.textPrimary} mt-4 text-sm sm:text-base`}
                    >
                      We do NOT sell your data, share with advertisers, or use
                      for non-educational purposes.
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
                  >
                    3. Data Storage & Security
                  </h3>
                  <p
                    className={`${currentTheme.textSecondary} mb-4 text-sm sm:text-base`}
                  >
                    Track TNP uses enterprise-level security standards:
                  </p>
                  <ul className="space-y-2 ml-4 sm:ml-6">
                    {[
                      "Encrypted database storage and HTTPS/SSL transmission",
                      "Hashed and salted passwords (bcrypt/argon2)",
                      "Role-Based Access Control (RBAC)",
                      "Daily automated backups",
                      "Firewall and network security filtering",
                      "Continuous activity logging and threat detection",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                      >
                        <span className={`mr-2 ${currentTheme.listMarker}`}>
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
                  >
                    4. Data Sharing & Disclosure
                  </h3>
                  <p
                    className={`${currentTheme.textSecondary} mb-4 text-sm sm:text-base`}
                  >
                    We only share data when absolutely necessary:
                  </p>
                  <ul className="space-y-2 ml-4 sm:ml-6">
                    {[
                      "With recruiters: Only for students who opt-in or apply",
                      "With institution authorities: For academic evaluation and auditing",
                      "Legal requirements: Government requests, court orders",
                      "We never sell or trade personal information to third parties",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                      >
                        <span className={`mr-2 ${currentTheme.listMarker}`}>
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Terms & Conditions Section */}
            <section
              id="terms-conditions"
              ref={(el) => (sectionRefs.current["terms-conditions"] = el)}
              className="scroll-mt-28"
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.textPrimary}`}
              >
                Terms & Conditions
              </h2>
              <div className="space-y-4">
                <p
                  className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                >
                  By accessing Track TNP, you agree to comply with these terms
                  and conditions. These terms govern your use of the platform
                  and outline the responsibilities of all users.
                </p>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 ${currentTheme.textPrimary}`}
                  >
                    User Responsibilities
                  </h3>
                  <ul className="space-y-2 ml-4 sm:ml-6">
                    {[
                      "Provide accurate and up-to-date information",
                      "Maintain confidentiality of login credentials",
                      "Use the platform only for legitimate educational and placement purposes",
                      "Respect intellectual property rights",
                      "Comply with all applicable laws and institutional policies",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                      >
                        <span className={`mr-2 ${currentTheme.listMarker}`}>
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 ${currentTheme.textPrimary}`}
                  >
                    Prohibited Activities
                  </h3>
                  <ul className="space-y-2 ml-4 sm:ml-6">
                    {[
                      "Attempting unauthorized access to system resources",
                      "Sharing account credentials with others",
                      "Uploading malicious content or files",
                      "Misrepresenting information for placement purposes",
                      "Interfering with system operations or other users' access",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                      >
                        <span className={`mr-2 ${currentTheme.listMarker}`}>
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage Policy Section */}
            <section
              id="data-usage"
              ref={(el) => (sectionRefs.current["data-usage"] = el)}
              className="scroll-mt-28"
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.textPrimary}`}
              >
                Data Usage Policy
              </h2>
              <div className="space-y-4">
                <p
                  className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                >
                  This policy outlines how your data is used within the Track
                  TNP platform and the measures we take to ensure responsible
                  data handling.
                </p>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 ${currentTheme.textPrimary}`}
                  >
                    Data Retention
                  </h3>
                  <ul className="space-y-2 ml-4 sm:ml-6">
                    {[
                      "Student records: Until graduation + institutional retention period",
                      "Placement records: As required by institutional guidelines",
                      "Login logs: 6-12 months",
                      "Assessment data: Duration of academic year unless extended",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                      >
                        <span className={`mr-2 ${currentTheme.listMarker}`}>
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 ${currentTheme.textPrimary}`}
                  >
                    User Roles & Access
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Students
                      </h4>
                      <p
                        className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                      >
                        View and update profiles, access placement
                        opportunities, upload documents, track applications
                      </p>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Staff/TPO
                      </h4>
                      <p
                        className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                      >
                        Manage student profiles, upload notices, evaluate
                        performance, track company interactions, generate
                        reports
                      </p>
                    </div>
                    <div>
                      <h4
                        className={`font-semibold ${currentTheme.textPrimary} mb-2 text-base`}
                      >
                        Admin
                      </h4>
                      <p
                        className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                      >
                        Full system control, manage users and roles, access
                        complete institutional data, archive records
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies Policy Section */}
            <section
              id="cookies"
              ref={(el) => (sectionRefs.current["cookies"] = el)}
              className="scroll-mt-28"
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.textPrimary}`}
              >
                Cookies Policy
              </h2>
              <div className="space-y-4">
                <p
                  className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                >
                  Track TNP uses cookies and similar tracking technologies to
                  enhance user experience and maintain platform functionality.
                </p>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 ${currentTheme.textPrimary}`}
                  >
                    Types of Cookies We Use
                  </h3>
                  <ul className="space-y-2 ml-4 sm:ml-6">
                    {[
                      "Session cookies: Maintain login state and user sessions",
                      "Preference cookies: Store UI/theme preferences and settings",
                      "Analytics cookies: Measure system performance and usage patterns",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                      >
                        <span className={`mr-2 ${currentTheme.listMarker}`}>
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`${currentTheme.textSecondary} mt-4 text-sm sm:text-base`}
                  >
                    Cookies do not store sensitive personal information like
                    passwords or payment details.
                  </p>
                </div>

                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-3 ${currentTheme.textPrimary}`}
                  >
                    Managing Cookies
                  </h3>
                  <p
                    className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                  >
                    You can control cookies through your browser settings.
                    However, disabling certain cookies may affect platform
                    functionality and user experience.
                  </p>
                </div>
              </div>
            </section>

            {/* User Rights Section */}
            <section
              id="user-rights"
              ref={(el) => (sectionRefs.current["user-rights"] = el)}
              className="scroll-mt-28"
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.textPrimary}`}
              >
                User Rights & Controls
              </h2>
              <div className="space-y-4">
                <p
                  className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                >
                  Every user has specific rights regarding their personal data:
                </p>

                <ul className="space-y-3 ml-4 sm:ml-6">
                  {[
                    "Right to Access: Request full details of stored information",
                    "Right to Correction: Update incorrect or outdated data",
                    "Right to Deletion: Request removal of personal data (subject to institutional policies)",
                    "Right to Restrict Use: Limit specific data operations",
                    "Right to Withdraw Consent: Remove permission for optional data collection",
                    "Right to Raise Concerns: Report privacy violations",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className={`${currentTheme.textSecondary} flex items-start text-sm sm:text-base`}
                    >
                      <span className={`mr-2 ${currentTheme.listMarker}`}>
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`${currentTheme.textSecondary} mt-4 text-sm sm:text-base`}
                >
                  Requests can be made through institutional authorities or
                  Track TNP support. We respond to all validated requests within
                  a reasonable timeframe.
                </p>
              </div>
            </section>

            {/* Contact & Support Section */}
            <section
              id="contact-support"
              ref={(el) => (sectionRefs.current["contact-support"] = el)}
              className="scroll-mt-28"
            >
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.textPrimary}`}
              >
                Contact & Support
              </h2>
              <div className="space-y-4">
                <p
                  className={`${currentTheme.textSecondary} text-sm sm:text-base`}
                >
                  For privacy concerns, data requests, or general queries, reach
                  out to us:
                </p>

                <div
                  className={`space-y-3 ${currentTheme.textSecondary} text-sm sm:text-base`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">📧 Email:</span>
                    <div>
                      <p>support@tracktnp.com</p>
                      <p>privacy@tracktnp.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">📞 Phone:</span>
                    <p>+91 98765 43210</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold">🌐 Website:</span>
                    <p>www.tracktnp.com</p>
                  </div>
                </div>

                <p
                  className={`${currentTheme.textSecondary} mt-6 text-sm sm:text-base`}
                >
                  You may also contact your institution's TNP Department for
                  internal data-related concerns.
                </p>

                <div
                  className={`mt-8 p-4 rounded-lg ${
                    isDarkTheme ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  <p className={`text-sm ${currentTheme.textSecondary}`}>
                    <strong>Note:</strong> This privacy policy may be updated
                    periodically to reflect new features, legal requirements, or
                    security improvements. Major changes will be communicated to
                    all users.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

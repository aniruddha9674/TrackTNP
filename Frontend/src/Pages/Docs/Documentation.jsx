import React, { useState } from "react";
import {
  Book,
  Code,
  Rocket,
  Users,
  FileText,
  Settings,
  ChevronRight,
  Search,
  Moon,
  Sun,
  GraduationCap,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const Documentation = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeSubsection, setActiveSubsection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
  });

  const getDarkTheme = () => ({
    background: "bg-gradient-to-br from-gray-950 to-gray-900",
    cardBg: "bg-gray-900",
    cardBorder: "border-gray-700",
    cardShadow: "shadow-lg shadow-black/20",
    cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
    textPrimary: "text-gray-50",
    textSecondary: "text-gray-400",
    textTertiary: "text-gray-500",
    inputBg: "bg-gray-950",
    inputBorder: "border-gray-600",
    inputText: "text-gray-50",
    inputPlaceholder: "placeholder:text-gray-500",
    buttonBg: "bg-gray-700",
    buttonBorder: "border-gray-600",
    buttonHover: "hover:bg-gray-600",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    // Dark theme colors from the image
    brandAccent: "#465FFF", // --color-brand-500
    hoverActiveAccent: "#3641F5", // --color-brand-600
    informationalAccent: "#36BFFA", // --color-blue-light-500
    success: "#6CE9A6", // --color-success-400
    error: "#F97066", // --color-error-400
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Rocket,
      subsections: [
        {
          id: "introduction",
          title: "Introduction",
          content: `Welcome to the Track & Place platform - your comprehensive solution for managing campus placements and student career development.
Our platform bridges the gap between educational institutions, students, and recruiting companies, streamlining the entire placement process from registration to offer acceptance.
**Key Benefits:**
• Centralized placement management system
• Real-time application tracking
• Automated communication workflows
• Detailed analytics and reporting
• Seamless integration capabilities
Whether you're a student looking for opportunities, an institution managing placements, or a company seeking talented candidates, Track & Place provides the tools you need to succeed.`,
        },
        {
          id: "quick-setup",
          title: "Quick Setup",
          content: `Get started with Track & Place in just a few minutes:
**Step 1: Create Your Account**
Navigate to the registration page and select your user type (Student, Institution Admin, or Company Recruiter).
**Step 2: Complete Your Profile**
Fill out all required information to ensure optimal matching and visibility.
**Step 3: Verify Your Email**
Check your inbox for a verification email and click the confirmation link.
**Step 4: Explore the Dashboard**
Familiarize yourself with the interface and available features.
**Step 5: Start Using the Platform**
• Students: Browse opportunities and submit applications
• Institutions: Post placement drives and manage students
• Companies: Create job listings and review candidates`,
        },
        {
          id: "system-requirements",
          title: "System Requirements",
          content: `To ensure the best experience with Track & Place, please ensure your system meets these requirements:
**Supported Browsers:**
• Google Chrome (version 90+)
• Mozilla Firefox (version 88+)
• Safari (version 14+)
• Microsoft Edge (version 90+)
**Internet Connection:**
• Minimum 1 Mbps recommended
• 5 Mbps or higher for video interviews
**Device Requirements:**
• Desktop/Laptop: 1280x720 minimum resolution
• Mobile: iOS 13+ or Android 8+
• RAM: 4GB minimum
• Storage: 500MB free space for offline capabilities
**Additional Requirements:**
• Webcam and microphone for virtual interviews
• PDF reader for document viewing
• Modern email client for notifications`,
        },
      ],
    },
    {
      id: "for-students",
      title: "For Students",
      icon: GraduationCap,
      subsections: [
        {
          id: "creating-profile",
          title: "Creating Your Profile",
          content: `Your profile is your first impression to potential employers. Here's how to create a standout profile:
**Personal Information:**
• Full name, contact details, and professional photo
• Educational background and academic achievements
• Skills, certifications, and technical proficiencies
• Project portfolio and work samples
**Resume Upload:**
• Supported formats: PDF, DOC, DOCX
• Maximum file size: 5MB
• Ensure resume is ATS-friendly
• Keep it updated regularly
**Additional Documents:**
• Academic transcripts
• Recommendation letters
• Certificates and awards
• Portfolio work samples
**Profile Optimization Tips:**
• Use professional language
• Highlight relevant achievements
• Keep information accurate and current
• Add keywords relevant to your target roles
• Complete all optional fields for better visibility`,
        },
        {
          id: "applying-jobs",
          title: "Applying for Jobs",
          content: `Follow these steps to maximize your chances of landing your dream placement:
**Finding Opportunities:**
• Use advanced filters (company, role, location, salary)
• Save interesting positions for later review
• Set up alerts for new matching opportunities
• Check the placement calendar regularly
**Application Process:**
1. Review job requirements carefully
2. Ensure your profile meets minimum criteria
3. Customize your cover letter if required
4. Double-check all information before submission
5. Submit application before deadline
**Application Status:**
• **Submitted** - Application under initial review
• **Shortlisted** - Selected for next round
• **Interview Scheduled** - Date and time confirmed
• **Offered** - Congratulations! Offer extended
• **Rejected** - Not selected this time
**Best Practices:**
• Apply early for better visibility
• Tailor your application to each role
• Follow up appropriately
• Prepare thoroughly for each stage
• Maintain professional communication`,
        },
        {
          id: "interview-prep",
          title: "Interview Preparation",
          content: `Ace your interviews with these preparation strategies:
**Before the Interview:**
• Research the company thoroughly
• Review common interview questions
• Prepare your own questions to ask
• Test your tech setup for virtual interviews
• Dress professionally
• Gather necessary documents
**During the Interview:**
• Join 5-10 minutes early (virtual) or 15 minutes early (in-person)
• Maintain good eye contact and posture
• Answer questions clearly and concisely
• Use the STAR method for behavioral questions
• Show enthusiasm and genuine interest
• Take notes if appropriate
**After the Interview:**
• Send a thank-you email within 24 hours
• Reflect on your performance
• Note any follow-up actions required
• Be patient while waiting for results
**Platform Resources:**
• Access mock interview recordings
• Review company-specific preparation materials
• Use our AI-powered interview coach
• Connect with mentors who've succeeded
• Practice with peer interview sessions`,
        },
      ],
    },
    {
      id: "for-institutions",
      title: "For Institutions",
      icon: Building2,
      subsections: [
        {
          id: "managing-students",
          title: "Managing Students",
          content: `Effectively manage your student body throughout the placement process:
**Student Registration:**
• Bulk upload student data via CSV/Excel
• Set eligibility criteria for placement drives
• Verify student profiles and documents
• Assign students to specific departments/programs
• Track registration completion rates
**Student Monitoring:**
• View real-time application statistics
• Monitor individual student progress
• Identify students needing additional support
• Track placement success rates by program
• Generate student performance reports
**Communication Tools:**
• Send mass emails to student groups
• Create targeted announcements
• Schedule important reminders
• Share placement preparation resources
• Facilitate mentor-student connections
**Document Management:**
• Collect and verify academic transcripts
• Manage offer letters and acceptance forms
• Store training completion certificates
• Archive historical placement records
• Ensure GDPR compliance
**Best Practices:**
• Conduct regular profile audits
• Provide timely feedback to students
• Organize pre-placement training sessions
• Maintain updated eligibility criteria
• Foster a supportive placement culture`,
        },
        {
          id: "placement-drives",
          title: "Organizing Placement Drives",
          content: `Streamline your placement drives with our comprehensive tools:
**Planning Phase:**
• Define drive objectives and target companies
• Set eligibility criteria and cutoffs
• Create a detailed timeline and schedule
• Allocate resources (rooms, equipment, staff)
• Prepare marketing materials
**Company Coordination:**
• Send invitations to recruiting partners
• Collect job descriptions and requirements
• Coordinate visit dates and logistics
• Arrange accommodation if needed
• Prepare welcome kits
**Student Preparation:**
• Announce drive details well in advance
• Conduct pre-placement training sessions
• Share company research materials
• Organize mock interviews
• Provide dress code guidelines
**Drive Execution:**
• Check-in students and company representatives
• Manage interview schedules in real-time
• Coordinate room assignments
• Handle last-minute changes smoothly
• Collect feedback from all parties
**Post-Drive Activities:**
• Compile results and offer details
• Facilitate offer acceptance process
• Gather feedback for improvement
• Update placement statistics
• Thank participating companies
**Analytics & Reporting:**
• Track attendance and participation rates
• Monitor conversion funnel metrics
• Analyze company feedback scores
• Generate comprehensive drive reports
• Identify areas for improvement`,
        },
        {
          id: "analytics-reporting",
          title: "Analytics & Reporting",
          content: `Leverage data-driven insights to improve your placement outcomes:
**Dashboard Overview:**
• Real-time placement statistics
• Student application metrics
• Company engagement rates
• Success rate trends over time
• Department-wise performance comparison
**Standard Reports:**
• **Placement Summary Report** - Overall statistics and highlights
• **Student-wise Report** - Individual student progress and outcomes
• **Company-wise Report** - Engagement and hiring patterns
• **Department Analysis** - Program-specific performance
• **Timeline Report** - Placement activities chronology
**Custom Reports:**
• Define specific metrics to track
• Filter by date range, program, or company
• Export in multiple formats (PDF, Excel, CSV)
• Schedule automated report generation
• Share reports with stakeholders
**Key Performance Indicators:**
• Overall placement percentage
• Average salary offered
• Number of companies participated
• Student-to-offer ratio
• Time-to-placement average
• Student satisfaction scores
**Data Visualization:**
• Interactive charts and graphs
• Trend analysis over multiple years
• Comparative performance metrics
• Geographic distribution of placements
• Industry-wise breakdown
**Using Insights:**
• Identify successful strategies to replicate
• Spot areas needing improvement
• Justify resource allocation decisions
• Demonstrate value to stakeholders
• Benchmark against industry standards`,
        },
      ],
    },
    {
      id: "for-companies",
      title: "For Companies",
      icon: Building2,
      subsections: [
        {
          id: "posting-jobs",
          title: "Posting Job Opportunities",
          content: `Attract top talent with compelling job postings:
**Creating a Job Listing:**
• Job title and role description
• Required qualifications and skills
• Preferred qualifications (nice to have)
• Responsibilities and day-to-day activities
• Compensation and benefits package
• Work location and remote options
• Application deadline
**Targeting the Right Candidates:**
• Set educational requirements (degree, GPA)
• Specify technical skills needed
• Define experience level (fresher, intern)
• Select relevant programs/departments
• Add screening questions if needed
**Enhancing Your Listing:**
• Include company culture highlights
• Add photos or videos of workplace
• Mention growth opportunities
• Highlight unique benefits
• Share employee testimonials
• Provide interview process overview
**Best Practices:**
• Use clear, inclusive language
• Be specific about requirements
• Set realistic qualifications
• Provide salary transparency
• Respond promptly to applications
• Update listing status regularly
**Visibility Options:**
• Feature listing for increased exposure
• Target specific institutions
• Set priority level
• Schedule publication date
• Extend deadline if needed`,
        },
        {
          id: "candidate-screening",
          title: "Candidate Screening",
          content: `Efficiently review and shortlist the best candidates:
**Application Management:**
• View all applications in one dashboard
• Filter by qualifications, skills, or GPA
• Sort by application date or relevance
• Bulk actions for efficiency
• Export candidate lists
**Resume Review Tools:**
• Side-by-side resume comparison
• Keyword highlighting
• Skills matching score
• Education verification status
• Application completeness indicator
**Screening Stages:**
1. **Initial Review** - Quick filter based on minimum criteria
2. **Detailed Assessment** - Deep dive into qualified candidates
3. **Shortlisting** - Select candidates for interviews
4. **Interview Scheduling** - Coordinate dates and times
5. **Final Selection** - Make offers to top candidates
**Collaborative Hiring:**
• Add notes visible to your team
• Rate candidates on custom criteria
• Request input from other reviewers
• Track who reviewed each application
• Maintain consistent evaluation standards
**Communication:**
• Send automated acknowledgment emails
• Update candidates on status changes
• Schedule interviews directly through platform
• Share feedback after interviews
• Send offer letters and documents
**Compliance & Fairness:**
• Ensure bias-free screening processes
• Maintain audit trails of decisions
• Follow equal opportunity guidelines
• Protect candidate privacy
• Document selection rationale`,
        },
        {
          id: "campus-engagement",
          title: "Campus Engagement",
          content: `Build strong relationships with educational institutions:
**Pre-Placement Activities:**
• Schedule campus visits and presentations
• Conduct technical workshops or webinars
• Sponsor hackathons or competitions
• Offer internship programs
• Host company awareness sessions
**Building Employer Brand:**
• Share your company story and mission
• Highlight employee success stories
• Showcase workplace culture and values
• Present growth and learning opportunities
• Demonstrate commitment to diversity
**Partnership Opportunities:**
• Curriculum development collaboration
• Industry mentorship programs
• Research and development projects
• Guest lecture series
• Capstone project sponsorship
**Placement Drive Participation:**
• Confirm attendance and requirements
• Provide detailed job descriptions
• Send interviewer team details
• Share interview format and duration
• Coordinate logistics with placement office
**Post-Placement Engagement:**
• Onboard selected candidates smoothly
• Provide feedback to placement office
• Maintain relationship with institution
• Consider them for future hiring
• Support alumni network activities
**Long-term Benefits:**
• Build pipeline of qualified candidates
• Reduce recruitment costs over time
• Enhance company reputation
• Access niche talent pools
• Strengthen industry-academia ties`,
        },
      ],
    },
    {
      id: "technical-docs",
      title: "Technical Documentation",
      icon: Code,
      subsections: [
        {
          id: "api-overview",
          title: "API Overview",
          content: `Integrate Track & Place with your existing systems using our RESTful API:
**Authentication:**
All API requests require authentication using Bearer tokens:
\`\`\`
Authorization: Bearer YOUR_API_TOKEN
\`\`\`
**Base URL:**
\`\`\`
https://api.trackandplace.com/v1
\`\`\`
**Response Format:**
All responses are returned in JSON format with standard HTTP status codes.
**Rate Limiting:**
• 1000 requests per hour for standard plans
• 5000 requests per hour for enterprise plans
• Rate limit headers included in responses
**Common Endpoints:**
**Students:**
• GET /students - List all students
• GET /students/:id - Get student details
• POST /students - Create new student
• PUT /students/:id - Update student
• DELETE /students/:id - Remove student
**Jobs:**
• GET /jobs - List all jobs
• GET /jobs/:id - Get job details
• POST /jobs - Create new job posting
• PUT /jobs/:id - Update job posting
• DELETE /jobs/:id - Remove job posting
**Applications:**
• GET /applications - List applications
• GET /applications/:id - Get application details
• POST /applications - Submit new application
• PUT /applications/:id - Update application status
**Webhooks:**
Configure webhooks to receive real-time notifications:
• application.submitted
• application.status_changed
• interview.scheduled
• offer.extended
• offer.accepted`,
        },
        {
          id: "integrations",
          title: "Third-party Integrations",
          content: `Connect Track & Place with your favorite tools and services:
**Learning Management Systems:**
• **Moodle** - Sync student records and grades
• **Canvas** - Import course completion data
• **Blackboard** - Share placement resources
**Communication Platforms:**
• **Slack** - Receive placement updates
• **Microsoft Teams** - Coordinate interviews
• **Zoom** - Schedule video interviews
• **Google Meet** - Virtual placement drives
**HR & Recruiting Tools:**
• **Workday** - Streamline onboarding
• **BambooHR** - Sync employee data
• **Greenhouse** - Advanced ATS integration
• **Lever** - Candidate pipeline management
**Calendar & Scheduling:**
• **Google Calendar** - Interview scheduling
• **Outlook Calendar** - Appointment sync
• **Calendly** - Self-service booking
**Document Management:**
• **Google Drive** - Store and share documents
• **Dropbox** - Resume and certificate storage
• **OneDrive** - Institutional document sync
**Analytics & Reporting:**
• **Google Analytics** - Track platform usage
• **Tableau** - Advanced data visualization
• **Power BI** - Custom report creation
**Setup Process:**
1. Navigate to Settings > Integrations
2. Select the service you want to connect
3. Click "Connect" and authorize access
4. Configure integration settings
5. Test the connection
6. Enable automatic sync if available
**Security:**
• All integrations use OAuth 2.0
• Encrypted data transmission
• Granular permission controls
• Audit logs for all sync activities
• Easy disconnect option available`,
        },
        {
          id: "troubleshooting",
          title: "Troubleshooting",
          content: `Common issues and their solutions:
**Login Issues:**
**Problem:** Can't log in to account
**Solutions:**
• Verify email and password are correct
• Check if Caps Lock is on
• Clear browser cache and cookies
• Try password reset if needed
• Ensure account is verified
**Problem:** Not receiving verification email
**Solutions:**
• Check spam/junk folder
• Verify email address is correct
• Wait 5-10 minutes and try again
• Request a new verification email
• Contact support if still not received
**Application Issues:**
**Problem:** Cannot submit application
**Solutions:**
• Ensure all required fields are filled
• Check file size limits (5MB max)
• Verify application deadline hasn't passed
• Try a different browser
• Check internet connection
**Problem:** Application status not updating
**Solutions:**
• Refresh the page
• Clear browser cache
• Wait 24 hours for processing
• Contact institution admin
**Upload Issues:**
**Problem:** Document upload fails
**Solutions:**
• Reduce file size (compress PDF)
• Convert to supported format
• Check file name (no special characters)
• Ensure stable internet connection
• Try uploading from different device
**Performance Issues:**
**Problem:** Platform running slow
**Solutions:**
• Close unnecessary browser tabs
• Clear browser cache
• Disable browser extensions
• Check internet speed
• Try during off-peak hours
• Update your browser
**Video Interview Issues:**
**Problem:** Audio/video not working
**Solutions:**
• Grant browser camera/mic permissions
• Check device settings
• Test with different browser
• Ensure drivers are updated
• Close other applications using camera
• Restart your device
**Still Need Help?**
• Search our knowledge base
• Watch tutorial videos
• Join community forum
• Submit a support ticket
• Schedule a live chat session
• Call our helpline (Mon-Fri, 9AM-6PM)`,
        },
      ],
    },
    {
      id: "support",
      title: "Help & Support",
      icon: Settings,
      subsections: [
        {
          id: "faq",
          title: "Frequently Asked Questions",
          content: `Find quick answers to common questions:
**Account & Profile:**
Q: How do I reset my password?
A: Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.
Q: Can I have multiple user types (student and company)?
A: No, each email address can only be associated with one user type. Use different email addresses for different roles.
Q: How do I delete my account?
A: Navigate to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone.
**Applications:**
Q: How many jobs can I apply to?
A: Students on the Basic plan can apply to unlimited positions. There are no application limits.
Q: Can I withdraw an application?
A: Yes, you can withdraw before the company reviews it. Go to My Applications and click "Withdraw Application."
Q: How long does it take to hear back after applying?
A: This varies by company, typically 1-2 weeks. You'll receive email notifications when status changes.
**Placements:**
Q: Can I accept multiple job offers?
A: This depends on your institution's policy. Check with your placement office before accepting multiple offers.
Q: What happens if I reject an offer?
A: You can continue applying to other positions. Some institutions may have policies regarding offer rejections.
**Technical:**
Q: Which browsers are supported?
A: Chrome, Firefox, Safari, and Edge (latest versions). We recommend Chrome for the best experience.
Q: Is there a mobile app?
A: Currently, we offer a mobile-optimized website. Native apps are in development.
Q: How is my data protected?
A: We use bank-level encryption, secure servers, and comply with GDPR and data protection regulations.
**Billing (For Institutions/Companies):**
Q: What payment methods do you accept?
A: Credit cards, bank transfers, and purchase orders for enterprise plans.
Q: Can I change my plan anytime?
A: Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
Q: Do you offer discounts for non-profits?
A: Yes, we offer special pricing for educational institutions and registered non-profit organizations.`,
        },
      ],
    },
  ];

  const filteredSections = sections.map((section) => ({
    ...section,
    subsections: section.subsections.filter(
      (sub) =>
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.content.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const activeContent = sections
    .find((s) => s.id === activeSection)
    ?.subsections.find((sub) => sub.id === activeSubsection);

  const formatContent = (content) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3
            key={index}
            className={`text-lg font-bold ${themeStyles.textPrimary} mt-6 mb-3`}
          >
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("• ")) {
        return (
          <li key={index} className={`${themeStyles.textSecondary} ml-6 mb-2`}>
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith("```")) {
        return null;
      }
      if (line.trim().match(/^\d+\./)) {
        return (
          <li
            key={index}
            className={`${themeStyles.textSecondary} ml-6 mb-2 list-decimal`}
          >
            {line.replace(/^\d+\.\s*/, "")}
          </li>
        );
      }
      if (line.startsWith("Q: ")) {
        return (
          <div
            key={index}
            className={`${themeStyles.textPrimary} font-semibold mt-4 mb-2`}
          >
            {line}
          </div>
        );
      }
      if (line.startsWith("A: ")) {
        return (
          <div key={index} className={`${themeStyles.textSecondary} mb-4 pl-4`}>
            {line}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      }
      return (
        <p
          key={index}
          className={`${themeStyles.textSecondary} mb-3 leading-relaxed`}
        >
          {line}
        </p>
      );
    });
  };

  const handleSectionClick = (section) => {
    setActiveSection(section.id);
    if (section.subsections.length > 0) {
      setActiveSubsection(section.subsections[0].id);
    }
    setIsSidebarOpen(false);
  };

  const handleSubsectionClick = (subsectionId) => {
    setActiveSubsection(subsectionId);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      {/* HEADER */}
      <header
        className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border-b sticky top-0 z-50 ${themeStyles.cardShadow}`}
      >
        <div className="flex items-center justify-between px-4 md\:px-6 py-4">
          <div className="flex items-center gap-3 md\:gap-4">
            <button
              onClick={() => window.history.back()}
              className={`p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textSecondary} hover:${themeStyles.textPrimary} transition-colors`}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 md\:w-6 md\:h-6" />
            </button>
            <div className="flex items-center gap-2 md\:gap-3">
              <div>
                <h1
                  className={`text-lg md:text-2xl alig justify-center font-bold ${themeStyles.textPrimary}`}
                >
                  Documentation for TRACKTNP
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`lg:hidden p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textSecondary}`}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh-73px)] md\:h-[calc(100vh-89px)] overflow-hidden relative">
        {/* SIDEBAR OVERLAY FOR MOBILE */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg\:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:relative
            w-80 max-w-[85vw]
            h-full
            ${themeStyles.cardBg} ${themeStyles.cardBorder}
            lg:border-r border-r-0
            overflow-y-auto
            z-40
            transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="p-4 md\:p-6 sticky top-0 bg-inherit z-10">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${themeStyles.textTertiary}`}
              />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2
                \${themeStyles.inputBg}
                ${themeStyles.inputBorder}
                border rounded-lg
                ${themeStyles.inputText}
                \${themeStyles.inputPlaceholder}
                focus\:outline-none focus\:ring-2 focus\:ring-blue-500`}
              />
            </div>
          </div>
          {/* NAVIGATION */}
          <nav className="px-4 pb-6">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="mb-2">
                  {/* MAIN BUTTON */}
                  <button
                    onClick={() => handleSectionClick(section)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all \${
                      activeSection === section.id
                        ? ${themeStyles.statIcon1Bg} ${themeStyles.statIcon1Text}
                        : ${themeStyles.textSecondary} ${themeStyles.buttonHover}
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold">{section.title}</span>
                  </button>
                  {/* SUBSECTIONS */}
                  {activeSection === section.id &&
                    section.subsections.length > 0 && (
                      <div className="overflow-hidden">
                        <div className="ml-4 mt-1 space-y-1">
                          {section.subsections.map((subsection) => (
                            <button
                              key={subsection.id}
                              onClick={() =>
                                handleSubsectionClick(subsection.id)
                              }
                              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm transition-all \${
                                activeSubsection === subsection.id
                                  ? ${themeStyles.textPrimary} font-medium bg-blue-500/10
                                  : ${themeStyles.textSecondary} ${themeStyles.buttonHover}
                              }`}
                            >
                              <ChevronRight className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {subsection.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </nav>
        </aside>
        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md\:p-8">
            {activeContent && (
              <div>
                {/* HEADER */}
                <div className="flex items-start gap-3 md\:gap-4 mb-6">
                  <div
                    className={`p-2 md:p-3 rounded-lg ${themeStyles.statIcon1Bg} flex-shrink-0`}
                  >
                    <FileText
                      className={`w-5 h-5 md:w-6 md:h-6 ${themeStyles.statIcon1Text}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-2xl md:text-3xl font-bold ${themeStyles.textPrimary} mb-2`}
                    >
                      {activeContent.title}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs md:text-sm ${themeStyles.textTertiary}`}
                      >
                        {sections.find((s) => s.id === activeSection)?.title}
                      </span>
                      <ChevronRight
                        className={`w-3 h-3 md:w-4 md:h-4 ${themeStyles.textTertiary} flex-shrink-0`}
                      />
                      <span
                        className={`text-xs md:text-sm ${themeStyles.textSecondary} truncate`}
                      >
                        {activeContent.title}
                      </span>
                    </div>
                  </div>
                </div>
                {/* CONTENT BOX */}
                <div
                  className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-xl md:rounded-2xl p-4 md:p-8 ${themeStyles.cardShadow}`}
                >
                  <div className="prose prose-slate max-w-none prose-sm md\:prose-base">
                    {formatContent(activeContent.content)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;

import React, { useState } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  Calendar,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Save,
  BarChart2,
  UserCheck,
  UserX,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Star,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// ─── Sample drives (same source as CompanyDrivesManager) ─────────────────────
const DRIVES = [
  {
    id: 1,
    name: "Incorbis",
    date: "Nov 25, 2025",
    registrationStatus: "Closed",
    totalRegistered: 45,
    totalSelected: 12,
    salary: "6.5 LPA",
    venue: "Seminar Hall",
    type: "Placement",
    totalRounds: 5,
  },
  {
    id: 2,
    name: "TCS",
    date: "Nov 28, 2025",
    registrationStatus: "Closed",
    totalRegistered: 120,
    totalSelected: 35,
    salary: "4.5 LPA",
    venue: "Main Auditorium",
    type: "Placement",
    totalRounds: 3,
  },
  {
    id: 3,
    name: "Infosys",
    date: "Dec 2, 2025",
    registrationStatus: "Open",
    totalRegistered: 89,
    totalSelected: 28,
    salary: "5.0 LPA",
    venue: "Conference Hall",
    type: "Internship",
    totalRounds: 4,
  },
  {
    id: 4,
    name: "Wipro",
    date: "Dec 5, 2025",
    registrationStatus: "Open",
    totalRegistered: 67,
    totalSelected: 18,
    salary: "4.0 LPA",
    venue: "Lab Complex",
    type: "Placement",
    totalRounds: 3,
  },
];

// ─── Theme helper (identical pattern to CompanyDrivesManager) ────────────────
const useColors = (theme) => {
  const isDark = theme === "dark";
  return {
    isDark,
    background: isDark ? "#020617" : "#f8fafc",
    cardBg: isDark ? "#1D2939" : "#ffffff",
    cardBg2: isDark ? "#111827" : "#f1f5f9",
    border: isDark ? "#344054" : "#E4E7EC",
    text: isDark ? "#F9FAFB" : "#101828",
    textSecondary: isDark ? "#98A2B3" : "#667085",
    textTertiary: isDark ? "#667085" : "#98A2B3",
    inputBg: isDark ? "#111827" : "#ffffff",
    inputBorder: isDark ? "#344054" : "#D0D5DD",
    hoverBg: isDark ? "#344054" : "#F2F4F7",
    accent: isDark ? "#3b82f6" : "#2563eb",
    success: isDark ? "#10b981" : "#059669",
    warning: isDark ? "#f59e0b" : "#d97706",
    danger: isDark ? "#ef4444" : "#dc2626",
    purple: isDark ? "#a78bfa" : "#7c3aed",
    tableBg: isDark ? "#1D2939" : "#ffffff",
    tableHeaderBg: isDark ? "#111827" : "#F8FAFC",
  };
};

// ─── Field Error ──────────────────────────────────────────────────────────────
const FieldError = ({ error, colors }) =>
  error ? (
    <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: colors.danger }}>
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {error}
    </p>
  ) : null;

// ─── Stat pill used inside the detail form ───────────────────────────────────
const StatPill = ({ label, value, color, colors }) => (
  <div
    className="flex flex-col items-center justify-center rounded-xl p-4 border"
    style={{ backgroundColor: colors.cardBg2, borderColor: colors.border }}
  >
    <span className="text-2xl font-bold" style={{ color }}>
      {value ?? "—"}
    </span>
    <span className="text-xs mt-1 text-center" style={{ color: colors.textSecondary }}>
      {label}
    </span>
  </div>
);

// ─── Section heading ─────────────────────────────────────────────────────────
const SectionHeading = ({ icon: Icon, title, colors }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="h-5 w-5" style={{ color: colors.accent }} />
    <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
      {title}
    </h3>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const DriveOverview = () => {
  const { theme } = useTheme();
  const colors = useColors(theme);

  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState({}); // keyed by drive id
  const [errors, setErrors] = useState({});

  // Per-drive form state
  const [forms, setForms] = useState(() =>
    Object.fromEntries(
      DRIVES.map((d) => [
        d.id,
        {
          // Attendance
          totalPresent: "",
          totalAbsent: "",
          // Round-wise
          appearedAptitude: "",
          clearedAptitude: "",
          appearedTechnical: "",
          clearedTechnical: "",
          appearedHR: "",
          clearedHR: "",
          // Offers
          offersPlacement: "",
          offersInternship: "",
          offersPPO: "",
          // Feedback
          companyFeedback: "",
          coordinatorName: "",
          coordinatorRemarks: "",
          overallRating: "",
          // Status
          driveStatus: "",
          followUpRequired: false,
          followUpDate: "",
          nextSteps: "",
        },
      ])
    )
  );

  const setField = (driveId, key, value) => {
    setForms((prev) => ({
      ...prev,
      [driveId]: { ...prev[driveId], [key]: value },
    }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = (driveId) => {
    const f = forms[driveId];
    const e = {};
    if (!f.totalPresent) e.totalPresent = "Required";
    if (!f.totalAbsent) e.totalAbsent = "Required";
    if (!f.offersPlacement && !f.offersInternship && !f.offersPPO)
      e.offersPlacement = "Enter at least one offer count";
    if (!f.driveStatus) e.driveStatus = "Select a drive status";
    if (f.followUpRequired && !f.followUpDate)
      e.followUpDate = "Follow-up date required";
    return e;
  };

  const handleSave = (driveId) => {
    const e = validate(driveId);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSaved((prev) => ({ ...prev, [driveId]: true }));
  };

  const f = selected ? forms[selected.id] : null;

  // ── Stats bar at top ──────────────────────────────────────────────────────
  const overviewStats = [
    {
      label: "Total Drives",
      value: DRIVES.length,
      icon: Building2,
      gradient: colors.isDark ? "from-gray-800 to-blue-900/30" : "from-white to-blue-50",
      iconBg: colors.isDark ? "bg-blue-900/30" : "bg-blue-100",
      iconColor: colors.isDark ? "text-blue-400" : "text-blue-600",
    },
    {
      label: "Reports Submitted",
      value: Object.keys(saved).length,
      icon: FileText,
      gradient: colors.isDark ? "from-gray-800 to-green-900/30" : "from-white to-green-50",
      iconBg: colors.isDark ? "bg-green-900/30" : "bg-green-100",
      iconColor: colors.isDark ? "text-green-400" : "text-green-600",
    },
    {
      label: "Pending Reports",
      value: DRIVES.length - Object.keys(saved).length,
      icon: Clock,
      gradient: colors.isDark ? "from-gray-800 to-amber-900/30" : "from-white to-amber-50",
      iconBg: colors.isDark ? "bg-amber-900/30" : "bg-amber-100",
      iconColor: colors.isDark ? "text-amber-400" : "text-amber-600",
    },
    {
      label: "Total Offers (all drives)",
      value: Object.values(forms).reduce(
        (s, fm) =>
          s +
          (parseInt(fm.offersPlacement) || 0) +
          (parseInt(fm.offersInternship) || 0) +
          (parseInt(fm.offersPPO) || 0),
        0
      ),
      icon: TrendingUp,
      gradient: colors.isDark ? "from-gray-800 to-purple-900/30" : "from-white to-purple-50",
      iconBg: colors.isDark ? "bg-purple-900/30" : "bg-purple-100",
      iconColor: colors.isDark ? "text-purple-400" : "text-purple-600",
    },
  ];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: colors.background, minHeight: "100vh" }}>
      <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">

        {/* ── Page Header ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-6">
          {selected && (
            <button
              onClick={() => { setSelected(null); setErrors({}); }}
              className="p-2 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: colors.hoverBg, color: colors.text }}
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
              {selected ? `${selected.name} — Post-Drive Report` : "Drive Overview"}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>
              {selected
                ? `Fill in what happened after the ${selected.date} drive`
                : "Submit and review post-drive reports for each campus recruitment"}
            </p>
          </div>
        </div>

        {/* ── Top Stats ──────────────────────────────────────────────────── */}
        {!selected && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {overviewStats.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-6 shadow-sm bg-gradient-to-br ${s.gradient} transition-all`}
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>{s.label}</p>
                    <h3 className="text-3xl font-bold mt-2" style={{ color: colors.text }}>{s.value}</h3>
                  </div>
                  <div className={`h-12 w-12 ${s.iconBg} rounded-full flex items-center justify-center`}>
                    <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Drive List ─────────────────────────────────────────────────── */}
        {!selected && (
          <>
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Select a Drive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {DRIVES.map((drive) => {
                const isDone = !!saved[drive.id];
                return (
                  <div
                    key={drive.id}
                    onClick={() => setSelected(drive)}
                    className="rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 overflow-hidden"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
                  >
                    {/* Top accent bar */}
                    <div className="h-1.5" style={{ backgroundColor: isDone ? colors.success : colors.accent }} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold" style={{ color: colors.text }}>{drive.name}</h3>
                          <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{drive.type}</p>
                        </div>
                        {isDone ? (
                          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: colors.isDark ? "#064e3b" : "#d1fae5", color: colors.success }}>
                            <CheckCircle2 size={12} /> Submitted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: colors.isDark ? "#451a03" : "#fef3c7", color: colors.warning }}>
                            <Clock size={12} /> Pending
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5 text-sm">
                        {[
                          ["Date", drive.date, <Calendar size={13} />],
                          ["Venue", drive.venue, <Building2 size={13} />],
                          ["Salary", drive.salary, <TrendingUp size={13} />],
                          ["Registered", drive.totalRegistered, <Users size={13} />],
                        ].map(([label, val, icon]) => (
                          <div key={label} className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                              <span style={{ color: colors.textTertiary }}>{icon}</span>{label}
                            </span>
                            <span className="font-medium" style={{ color: colors.text }}>{val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-end gap-1" style={{ color: colors.accent }}>
                        <span className="text-xs font-semibold">{isDone ? "Edit report" : "Fill report"}</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Post-Drive Form ────────────────────────────────────────────── */}
        {selected && f && (
          <div className="space-y-6">

            {/* Drive meta banner */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-0 divide-x"
                style={{ divideColor: colors.border }}>
                {[
                  ["Date", selected.date, <Calendar size={14} />],
                  ["Venue", selected.venue, <Building2 size={14} />],
                  ["Type", selected.type, <Briefcase size={14} />],
                  ["Package", selected.salary, <TrendingUp size={14} />],
                  ["Rounds", selected.totalRounds, <BarChart2 size={14} />],
                  ["Registered", selected.totalRegistered, <Users size={14} />],
                ].map(([label, val, icon], idx) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center text-center px-4 py-3"
                    style={{
                      borderRight: idx < 5 ? `1px solid ${colors.border}` : "none",
                    }}
                  >
                    <span
                      className="flex items-center gap-1 text-xs font-medium mb-1.5"
                      style={{ color: colors.textSecondary }}
                    >
                      <span style={{ color: colors.accent }}>{icon}</span>
                      {label}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: colors.text }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
              {saved[selected.id] && (
                <div
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: colors.isDark ? "#064e3b" : "#d1fae5", color: colors.success }}
                >
                  <CheckCircle2 size={16} /> Report Saved
                </div>
              )}
            </div>

            {/* Live derived pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatPill label="Present" value={f.totalPresent || "0"} color={colors.success} colors={colors} />
              <StatPill label="Absent" value={f.totalAbsent || "0"} color={colors.danger} colors={colors} />
              <StatPill
                label="Total Offers"
                value={(parseInt(f.offersPlacement) || 0) + (parseInt(f.offersInternship) || 0) + (parseInt(f.offersPPO) || 0)}
                color={colors.accent}
                colors={colors}
              />
              <StatPill
                label="Selection Rate"
                value={
                  f.totalPresent && parseInt(f.totalPresent) > 0
                    ? `${Math.round((((parseInt(f.offersPlacement) || 0) + (parseInt(f.offersInternship) || 0) + (parseInt(f.offersPPO) || 0)) / parseInt(f.totalPresent)) * 100)}%`
                    : "0%"
                }
                color={colors.purple}
                colors={colors}
              />
            </div>

            {/* ── Section 1: Attendance ────────────────────────────────── */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <SectionHeading icon={Users} title="Attendance" colors={colors} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "totalPresent", label: "Students Present", placeholder: "e.g. 42", required: true },
                  { key: "totalAbsent", label: "Students Absent", placeholder: "e.g. 3", required: true },
                ].map(({ key, label, placeholder, required }) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium" style={{ color: colors.text }}>
                      {label} {required && <span style={{ color: colors.danger }}>*</span>}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={f[key]}
                      onChange={(e) => setField(selected.id, key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ backgroundColor: colors.inputBg, borderColor: errors[key] ? colors.danger : colors.inputBorder, color: colors.text }}
                    />
                    <FieldError error={errors[key]} colors={colors} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 2: Round-wise Results ───────────────────────── */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <SectionHeading icon={BarChart2} title="Round-wise Clearance" colors={colors} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { appeared: "appearedAptitude", cleared: "clearedAptitude", label: "Aptitude Round" },
                  { appeared: "appearedTechnical", cleared: "clearedTechnical", label: "Technical Round" },
                  { appeared: "appearedHR", cleared: "clearedHR", label: "HR Round" },
                ].map(({ appeared, cleared, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border p-4"
                    style={{ backgroundColor: colors.cardBg2, borderColor: colors.border }}
                  >
                    <p className="text-sm font-semibold mb-3" style={{ color: colors.text }}>{label}</p>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium" style={{ color: colors.text }}>Appeared</label>
                        <input
                          type="number" min="0"
                          value={f[appeared]}
                          onChange={(e) => setField(selected.id, appeared, e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium" style={{ color: colors.text }}>Cleared</label>
                        <input
                          type="number" min="0"
                          value={f[cleared]}
                          onChange={(e) => setField(selected.id, cleared, e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }}
                        />
                      </div>
                      {f[appeared] && f[cleared] && (
                        <p className="text-xs text-center font-semibold rounded-lg py-1.5" style={{ backgroundColor: colors.isDark ? "#1e3a5f" : "#dbeafe", color: colors.accent }}>
                          {Math.round((parseInt(f[cleared]) / parseInt(f[appeared])) * 100)}% pass rate
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 3: Offers ────────────────────────────────────── */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <SectionHeading icon={UserCheck} title="Offer Breakdown" colors={colors} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { key: "offersPlacement", label: "Full-time Placements", color: colors.success, icon: <GraduationCap size={16} /> },
                  { key: "offersInternship", label: "Internship Offers", color: colors.accent, icon: <Briefcase size={16} /> },
                  { key: "offersPPO", label: "PPO Offers", color: colors.purple, icon: <Star size={16} /> },
                ].map(({ key, label, color, icon }) => (
                  <div key={key} className="rounded-xl border p-4 space-y-2" style={{ backgroundColor: colors.cardBg2, borderColor: colors.border }}>
                    <label className="flex items-center gap-2 text-sm font-medium" style={{ color: colors.text }}>
                      <span style={{ color }}>{icon}</span>{label}
                    </label>
                    <input
                      type="number" min="0"
                      value={f[key]}
                      onChange={(e) => setField(selected.id, key, e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ backgroundColor: colors.inputBg, borderColor: errors[key] ? colors.danger : colors.inputBorder, color: colors.text }}
                    />
                    <FieldError error={errors[key]} colors={colors} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 4: Drive Status ──────────────────────────────── */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <SectionHeading icon={CheckCircle2} title="Drive Status" colors={colors} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: colors.text }}>
                    Overall Drive Status <span style={{ color: colors.danger }}>*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Successful", "Partially Successful", "Cancelled", "Postponed", "Ongoing"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setField(selected.id, "driveStatus", status)}
                        className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                        style={{
                          backgroundColor: f.driveStatus === status ? colors.accent : colors.cardBg2,
                          borderColor: f.driveStatus === status ? colors.accent : colors.inputBorder,
                          color: f.driveStatus === status ? "#fff" : colors.text,
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <FieldError error={errors.driveStatus} colors={colors} />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: colors.text }}>Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setField(selected.id, "overallRating", n)}
                        className="h-10 w-10 rounded-lg border text-sm font-bold transition-all"
                        style={{
                          backgroundColor: f.overallRating >= n ? "#f59e0b" : colors.cardBg2,
                          borderColor: f.overallRating >= n ? "#f59e0b" : colors.inputBorder,
                          color: f.overallRating >= n ? "#fff" : colors.textSecondary,
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 5: Follow-up ─────────────────────────────────── */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <SectionHeading icon={Calendar} title="Follow-up" colors={colors} />
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer w-fit">
                  <div
                    onClick={() => setField(selected.id, "followUpRequired", !f.followUpRequired)}
                    className="w-11 h-6 rounded-full transition-all relative"
                    style={{ backgroundColor: f.followUpRequired ? colors.accent : colors.border }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                      style={{ left: f.followUpRequired ? "calc(100% - 20px)" : "4px" }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: colors.text }}>Follow-up required</span>
                </label>

                {f.followUpRequired && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium" style={{ color: colors.text }}>
                        Follow-up Date <span style={{ color: colors.danger }}>*</span>
                      </label>
                      <input
                        type="date"
                        value={f.followUpDate}
                        onChange={(e) => setField(selected.id, "followUpDate", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ backgroundColor: colors.inputBg, borderColor: errors.followUpDate ? colors.danger : colors.inputBorder, color: colors.text }}
                      />
                      <FieldError error={errors.followUpDate} colors={colors} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium" style={{ color: colors.text }}>Next Steps</label>
                      <input
                        type="text"
                        value={f.nextSteps}
                        onChange={(e) => setField(selected.id, "nextSteps", e.target.value)}
                        placeholder="e.g. Send offer letters to HR by Dec 10"
                        className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Section 6: Feedback & Remarks ───────────────────────── */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <SectionHeading icon={MessageSquare} title="Feedback & Remarks" colors={colors} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: colors.text }}>Coordinator Name</label>
                  <input
                    type="text"
                    value={f.coordinatorName}
                    onChange={(e) => setField(selected.id, "coordinatorName", e.target.value)}
                    placeholder="e.g. Dr. Anita Sharma"
                    className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: colors.text }}>Company's Feedback</label>
                  <input
                    type="text"
                    value={f.companyFeedback}
                    onChange={(e) => setField(selected.id, "companyFeedback", e.target.value)}
                    placeholder="e.g. Students were well-prepared"
                    className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }}
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-medium" style={{ color: colors.text }}>Coordinator Remarks</label>
                  <textarea
                    value={f.coordinatorRemarks}
                    onChange={(e) => setField(selected.id, "coordinatorRemarks", e.target.value)}
                    placeholder="Any additional observations, issues faced, or notes for the record…"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }}
                  />
                </div>
              </div>
            </div>

            {/* ── Validation summary ───────────────────────────────────── */}
            {Object.keys(errors).length > 0 && (
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-lg border"
                style={{ backgroundColor: colors.isDark ? "#450a0a" : "#fef2f2", borderColor: colors.danger }}
              >
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: colors.danger }} />
                <p className="text-sm" style={{ color: colors.danger }}>
                  Please fix the highlighted fields before saving.
                </p>
              </div>
            )}

            {/* ── Save button ──────────────────────────────────────────── */}
            <div className="flex gap-3 pb-8">
              <button
                onClick={() => { setSelected(null); setErrors({}); }}
                className="px-6 py-2.5 rounded-lg border text-sm font-semibold transition-all"
                style={{ backgroundColor: colors.cardBg2, borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(selected.id)}
                className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105 shadow-md"
                style={{ backgroundColor: colors.accent }}
              >
                <Save size={16} />
                {saved[selected.id] ? "Update Report" : "Save Report"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveOverview;
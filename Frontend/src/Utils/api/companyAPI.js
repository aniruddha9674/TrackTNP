import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

// ─── choice mappings: backend uses lowercase codes, UI shows labels ─────────
const RECRUITMENT_METHOD = [
  { value: "everyone", label: "Everyone" },
  { value: "unplaced", label: "Unplaced" },
  { value: "placed_below", label: "Placed Below XYZ Package" },
];
const COMPANY_TYPE = [
  { value: "product", label: "Product" },
  { value: "core", label: "Core" },
  { value: "it", label: "IT" },
  { value: "other", label: "Other" },
];
const DRIVE_TYPE = [
  { value: "internship", label: "Internship" },
  { value: "placement", label: "Placement" },
  { value: "internship_ppo", label: "Internship + PPO" },
];
const RESUME_REQUIRED = [
  { value: "required", label: "Required" },
  { value: "not_required", label: "Not Required" },
];
const REGISTRATION_STATUS = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

const labelFor = (opts, value) => opts.find((o) => o.value === value)?.label || "";
const valueFor = (opts, label) => opts.find((o) => o.label === label)?.value || "";

const num = (v) => (v === "" || v === null || v === undefined ? null : v);
const numToStr = (v) => (v === null || v === undefined ? "" : String(v));

// ─── backend (snake_case) -> frontend (camelCase) ────────────────────────────
export const companyFromApi = (c) => ({
  id: c.id,
  date: c.date || "",
  month: numToStr(c.month),
  year: numToStr(c.year),
  companyName: c.company_name || "",
  companyRelatedInfo: c.company_related_info || "",
  regEndDate: c.reg_end_date || "",
  registrationTime: c.registration_time ? c.registration_time.slice(0, 5) : "",
  recruitmentMethod: labelFor(RECRUITMENT_METHOD, c.recruitment_method),
  placedBelow: c.placed_below || "",
  eligibleBatchYears: c.eligible_batch_years || [],
  eligibleBranches: c.eligible_branches || [],
  eligibleColleges: c.eligible_colleges || [],
  jobOpenings: numToStr(c.job_openings),
  companyType: labelFor(COMPANY_TYPE, c.company_type),
  driveType: labelFor(DRIVE_TYPE, c.drive_type),
  jobProfile: c.job_profile || "",
  sscCriteria: numToStr(c.ssc_criteria),
  hscCriteria: numToStr(c.hsc_criteria),
  cgpaCriteria: numToStr(c.cgpa_criteria),
  backlogCriteria: c.backlog_criteria || "",
  venue: c.venue || "",
  internshipStipend: c.internship_stipend || "",
  salaryOffered: c.salary_offered || "",
  companyBond: c.company_bond || "",
  totalRegistered: numToStr(c.total_registered),
  candidatesPresent: numToStr(c.candidates_present),
  pccoePresent: numToStr(c.pccoe_present),
  pccoerPresent: numToStr(c.pccoer_present),
  nmietPresent: numToStr(c.nmiet_present),
  ncerPresent: numToStr(c.ncer_present),
  totalSelected: numToStr(c.total_selected),
  totalSelectedPCCOE: numToStr(c.total_selected_pccoe),
  totalSelectedPCCOER: numToStr(c.total_selected_pccoer),
  totalSelectedNMIET: numToStr(c.total_selected_nmiet),
  totalSelectedNCER: numToStr(c.total_selected_ncer),
  pccoeComputerSelected: numToStr(c.pccoe_computer_selected),
  pccoeAIMLSelected: numToStr(c.pccoe_aiml_selected),
  pccoeComputerRegionalSelected: numToStr(c.pccoe_computer_regional_selected),
  pccoeITSelected: numToStr(c.pccoe_it_selected),
  pccoeEnTCSelected: numToStr(c.pccoe_entc_selected),
  pccoeMechanicalSelected: numToStr(c.pccoe_mechanical_selected),
  pccoeCivilSelected: numToStr(c.pccoe_civil_selected),
  pccoerComputerSelected: numToStr(c.pccoer_computer_selected),
  pccoerITSelected: numToStr(c.pccoer_it_selected),
  pccoerEnTCSelected: numToStr(c.pccoer_entc_selected),
  pccoerMechanicalSelected: numToStr(c.pccoer_mechanical_selected),
  pccoerCivilSelected: numToStr(c.pccoer_civil_selected),
  nmietComputerSelected: numToStr(c.nmiet_computer_selected),
  nmietITSelected: numToStr(c.nmiet_it_selected),
  nmietEnTCSelected: numToStr(c.nmiet_entc_selected),
  nmietMechanicalSelected: numToStr(c.nmiet_mechanical_selected),
  ncerComputerSelected: numToStr(c.ncer_computer_selected),
  ncerAIMLSelected: numToStr(c.ncer_aiml_selected),
  ncerEnTCSelected: numToStr(c.ncer_entc_selected),
  ncerMechanicalSelected: numToStr(c.ncer_mechanical_selected),
  ncerAutomobileSelected: numToStr(c.ncer_automobile_selected),
  totalInternshipSelected: numToStr(c.total_internship_selected),
  totalInternshipSelectedPCCOE: numToStr(c.total_internship_selected_pccoe),
  totalInternshipSelectedPCCOER: numToStr(c.total_internship_selected_pccoer),
  totalInternshipSelectedNMIET: numToStr(c.total_internship_selected_nmiet),
  totalInternshipSelectedNCER: numToStr(c.total_internship_selected_ncer),
  placedStudentPRN: c.placed_student_prn || "",
  internshipSelectedPRN: c.internship_selected_prn || "",
  approvedExpenditure: numToStr(c.approved_expenditure),
  actualExpenditure: numToStr(c.actual_expenditure),
  resumeRequired: labelFor(RESUME_REQUIRED, c.resume_required),
  registrationStatus: labelFor(REGISTRATION_STATUS, c.registration_status),
  driveCompleted: c.drive_completed ? "Yes" : "No",
});

// ─── frontend (camelCase) -> backend (snake_case) ────────────────────────────
export const companyToApi = (f) => ({
  date: f.date,
  month: num(f.month),
  year: num(f.year),
  company_name: f.companyName,
  company_related_info: f.companyRelatedInfo,
  reg_end_date: f.regEndDate,
  registration_time: f.registrationTime,
  recruitment_method: valueFor(RECRUITMENT_METHOD, f.recruitmentMethod),
  placed_below: f.placedBelow,
  eligible_batch_years: f.eligibleBatchYears,
  eligible_branches: f.eligibleBranches,
  eligible_colleges: f.eligibleColleges,
  job_openings: num(f.jobOpenings),
  company_type: valueFor(COMPANY_TYPE, f.companyType),
  drive_type: valueFor(DRIVE_TYPE, f.driveType),
  job_profile: f.jobProfile,
  ssc_criteria: num(f.sscCriteria),
  hsc_criteria: num(f.hscCriteria),
  cgpa_criteria: num(f.cgpaCriteria),
  backlog_criteria: f.backlogCriteria,
  venue: f.venue,
  internship_stipend: f.internshipStipend,
  salary_offered: f.salaryOffered,
  company_bond: f.companyBond,
  total_registered: num(f.totalRegistered) ?? 0,
  candidates_present: num(f.candidatesPresent) ?? 0,
  pccoe_present: num(f.pccoePresent) ?? 0,
  pccoer_present: num(f.pccoerPresent) ?? 0,
  nmiet_present: num(f.nmietPresent) ?? 0,
  ncer_present: num(f.ncerPresent) ?? 0,
  total_selected: num(f.totalSelected) ?? 0,
  total_selected_pccoe: num(f.totalSelectedPCCOE) ?? 0,
  total_selected_pccoer: num(f.totalSelectedPCCOER) ?? 0,
  total_selected_nmiet: num(f.totalSelectedNMIET) ?? 0,
  total_selected_ncer: num(f.totalSelectedNCER) ?? 0,
  pccoe_computer_selected: num(f.pccoeComputerSelected) ?? 0,
  pccoe_aiml_selected: num(f.pccoeAIMLSelected) ?? 0,
  pccoe_computer_regional_selected: num(f.pccoeComputerRegionalSelected) ?? 0,
  pccoe_it_selected: num(f.pccoeITSelected) ?? 0,
  pccoe_entc_selected: num(f.pccoeEnTCSelected) ?? 0,
  pccoe_mechanical_selected: num(f.pccoeMechanicalSelected) ?? 0,
  pccoe_civil_selected: num(f.pccoeCivilSelected) ?? 0,
  pccoer_computer_selected: num(f.pccoerComputerSelected) ?? 0,
  pccoer_it_selected: num(f.pccoerITSelected) ?? 0,
  pccoer_entc_selected: num(f.pccoerEnTCSelected) ?? 0,
  pccoer_mechanical_selected: num(f.pccoerMechanicalSelected) ?? 0,
  pccoer_civil_selected: num(f.pccoerCivilSelected) ?? 0,
  nmiet_computer_selected: num(f.nmietComputerSelected) ?? 0,
  nmiet_it_selected: num(f.nmietITSelected) ?? 0,
  nmiet_entc_selected: num(f.nmietEnTCSelected) ?? 0,
  nmiet_mechanical_selected: num(f.nmietMechanicalSelected) ?? 0,
  ncer_computer_selected: num(f.ncerComputerSelected) ?? 0,
  ncer_aiml_selected: num(f.ncerAIMLSelected) ?? 0,
  ncer_entc_selected: num(f.ncerEnTCSelected) ?? 0,
  ncer_mechanical_selected: num(f.ncerMechanicalSelected) ?? 0,
  ncer_automobile_selected: num(f.ncerAutomobileSelected) ?? 0,
  total_internship_selected: num(f.totalInternshipSelected) ?? 0,
  total_internship_selected_pccoe: num(f.totalInternshipSelectedPCCOE) ?? 0,
  total_internship_selected_pccoer: num(f.totalInternshipSelectedPCCOER) ?? 0,
  total_internship_selected_nmiet: num(f.totalInternshipSelectedNMIET) ?? 0,
  total_internship_selected_ncer: num(f.totalInternshipSelectedNCER) ?? 0,
  placed_student_prn: f.placedStudentPRN,
  internship_selected_prn: f.internshipSelectedPRN,
  approved_expenditure: num(f.approvedExpenditure),
  actual_expenditure: num(f.actualExpenditure),
  resume_required: valueFor(RESUME_REQUIRED, f.resumeRequired) || "required",
  registration_status: valueFor(REGISTRATION_STATUS, f.registrationStatus) || "open",
  drive_completed: f.driveCompleted === "Yes",
});

// ─── Company CRUD ─────────────────────────────────────────────────────────────
export const fetchCompanies = () =>
  axios.get(`${API_BASE}/companies/`).then((res) => res.data);

export const createCompany = (formData) =>
  axios
    .post(`${API_BASE}/companies/`, companyToApi(formData), {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data);

export const updateCompany = (id, formData) =>
  axios
    .patch(`${API_BASE}/companies/${id}/`, companyToApi(formData), {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data);

export const deleteCompany = (id) =>
  axios.delete(`${API_BASE}/companies/${id}/`);

// ─── Company file uploads (separate model, uploaded after company exists) ────
export const uploadCompanyFile = (companyId, file) => {
  const payload = new FormData();
  payload.append("company", companyId);
  payload.append("file", file);
  return axios
    .post(`${API_BASE}/company-files/`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const fetchCompanyFiles = (companyId) =>
  axios
    .get(`${API_BASE}/company-files/`, { params: { company: companyId } })
    .then((res) => res.data);
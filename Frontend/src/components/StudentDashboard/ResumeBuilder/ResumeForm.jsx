import React, { useState } from "react";

/**
 * ResumeForm.jsx
 * Grouped multi-step form (Option C) with:
 * - Personal (basic + social)
 * - Education (date input)
 * - Skills + Languages (tag inputs)
 * - Projects + Internships
 * - Certifications + Achievements (cert date + optional link)
 * - Template Selection (also sets resumeData.template)
 *
 * Expects props: resumeData, setResumeData
 *
 * Make sure you include Urbanist font in index.html and tailwind config (font-urbanist).
 */

/* ------------------ TagInput (single instance) ------------------ */
function TagInput({ placeholder = "Add item", items = [], onAdd, onRemove }) {
  const [text, setText] = useState("");
  const handleAdd = () => {
    const v = text.trim();
    if (!v) return;
    onAdd(v);
    setText("");
  };
  const onKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            <span>{it}</span>
            <button
              onClick={() => onRemove(i)}
              className="text-gray-400 hover:text-gray-600"
              aria-label={`Remove ${it}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------ Step indicator ------------------ */
function StepIndicator({ step }) {
  return (
    <div className="flex justify-between mb-6">
      {[1, 2, 3, 4, 5, 6].map((s) => (
        <div
          key={s}
          className={`px-3 py-2 rounded-lg text-sm font-semibold ${
            step === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Step {s}
        </div>
      ))}
    </div>
  );
}

/* ------------------ TemplateSelection small component for form step ------------------ */
function TemplateSelectionSmall({ value, onChange }) {
  const templates = [
    { id: "clean", title: "Clean" },
    { id: "corporate", title: "Corporate Blue" },
    { id: "modern", title: "Modern" },
    { id: "ats", title: "ATS" },
    { id: "minimal", title: "Minimal" },
  ];
  return (
    <div className="font-urbanist">
      <h3 className="text-lg font-semibold text-[#101828] mb-3">
        Template (choose one)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {templates.map((t) => {
          const active = value === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              type="button"
              className={`p-3 rounded-lg text-sm text-left border transition ${
                active
                  ? "bg-[#F2F4F7] border-[#465FFF] shadow"
                  : "bg-white border-gray-300"
              }`}
            >
              <div
                className={
                  active
                    ? "text-[#3641F5] font-semibold"
                    : "text-[#101828] font-medium"
                }
              >
                {t.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Formal, print-friendly
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------ Main Form ------------------ */
export default function ResumeForm({ resumeData, setResumeData }) {
  const [step, setStep] = useState(1);

  const updateField = (field, value) =>
    setResumeData((prev) => ({ ...prev, [field]: value }));

  /* ---------------- Step 1: Personal + Social ---------------- */
  const StepPersonal = () => (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-3 border rounded"
        value={resumeData.name || ""}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={resumeData.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full p-3 border rounded"
          value={resumeData.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </div>

      <input
        type="text"
        placeholder="Address"
        className="w-full p-3 border rounded"
        value={resumeData.address || ""}
        onChange={(e) => updateField("address", e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="LinkedIn"
          className="w-full p-3 border rounded"
          value={resumeData.linkedin || ""}
          onChange={(e) => updateField("linkedin", e.target.value)}
        />
        <input
          type="text"
          placeholder="GitHub"
          className="w-full p-3 border rounded"
          value={resumeData.github || ""}
          onChange={(e) => updateField("github", e.target.value)}
        />
      </div>

      <input
        type="text"
        placeholder="Portfolio / Website"
        className="w-full p-3 border rounded"
        value={resumeData.portfolio || ""}
        onChange={(e) => updateField("portfolio", e.target.value)}
      />
    </div>
  );

  /* ---------------- Step 2: Education (date input) ---------------- */
  const StepEducation = () => {
    const [edu, setEdu] = useState({
      degree: "",
      college: "",
      branch: "",
      passingDate: "", // ISO date string
      score: "",
    });

    const addEducation = () => {
      if (!edu.degree && !edu.college) return;
      setResumeData((prev) => ({
        ...prev,
        education: [...(prev.education || []), edu],
      }));
      setEdu({
        degree: "",
        college: "",
        branch: "",
        passingDate: "",
        score: "",
      });
    };

    const removeEducation = (idx) =>
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== idx),
      }));

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="p-3 border rounded"
            placeholder="Degree (BE / Diploma / 12th)"
            value={edu.degree}
            onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
          />
          <input
            className="p-3 border rounded"
            placeholder="College / University"
            value={edu.college}
            onChange={(e) => setEdu({ ...edu, college: e.target.value })}
          />
          <input
            className="p-3 border rounded"
            placeholder="Branch"
            value={edu.branch}
            onChange={(e) => setEdu({ ...edu, branch: e.target.value })}
          />
          <input
            className="p-3 border rounded"
            type="date"
            placeholder="Passing Date"
            value={edu.passingDate}
            onChange={(e) => setEdu({ ...edu, passingDate: e.target.value })}
          />
          <input
            className="p-3 border rounded md:col-span-2"
            placeholder="CGPA / Percentage"
            value={edu.score}
            onChange={(e) => setEdu({ ...edu, score: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Education
          </button>
        </div>

        <div>
          {(resumeData.education || []).map((ed, i) => (
            <div
              key={i}
              className="p-3 bg-white border rounded mb-2 flex justify-between items-start"
            >
              <div>
                <div className="font-medium">
                  {ed.degree} — {ed.college}
                </div>
                <div className="text-sm text-gray-600">
                  {ed.branch} •{" "}
                  {ed.passingDate
                    ? new Date(ed.passingDate).toLocaleDateString()
                    : ""}{" "}
                  • {ed.score}
                </div>
              </div>
              <button
                onClick={() => removeEducation(i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ---------------- Step 3: Skills + Languages ---------------- */
  const StepSkills = () => {
    const ensureArr = (k) => resumeData[k] || [];

    const addTo = (key, val) =>
      setResumeData((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), val],
      }));

    const removeFrom = (key, idx) =>
      setResumeData((prev) => ({
        ...prev,
        [key]: prev[key].filter((_, i) => i !== idx),
      }));

    const languageSuggestions = ["English", "Hindi", "Marathi"];

    const addLanguage = (lang) => {
      if (!lang) return;
      setResumeData((prev) => ({
        ...prev,
        languages: [...(prev.languages || []), lang],
      }));
    };

    const removeLanguage = (idx) =>
      setResumeData((prev) => ({
        ...prev,
        languages: prev.languages.filter((_, i) => i !== idx),
      }));

    return (
      <div className="space-y-4">
        <h4 className="font-medium">Technical Skills</h4>
        <TagInput
          placeholder="Add technical skill (e.g. React)"
          items={ensureArr("technicalSkills")}
          onAdd={(v) => addTo("technicalSkills", v)}
          onRemove={(i) => removeFrom("technicalSkills", i)}
        />

        <h4 className="font-medium mt-3">Programming Languages</h4>
        <TagInput
          placeholder="Add programming language (e.g. Python)"
          items={ensureArr("programmingLanguages")}
          onAdd={(v) => addTo("programmingLanguages", v)}
          onRemove={(i) => removeFrom("programmingLanguages", i)}
        />

        <h4 className="font-medium mt-3">Frameworks</h4>
        <TagInput
          placeholder="Add framework (e.g. Next.js)"
          items={ensureArr("frameworks")}
          onAdd={(v) => addTo("frameworks", v)}
          onRemove={(i) => removeFrom("frameworks", i)}
        />

        <h4 className="font-medium mt-3">Tools & Technologies</h4>
        <TagInput
          placeholder="Add tool (e.g. Docker)"
          items={ensureArr("tools")}
          onAdd={(v) => addTo("tools", v)}
          onRemove={(i) => removeFrom("tools", i)}
        />

        <h4 className="font-medium mt-3">Soft Skills</h4>
        <TagInput
          placeholder="Add soft skill (e.g. Communication)"
          items={ensureArr("softSkills")}
          onAdd={(v) => addTo("softSkills", v)}
          onRemove={(i) => removeFrom("softSkills", i)}
        />

        <div className="mt-4">
          <h4 className="font-medium">Languages</h4>
          <div className="flex gap-2 my-2">
            {languageSuggestions.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => addLanguage(l)}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                {l}
              </button>
            ))}
          </div>
          <TagInput
            placeholder="Add custom language"
            items={resumeData.languages || []}
            onAdd={(v) => addLanguage(v)}
            onRemove={(i) => removeLanguage(i)}
          />
        </div>
      </div>
    );
  };

  /* ---------------- Step 4: Projects + Internships ---------------- */
  const StepProjectsIntern = () => {
    const [proj, setProj] = useState({
      title: "",
      description: "",
      technologies: [],
      github: "",
    });
    const [techInput, setTechInput] = useState("");

    const addProjTech = () => {
      const t = techInput.trim();
      if (!t) return;
      setProj((p) => ({ ...p, technologies: [...p.technologies, t] }));
      setTechInput("");
    };

    const addProject = () => {
      if (!proj.title) return;
      setResumeData((prev) => ({
        ...prev,
        projects: [...(prev.projects || []), proj],
      }));
      setProj({ title: "", description: "", technologies: [], github: "" });
    };

    const removeProject = (i) =>
      setResumeData((prev) => ({
        ...prev,
        projects: prev.projects.filter((_, idx) => idx !== i),
      }));

    const [intern, setIntern] = useState({
      company: "",
      role: "",
      duration: "",
      description: "",
      achievements: "",
    });

    const addIntern = () => {
      if (!intern.company) return;
      setResumeData((prev) => ({
        ...prev,
        internships: [...(prev.internships || []), intern],
      }));
      setIntern({
        company: "",
        role: "",
        duration: "",
        description: "",
        achievements: "",
      });
    };

    const removeIntern = (i) =>
      setResumeData((prev) => ({
        ...prev,
        internships: prev.internships.filter((_, idx) => idx !== i),
      }));

    return (
      <div className="space-y-4">
        <h4 className="font-medium">Add Project</h4>
        <input
          className="w-full p-3 border rounded"
          placeholder="Project Title"
          value={proj.title}
          onChange={(e) => setProj({ ...proj, title: e.target.value })}
        />
        <textarea
          className="w-full p-3 border rounded"
          placeholder="Project Description"
          value={proj.description}
          onChange={(e) => setProj({ ...proj, description: e.target.value })}
        />

        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Technology (press Add or Enter)"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addProjTech())
            }
          />
          <button
            onClick={addProjTech}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {proj.technologies.map((t, idx) => (
            <div
              key={idx}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
            >
              {t}
              <button
                onClick={() =>
                  setProj((p) => ({
                    ...p,
                    technologies: p.technologies.filter((_, i) => i !== idx),
                  }))
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <input
          className="w-full p-3 border rounded"
          placeholder="GitHub Link (optional)"
          value={proj.github}
          onChange={(e) => setProj({ ...proj, github: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            onClick={addProject}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Project
          </button>
        </div>

        <div>
          {(resumeData.projects || []).map((p, i) => (
            <div
              key={i}
              className="p-3 border rounded mb-2 flex justify-between"
            >
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
                {p.technologies?.length > 0 && (
                  <div className="text-sm mt-1">
                    Tech: {p.technologies.join(", ")}
                  </div>
                )}
                {p.github && (
                  <div className="text-sm text-blue-600">
                    <a href={p.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                )}
              </div>
              <button onClick={() => removeProject(i)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
        </div>

        <hr className="my-3" />
        <h4 className="font-medium">Internships / Experience</h4>

        <input
          className="w-full p-3 border rounded"
          placeholder="Company Name"
          value={intern.company}
          onChange={(e) => setIntern({ ...intern, company: e.target.value })}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="p-3 border rounded"
            placeholder="Role"
            value={intern.role}
            onChange={(e) => setIntern({ ...intern, role: e.target.value })}
          />
          <input
            className="p-3 border rounded"
            placeholder="Duration (e.g., Jun 2023 - Aug 2023)"
            value={intern.duration}
            onChange={(e) => setIntern({ ...intern, duration: e.target.value })}
          />
        </div>
        <textarea
          className="w-full p-3 border rounded"
          placeholder="Work Description"
          value={intern.description}
          onChange={(e) =>
            setIntern({ ...intern, description: e.target.value })
          }
        />
        <input
          className="w-full p-3 border rounded"
          placeholder="Achievements"
          value={intern.achievements}
          onChange={(e) =>
            setIntern({ ...intern, achievements: e.target.value })
          }
        />

        <div className="flex gap-2 my-2">
          <button
            onClick={addIntern}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Internship
          </button>
        </div>

        <div>
          {(resumeData.internships || []).map((it, idx) => (
            <div
              key={idx}
              className="p-3 border rounded mb-2 flex justify-between"
            >
              <div>
                <div className="font-medium">
                  {it.company} — {it.role}
                </div>
                <div className="text-sm text-gray-600">{it.duration}</div>
              </div>
              <button
                onClick={() => removeIntern(idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ---------------- Step 5: Certifications + Achievements (cert date + link) ---------------- */
  const StepCertsAchievements = () => {
    const [cert, setCert] = useState({
      title: "",
      org: "",
      date: "",
      link: "",
    });
    const [achText, setAchText] = useState("");

    const addCert = () => {
      if (!cert.title) return;
      setResumeData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), cert],
      }));
      setCert({ title: "", org: "", date: "", link: "" });
    };

    const removeCert = (i) =>
      setResumeData((prev) => ({
        ...prev,
        certifications: prev.certifications.filter((_, idx) => idx !== i),
      }));

    const addAchievement = () => {
      if (!achText) return;
      setResumeData((prev) => ({
        ...prev,
        achievements: [...(prev.achievements || []), achText],
      }));
      setAchText("");
    };

    const removeAchievement = (i) =>
      setResumeData((prev) => ({
        ...prev,
        achievements: prev.achievements.filter((_, idx) => idx !== i),
      }));

    return (
      <div className="space-y-4">
        <h4 className="font-medium">Certifications (optional link)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            className="p-3 border rounded"
            placeholder="Certificate Title"
            value={cert.title}
            onChange={(e) => setCert({ ...cert, title: e.target.value })}
          />
          <input
            className="p-3 border rounded"
            placeholder="Organization"
            value={cert.org}
            onChange={(e) => setCert({ ...cert, org: e.target.value })}
          />
          <input
            className="p-3 border rounded"
            type="date"
            placeholder="Date"
            value={cert.date}
            onChange={(e) => setCert({ ...cert, date: e.target.value })}
          />
          <input
            className="p-3 border rounded md:col-span-3"
            placeholder="Certificate Link (optional)"
            value={cert.link}
            onChange={(e) => setCert({ ...cert, link: e.target.value })}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={addCert}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Certification
          </button>
        </div>

        <div>
          {(resumeData.certifications || []).map((c, i) => (
            <div
              key={i}
              className="p-3 border rounded mb-2 flex justify-between"
            >
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-gray-600">
                  {c.org} •{" "}
                  {c.date ? new Date(c.date).toLocaleDateString() : ""}
                </div>
                {c.link && (
                  <a
                    className="text-blue-600 text-sm"
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                )}
              </div>
              <button onClick={() => removeCert(i)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
        </div>

        <hr />

        <h4 className="font-medium">
          Achievements / Hackathons / Competitions
        </h4>
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 border rounded"
            placeholder="Add achievement"
            value={achText}
            onChange={(e) => setAchText(e.target.value)}
          />
          <button
            onClick={addAchievement}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {(resumeData.achievements || []).map((a, i) => (
            <div key={i} className="p-3 border rounded flex justify-between">
              <div>{a}</div>
              <button
                onClick={() => removeAchievement(i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ---------------- Step 6: Template Selection (form step) ---------------- */
  const StepTemplate = () => (
    <div>
      <TemplateSelectionSmall
        value={resumeData.template || "clean"}
        onChange={(val) => updateField("template", val)}
      />
    </div>
  );

  /* ---------------- Render and navigation ---------------- */
  return (
    <div className="font-urbanist">
      <StepIndicator step={step} />

      <div className="bg-white p-4 rounded shadow">
        {step === 1 && <StepPersonal />}
        {step === 2 && <StepEducation />}
        {step === 3 && <StepSkills />}
        {step === 4 && <StepProjectsIntern />}
        {step === 5 && <StepCertsAchievements />}
        {step === 6 && <StepTemplate />}
      </div>

      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 6 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              // You can add validation/save-to-db here
              alert(
                "Resume data is saved in state. Preview on the right and download PDF."
              );
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

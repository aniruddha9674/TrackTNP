import React from "react";

/**
 * ResumeTemplates.jsx
 * - Renders template thumbnails (mini previews) and full preview
 * - 5 templates: clean, corporate, modern, ats, minimal
 * - Skills displayed in a formal two-column table
 *
 * Props:
 * - data: resumeData object
 * - setResumeData: function to update data (optional) — used to change template from preview thumbnails
 */

const TEMPLATES = [
  { id: "clean", title: "Clean Professional" },
  { id: "corporate", title: "Corporate Blue" },
  { id: "modern", title: "Modern Two-Column" },
  { id: "ats", title: "ATS Friendly" },
  { id: "minimal", title: "Minimalistic" },
];

export default function ResumeTemplates({ data = {}, setResumeData = null }) {
  const selected = data.template || "clean";

  const setTemplate = (id) => {
    if (setResumeData) setResumeData((prev) => ({ ...prev, template: id }));
    else {
      // fallback: try to mutate local data (not recommended); prefer passing setResumeData
      data.template = id;
    }
  };

  return (
    <div className="font-urbanist">
      {/* Thumbnail selector — Option C : realistic mini previews */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Choose template
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex-shrink-0 w-40 border rounded-lg p-2 text-left transition
                ${
                  selected === t.id
                    ? "border-[#465FFF] bg-[#F2F4F7] shadow-md"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              {/* mini heading preview */}
              <div
                className={`h-8 mb-2 ${
                  selected === t.id
                    ? "text-[#3641F5] font-semibold"
                    : "text-[#101828] font-medium"
                }`}
              >
                {t.title}
              </div>
              <div className="text-xs text-gray-500">
                {t.id === "ats" ? "ATS optimized" : "Formal, print-ready"}
              </div>
              {/* small layout mock */}
              <div className="mt-2 space-y-1">
                <div className="h-1 bg-gray-300 rounded w-3/4" />
                <div className="h-1 bg-gray-200 rounded w-1/2" />
                <div className="mt-1 h-6 bg-gray-100 rounded" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Full preview area (A4-like container) */}
      <div className="w-[800px] bg-white mx-auto p-6 rounded shadow">
        {selected === "clean" && <TemplateClean data={data} />}
        {selected === "corporate" && <TemplateCorporate data={data} />}
        {selected === "modern" && <TemplateModern data={data} />}
        {selected === "ats" && <TemplateATS data={data} />}
        {selected === "minimal" && <TemplateMinimal data={data} />}
      </div>
    </div>
  );
}

/* ------------------------- shared helpers ------------------------- */

function SectionTitle({ children }) {
  return (
    <h4 className="text-sm font-semibold text-[#101828] mt-4 mb-2">
      {children}
    </h4>
  );
}

function SkillsTable({ data }) {
  // two-column table: Category | Skills (comma list)
  const rows = [
    { label: "Technical Skills", items: data.technicalSkills || [] },
    { label: "Programming Languages", items: data.programmingLanguages || [] },
    { label: "Frameworks", items: data.frameworks || [] },
    { label: "Tools & Technologies", items: data.tools || [] },
    { label: "Soft Skills", items: data.softSkills || [] },
  ];

  return (
    <table className="w-full border-collapse">
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx} className="align-top border-t">
            <td className="py-2 pr-4 w-1/3 text-sm font-medium text-gray-700">
              {r.label}
            </td>
            <td className="py-2 text-sm text-gray-700">
              {(r.items || []).join(", ") || "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ------------------------- Templates ------------------------- */

/* Clean Professional */
function TemplateClean({ data }) {
  return (
    <div className="font-urbanist text-[#101828]">
      <header className="mb-3">
        <div className="text-3xl font-bold">{data.name || "Your Name"}</div>
        <div className="text-sm text-gray-700">
          {data.email || ""} • {data.phone || ""}
        </div>
        <div className="text-sm text-blue-600">
          {data.linkedin || ""} {data.github ? " • " + data.github : ""}
        </div>
      </header>

      <SectionTitle>Education</SectionTitle>
      <div>
        {(data.education || []).map((e, i) => (
          <div key={i} className="mb-2">
            <div className="font-semibold">
              {e.degree} — {e.college}
            </div>
            <div className="text-sm text-gray-600">
              {e.branch} •{" "}
              {e.passingDate
                ? new Date(e.passingDate).toLocaleDateString()
                : ""}{" "}
              • {e.score}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Skills</SectionTitle>
      <SkillsTable data={data} />

      <SectionTitle>Projects</SectionTitle>
      <div>
        {(data.projects || []).map((p, i) => (
          <div key={i} className="mb-2">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm">{p.description}</div>
            {p.technologies?.length > 0 && (
              <div className="text-sm text-gray-600">
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
        ))}
      </div>

      <SectionTitle>Experience</SectionTitle>
      <div>
        {(data.internships || []).map((it, i) => (
          <div key={i} className="mb-2">
            <div className="font-semibold">
              {it.company} — {it.role}
            </div>
            <div className="text-sm text-gray-600">{it.duration}</div>
            <div className="text-sm">{it.description}</div>
            {it.achievements && (
              <div className="text-sm text-gray-700">
                Achievements: {it.achievements}
              </div>
            )}
          </div>
        ))}
      </div>

      <SectionTitle>Certifications</SectionTitle>
      <div>
        {(data.certifications || []).map((c, i) => (
          <div key={i} className="mb-1 text-sm">
            {c.title} — {c.org}{" "}
            {c.date ? `• ${new Date(c.date).toLocaleDateString()}` : ""}{" "}
            {c.link && (
              <a
                className="text-blue-600"
                href={c.link}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            )}
          </div>
        ))}
      </div>

      <SectionTitle>Achievements</SectionTitle>
      <ul className="list-disc pl-5 text-sm">
        {(data.achievements || []).map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <SectionTitle>Languages & Links</SectionTitle>
      <div className="text-sm">
        <div>{(data.languages || []).join(", ")}</div>
        <div className="mt-1 text-blue-600">{data.portfolio || ""}</div>
      </div>
    </div>
  );
}

/* Corporate Blue */
function TemplateCorporate({ data }) {
  return (
    <div className="font-urbanist text-[#0B2F66]">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <div className="text-sm text-gray-700">
            {data.email} • {data.phone}
          </div>
          <div className="text-sm text-blue-700">{data.linkedin}</div>
        </div>
        <div className="text-right">
          {data.portfolio && (
            <div className="text-sm">
              <a href={data.portfolio} className="text-blue-700">
                {data.portfolio}
              </a>
            </div>
          )}
          {data.github && (
            <div className="text-sm">
              <a href={data.github} className="text-blue-700">
                {data.github}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <div>
          <SectionTitle>Education</SectionTitle>
          {(data.education || []).map((e, i) => (
            <div key={i} className="mb-2">
              <div className="font-semibold">{e.degree}</div>
              <div className="text-sm text-gray-600">
                {e.college} •{" "}
                {e.passingDate
                  ? new Date(e.passingDate).toLocaleDateString()
                  : ""}
              </div>
            </div>
          ))}

          <SectionTitle>Certifications</SectionTitle>
          {(data.certifications || []).map((c, i) => (
            <div key={i} className="text-sm mb-1">
              {c.title} — {c.org}{" "}
              {c.date ? `• ${new Date(c.date).toLocaleDateString()}` : ""}{" "}
              {c.link && (
                <a
                  className="text-blue-600"
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              )}
            </div>
          ))}
        </div>

        <div>
          <SectionTitle>Skills</SectionTitle>
          <SkillsTable data={data} />

          <SectionTitle>Experience</SectionTitle>
          {(data.internships || []).map((it, idx) => (
            <div key={idx} className="mb-2">
              <div className="font-semibold">
                {it.company} — {it.role}
              </div>
              <div className="text-sm text-gray-600">{it.duration}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>Projects</SectionTitle>
      {(data.projects || []).map((p, i) => (
        <div key={i} className="mb-2">
          <div className="font-semibold">{p.title}</div>
          <div className="text-sm text-gray-700">{p.description}</div>
        </div>
      ))}

      <SectionTitle>Languages & Achievements</SectionTitle>
      <div className="text-sm">
        <div>{(data.languages || []).join(", ")}</div>
        <ul className="list-disc pl-5">
          {(data.achievements || []).map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Modern Two-Column */
function TemplateModern({ data }) {
  return (
    <div className="font-urbanist text-[#101828]">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="text-sm text-gray-600">
            {data.email} • {data.phone}
          </div>
          <div className="text-sm text-blue-600">{data.linkedin}</div>

          <SectionTitle>Projects</SectionTitle>
          {(data.projects || []).map((p, i) => (
            <div key={i} className="mb-2">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm">{p.description}</div>
            </div>
          ))}

          <SectionTitle>Achievements</SectionTitle>
          <ul className="list-disc pl-5 text-sm">
            {(data.achievements || []).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <aside className="col-span-1 bg-[#F8FAFF] p-3 rounded">
          <div className="text-sm">
            <div className="font-semibold">Education</div>
            {(data.education || []).map((e, i) => (
              <div key={i} className="text-sm text-gray-700">
                {e.degree} • {e.college}
              </div>
            ))}
          </div>

          <div className="mt-3">
            <div className="font-semibold">Skills</div>
            <SkillsTable data={data} />
          </div>

          <div className="mt-3 text-sm">
            <div className="font-semibold">Languages</div>
            <div>{(data.languages || []).join(", ")}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ATS template (simple, linear, no fancy layout — good for crawlers) */
function TemplateATS({ data }) {
  return (
    <div className="font-urbanist text-[#101828] text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
      <div className="mb-3">
        {data.email} | {data.phone} | {data.linkedin}
      </div>

      <div className="mb-3">
        <div className="font-semibold">Education</div>
        {(data.education || []).map((e, i) => (
          <div key={i} className="mb-1">
            {e.degree} — {e.college} — {e.branch} —{" "}
            {e.passingDate ? new Date(e.passingDate).toLocaleDateString() : ""}{" "}
            — {e.score}
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="font-semibold">Skills</div>
        <div>
          {[
            ...(data.technicalSkills || []),
            ...(data.programmingLanguages || []),
            ...(data.frameworks || []),
            ...(data.tools || []),
            ...(data.softSkills || []),
          ].join(", ")}
        </div>
      </div>

      <div className="mb-3">
        <div className="font-semibold">Experience</div>
        {(data.internships || []).map((it, i) => (
          <div key={i} className="mb-1">
            {it.company} — {it.role} — {it.duration} — {it.description}
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="font-semibold">Projects</div>
        {(data.projects || []).map((p, i) => (
          <div key={i} className="mb-1">
            {p.title} — {p.description} — {p.technologies?.join(", ")}
          </div>
        ))}
      </div>

      <div>
        <div className="font-semibold">Certifications</div>
        {(data.certifications || []).map((c, i) => (
          <div key={i} className="mb-1">
            {c.title} — {c.org} —{" "}
            {c.date ? new Date(c.date).toLocaleDateString() : ""}{" "}
            {c.link ? ` — ${c.link}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Minimal template */
function TemplateMinimal({ data }) {
  return (
    <div className="font-urbanist text-[#101828]">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="text-sm text-gray-700">
          {data.email} • {data.phone}
        </div>
      </div>

      <SectionTitle>Skills</SectionTitle>
      <SkillsTable data={data} />

      <SectionTitle>Education</SectionTitle>
      {(data.education || []).map((e, i) => (
        <div key={i} className="mb-2">
          <div className="font-semibold">{e.degree}</div>
          <div className="text-sm text-gray-600">
            {e.college} •{" "}
            {e.passingDate ? new Date(e.passingDate).toLocaleDateString() : ""}
          </div>
        </div>
      ))}

      <SectionTitle>Projects & Experience</SectionTitle>
      {(data.projects || []).map((p, i) => (
        <div key={i} className="mb-2">
          <div className="font-semibold">{p.title}</div>
          <div className="text-sm text-gray-700">{p.description}</div>
        </div>
      ))}
    </div>
  );
}

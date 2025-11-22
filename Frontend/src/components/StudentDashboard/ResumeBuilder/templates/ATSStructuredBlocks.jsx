import React from "react";

export default function ATSStructuredBlocks({ resumeData }) {
  return (
    <div style={{ padding: 28, background: "#ffffff", fontFamily: "Arial" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900 }}>{resumeData.name}</h1>
        <p style={{ color: "#666" }}>{resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}</p>
      </header>

      <section>{renderBlock("Education", resumeData.education)}</section>
      <section>{renderBlock("Skills", resumeData.technicalSkills.concat(resumeData.softSkills))}</section>
      <section>{renderBlock("Projects", resumeData.projects)}</section>
      <section>{renderBlock("Experience", resumeData.internships)}</section>
      <section>{renderBlock("Certifications", resumeData.certifications)}</section>
      <section>{renderBlock("Achievements", resumeData.achievements)}</section>
    </div>
  );
}

function renderBlock(title, list) {
  if (!list || list.length === 0) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, borderLeft: "4px solid #3641F5", paddingLeft: 8 }}>{title}</h2>
      <div style={{ marginTop: 8 }}>
        {list.map((item, i) => (
          <div key={i} style={{ padding: 10, border: "1px solid #E5E7EB", marginBottom: 8 }}>
            <strong>{item.title || item.degree || item.position}</strong>
            <p style={{ margin: "4px 0", color: "#555" }}>{item.institution || item.company || item.issuer}</p>
            <p style={{ margin: "4px 0", color: "#777", fontSize: 13 }}>
              {item.startDate && item.endDate && `${item.startDate} - ${item.endDate}`}
            </p>
            <p style={{ color: "#444" }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

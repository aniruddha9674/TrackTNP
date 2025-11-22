import React from "react";

export default function ATSMinimalist({ resumeData }) {
  return (
    <div style={{ padding: 24, background: "#fff", color: "#000", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>{resumeData.name || "Your Name"}</h1>
      <p style={dim}>{resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}</p>

      {resumeData.education.length > 0 && (
        <section style={section}>
          <h2 style={title}>Education</h2>
          {resumeData.education.map((e, i) => (
            <div key={i} style={block}>
              <strong>{e.degree}</strong>
              <p style={dim}>{e.institution}</p>
              <p style={dim}>{e.startDate} - {e.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {(resumeData.technicalSkills.length > 0 || resumeData.softSkills.length > 0) && (
        <section style={section}>
          <h2 style={title}>Skills</h2>
          <ul style={{ marginTop: 8 }}>
            {[...resumeData.technicalSkills, ...resumeData.softSkills].map((s, i) => (
              <li key={i} style={{ marginBottom: 4 }}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {resumeData.projects.length > 0 && (
        <section style={section}>
          <h2 style={title}>Projects</h2>
          {resumeData.projects.map((p, i) => (
            <div key={i} style={block}>
              <strong>{p.title}</strong>
              <p style={dim}>{p.technologies}</p>
              <p style={dim}>{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

const section = { marginTop: 20 };
const title = { fontSize: 18, fontWeight: "bold" };
const block = { marginTop: 8 };
const dim = { color: "#666", fontSize: 14 };

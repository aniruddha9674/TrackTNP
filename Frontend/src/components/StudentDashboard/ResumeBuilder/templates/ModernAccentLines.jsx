import React from "react";

export default function ModernAccentLines({ resumeData }) {
  return (
    <div style={{
      padding: 30,
      background: "#ffffff",
      fontFamily: "Arial, sans-serif",
      color: "#111827"
    }}>
      
      {/* Header */}
      <div style={{ borderLeft: "6px solid #465FFF", paddingLeft: 14 }}>
        <h1 style={{ fontSize: 30, fontWeight: 900 }}>{resumeData.name}</h1>
        <p style={dim}>{resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}</p>
      </div>

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section style={section}>
          <h2 style={accent}>Education</h2>
          {resumeData.education.map((e, i) => (
            <div key={i} style={block}>
              <strong>{e.degree}</strong>
              <p style={dim}>{e.institution}</p>
              <p style={dim}>{e.startDate} - {e.endDate}</p>
              <p style={text}>{e.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(resumeData.technicalSkills.length > 0 || resumeData.softSkills.length > 0) && (
        <section style={section}>
          <h2 style={accent}>Skills</h2>
          <div style={{ marginTop: 8 }}>
            {[...resumeData.technicalSkills, ...resumeData.softSkills].map((s, i) => (
              <span key={i} style={pill}>{s}</span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section style={section}>
          <h2 style={accent}>Projects</h2>
          {resumeData.projects.map((p, i) => (
            <div key={i} style={block}>
              <strong>{p.title}</strong>
              <p style={dim}>{p.technologies}</p>
              <p style={text}>{p.description}</p>
              {p.link && <a href={p.link} style={link}>View Project</a>}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resumeData.internships.length > 0 && (
        <section style={section}>
          <h2 style={accent}>Experience</h2>
          {resumeData.internships.map((e, i) => (
            <div key={i} style={block}>
              <strong>{e.position}</strong>
              <p style={dim}>{e.company}</p>
              <p style={dim}>{e.startDate} - {e.endDate}</p>
              <p style={text}>{e.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resumeData.certifications.length > 0 && (
        <section style={section}>
          <h2 style={accent}>Certifications</h2>
          {resumeData.certifications.map((c, i) => (
            <div key={i} style={block}>
              <strong>{c.title}</strong>
              <p style={dim}>{c.issuer}</p>
              <p style={dim}>{c.date}</p>
              <p style={text}>{c.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {resumeData.achievements.length > 0 && (
        <section style={section}>
          <h2 style={accent}>Achievements</h2>
          {resumeData.achievements.map((a, i) => (
            <div key={i} style={block}>
              <strong>{a.title}</strong>
              <p style={text}>{a.description}</p>
              <p style={dim}>{a.date}</p>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}

const section = { marginTop: 26 };
const accent = { fontSize: 22, fontWeight: 700, borderLeft: "4px solid #465FFF", paddingLeft: 10 };
const block = { marginTop: 12 };
const dim = { color: "#6B7280", fontSize: 14 };
const text = { marginTop: 6 };
const link = { color: "#465FFF", textDecoration: "none" };

const pill = {
  background: "#EEF2FF",
  padding: "6px 12px",
  borderRadius: 20,
  marginRight: 6,
  marginTop: 6,
  display: "inline-block",
  color: "#3730A3"
};

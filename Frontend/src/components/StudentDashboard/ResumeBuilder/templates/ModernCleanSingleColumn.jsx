import React from "react";

export default function ModernCleanSingleColumn({ resumeData }) {
  return (
    <div style={{
      padding: 32,
      background: "#ffffff",
      fontFamily: "Arial, sans-serif",
      color: "#1F2937"
    }}>
      
      <h1 style={{ fontSize: 30, fontWeight: 900 }}>{resumeData.name || "Your Name"}</h1>
      <p style={dim}>{resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}</p>

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section style={section}>
          <h2 style={title}>Education</h2>
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
          <h2 style={title}>Skills</h2>
          <ul>
            {[...resumeData.technicalSkills, ...resumeData.softSkills].map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <section style={section}>
          <h2 style={title}>Projects</h2>
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
          <h2 style={title}>Experience</h2>
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
          <h2 style={title}>Certifications</h2>
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
          <h2 style={title}>Achievements</h2>
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

const section = { marginTop: 24 };
const title = { fontSize: 20, fontWeight: "bold", borderBottom: "2px solid #E5E7EB", paddingBottom: 4 };
const block = { marginTop: 12 };
const dim = { color: "#6B7280", marginTop: 4 };
const text = { color: "#374151", marginTop: 6 };
const link = { color: "#2563EB", textDecoration: "none" };

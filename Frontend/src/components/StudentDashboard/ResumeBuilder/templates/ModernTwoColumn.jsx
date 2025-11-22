import React from "react";

export default function ModernTwoColumn({ resumeData }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "32% 68%",
      fontFamily: "Arial, sans-serif",
      background: "#ffffff",
      minHeight: "100%",
      color: "#1E3A8A"
    }}>
      
      {/* LEFT SIDEBAR */}
      <aside style={{ background: "#F3F4F6", padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
          {resumeData.name || "Your Name"}
        </h1>
        <p style={{ color: "#6B7280", marginBottom: 16 }}>
          {resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}
        </p>

        {/* Skills */}
        {(resumeData.technicalSkills.length > 0 || resumeData.softSkills.length > 0) && (
          <section style={{ marginBottom: 24 }}>
            <h2 style={leftTitle}>Skills</h2>

            {resumeData.technicalSkills.length > 0 && (
              <>
                <h3 style={leftSmall}>Technical</h3>
                <ul style={leftList}>
                  {resumeData.technicalSkills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}

            {resumeData.softSkills.length > 0 && (
              <>
                <h3 style={leftSmall}>Soft</h3>
                <ul style={leftList}>
                  {resumeData.softSkills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section>
            <h2 style={leftTitle}>Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <h3 style={{ fontWeight: "bold" }}>{edu.degree}</h3>
                <p style={muted}>{edu.institution}</p>
                <p style={muted}>{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}
      </aside>

      {/* RIGHT MAIN */}
      <main style={{ padding: 24 }}>
        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section style={rightSection}>
            <h2 style={rightTitle}>Projects</h2>
            {resumeData.projects.map((p, i) => (
              <div key={i} style={rightBlock}>
                <h3 style={{ fontWeight: "bold", color: "#1E3A8A" }}>{p.title}</h3>
                <p style={muted}>{p.technologies}</p>
                <p style={muted}>{p.description}</p>
                {p.link && <a href={p.link} style={link}>View Project</a>}
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {resumeData.internships.length > 0 && (
          <section style={rightSection}>
            <h2 style={rightTitle}>Experience</h2>
            {resumeData.internships.map((e, i) => (
              <div key={i} style={rightBlock}>
                <h3 style={{ fontWeight: "bold", color: "#1E3A8A" }}>{e.position}</h3>
                <p style={muted}>{e.company}</p>
                <p style={muted}>{e.startDate} - {e.endDate}</p>
                <p style={muted}>{e.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <section style={rightSection}>
            <h2 style={rightTitle}>Certifications</h2>
            {resumeData.certifications.map((c, i) => (
              <div key={i} style={rightBlock}>
                <h3 style={{ fontWeight: "bold", color: "#1E3A8A" }}>{c.title}</h3>
                <p style={muted}>{c.issuer}</p>
                <p style={muted}>{c.date}</p>
                <p style={muted}>{c.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <section style={rightSection}>
            <h2 style={rightTitle}>Achievements</h2>
            {resumeData.achievements.map((a, i) => (
              <div key={i} style={rightBlock}>
                <h3 style={{ fontWeight: "bold", color: "#1E3A8A" }}>{a.title}</h3>
                <p style={muted}>{a.description}</p>
                <p style={muted}>{a.date}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

const leftTitle = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 6
};

const leftSmall = { fontWeight: "bold", marginTop: 10 };

const leftList = {
  listStyle: "none",
  padding: 0,
  marginTop: 6,
  color: "#6B7280"
};

const muted = { color: "#6B7280", marginTop: 4, fontSize: 14 };

const rightSection = { marginBottom: 20 };

const rightTitle = {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 8,
  borderBottom: "1px solid #E5E7EB",
  paddingBottom: 4
};

const rightBlock = {
  marginTop: 10,
  paddingBottom: 10,
  borderBottom: "1px solid #E5E7EB"
};

const link = { color: "#3B82F6", textDecoration: "none" };

import React from "react";

export default function CreativeBoldSidebar({ resumeData, photo }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "35% 65%",
      minHeight: "100%",
      fontFamily: "Arial, sans-serif",
      background: "#ffffff"
    }}>

      {/* LEFT SIDEBAR */}
      <aside style={{
        background: "#1E3A8A",
        color: "#ffffff",
        padding: 24,
        textAlign: "center"
      }}>
        {photo && (
          <img
            src={photo}
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #FFFFFF33",
              marginBottom: 16
            }}
            alt="Profile"
          />
        )}

        <h1 style={{ fontSize: 22, fontWeight: "bold" }}>
          {resumeData.name || "Your Name"}
        </h1>

        <p style={{ fontSize: 14, marginTop: 6 }}>
          {resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}
        </p>

        {/* Skills */}
        {(resumeData.technicalSkills.length > 0 || resumeData.softSkills.length > 0) && (
          <section style={{ marginTop: 22, textAlign: "left" }}>
            <h2 style={leftTitle}>Skills</h2>

            {/* Technical */}
            {resumeData.technicalSkills.length > 0 && (
              <>
                <h3 style={leftSmall}>Technical</h3>
                <ul style={skillList}>
                  {resumeData.technicalSkills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Soft */}
            {resumeData.softSkills.length > 0 && (
              <>
                <h3 style={leftSmall}>Soft</h3>
                <ul style={skillList}>
                  {resumeData.softSkills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </aside>

      {/* RIGHT CONTENT */}
      <main style={{ padding: 24 }}>
        {renderSection("Education", resumeData.education)}
        {renderSection("Projects", resumeData.projects)}
        {renderSection("Experience", resumeData.internships)}
        {renderSection("Certifications", resumeData.certifications)}
        {renderSection("Achievements", resumeData.achievements)}
      </main>
    </div>
  );
}

function renderSection(title, list) {
  if (!list || list.length === 0) return null;

  return (
    <section style={{ marginBottom: 22 }}>
      <h2 style={{
        fontSize: 20,
        fontWeight: 800,
        color: "#1E3A8A",
        borderBottom: "2px solid #3B82F6",
        paddingBottom: 4,
        marginBottom: 8
      }}>
        {title}
      </h2>

      {list.map((item, i) => (
        <div key={i} style={{
          background: "#F3F4F6",
          padding: 10,
          borderRadius: 6,
          marginBottom: 10
        }}>
          <h3 style={{ fontWeight: "bold" }}>
            {item.title || item.degree || item.position}
          </h3>
          <p style={{ color: "#6B7280" }}>
            {item.institution || item.company || item.issuer}
          </p>
          <p style={{ color: "#6B7280", fontSize: 13 }}>
            {item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ""}
          </p>
          <p style={{ marginTop: 6 }}>{item.description}</p>
        </div>
      ))}
    </section>
  );
}

const leftTitle = { fontSize: 18, fontWeight: "bold", marginBottom: 6 };
const leftSmall = { marginTop: 12, fontWeight: "bold" };
const skillList = { listStyle: "none", padding: 0, marginTop: 6 };

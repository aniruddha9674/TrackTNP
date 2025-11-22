import React from "react";

export default function CreativeDecorative({ resumeData, photo }) {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#ffffff",
      padding: 24,
      color: "#111827"
    }}>

      {/* Decorative Header */}
      <header style={{
        borderBottom: "6px solid #F59E0B",
        paddingBottom: 16,
        marginBottom: 20,
        textAlign: "center"
      }}>
        {photo && (
          <img
            src={photo}
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #F59E0B"
            }}
            alt=""
          />
        )}

        <h1 style={{ fontSize: 28, fontWeight: 900, marginTop: 10 }}>
          {resumeData.name}
        </h1>
        <p style={{ color: "#444" }}>
          {resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}
        </p>
      </header>

      {/* Sections */}
      {renderDecor("Education", resumeData.education)}
      {renderDecor("Skills", [...resumeData.technicalSkills, ...resumeData.softSkills])}
      {renderDecor("Projects", resumeData.projects)}
      {renderDecor("Experience", resumeData.internships)}
      {renderDecor("Certifications", resumeData.certifications)}
      {renderDecor("Achievements", resumeData.achievements)}
    </div>
  );
}

function renderDecor(title, list) {
  if (!list || list.length === 0) return null;

  return (
    <section style={{ marginBottom: 22 }}>
      <h2 style={{
        fontSize: 20,
        fontWeight: 800,
        color: "#F59E0B",
        borderLeft: "5px solid #FCD34D",
        paddingLeft: 10,
        marginBottom: 12
      }}>
        {title}
      </h2>

      {/* String lists (skills) */}
      {typeof list[0] === "string" &&
        list.map((skill, i) => (
          <span
            key={i}
            style={{
              padding: "6px 12px",
              background: "#FEF3C7",
              borderRadius: 20,
              marginRight: 8,
              marginBottom: 8,
              display: "inline-block",
              color: "#B45309"
            }}
          >
            {skill}
          </span>
        ))}

      {/* Object lists */}
      {typeof list[0] === "object" &&
        list.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#FFF7ED",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #FDE68A",
              marginBottom: 10
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>
              {item.title || item.degree || item.position}
            </h3>

            <p style={{ color: "#92400E" }}>
              {item.institution || item.company || item.issuer}
            </p>

            <p style={{ color: "#B45309", fontSize: 13 }}>
              {item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ""}
            </p>

            <p style={{ marginTop: 4 }}>{item.description}</p>
          </div>
        ))}
    </section>
  );
}

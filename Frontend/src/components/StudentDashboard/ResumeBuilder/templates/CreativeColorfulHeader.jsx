import React from "react";

export default function CreativeColorfulHeader({ resumeData, photo }) {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#ffffff",
      padding: 24,
      color: "#1F2937"
    }}>

      {/* Header Section */}
      <header style={{
        background: "linear-gradient(90deg, #465FFF, #0BA5EC)",
        padding: 24,
        borderRadius: 12,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        gap: 20
      }}>
        {photo && (
          <img
            src={photo}
            alt=""
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #fff"
            }}
          />
        )}

        <div>
          <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 4 }}>
            {resumeData.name || "Your Name"}
          </h1>
          <p style={{ fontSize: 14 }}>
            {resumeData.email} {resumeData.phone && `| ${resumeData.phone}`}
          </p>
        </div>
      </header>

      {/* Body Sections */}
      <div style={{ marginTop: 20 }}>
        {renderColorBlock("Education", resumeData.education)}
        {renderColorBlock("Skills", [...resumeData.technicalSkills, ...resumeData.softSkills])}
        {renderColorBlock("Projects", resumeData.projects)}
        {renderColorBlock("Experience", resumeData.internships)}
        {renderColorBlock("Certifications", resumeData.certifications)}
        {renderColorBlock("Achievements", resumeData.achievements)}
      </div>
    </div>
  );
}

function renderColorBlock(title, list) {
  if (!list || list.length === 0) return null;

  return (
    <section style={{ marginBottom: 20 }}>
      <h2 style={{
        fontSize: 22,
        fontWeight: "bold",
        color: "#0BA5EC",
        borderLeft: "6px solid #465FFF",
        paddingLeft: 10,
        marginBottom: 10
      }}>
        {title}
      </h2>

      {Array.isArray(list) &&
        list.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#EEF2FF",
              padding: 14,
              borderRadius: 10,
              marginBottom: 10
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>
              {item.title || item.degree || item.position}
            </h3>

            <p style={{ color: "#444" }}>
              {item.institution || item.company || item.issuer}
            </p>

            <p style={{ color: "#666", fontSize: 13 }}>
              {item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ""}
            </p>

            {item.description && <p style={{ marginTop: 6 }}>{item.description}</p>}
          </div>
        ))}

      {/* Skills special case */}
      {typeof list[0] === "string" &&
        list.map((skill, i) => (
          <span
            key={i}
            style={{
              padding: "6px 12px",
              background: "#D6E4FF",
              borderRadius: 20,
              marginRight: 8,
              display: "inline-block",
              marginBottom: 8,
              color: "#1E40AF"
            }}
          >
            {skill}
          </span>
        ))}
    </section>
  );
}

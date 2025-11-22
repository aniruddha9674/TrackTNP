import React from "react";

export default function ATSClassicTable({ resumeData }) {
  return (
    <div style={{ background: "#fff", color: "#101828", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        {resumeData.name || "Your Name"}
      </h1>
      <p style={{ color: "#667085", marginBottom: "16px" }}>
        {resumeData.email} {resumeData.phone ? `| ${resumeData.phone}` : ""}
      </p>

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>Education</h2>
          {resumeData.education.map((edu, i) => (
            <div key={i} style={{ marginTop: "8px" }}>
              <h3 style={{ fontWeight: "bold" }}>{edu.degree}</h3>
              <p style={{ color: "#667085" }}>{edu.institution}</p>
              <p style={{ color: "#667085", fontSize: "13px" }}>
                {edu.startDate} - {edu.endDate}
              </p>
              <p style={{ marginTop: "4px", color: "#667085" }}>{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(resumeData.technicalSkills.length > 0 || resumeData.softSkills.length > 0) && (
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>Skills</h2>

          {/* Technical */}
          {resumeData.technicalSkills.length > 0 && (
            <div>
              <h3 style={{ fontWeight: "bold" }}>Technical Skills</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
                <tbody>
                  {resumeData.technicalSkills.map((skill, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid #E5E7EB", padding: "8px" }}>{skill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Soft */}
          {resumeData.softSkills.length > 0 && (
            <div>
              <h3 style={{ fontWeight: "bold", marginTop: "12px" }}>Soft Skills</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
                <tbody>
                  {resumeData.softSkills.map((skill, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid #E5E7EB", padding: "8px" }}>{skill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>Projects</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
            <tbody>
              {resumeData.projects.map((project, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #E5E7EB", padding: "8px" }}>
                    <h3 style={{ fontWeight: "bold" }}>{project.title}</h3>
                    <p style={{ color: "#667085" }}>{project.technologies}</p>
                    <p style={{ marginTop: "4px", color: "#667085" }}>{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" style={{ color: "#465FFF" }}>
                        View Project
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Experience */}
      {resumeData.internships.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>Experience</h2>
          {resumeData.internships.map((exp, i) => (
            <div key={i} style={{ marginTop: "8px" }}>
              <h3 style={{ fontWeight: "bold" }}>{exp.position}</h3>
              <p style={{ color: "#667085" }}>{exp.company}</p>
              <p style={{ color: "#667085", fontSize: "13px" }}>
                {exp.startDate} - {exp.endDate}
              </p>
              <p style={{ marginTop: "4px", color: "#667085" }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>Certifications</h2>
          {resumeData.certifications.map((cert, i) => (
            <div key={i} style={{ marginTop: "8px" }}>
              <h3 style={{ fontWeight: "bold" }}>{cert.title}</h3>
              <p style={{ color: "#667085" }}>{cert.issuer}</p>
              <p style={{ color: "#667085", fontSize: "13px" }}>{cert.date}</p>
              <p style={{ marginTop: "4px", color: "#667085" }}>{cert.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements.length > 0 && (
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>Achievements</h2>
          {resumeData.achievements.map((ach, i) => (
            <div key={i} style={{ marginTop: "8px" }}>
              <h3 style={{ fontWeight: "bold" }}>{ach.title}</h3>
              <p style={{ color: "#667085" }}>{ach.description}</p>
              <p style={{ color: "#667085", fontSize: "12px" }}>{ach.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

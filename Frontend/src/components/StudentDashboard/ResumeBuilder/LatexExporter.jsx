import React from "react";

const generateLatexCode = (resumeData) => {
  const {
    name,
    email,
    phone,
    linkedin,
    github,
    portfolio,
    address,
    education,
    technicalSkills,
    softSkills,
    projects,
    internships,
    certifications,
    achievements,
  } = resumeData;

  // Escape special characters for LaTeX
  const escapeLatex = (str) => str.replace(/[&%$#_{}~^\\]/g, "\\$&");

  // Generate LaTeX sections
  const personalInfo = `
    \\section*{${escapeLatex(name)}}
    \\begin{tabular}{rl}
      \\textbf{Email:} & ${escapeLatex(email)} \\\\
      \\textbf{Phone:} & ${escapeLatex(phone)} \\\\
      \\textbf{LinkedIn:} & ${escapeLatex(linkedin)} \\\\
      \\textbf{GitHub:} & ${escapeLatex(github)} \\\\
      \\textbf{Portfolio:} & ${escapeLatex(portfolio)} \\\\
      \\textbf{Address:} & ${escapeLatex(address)}
    \\end{tabular}
  `;

  const educationSection = education.length > 0 ? `
    \\section*{Education}
    \\begin{itemize}
      ${education
        .map(
          (edu) => `
          \\item \\textbf{${escapeLatex(edu.degree)}} at ${escapeLatex(edu.institution)} (${edu.startDate} - ${edu.endDate})
          \\\\ ${escapeLatex(edu.description)}
        `
        )
        .join("")}
    \\end{itemize}
  ` : "";

  const skillsSection = (technicalSkills.length > 0 || softSkills.length > 0) ? `
    \\section*{Skills}
    \\begin{itemize}
      ${technicalSkills.length > 0 ? `\n      \\item \\textbf{Technical Skills:} ${escapeLatex(technicalSkills.join(", "))}` : ""}
      ${softSkills.length > 0 ? `\n      \\item \\textbf{Soft Skills:} ${escapeLatex(softSkills.join(", "))}` : ""}
    \\end{itemize}
  ` : "";

  const projectsSection = projects.length > 0 ? `
    \\section*{Projects}
    \\begin{itemize}
      ${projects
        .map(
          (project) => `
          \\item \\textbf{${escapeLatex(project.title)}} (${escapeLatex(project.technologies)})
          \\\\ ${escapeLatex(project.description)}
          ${project.link ? `\n          \\\\ \\textbf{Link:} ${escapeLatex(project.link)}` : ""}
        `
        )
        .join("")}
    \\end{itemize}
  ` : "";

  const experienceSection = internships.length > 0 ? `
    \\section*{Experience}
    \\begin{itemize}
      ${internships
        .map(
          (exp) => `
          \\item \\textbf{${escapeLatex(exp.position)}} at ${escapeLatex(exp.company)} (${exp.startDate} - ${exp.endDate})
          \\\\ ${escapeLatex(exp.description)}
        `
        )
        .join("")}
    \\end{itemize}
  ` : "";

  const certificationsSection = certifications.length > 0 ? `
    \\section*{Certifications}
    \\begin{itemize}
      ${certifications
        .map(
          (cert) => `
          \\item \\textbf{${escapeLatex(cert.title)}} by ${escapeLatex(cert.issuer)} (${cert.date})
          \\\\ ${escapeLatex(cert.description)}
        `
        )
        .join("")}
    \\end{itemize}
  ` : "";

  const achievementsSection = achievements.length > 0 ? `
    \\section*{Achievements}
    \\begin{itemize}
      ${achievements
        .map(
          (ach) => `
          \\item \\textbf{${escapeLatex(ach.title)}} (${ach.date})
          \\\\ ${escapeLatex(ach.description)}
        `
        )
        .join("")}
    \\end{itemize}
  ` : "";

  // Combine all sections
  const latexDocument = `
    \\documentclass{article}
    \\usepackage[utf8]{inputenc}
    \\usepackage{enumitem}
    \\setlist[itemize]{leftmargin=*}
    \\title{Resume}
    \\author{${escapeLatex(name)}}
    \\date{}
    \\begin{document}
    \\maketitle
    ${personalInfo}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}
    ${experienceSection}
    ${certificationsSection}
    ${achievementsSection}
    \\end{document}
  `;

  return latexDocument;
};

export const exportAsLatex = (resumeData) => {
  const latexCode = generateLatexCode(resumeData);
  const blob = new Blob([latexCode], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Resume.tex";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

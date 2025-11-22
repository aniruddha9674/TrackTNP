import React from "react";

export default function TemplateSelection({
  selectedTemplate,
  setSelectedTemplate,
}) {
  const templates = [
    { id: "clean", title: "Template A: Clean Professional" },
    { id: "modern", title: "Template B: Modern Two-Column" },
    { id: "minimal", title: "Template C: Minimalistic" },
    { id: "creative", title: "Template D: Creative" },
    { id: "ats", title: "Template E: ATS Friendly" },
  ];

  return (
    <div className="font-urbanist">
      <h2 className="text-xl font-semibold text-[#101828] mb-4">
        Select Resume Template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((t) => {
          const active = selectedTemplate === t.id;

          return (
            <div
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`
                cursor-pointer rounded-xl p-4 border 
                transition-all duration-200
                ${
                  active
                    ? "border-[#465FFF] bg-[#F2F4F7] shadow-md"
                    : "border-gray-300 bg-white"
                }
                hover:border-[#3641F5]
              `}
            >
              <p
                className={`text-base font-medium ${
                  active ? "text-[#3641F5]" : "text-[#101828]"
                }`}
              >
                {t.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

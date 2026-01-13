import React, { useState, useMemo, useCallback } from "react";
import { Plus, Eye, Edit2, Trash2, X, ArrowLeft } from "lucide-react";

const CompanyModalForm = ({
  showModal,
  setShowModal,
  formData,
  setFormData,
  additionalFiles,
  setAdditionalFiles,
  viewMode,
  editingId,
  themeStyles,
  batchYears,
  branches,
  Colleges,
  handleSubmit,
  resetForm,
}) => {
  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => {
        if (type === "checkbox") {
          const currentArray = prev[name] || [];
          return {
            ...prev,
            [name]: checked
              ? [...currentArray, value]
              : currentArray.filter((item) => item !== value),
          };
        }
        return { ...prev, [name]: value };
      });
    },
    [setFormData]
  );

  const addFileInput = useCallback(() => {
    setAdditionalFiles((prev) => [...prev, { id: Date.now(), file: null }]);
  }, [setAdditionalFiles]);

  const removeFileInput = useCallback(
    (id) => {
      setAdditionalFiles((prev) => prev.filter((file) => file.id !== id));
    },
    [setAdditionalFiles]
  );

  const FormSection = ({ title, children }) => (
    <div className={`p-6 rounded-xl ${themeStyles.sectionBg} space-y-4`}>
      <h3 className={`text-lg font-semibold ${themeStyles.textPrimary} mb-4`}>
        {title}
      </h3>
      {children}
    </div>
  );

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    ...props
  }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeStyles.textPrimary}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name] ?? ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={viewMode}
          className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all resize-none`}
          rows={4}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] ?? ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={viewMode}
          className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
          {...props}
        />
      )}
    </div>
  );

  const SelectField = ({
    label,
    name,
    options,
    required = false,
    placeholder = "Select...",
  }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeStyles.textPrimary}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name] ?? ""}
        onChange={handleInputChange}
        disabled={viewMode}
        className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return showModal ? (
    <div
      className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
    >
      <div
        className={`w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
      >
        <div
          className={`${themeStyles.modalHeader} border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10`}
        >
          <div className="flex items-center gap-3">
            {viewMode && (
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
              {viewMode
                ? "Company Drive Details"
                : editingId
                ? "Edit Company Drive"
                : "Add Company Drive"}
            </h2>
          </div>
          <button
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-all`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Date" name="date" type="date" required />
              <InputField
                label="Month"
                name="month"
                type="number"
                min="1"
                max="12"
                required
              />
              <InputField label="Year" name="year" type="number" required />
            </div>
            <InputField
              label="Company Name"
              name="companyName"
              required
              placeholder="Enter company name"
            />
            <InputField
              label="Company Related Info"
              name="companyRelatedInfo"
              type="textarea"
              placeholder="Additional company information"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Registration End Date"
                name="regEndDate"
                type="date"
                required
              />
              <InputField
                label="Registration Time"
                name="registrationTime"
                type="time"
              />
            </div>
          </FormSection>

          {/* Recruitment Details */}
          <FormSection title="Recruitment Details">
            <SelectField
              label="Recruitment Method"
              name="recruitmentMethod"
              required
              options={[
                { value: "Everyone", label: "Everyone - Everyone can apply" },
                {
                  value: "Unplaced",
                  label: "Unplaced - Only unplaced students",
                },
                {
                  value: "Placed Below XYZ Package",
                  label: "Placed Below Package",
                },
              ]}
            />
            {formData.recruitmentMethod === "Placed Below XYZ Package" && (
              <InputField
                label="Placed Below Package"
                name="placedBelow"
                placeholder="e.g., 5.0 LPA"
              />
            )}
            <div>
              <label
                className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
              >
                Eligible Batch Years
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {batchYears.map((year) => (
                  <label
                    key={year}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="eligibleBatchYears"
                      value={year}
                      checked={formData.eligibleBatchYears.includes(year)}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={`text-sm ${themeStyles.textPrimary}`}>
                      {year}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
              >
                Eligible Branches
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branches.map((branch) => (
                  <label
                    key={branch}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="eligibleBranches"
                      value={branch}
                      checked={formData.eligibleBranches.includes(branch)}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={`text-sm ${themeStyles.textPrimary}`}>
                      {branch}
                    </span>
                  </label>
                ))}
              </div>
              <label
                className={`block text-sm font-medium ${themeStyles.textPrimary} mt-4`}
              >
                Eligible Colleges
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {Colleges.map((college) => (
                  <label
                    key={college}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="eligibleColleges"
                      value={college}
                      checked={formData.eligibleColleges.includes(college)}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={`text-sm ${themeStyles.textPrimary}`}>
                      {college}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Job Details */}
          <FormSection title="Job Details">
            <InputField
              label="Job Openings"
              name="jobOpenings"
              type="number"
              placeholder="Number of openings"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Company Type"
                name="companyType"
                options={[
                  { value: "Product", label: "Product" },
                  { value: "Core", label: "Core" },
                  { value: "IT", label: "IT" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <SelectField
                label="Drive Type"
                name="driveType"
                options={[
                  { value: "Internship", label: "Internship" },
                  { value: "Placement", label: "Placement" },
                  { value: "Internship + PPO", label: "Internship + PPO" },
                ]}
              />
            </div>
            <InputField
              label="Job Profile"
              name="jobProfile"
              placeholder="e.g., Software Engineer"
            />
          </FormSection>

          {/* Eligibility Criteria */}
          <FormSection title="Eligibility Criteria">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="SSC Criteria (%)"
                name="sscCriteria"
                type="number"
                placeholder="e.g., 60"
              />
              <InputField
                label="HSC Criteria (%)"
                name="hscCriteria"
                type="number"
                placeholder="e.g., 60"
              />
              <InputField
                label="CGPA Criteria"
                name="cgpaCriteria"
                type="number"
                step="0.01"
                placeholder="e.g., 7.0"
              />
              <InputField
                label="Backlog Criteria"
                name="backlogCriteria"
                placeholder="e.g., No active backlogs"
              />
            </div>
            <InputField
              label="Venue"
              name="venue"
              placeholder="Interview venue"
            />
          </FormSection>

          {/* Compensation */}
          <FormSection title="Compensation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Salary Offered"
                name="salaryOffered"
                placeholder="e.g., 6.0 LPA"
              />
              <InputField
                label="Internship Stipend"
                name="internshipStipend"
                placeholder="e.g., 15000/month"
              />
            </div>
            <InputField
              label="Company Bond"
              name="companyBond"
              placeholder="Bond details if any"
            />
          </FormSection>

          {/* Drive Status */}
          <FormSection title="Drive Status">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                label="Resume Required"
                name="resumeRequired"
                options={[
                  { value: "Required", label: "Required" },
                  { value: "Not Required", label: "Not Required" },
                ]}
              />
              <SelectField
                label="Registration Status"
                name="registrationStatus"
                options={[
                  { value: "Open", label: "Open" },
                  { value: "Closed", label: "Closed" },
                ]}
              />
              <SelectField
                label="Drive Completed"
                name="driveCompleted"
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
              />
            </div>
          </FormSection>

          {/* Additional Files */}
          {!viewMode && (
            <FormSection title="Additional Files">
              <div className="space-y-3">
                {additionalFiles.map((file, index) => (
                  <div key={file.id} className="flex items-center gap-3">
                    <input
                      type="file"
                      onChange={(e) => {
                        const newFiles = [...additionalFiles];
                        newFiles[index].file = e.target.files[0];
                        setAdditionalFiles(newFiles);
                      }}
                      className={`flex-1 px-4 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg ${themeStyles.inputText} transition-all`}
                    />
                    {additionalFiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFileInput(file.id)}
                        className="px-3 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFileInput}
                  className={`inline-flex items-center px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another File
                </button>
              </div>
            </FormSection>
          )}

          {/* Submit Buttons */}
          {!viewMode && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => handleSubmit("save")}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
              >
                Save
              </button>
              <button
                onClick={() => handleSubmit("saveAndAdd")}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all"
              >
                Save and Add Another
              </button>
              <button
                onClick={() => handleSubmit("saveAndContinue")}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium transition-all"
              >
                Save and Continue Editing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default CompanyModalForm;

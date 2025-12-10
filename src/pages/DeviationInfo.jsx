import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation
import Navbar from "../components/Navbar";
import "../components/Navbar.css"; // ✅ use same navbar style

export default function DeviationInfo() {
  const navigate = useNavigate(); // ✅ initialize navigation

  const [deviationData, setDeviationData] = useState({
    title: "",
    description: "",
    standard: "",
    standardNotApplicable: false,
    immediateAction: "",
    immediateActionNotApplicable: false,
    reviewerRemarks: "",
  });

  // Highlight current page in Navbar
  useEffect(() => {
    document.title = "Deviation Info";
  }, []);

  const handleChange = (key, value) => {
    setDeviationData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (key) => {
    setDeviationData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ Save → Go to Preliminary Page
  const handleSave = () => {
    console.log("Deviation Info Saved:", deviationData);
    alert("Deviation Info Saved Successfully!");
    navigate("/preliminary"); // ✅ redirect to Preliminary page
  };

  // ✅ Save & Exit → Go to General Info Page
  const handleSaveAndExit = () => {
    console.log("Deviation Info Saved:", deviationData);
    alert("Deviation Info Saved and Exiting...");
    navigate("/general-info"); // ✅ redirect to General Info
  };

  // ✅ Exit → Go to General Info Page
  const handleExit = () => {
    navigate("/general-info");
  };

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar activeTab={1} />

      <style>
        {`
          body {
            font-family: 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #eef2f6;
            margin: 0;
            padding: 0;
          }

          .content {
            max-width: 850px;
            margin: 30px auto;
            padding: 40px 45px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }

          .section-title {
            font-size: 24px;
            color: #1f2937;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .form-group {
            margin-bottom: 25px;
          }

          .form-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            display: block;
            font-size: 15px;
          }

          .form-input,
          .form-textarea {
            width: 100%;
            padding: 12px 14px;
            font-size: 15px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            background-color: #f9fafb;
            transition: border-color 0.3s, box-shadow 0.3s;
          }

          .form-input:focus,
          .form-textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
            background-color: #ffffff;
          }

          .form-textarea {
            min-height: 100px;
            resize: vertical;
          }

          .checkbox-group {
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
          }

          .checkbox-group input {
            width: 16px;
            height: 16px;
            cursor: pointer;
          }

          .btn-container {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 30px;
          }

          .btn {
            padding: 10px 22px;
            font-weight: 600;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: #ffffff;
            font-size: 15px;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }

          .btn:hover {
            transform: translateY(-2px);
          }

          .btn-save {
            background-color: #10b981;
          }
          .btn-save:hover {
            background-color: #059669;
          }

          .btn-save-exit {
            background-color: #3b82f6;
          }
          .btn-save-exit:hover {
            background-color: #2563eb;
          }

          .btn-exit {
            background-color: #6b7280;
          }
          .btn-exit:hover {
            background-color: #4b5563;
          }
        `}
      </style>

      {/* ✅ Main Content */}
      <main className="content">
        <h2 className="section-title">Deviation Information</h2>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            value={deviationData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={deviationData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>
        </div>

        {/* Standard */}
        <div className="form-group">
          <label className="form-label">Standard</label>
          <textarea
            className="form-textarea"
            value={deviationData.standard}
            onChange={(e) => handleChange("standard", e.target.value)}
            disabled={deviationData.standardNotApplicable}
          ></textarea>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="standardNotApplicable"
              checked={deviationData.standardNotApplicable}
              onChange={() => handleCheckbox("standardNotApplicable")}
            />
            <label htmlFor="standardNotApplicable">Not Applicable</label>
          </div>
        </div>

        {/* Immediate Action */}
        <div className="form-group">
          <label className="form-label">Immediate Action (if any)</label>
          <textarea
            className="form-textarea"
            value={deviationData.immediateAction}
            onChange={(e) => handleChange("immediateAction", e.target.value)}
            disabled={deviationData.immediateActionNotApplicable}
          ></textarea>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="immediateActionNotApplicable"
              checked={deviationData.immediateActionNotApplicable}
              onChange={() => handleCheckbox("immediateActionNotApplicable")}
            />
            <label htmlFor="immediateActionNotApplicable">Not Applicable</label>
          </div>
        </div>

        {/* Reviewer Remarks */}
        <div className="form-group">
          <label className="form-label">Remarks by Reviewer</label>
          <textarea
            className="form-textarea"
            value={deviationData.reviewerRemarks}
            onChange={(e) => handleChange("reviewerRemarks", e.target.value)}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="btn-container">
            <button
              className="btn"
              style={{ backgroundColor: '#28a745' }}
              onClick={async () => {
                await handleSave();
                 localStorage.setItem("canViewDeviation", "true"); // ✅ set flag
                navigate('/preliminary'); // 👈 Goes to Deviation Info page
              }}
            >
              Save
            </button>
            <button
              className="btn"
              style={{ backgroundColor: '#007bff' }}
              onClick={async () => {
                await handleSave();
                navigate('/');
              }}
            >
              Save & Exit
            </button>
           <button
              className="btn"
              style={{ backgroundColor: '#6c757d' }}
              onClick={() => navigate('/general-info')}
            >
              Back
            </button>
        </div>
      </main>
    </>
  );
}

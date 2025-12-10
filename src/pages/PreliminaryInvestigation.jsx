import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/preliminary";

export default function PreliminaryInvestigation() {
  const navigate = useNavigate();

  const [isNA, setIsNA] = useState(false);
  const [investigationText, setInvestigationText] = useState("");
  const [reviewerRemarks, setReviewerRemarks] = useState("");

  const savePreliminary = async () => {
    const incidentId = localStorage.getItem("incident_id");

    if (!incidentId) {
      alert("❌ No incident_id found. Please complete previous steps first.");
      navigate("/department");
      return false;
    }

    const payload = {
      incident_id: incidentId,
      investigationText,
      reviewerRemarks,
      isNA,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const result = await res.json();
      console.log("Preliminary Investigation Saved:", result);
      return true;
    } catch (err) {
      console.error("Error saving preliminary investigation:", err);
      alert("❌ Failed to save preliminary investigation. Check console/backend.");
      return false;
    }
  };

  const handleSubmit = async () => {
    const ok = await savePreliminary();
    if (ok) {
      alert("✅ Preliminary investigation submitted (saved).");
    }
  };

  return (
    <>
      {/* Same layout / button styles as DeviationInfo */}
      <style>
        {`
          body { font-family: 'Arial', sans-serif; background-color: #f0f2f5; margin: 0; }

          .content {
            padding: 30px;
            max-width: 900px;
            margin: 20px auto;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .section-title {
            font-size: 22px;
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 8px;
            margin-bottom: 20px;
            text-align: center;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-label {
            font-weight: 600;
            color: #555;
            margin-bottom: 6px;
            display: block;
          }

          .form-input, .form-textarea {
            width: 100%;
            padding: 8px 10px;
            font-size: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .form-textarea {
            min-height: 100px;
            resize: vertical;
          }

          .btn-container {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
          }

          .btn {
            padding: 10px 20px;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: white;
          }

          .btn-save { background-color: #28a745; }
          .btn-save:hover { background-color: #218838; }

          .btn-save-exit { background-color: #007bff; }
          .btn-save-exit:hover { background-color: #0069d9; }

          .btn-exit { background-color: #6c757d; }
          .btn-exit:hover { background-color: #5a6268; }

          .editor-box {
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            background-color: #f8f9fa;
          }

          .editor-toolbar {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
          }

          .editor-toolbar button {
            padding: 4px 8px;
            border: 1px solid #333;
            border-radius: 4px;
            background: #ffffff;
            cursor: pointer;
          }

          .na-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
          }
        `}
      </style>

      <Navbar />

      <main className="content">
        <h2 className="section-title">Preliminary Investigation</h2>

        {/* Main investigation text with toolbar */}
        <div className="form-group">
          <label className="form-label">Preliminary * Investigation:</label>
          <div className="editor-box">
            <div className="editor-toolbar">
              <button onClick={() => execFormat(editorInvestigation, "bold")} className="icon-btn">B</button>
<button onClick={() => execFormat(editorInvestigation, "italic")} className="icon-btn"><i>I</i></button>
<button onClick={() => execFormat(editorInvestigation, "underline")} className="icon-btn"><u>U</u></button>
<button onClick={() => execFormat(editorInvestigation, "insertUnorderedList")} className="icon-btn">•</button>
<button onClick={() => execFormat(editorInvestigation, "insertOrderedList")} className="icon-btn">1.</button>

            </div>
            <textarea
              className="form-textarea"
              disabled={isNA}
              placeholder="Enter investigation details..."
              value={investigationText}
              onChange={(e) => setInvestigationText(e.target.value)}
            />
          </div>
        </div>

        {/* Not applicable checkbox */}
        <div className="form-group na-row">
          <input
            type="checkbox"
            checked={isNA}
            onChange={(e) => setIsNA(e.target.checked)}
          />
          <span>NOT APPLICABLE</span>
        </div>

        {/* Reviewer remarks */}
        <div className="form-group">
          <label className="form-label">Remarks By Reviewer:</label>
          <textarea
            className="form-textarea"
            placeholder="Enter reviewer remarks..."
            value={reviewerRemarks}
            onChange={(e) => setReviewerRemarks(e.target.value)}
          />
        </div>

        {/* Buttons: Back / Save → Review & Approve / Save & Exit */}
        <div className="btn-container">
          {/* Back → Deviation */}
          <button
            className="btn btn-exit"
            type="button"
            onClick={() => navigate("/deviation")}
          >
            Back
          </button>

          {/* Save → Review & Approve */}
          <button
            className="btn btn-save"
            type="button"
            onClick={async () => {
              const ok = await savePreliminary();
              if (ok) navigate("/review-approve");
            }}
          >
            Save
          </button>

          {/* Save & Exit → Dashboard */}
          <button
            className="btn btn-save-exit"
            type="button"
            onClick={async () => {
              const ok = await savePreliminary();
              if (ok) navigate("/");
            }}
          >
            Save & Exit
          </button>
        </div>
      </main>
    </>
  );
}

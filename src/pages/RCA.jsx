import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./RCA.css";

export default function Review() {
  const navigate = useNavigate();

  const editorRoot = useRef(null);
  const editorJust = useRef(null);

  const [rootCauseNA, setRootCauseNA] = useState(false);
  const [action, setAction] = useState([]);
  const [actionNA, setActionNA] = useState(false);
  const [justificationNA, setJustificationNA] = useState(false);
  const [remarksNA, setRemarksNA] = useState(false);
  const [remarks, setRemarks] = useState("");

  const actionOptions = [
    "Continued Manufacturing",
    "Stopped Manufacturing",
    "Other Action",
    "Not Applicable",
  ];

  // Toolbar formatting
  const format = (cmd, ref) => {
    if (!ref.current) return;
    ref.current.focus();
    document.execCommand(cmd);
  };

  // Single selection rule
  const handleCheckboxChange = (option) => {
    if (action.includes(option)) {
      setAction([]);
    } else {
      setAction([option]);
    }
  };

  // SAVE function (alert removed)
  const handleSave = async () => {
    try {
      const payload = {
        rootCause: rootCauseNA ? "NA" : editorRoot.current?.innerHTML,
        actionTaken: actionNA ? "NA" : action[0] || "",
        justification: justificationNA ? "NA" : editorJust.current?.innerHTML,
        remarks: remarksNA ? "NA" : remarks,
      };

      console.log("📌 Review Form Saved:", payload);

      return true;
    } catch (error) {
      console.error("❌ Save Failed:", error);
      return false;
    }
  };

  return (
    <>
      <Navbar />
      <main className="capa-container">
        
        {/* ROOT CAUSE */}
        <section className="capa-section">
          <div className="capa-section-header">
            <label className="input-label">Reason / Root Cause Identification:</label>
            <label className="capa-na">
              <input
                type="checkbox"
                checked={rootCauseNA}
                onChange={(e) => setRootCauseNA(e.target.checked)}
              />
              NOT APPLICABLE
            </label>
          </div>

          <div className={`capa-editor ${rootCauseNA ? "disabled" : ""}`}>
            <div className="capa-toolbar">
              <button onClick={() => format("bold", editorRoot)}>𝐁</button>
              <button onClick={() => format("italic", editorRoot)}>𝑖</button>
              <button onClick={() => format("underline", editorRoot)}>U̲</button>
              <button onClick={() => format("insertUnorderedList", editorRoot)}>•</button>
              <button onClick={() => format("insertOrderedList", editorRoot)}>1.</button>
            </div>

            <div
              ref={editorRoot}
              className="capa-editor-body"
              contentEditable={!rootCauseNA}
              placeholder="Enter root cause..."
            />
          </div>
        </section>

        {/* ACTION TAKEN */}
        <section className="capa-section">
          <div className="capa-section-header">
            <label className="input-label">
              Action Taken: <span className="note">(Only one should be selected)</span>
            </label>
            <label className="capa-na">
              <input
                type="checkbox"
                checked={actionNA}
                onChange={(e) => {
                  setActionNA(e.target.checked);
                  if (e.target.checked) setAction([]);
                }}
              />
              NOT APPLICABLE
            </label>
          </div>

          <div className="action-list">
            {actionOptions.map((opt) => (
              <label className="action-row" key={opt}>
                <input
                  type="checkbox"
                  checked={action.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  disabled={actionNA}
                />
                <span className="action-text">{opt}</span>
              </label>
            ))}
          </div>
        </section>

        {/* JUSTIFICATION */}
        <section className="capa-section">
          <div className="capa-section-header">
            <label className="input-label">Justification for Action Taken:</label>
            <label className="capa-na">
              <input
                type="checkbox"
                checked={justificationNA}
                onChange={(e) => setJustificationNA(e.target.checked)}
              />
              NOT APPLICABLE
            </label>
          </div>

          <div className={`capa-editor ${justificationNA ? "disabled" : ""}`}>
            <div className="capa-toolbar">
              <button onClick={() => format("bold", editorJust)}>𝐁</button>
              <button onClick={() => format("italic", editorJust)}>𝑖</button>
              <button onClick={() => format("underline", editorJust)}>U̲</button>
              <button onClick={() => format("insertUnorderedList", editorJust)}>•</button>
              <button onClick={() => format("insertOrderedList", editorJust)}>1.</button>
            </div>

            <div
              ref={editorJust}
              className="capa-editor-body"
              contentEditable={!justificationNA}
              placeholder="Mandatory for selected Action(s)"
            />
          </div>
        </section>

        {/* REVIEWER REMARKS */}
        <section className="capa-section">
          <div className="capa-section-header">
            <label className="input-label">Remarks by Reviewer:</label>
            <label className="capa-na">
              <input
                type="checkbox"
                checked={remarksNA}
                onChange={(e) => setRemarksNA(e.target.checked)}
              />
              NOT APPLICABLE
            </label>
          </div>

          <textarea
            className="capa-reviewer-text"
            disabled={remarksNA}
            placeholder="Enter reviewer comments..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </section>

        {/* BUTTONS */}
        <div className="capa-buttons">
          <button
            className="btn"
            style={{ backgroundColor: "#28a745" }}
            onClick={async () => {
              const ok = await handleSave();
              if (!ok) return;
              navigate("/closure");
            }}
          >
            Save
          </button>

          <button
            className="btn"
            style={{ backgroundColor: "#007bff" }}
            onClick={async () => {
              const ok = await handleSave();
              if (!ok) return;
              navigate("/");
            }}
          >
            Save & Exit
          </button>

          <button
            className="btn"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => navigate("/preliminary")}
          >
            Back
          </button>
        </div>

      </main>
    </>
  );
}

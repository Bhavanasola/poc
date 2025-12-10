import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./CAPA.css";

export default function CAPA() {
  const navigate = useNavigate();

  // Refs for contentEditable editors
  const correctiveRef = useRef(null);
  const preventiveRef = useRef(null);
  const deptHeadRef = useRef(null);

  // State for checkboxes / reviewer textbox
  const [correctiveNA, setCorrectiveNA] = useState(false);
  const [preventiveNA, setPreventiveNA] = useState(false);
  const [deptHeadNA, setDeptHeadNA] = useState(false);
  const [reviewerRemarks, setReviewerRemarks] = useState("");

  // Helper to execute formatting commands on a given editor
  const execFormat = (editorRef, command, value = null) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    document.execCommand(command, false, value);
  };

  // Read HTML content safely (empty string if NA)
  const getEditorHTML = (ref, isNA) => {
    if (isNA) return "";
    const el = ref.current;
    return el ? el.innerHTML : "";
  };

  // 🔹 Save only to localStorage (no backend)
  const handleSave = async () => {
    const payload = {
      corrective_actions: getEditorHTML(correctiveRef, correctiveNA),
      preventive_actions: getEditorHTML(preventiveRef, preventiveNA),
      dept_head_review: getEditorHTML(deptHeadRef, deptHeadNA),
      corrective_na: correctiveNA,
      preventive_na: preventiveNA,
      dept_head_na: deptHeadNA,
      reviewer_remarks: reviewerRemarks,
    };

    localStorage.setItem("capaData", JSON.stringify(payload));
    console.log("✅ CAPA saved to localStorage:", payload);
    return true;
  };

  return (
    <>
      {/* CAPA tab index is 4 (0:General,1:Deviation,2:Preliminary,3:RCA,4:CAPA,5:Comments) */}
      <Navbar activeTab={4} />

      <div className="capa-container">
        {/* Corrective Actions */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Corrective Actions:</h3>
            <div className="capa-na">
              <input
                id="corrective-na"
                type="checkbox"
                checked={correctiveNA}
                onChange={(e) => setCorrectiveNA(e.target.checked)}
              />
              <label htmlFor="corrective-na">NOT APPLICABLE</label>
            </div>
          </div>

          <div className={`capa-editor ${correctiveNA ? "disabled" : ""}`}>
            <div className="capa-toolbar">
              <button
                type="button"
                title="Bold"
                onClick={() => execFormat(correctiveRef, "bold")}
              >
                B
              </button>
              <button
                type="button"
                title="Italic"
                onClick={() => execFormat(correctiveRef, "italic")}
              >
                I
              </button>
              <button
                type="button"
                title="Underline"
                onClick={() => execFormat(correctiveRef, "underline")}
              >
                U
              </button>
              <button
                type="button"
                title="Bulleted list"
                onClick={() => execFormat(correctiveRef, "insertUnorderedList")}
              >
                •
              </button>
              <button
                type="button"
                title="Numbered list"
                onClick={() => execFormat(correctiveRef, "insertOrderedList")}
              >
                1.
              </button>
            </div>

            <div
              ref={correctiveRef}
              className="capa-editor-body"
              contentEditable={!correctiveNA}
              suppressContentEditableWarning={true}
              role="textbox"
              aria-multiline="true"
              data-placeholder="Enter corrective actions..."
            />
          </div>
        </section>

        {/* Preventive Actions */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Preventive Actions:</h3>
            <div className="capa-na">
              <input
                id="preventive-na"
                type="checkbox"
                checked={preventiveNA}
                onChange={(e) => setPreventiveNA(e.target.checked)}
              />
              <label htmlFor="preventive-na">NOT APPLICABLE</label>
            </div>
          </div>

          <div className={`capa-editor ${preventiveNA ? "disabled" : ""}`}>
            <div className="capa-toolbar">
              <button
                type="button"
                title="Bold"
                onClick={() => execFormat(preventiveRef, "bold")}
              >
                B
              </button>
              <button
                type="button"
                title="Italic"
                onClick={() => execFormat(preventiveRef, "italic")}
              >
                I
              </button>
              <button
                type="button"
                title="Underline"
                onClick={() => execFormat(preventiveRef, "underline")}
              >
                U
              </button>
              <button
                type="button"
                title="Bulleted list"
                onClick={() =>
                  execFormat(preventiveRef, "insertUnorderedList")
                }
              >
                •
              </button>
              <button
                type="button"
                title="Numbered list"
                onClick={() => execFormat(preventiveRef, "insertOrderedList")}
              >
                1.
              </button>
            </div>

            <div
              ref={preventiveRef}
              className="capa-editor-body"
              contentEditable={!preventiveNA}
              suppressContentEditableWarning={true}
              role="textbox"
              aria-multiline="true"
              data-placeholder="Enter preventive actions..."
            />
          </div>
        </section>

        {/* Department Head Review Comments */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Department Head Review Comments:</h3>
            <div className="capa-na">
              <input
                id="depthead-na"
                type="checkbox"
                checked={deptHeadNA}
                onChange={(e) => setDeptHeadNA(e.target.checked)}
              />
              <label htmlFor="depthead-na">NOT APPLICABLE</label>
            </div>
          </div>

          <div className={`capa-editor ${deptHeadNA ? "disabled" : ""}`}>
            <div className="capa-toolbar">
              <button
                type="button"
                title="Bold"
                onClick={() => execFormat(deptHeadRef, "bold")}
              >
                B
              </button>
              <button
                type="button"
                title="Italic"
                onClick={() => execFormat(deptHeadRef, "italic")}
              >
                I
              </button>
              <button
                type="button"
                title="Underline"
                onClick={() => execFormat(deptHeadRef, "underline")}
              >
                U
              </button>
              <button
                type="button"
                title="Bulleted list"
                onClick={() =>
                  execFormat(deptHeadRef, "insertUnorderedList")
                }
              >
                •
              </button>
              <button
                type="button"
                title="Numbered list"
                onClick={() => execFormat(deptHeadRef, "insertOrderedList")}
              >
                1.
              </button>
            </div>

            <div
              ref={deptHeadRef}
              className="capa-editor-body"
              contentEditable={!deptHeadNA}
              suppressContentEditableWarning={true}
              role="textbox"
              aria-multiline="true"
              data-placeholder="Enter department head review comments..."
            />
          </div>
        </section>

        {/* Remarks by reviewer */}
        <div className="capa-reviewer">
          <label className="capa-label">Remarks By Reviewer:</label>
          <textarea
            className="capa-reviewer-text"
            placeholder="Enter remarks by reviewer..."
            value={reviewerRemarks}
            onChange={(e) => setReviewerRemarks(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="capa-buttons">
          {/* Save → Preliminary */}
          <button
            className="btn"
            style={{ backgroundColor: "#28a745" }}
            onClick={async () => {
              const ok = await handleSave();
              if (!ok) return;
              navigate("/comments");
            }}
          >
            Save
          </button>

          {/* Save & Exit → Review (RCA) */}
          <button
            className="btn"
            style={{ backgroundColor: "#007bff" }}
            onClick={async () => {
              const ok = await handleSave();
              if (!ok) return;
              navigate("/");
            }}
          >
            Save &amp; Exit
          </button>

          {/* Back → Evaluation Comments (no save) */}
          <button
            className="btn"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => navigate("/review")}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}

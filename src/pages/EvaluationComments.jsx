import React, { useRef, useState } from "react";
import "./EvaluationComments.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function EvaluationComments() {
  const navigate = useNavigate();

  // Editor refs
  const qaEvalRef = useRef(null);
  const impactRef = useRef(null);
  const finalRef = useRef(null);

  // NA checkboxes
  const [qaNA, setQaNA] = useState(false);
  const [impactNA, setImpactNA] = useState(false);
  const [finalNA, setFinalNA] = useState(false);

  // Designee
  const [designeeName, setDesigneeName] = useState("");

  // ---------- Formatting ----------
  const execFormat = (ref, cmd) => {
    const el = ref.current;
    if (!el) return;
    el.focus();

    setTimeout(() => {
      document.execCommand(cmd, false, null);
    }, 1);
  };

  // ---------- Toolbar Component ----------
  const Toolbar = ({ refName }) => (
    <div className="capa-toolbar">

      <button onMouseDown={(e) => e.preventDefault()}
        onClick={() => execFormat(refName, "bold")}>
        B
      </button>

      <button onMouseDown={(e) => e.preventDefault()}
        onClick={() => execFormat(refName, "italic")}>
        I
      </button>

      <button onMouseDown={(e) => e.preventDefault()}
        onClick={() => execFormat(refName, "underline")}>
        U
      </button>

      <button onMouseDown={(e) => e.preventDefault()}
        onClick={() => execFormat(refName, "insertUnorderedList")}>
        •
      </button>

      <button onMouseDown={(e) => e.preventDefault()}
        onClick={() => execFormat(refName, "insertOrderedList")}>
        1.
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="capa-container">
        {/* QA Designee */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Quality Assurance Designee Name:</h3>
          </div>

          <select
            className="qa-select"
            value={designeeName}
            onChange={(e) => setDesigneeName(e.target.value)}
          >
            <option value="">Select Name</option>
            <option value="Person A">Person A</option>
            <option value="Person B">Person B</option>
          </select>
        </section>

        {/* QA Evaluation */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Quality Assurance Evaluation Comments:</h3>

            <div className="capa-na">
              <input
                type="checkbox"
                checked={qaNA}
                onChange={(e) => setQaNA(e.target.checked)}
              />
              <label>NOT APPLICABLE</label>
            </div>
          </div>

          <div className={`capa-editor ${qaNA ? "disabled" : ""}`}>
            <Toolbar refName={qaEvalRef} />

            <div
              ref={qaEvalRef}
              className="capa-editor-body"
              contentEditable={!qaNA}
              suppressContentEditableWarning={true}
              data-placeholder="Enter QA evaluation comments..."
            ></div>
          </div>
        </section>

        {/* Impact Assessment */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Impact Assessment of the Deviation:</h3>

            <div className="capa-na">
              <input
                type="checkbox"
                checked={impactNA}
                onChange={(e) => setImpactNA(e.target.checked)}
              />
              <label>NOT APPLICABLE</label>
            </div>
          </div>

          <div className={`capa-editor ${impactNA ? "disabled" : ""}`}>
            <Toolbar refName={impactRef} />

            <div
              ref={impactRef}
              className="capa-editor-body"
              contentEditable={!impactNA}
              suppressContentEditableWarning={true}
              data-placeholder="Enter impact assessment..."
            ></div>
          </div>
        </section>

        {/* Final Evaluation */}
        <section className="capa-section">
          <div className="capa-section-header">
            <h3>Final Evaluation of Deviation by Quality Assurance Head:</h3>

            <div className="capa-na">
              <input
                type="checkbox"
                checked={finalNA}
                onChange={(e) => setFinalNA(e.target.checked)}
              />
              <label>NOT APPLICABLE</label>
            </div>
          </div>

          <div className={`capa-editor ${finalNA ? "disabled" : ""}`}>
            <Toolbar refName={finalRef} />

            <div
              ref={finalRef}
              className="capa-editor-body"
              contentEditable={!finalNA}
              suppressContentEditableWarning={true}
              data-placeholder="Enter final QA head evaluation..."
            ></div>
          </div>
        </section>

        {/* ---------- WORKING BUTTONS ---------- */}
        <div className="capa-buttons">
          <button
            className="capa-btn back"
            onClick={() => navigate("/closure")}
          >
            BACK
          </button>

          <button
            className="capa-btn save"
            onClick={() => navigate("/")}
          >
            NEXT
          </button>

          <button
            className="capa-btn exit"
            onClick={() => navigate("/")}
          >
            SAVE & EXIT
          </button>
        </div>

      </div>
    </>
  );
}
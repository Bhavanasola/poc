import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({
  tableDepartments = [],
  checkedStates = [],
  selectedDept = "",
  selectedIncident = "",
  fetchTableData,
}) => {
  const navigate = useNavigate();

  const validateFields = () => {
    if (!selectedIncident) {
      alert("⚠ Please select an Incident Type!");
      return false;
    }
    if (!selectedDept) {
      alert("⚠ Please select a Department!");
      return false;
    }
    return true;
  };

  const saveData = () => {
    const dataToSave = tableDepartments.map((dept, i) => ({
      departmentName: dept,
      isApproval: Boolean(checkedStates[i]?.approval),
      isInformed: Boolean(checkedStates[i]?.informed),
      selectedDepartment: selectedDept,
      incidentType: selectedIncident,
    }));

    localStorage.setItem("incidentData", JSON.stringify(dataToSave));
    console.log("✅ Stored in localStorage:", dataToSave);

    if (fetchTableData) fetchTableData();
  };

  const handleSave = () => {
    if (!validateFields()) return; // ✅ Stop if not filled
    saveData();
    navigate("/general-info");
  };

  const handleExit = () => {
    navigate("/");
  };

  const handleSaveAndExit = () => {
    if (!validateFields()) return; // ✅ Stop if not filled
    saveData();
    navigate("/");
  };

  return (
    <div className="action-buttons-wrapper">
      <button className="btn btn-save" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-exit" onClick={handleExit}>
        Exit
      </button>
      <button className="btn btn-save-exit" onClick={handleSaveAndExit}>
        Save & Exit
      </button>
    </div>
  );
};

export default ActionButtons;

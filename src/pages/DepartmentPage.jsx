import React, { useState, useEffect } from "react";
import Department from "../components/Department";
import DepartmentTable from "../components/DepartmentTable";
import ActionButtons from "../components/ActionButtons";
import axios from "axios";
import "./DepartmentPage.css";
import Navbar from "../components/Navbar";

const DepartmentPage = () => {
  const tableDepartments = [
    "Quality Assurance",
    "Quality Control",
    "Warehouse",
    "Regulatory Affairs",
    "Production Orals",
    "Microbiology",
    "Personnel and administration",
    "Customer",
  ];

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedIncident, setSelectedIncident] = useState("");
  const [checkedStates, setCheckedStates] = useState([]);

  const fetchTableData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/selection");
      const updatedStates = tableDepartments.map((dept) => {
        const backendDept = res.data.find(
          (d) =>
            d.department === dept &&
            d.selectedDept === (selectedDept || "") &&
            d.incidentType === (selectedIncident || "")
        );
        return backendDept
          ? {
              approval: backendDept.approval || false,
              informed: backendDept.informed || false,
            }
          : { approval: false, informed: false };
      });
      setCheckedStates(updatedStates);
    } catch (err) {
      console.error("Error fetching backend data:", err);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [selectedDept, selectedIncident]);

  return (
    <div >
      {/* ✅ Navbar occupies full width without extra margins */}
      <Navbar disableTabs={true} />

      {/* ✅ Main content — centered and aligned */}
      <div  >
        <Department
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
        />

        <DepartmentTable
          tableDepartments={tableDepartments}
          checkedStates={checkedStates}
          setCheckedStates={setCheckedStates}
          selectedDept={selectedDept}
          selectedIncident={selectedIncident}
        />

        <ActionButtons
          tableDepartments={tableDepartments}
          checkedStates={checkedStates}
          selectedDept={selectedDept}
          selectedIncident={selectedIncident}
          fetchTableData={fetchTableData}
        />
      </div>
    </div>
  );
};

export default DepartmentPage;

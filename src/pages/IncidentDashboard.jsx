import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const IncidentDashboard = () => {
  const navigate = useNavigate();

  // When "Create New Incident" is clicked — go to Departments page
  const handleCreateNewIncident = () => {
    navigate("/department");
  };

  const handleViewPending = () => {
    console.log("Navigating to View Pending Incidents...");
  };

  const handleViewRejected = () => {
    console.log("Navigating to View Rejected Incidents...");
  };

  return (
    <div style={styles.container}>
      <Navbar disableTabs={true}/>
      <h1 style={styles.title}>Incident Management Dashboard</h1>

      {/* Main Action Buttons */}
      <div style={styles.actionButtons}>
        <button
          style={{ ...styles.button, ...styles.createButton }}
          onClick={handleCreateNewIncident}
        >
          Create New Incident
        </button>
        <button style={styles.button} onClick={handleViewPending}>
          View Pending Incidents
        </button>
        <button style={styles.button} onClick={handleViewRejected}>
          View Rejected Incidents
        </button>
      </div>

      {/* Dashboard Boxes */}
      <div style={styles.overviewGrid}>
        <DashboardBox
          title="Action Required"
          content="You have 5 incidents requiring your review."
          color="#dc3545"
        />
        <DashboardBox
          title="Tickets by User Dept"
          content="Total: 125 | Open: 15"
          color="#007bff"
        />
        <DashboardBox
          title="Tickets by Other Depts"
          content="Total: 88 | Open: 9"
          color="#ffc107"
        />
      </div>
    </div>
  );
};

// Small Card Component
const DashboardBox = ({ title, content, color }) => (
  <div style={{ ...styles.box, borderLeft: `5px solid ${color}` }}>
    <h3 style={styles.boxTitle}>{title}</h3>
    <p style={styles.boxContent}>{content}</p>
  </div>
);

const styles = {
  container: {
    padding: "0px 0px",
    maxWidth: "1400px",
    margin: "0 auto",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "50px",
    color: "#333",
    fontSize: "32px", // ⬆️ bigger title text
    fontWeight: "700",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "60px",
  },
  button: {
    padding: "16px 35px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#6c757d",
    color: "#fff",
    transition: "background-color 0.2s",
  },
  createButton: {
    backgroundColor: "#28a745",
  },
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "35px",
  },
  box: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "5px",
    boxShadow: "0 6px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  boxTitle: {
    fontSize: "25px",
    marginBottom: "12px",
    color: "#555",
  },
  boxContent: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
  },
};

export default IncidentDashboard;

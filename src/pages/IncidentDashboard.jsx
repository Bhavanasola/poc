import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const IncidentDashboard = () => {
  const navigate = useNavigate();

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
    <div style={styles.page}>
      <Navbar disableTabs={true} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Incident Management Dashboard</h1>
          <p style={styles.subtitle}>
            </p>
        </div>

        {/* Main Action Buttons */}
        <div style={styles.actionSection}>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleCreateNewIncident}
          >
            + Create New Incident
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
    </div>
  );
};

// Small Card Component
const DashboardBox = ({ title, content, color }) => (
  <div style={{ ...styles.box, borderTop: `4px solid ${color}` }}>
    <h3 style={styles.boxTitle}>{title}</h3>
    <p style={styles.boxContent}>{content}</p>
  </div>
);

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fb 0%, #e4ecf7 100%)",
  },
  container: {
    maxWidth: "1200px",        // narrower so content doesn't look tiny
    margin: "0 auto",
    padding: "30px 40px 60px",
  },
  header: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "30px",
  },
  title: {
    margin: 0,
    color: "#1f2933",
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "0.03em",
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "15px",
    color: "#6b7280",
  },
  actionSection: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 24px",
    fontSize: "15px",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#374151",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    boxShadow: "0 8px 18px rgba(37, 99, 235, 0.35)",
  },
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  box: {
    backgroundColor: "#ffffff",
    padding: "22px 24px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  boxTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#111827",
    fontWeight: 600,
  },
  boxContent: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#4b5563",
  },
};

// Add simple hover effect using JS (optional – remove if not needed)
Object.assign(styles.button, {
  onMouseEnter: undefined,
  onMouseLeave: undefined,
});

export default IncidentDashboard;

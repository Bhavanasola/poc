import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ activeTab, disableTabs = false }) {
  const navigate = useNavigate();

  const tabs = [
    { name: "General Information", path: "/general-info" },
    { name: "Deviation Information", path: "/deviation" },
    { name: "Preliminary Investigation", path: "/preliminary" },
    { name: "Review & Approve", path: "/review" },
    { name: "Record Closure", path: "/closure" },
  ];

  return (
    <>
      {/* ==========================
          HEADER SECTION
      =========================== */}
      <header className="top-bar">
        <div className="title-area">
          <h1 className="record-title">
            211 - Tablet hardness for ABC Tablets (Batch No: B1000) exceeded the limit
          </h1>
          <div className="record-sub">Pending Data Review</div>
          <div className="record-sub">Created: 2025-11-06</div>
        </div>
      </header>

      {/* ==========================
          TAB NAVIGATION
      =========================== */}
      <nav className="tabs" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => !disableTabs && navigate(tab.path)}
            className={`tab 
              ${activeTab === index ? "active" : ""} 
              ${disableTabs ? "disabled" : ""}`}
            disabled={disableTabs}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ activeTab, disableTabs = false }) {
  const navigate = useNavigate();

  const tabs = [
    { name: "General Information", path: "/general-info" },
    { name: "Deviation Information", path: "/deviation" },
    { name: "Preliminary Investigation", path: "/preliminary" },
    { name: "RCA", path: "/review" },
    { name: "CAPA", path: "/closure" },
    { name: "Evaluation Comments", path: "/comments" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="top-bar">
        <div className="title-area">
          <h1 className="record-title">
            211 - Tablet hardness for ABC Tablets (Batch No: B1000) exceeded the limit
          </h1>
          <div className="record-sub">Pending Data Review</div>
          <div className="record-sub">Created: 2025-11-06</div>
        </div>
      </header>

      {/* TABS */}
      <nav className="tabs" role="tablist" aria-label="Deviation workflow steps">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;

          return (
            <button
              key={tab.name}
              type="button"
              onClick={() => !disableTabs && navigate(tab.path)}
              className={`tab ${isActive ? "active" : ""} ${
                disableTabs ? "disabled" : ""
              }`}
              disabled={disableTabs}
              role="tab"
              aria-selected={isActive}
            >
              {tab.name}
            </button>
          );
        })}
      </nav>
    </>
  );
}

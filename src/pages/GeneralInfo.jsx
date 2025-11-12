import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the API endpoint for your Flask backend's submission route.
const API_URL = 'http://127.0.0.1:5000/submit'; 

export default function GeneralInfo() { 
  const navigate = useNavigate();

  // State to track the MongoDB document ID for updates
  const [mongoId, setMongoId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- Date Formatting Logic ---
  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  const today = new Date();
  const formattedToday = formatDate(today); 
  
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 60);
  const formattedFuture = formatDate(futureDate);
  // --- End Date Formatting Logic ---

  const [fields, setFields] = useState({
    Originator: 'Sriram',
    Supervisor: 'Sridhar',
    'Quality Approver': 'Ramu',
    'Quality Reviewer': 'Ratni',
    'Date Opened': formattedToday, 
    'Original Date Due': formattedFuture,
    'Date Due': formattedFuture,
    Title: 'Tablet hardness for ABC Tablets (Batch No: B1000) exceeded the limit'
  });

  const description = [
    'Tablet hardness for ABC Tablets (Batch No: B1000) exceeded the limit'
  ];

  const handleChange = (key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
  }

  const handleSave = async () => {
    const descriptionText = description.join('\n'); 
    const batchNoMatch = fields.Title.match(/Batch No: (B\d+)/);
    const BatchNo = batchNoMatch ? batchNoMatch[1] : 'N/A';
    
    const dataToSave = {
        ...fields,
        Description: descriptionText,
        BatchNo: BatchNo,
        mongo_id: mongoId, 
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Save successful:', result);
        
        if (result.mongo_id) {
            setMongoId(result.mongo_id);
            console.log('Record ID tracked:', result.mongo_id);
        }

       console.log('Record saved successfully!');
      navigate('/deviation');


    } catch (error) {
        console.error('Save failed:', error);
        console.log('Failed to save record. Check the console and Flask terminal for errors.');
    }
    
    setIsEditing(false);
  };
  
  return (
    <>
      <style>
        {`
          /* BASE STYLES */
          body { font-family: 'Arial', sans-serif; background-color: #f0f2f5; margin: 0; }
          
          /* HEADER / TOP BAR */
          .top-bar {
            background-color: #007bff;
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .title-area {
            flex-grow: 1;
          }
          .record-title {
            font-size: 24px;
            margin: 0;
            font-weight: 600;
          }
          .record-sub {
            font-size: 14px;
            opacity: 0.8;
            margin-top: 2px;
          }

          /* TABS */
          .tabs {
            display: flex;
            background-color: #e9ecef;
            padding: 0 30px;
            border-bottom: 1px solid #dee2e6;
          }
          .tab {
            padding: 12px 20px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-weight: 500;
            color: #495057;
            border-bottom: 3px solid transparent;
            transition: all 0.2s ease;
          }
          .tab.active {
            color: #007bff;
            border-bottom-color: #007bff;
            background-color: #fff;
          }
          .tab:hover:not(.active) {
            color: #0056b3;
          }

          /* MAIN CONTENT */
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
          }

          /* INFO GRID */
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px 40px;
            margin-bottom: 20px;
          }
          .info-row {
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
          }
          .label {
            font-size: 14px;
            font-weight: 600;
            color: #6c757d;
            margin-bottom: 4px;
          }
          .value {
            font-size: 16px;
            color: #333;
            min-height: 20px; 
          }
          .edit-input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
          }
          
          /* BUTTONS */
          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s, box-shadow 0.2s;
            background-color: #28a745;
            color: white;
          }
          .btn:hover {
            background-color: #218838;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          /* DESCRIPTION */
          .desc-title {
            font-size: 18px;
            color: #333;
            margin-top: 30px;
            margin-bottom: 10px;
          }
          .description {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 15px;
            border-radius: 4px;
            line-height: 1.6;
            color: #495057;
          }
          .description p {
            margin: 0;
          }
        `}
      </style>

      <div>
        {/* Header */}
        <header className="top-bar">
          <div className="title-area">
            <h1 className="record-title">
              211 - {fields.Title}
            </h1>
            <div className="record-sub">Pending Data Review</div>
            <div className="record-sub">Created: {fields['Date Opened']}</div>
          </div>
        </header>

        {/* Tabs */}
        <nav className="tabs" role="tablist">
          {[
            'General Information',
            'Deviation Information',
            'Preliminary Investigation',
            'Review & Approve',
            'Record Closure'
          ].map((t, i) => (
            <button key={t} className={i === 0 ? 'tab active' : 'tab'}>
              {t}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="content">
          <h2 className="section-title">General Information</h2>

          <div className="info-grid">
            {Object.entries(fields).map(([label, value]) => (
              <div className="info-row" key={label}>
                <div className="label">{label}</div>
                <div className="value">
                  {isEditing ? (
                    <input
                      className="edit-input"
                      type={label.includes('Date') ? 'date' : 'text'}
                      value={value}
                      onChange={e => handleChange(label, e.target.value)}
                    />
                  ) : (
                    <span>{value || '—'}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              className="btn"
              style={isEditing ? { backgroundColor: '#dc3545', marginRight: '8px' } : {}}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                className="btn"
                onClick={handleSave}  
              >
                Save
              </button>
            )}
          </div>

          <h3 className="desc-title">Description</h3>
          <div className="description">
            {description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Bottom Buttons */}
          {/* Bottom Buttons */}
          <div
            style={{
              maxWidth: '900px',
              margin: '30px auto 0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            {/* Save → Go to Deviation Info */}
            <button
              className="btn"
              style={{ backgroundColor: '#28a745' }}
              onClick={async () => {
                await handleSave();
                 localStorage.setItem("canViewDeviation", "true"); // ✅ set flag
                navigate('/deviation'); // 👈 Goes to Deviation Info page
              }}
            >
              Save
            </button>

            {/* Save & Exit → Go to Dashboard */}
            <button
              className="btn"
              style={{ backgroundColor: '#007bff' }}
              onClick={async () => {
                await handleSave();
                navigate('/');
              }}
            >
              Save & Exit
            </button>

            {/* Exit → Go back to Department */}
            <button
              className="btn"
              style={{ backgroundColor: '#6c757d' }}
              onClick={() => navigate('/department')}
            >
              Exit
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

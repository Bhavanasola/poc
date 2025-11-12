import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IncidentDashboard from "./pages/IncidentDashboard";
import DepartmentPage from "./pages/DepartmentPage";
import GeneralInfo from "./pages/GeneralInfo";
import DeviationInfo from  "./pages/DeviationInfo"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncidentDashboard />} />
        <Route path="/department" element={<DepartmentPage />} />
        <Route path="/general-info" element={<GeneralInfo />} />
        <Route path="/deviation" element={<DeviationInfo />} />
      </Routes>
    </Router>
  );
}
export default App;

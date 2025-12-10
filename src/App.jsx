import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IncidentDashboard from "./pages/IncidentDashboard.jsx";
import DepartmentPage from "./pages/DepartmentPage.jsx";
import GeneralInfo from "./pages/GeneralInfo.jsx";
import DeviationInfo from "./pages/DeviationInfo.jsx";

import EvaluationComments from "./pages/EvaluationComments.jsx";
import Preliminary from "./pages/PreliminaryInvestigation.jsx";

// IMPORTANT: Uppercase .JSX extension
import Review from "./pages/RCA.jsx";
import CAPA from "./pages/CAPA.JSX";
function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<IncidentDashboard />} />

        {/* Department Page */}
        <Route path="/department" element={<DepartmentPage />} />

        {/* Workflow Pages */}
        <Route path="/general-info" element={<GeneralInfo />} />
        <Route path="/deviation" element={<DeviationInfo />} />
        <Route path="/preliminary" element={<Preliminary />} />
        <Route path="/review" element={<Review />} />

        {/* Closure → CAPA Page */}
        <Route path="/closure" element={<CAPA />} />
       <Route path="/comments" element={<EvaluationComments />} />

      </Routes>
    </Router>
  );
}

export default App;

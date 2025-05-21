import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Interviewer from "./pages/adminview/admin";
import InterviewSchedule from "./pages/interviewerview/interview";  

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/interview/admin" element={<Interviewer />} />
        <Route path="/interview/interviewer" element={<InterviewSchedule />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admission-criteria" element={<AdmissionCriteria />} /> */}
      </Routes>
    </Router>
  );
}


import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import AttendancePage from './pages/AttendancePage';
import AttendanceSystem from './pages/AttendanceSystem';
import TakeAttendance from './pages/TakeAttendance';
import AttendanceAnalysis from './pages/AttendanceAnalysis';
import Tasks from './pages/Tasks';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/attendance" element={<AttendanceSystem />} />
        <Route path="/attendance/take" element={<TakeAttendance />} />
        <Route path="/attendance/analysis" element={<AttendanceAnalysis />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Navbar from "./components/Navbar.jsx";
import WithAuth from "./hoc/WithAuth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Invitations from "./pages/Invitations.jsx";
import Landingpage from "./pages/Landingpage.jsx";
import Login from "./pages/Login.jsx";
import OtpVerificationPage from "./pages/OtpVerificarionPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import { MeetingForm } from "./pages/MeetingForm.jsx";

import { Routes, Route, Outlet } from "react-router-dom";
import ProfileSettingsPage from "./pages/ProfileSettingsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import MyErrorBoundary from "./components/Error-Boundary/ErrorBoundary.jsx";
import NetworkWatcher from "./components/Error-Boundary/NetworkWatcher.jsx";

function ProtectedLayout() {
  return (
    <WithAuth>
      <Navbar />
      <Outlet /> {/* All protected pages will render here */}
    </WithAuth>
  );
}

function App() {
  return (
    <>
      <MyErrorBoundary>
        <NetworkWatcher>

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OtpVerificationPage />} />

          {/* Protected routes with Navbar */}
          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/createmeeting" element={<MeetingForm />} />
            <Route path="/profileSettings" element={<ProfileSettingsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        </NetworkWatcher>
      </MyErrorBoundary>
    </>
  );
}

export default App;

import Navbar from "./components/Navbar.jsx";
import WithAuth from "./hoc/WithAuth.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import Invitations from "./pages/Invitations.jsx";
// import Landingpage from "./pages/Landingpage.jsx";
// import Login from "./pages/Login.jsx";
// import OtpVerificationPage from "./pages/OtpVerificarionPage.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import  MeetingForm  from "./pages/MeetingForm.jsx";

import { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import MeetingsInfoPage from "./pages/MeetingInfoPage.jsx";
import MyErrorBoundary from "./components/error-boundary/ErrorBoundary.jsx";
import NetworkWatcher from "./components/error-boundary/NetwrokWatcher.jsx";
// import ProfileSettingsPage from "./pages/ProfileSettingsPage.jsx";
// import SettingsPage from "./pages/SettingsPage.jsx";

//Lazy Loading
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Invitations = lazy(() => import("./pages/Invitations.jsx"));
const Landingpage = lazy(() => import("./pages/Landingpage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const OtpVerificationPage = lazy(
  () => import("./pages/OtpVerificarionPage.jsx")
);
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const MeetingForm = lazy(() => import("./pages/MeetingForm.jsx"));
const ProfileSettingsPage = lazy(
  () => import("./pages/ProfileSettingsPage.jsx")
);
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));
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

      <Suspense>
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
            <Route path="/meeting/:id" element={<MeetingsInfoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </NetworkWatcher>
    </MyErrorBoundary>
    </>
  );
}

export default App;

// import "./App.css";
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import WithAuth from './hoc/WithAuth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Invitations from './pages/Invitations.jsx';
import Landingpage from './pages/Landingpage.jsx';
import Login from './pages/Login.jsx';
import OtpVerificationPage from './pages/OtpVerificarionPage.jsx';
import SignUp from './pages/SignUp.jsx';
import { MeetingForm } from './pages/MeetingForm.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invitations" element={<Invitations />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OtpVerificationPage />} />
        <Route path="/createmeeting" element={<MeetingForm />} />
        <Route
          path="/home"
          element={
            <WithAuth>
              <Navbar />
              <Dashboard />
            </WithAuth>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light", "dark", or "colored"
      />
    </>
  );
}

export default App;

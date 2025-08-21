// import "./App.css";
import Navbar from './components/Navbar.jsx';
import OtpInput from './components/OtpInput.jsx';
import WithAuth from './hoc/WithAuth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Invitations from './pages/Invitations.jsx';
import Landingpage from './pages/Landingpage.jsx';
import Login from './pages/Login.jsx';
import OtpVerificationPage from './pages/OtpVerificarionPage.jsx';
import SignUp from './pages/SignUp.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>

     
      <Navbar/>
      

      {/* <OtpInput size={6} onSubmit={(otp) => console.log(otp)}></OtpInput> */}
      {/* <SignUp />
      <WithAuth/> */}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
          <Route path="/invitations" element={<Invitations/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<OtpVerificationPage />} />
        <Route
          path="/home"
          element={
            <WithAuth>
              <Dashboard />
            </WithAuth>
          }
        />
      </Routes>

    </>
  );
}

export default App;

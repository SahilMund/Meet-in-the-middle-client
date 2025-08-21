// import "./App.css";
import Navbar from './components/Navbar.jsx';
import OtpInput from './components/OtpInput.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Invitations from './pages/Invitations.jsx';
import Landingpage from './pages/Landingpage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <>
      <OtpInput size={4} onSubmit={(otp) => console.log(otp)}></OtpInput>
      <SignUp />
      <Login />
      <Landingpage/>
      <Navbar/>
      <Dashboard/>
      <Invitations/>
    </>
  );
}

export default App;

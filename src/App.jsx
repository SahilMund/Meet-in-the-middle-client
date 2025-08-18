
// import "./App.css";
import OtpInput from './components/OtpInput.jsx';
import Landingpage from './pages/Landingpage.jsx';
import Login from './pages/Login.jsx';
import ProfileSettingsPage from './pages/ProfileSettingsPage.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <>
      {/* <OtpInput size={4} onSubmit={(otp) => console.log(otp)}></OtpInput>
      <SignUp />
      <Login />
      <Landingpage/> */}
      <ProfileSettingsPage/>
    </>
  );
}

export default App
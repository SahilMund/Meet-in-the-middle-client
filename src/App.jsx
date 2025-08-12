
// import "./App.css";
import OtpInput from './components/OtpInput.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <>
      <OtpInput size={4} onSubmit={(otp) => console.log(otp)}></OtpInput>
      <SignUp />
      <Login />
    </>
  );
}

export default App
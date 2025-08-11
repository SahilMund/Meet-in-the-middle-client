// import "./App.css";
import OtpInput from './components/OtpInput.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <>
      <OtpInput size={4} onSubmit={(otp) => console.log(otp)}></OtpInput>
      <SignUp />
    </>
  );
}

export default App;

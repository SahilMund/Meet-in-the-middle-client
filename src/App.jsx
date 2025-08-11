// import "./App.css";
import OtpInput from "./components/OtpInput.jsx";

function App() {
  return (
    <>
      <OtpInput size={4} onSubmit={(otp) => console.log(otp)}></OtpInput>
    </>
  );
}

export default App;

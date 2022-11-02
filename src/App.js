import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/homepage";
import ThreeDeviceData from "./Components/chart";
import UploadFile from "./Components/uploadFile";
import CheckApi from "./Components/checkAPI";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/upload" element={<UploadFile />} />
          <Route exact path="/3DD" element={<ThreeDeviceData />} />
          <Route exact path="/apitest" element={<CheckApi />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

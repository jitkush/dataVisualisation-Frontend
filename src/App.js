import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/homepage";
import ThreeDeviceData from "./Components/chart";
import UploadFile from "./Components/uploadFile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/upload" element={<UploadFile />} />
          <Route exact path="/3DD" element={<ThreeDeviceData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

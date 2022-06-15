import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.css";
import Pcomment from "./components/Pcomment/Pcomment";
import Profile from "./components/Home/Profile";
import Photo from "./components/Photo/Photo";
import PhotoAdd from "./components/Photo/PhotoAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile></Profile>}></Route>
        <Route path="/Join" element={<Join></Join>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/pComment" element={<Pcomment></Pcomment>}></Route>
        <Route path="/Photo" element={<Photo></Photo>}></Route>
        <Route path="/PhotoAdd" element={<PhotoAdd></PhotoAdd>}></Route>
        <Route
          path="/PhotoUpdate"
          element={<PhotoUpdate></PhotoUpdate>}
        ></Route>
        <Route path="/MiniRoom" element={<MiniRoom></MiniRoom>}></Route>
        <Route path="/Profile" element={<Profile></Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

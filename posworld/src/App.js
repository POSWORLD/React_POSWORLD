import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.css";
import Pcomment from "./components/Pcomment/Pcomment";
import Photo from "./components/Photo/Photo";
import Home from "./components/Home/Home";
import MiniRoom from "./components/Home/MiniRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Join" element={<Join></Join>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/pComment" element={<Pcomment></Pcomment>}></Route>
        <Route path="/Photo" element={<Photo></Photo>}></Route>
        <Route path="/MiniRoom" element={<MiniRoom></MiniRoom>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

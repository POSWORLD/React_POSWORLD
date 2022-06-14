import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.css";
import Pcomment from "./components/Pcomment/Pcomment";
import Profile from "./components/Home/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile></Profile>}></Route>
        <Route path="/Join" element={<Join></Join>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/pComment" element={<Pcomment></Pcomment>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

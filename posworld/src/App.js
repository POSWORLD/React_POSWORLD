import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.css";
import PhotoAdd from "./Photo/PhotoAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Join" element={<Join></Join>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/PhotoAdd" element={<PhotoAdd></PhotoAdd>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

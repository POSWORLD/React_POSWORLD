import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import Join from "./components/Join/Join";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Join" element={<Join></Join>}></Route>
        <Route path="/Login" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

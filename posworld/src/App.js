import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './components/Join/Join';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.css';
import Pcomment from './components/Pcomment/Pcomment';
import Photo from './components/Photo/Photo';
import Home from './components/Home/Home';
import MiniRoom from './components/Home/MiniRoom';
import Profile from './components/Home/Profile';
import PhotoAdd from './components/Photo/PhotoAdd';
import PhotoUpdate from './components/Photo/PhotoUpdate';
import Boards from './components/Board/Boards';
import BoardUpdate from './components/Board/BoardUpdate';
import BoardWrite from './components/Board/BoardWrite';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/Join" element={<Join></Join>}></Route>
            <Route path="/Login" element={<Login></Login>}></Route>
            <Route path="/pComment" element={<Pcomment></Pcomment>}></Route>
            <Route path="/Photo" element={<Photo></Photo>}></Route>
            <Route path="/PhotoAdd" element={<PhotoAdd></PhotoAdd>}></Route>
            <Route path="/PhotoUpdate" element={<PhotoUpdate></PhotoUpdate>}></Route>
            <Route path="/MiniRoom" element={<MiniRoom></MiniRoom>}></Route>
            <Route path="/Profile" element={<Profile></Profile>}></Route>
            <Route path="/Board" element={<Boards></Boards>}></Route>
            <Route path="/BoardUpdate" element={<BoardUpdate></BoardUpdate>}></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Join from './components/Join/Join';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

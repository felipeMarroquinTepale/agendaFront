import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeConUser from "../pages/homeConUser";
import HomeSinUser from "../pages/homeSinUser";
import Agenda from '../pages/agenda';
import Directorio from '../pages/directorio';
import Login from '../pages/login'
import Registro from '../pages/registro'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeSinUser/>}/>
        <Route exact path="/Home" element={<HomeConUser/>}/>
        <Route exact path="/Agenda" element={<Agenda/>}/>
        <Route exact path="/Directorio" element={<Directorio/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/Registro" element={<Registro/>}

        />
      </Routes>
    </BrowserRouter>
  );
}

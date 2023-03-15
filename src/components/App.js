import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSinUser from "../pages/homeSinUser";
import HomeConUser from "../pages/homeConUser";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeSinUser/>}/>
        <Route exact path="/Home" element={<HomeConUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManageSonad from "./pages/ManageSonad";
import SonaPage from "./pages/SonaPage";
import ManageSonastikstikud from "./pages/ManageSonastikud";

function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/sonad" element={<ManageSonad />} />
        <Route path="/admin/sonastikud" element={<ManageSonastikstikud />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sona/:sonaId" element={<SonaPage />} />

        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

// key={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderdused, siis ta jätab kõik mällu v.a.
// tsükli/array sisud, sest tal pole mingit aimu, mille järgi seda meelde jätta.
// selle jaoks, et ta saaks array meelde jätta, lisame key={}

export default App;

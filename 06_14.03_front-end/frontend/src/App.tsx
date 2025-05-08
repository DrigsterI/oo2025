//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ManageSportlased from "./pages/ManageSportlased";
import ManageTulemused from "./pages/ManageTulemused";
import Tulemused from "./pages/Tulemused";

function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/sportlased" element={<ManageSportlased />} />
        <Route path="/admin/tulemused" element={<ManageTulemused />} />
        <Route path="/tulemused" element={<Tulemused />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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

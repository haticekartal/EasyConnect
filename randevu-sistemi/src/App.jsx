import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Isletme from "./pages/Isletme";
import Kaydol from "./pages/Kaydol"; // Kaydol sayfası
import Giris from "./pages/Giris"; // Giriş sayfası
import BizKimiz from "./pages/BizKimiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/isletme" element={<Isletme />} />
        <Route path="/kaydol" element={<Kaydol />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/biz-kimiz" element={<BizKimiz />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Isletme from "./pages/Isletme";
import Kaydol from "./pages/Kaydol"; // Kaydol sayfası
import Giris from "./pages/Giris"; // Giriş sayfası
import BizKimiz from "./pages/BizKimiz";
import Hizmetler from "./pages/Hizmetler"
import Özellikler from "./pages/Özellikler"
import HizmetListesi from "./pages/HizmetListesi";
import IsletmeDetay from "./pages/İsletmeDetay";
import IsletmeProfil from "./pages/İsletmeProfil";
import MyAppointments from "./pages/MyAppointments";
import IsletmeRandevular from "./pages/IsletmeRandevular";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/isletme" element={<Isletme />} />
        <Route path="/kaydol" element={<Kaydol />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/biz-kimiz" element={<BizKimiz />} />
        <Route path="/hizmetler" element={<Hizmetler />} />
        <Route path="/ozellikler" element={<Özellikler />} />
        <Route path="/hizmetlerin_listesi/:service?/:city?" element={<HizmetListesi />} />
        <Route path="/isletme/:name" element={<IsletmeDetay />} />
        <Route path="/isletmeProfil" element={<IsletmeProfil />} />
        <Route path="/Randevularim" element={<MyAppointments />} />
        <Route path="/isletme-randevular" element={<IsletmeRandevular />} />

      </Routes>
    </Router>
  );
}

export default App;
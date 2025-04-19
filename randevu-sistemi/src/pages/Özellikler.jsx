import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Özellikler.css";
import ozellik from "../assets/ozellikler-banner.png";
import ozellik1 from "../assets/ozellikler1.png";

const Özellikler = () => {
  return (
    <div className="ozellikler-container">
      <Navbar />

      {/* Başlık */}
      <div className="ozellikler-header">
        <h1>İşletmenizi Dijitalleştirin</h1>
        <p>Kolay randevu yönetimi, müşteri memnuniyeti ve daha fazlası...</p>
      </div>

      {/* Özellik Kartları */}
      <div className="ozellikler-cards">
        <div className="ozellik-card">
          <h2>📅 Online Randevu Sistemi</h2>
          <p>Müşterileriniz size online randevu alarak kolayca ulaşabilir.</p>
        </div>

        <div className="ozellik-card">
          <h2>📊 İşletme Analizleri</h2>
          <p>Müşteri verilerini inceleyerek işletmenizin performansını artırın.</p>
        </div>

        <div className="ozellik-card">
          <h2>👥 Müşteri Geri Bildirimi</h2>
          <p>Müşteri yorumlarıyla hizmet kalitenizi sürekli geliştirin.</p>
        </div>
      </div>

      {/* Tanıtım Alanı */}
      <div className="ozellikler-info">
        <div className="info-text">
          <h2>İşletmeniz İçin En İyi Çözüm</h2>
          <p>
            Randevu yönetimini kolaylaştırın, müşteri ilişkilerinizi güçlendirin ve işletmenizi bir üst seviyeye taşıyın.
            Profesyonel çözümlerimizle zaman kazanın!
          </p>
        </div>
        <div className="info-image">
          <img src={ozellik} alt="Özellikler Tanıtım" className="info-effect rounded-image" />
        </div>
      </div>

      {/* Yeni Tanıtım Alanı */}
      <div className="ozellikler-info reversed">
        <div className="info-image shifted-image">
          <img src={ozellik1} alt="Yeni Özellik Tanıtım" className="info-effect rounded-image" />
        </div>
        <div className="info-text">
          <h2>Müşterilerinizi Memnun Edin</h2>
          <p>
            Kolay erişim ve hızlı randevu ile müşterilerinizin memnuniyetini artırın.
            İstatistikleri inceleyin ve hizmet kalitenizi sürekli iyileştirin.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Özellikler;
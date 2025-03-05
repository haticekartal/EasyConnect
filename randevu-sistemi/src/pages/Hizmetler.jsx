import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Hizmetler.css";
import hizmetlerBanner from "../assets/hizmetlerbanner.png";
import hizmetlerImage from "../assets/hizmetler.svg";

const Hizmetler = () => {
  return (
    <div className="hizmetler-container">
      <Navbar />

      {/* Banner Alanı */}
      <div className="banner">
        <img src={hizmetlerBanner} alt="Hizmetler Banner" className="banner-image" />
        <div className="banner-overlay">
          <h1>Size En Uygun Hizmeti Seçin</h1>
          <p>Binlerce salon arasından arama yapın, randevunuzu hemen oluşturun.</p>
        </div>
      </div>

      {/* Açıklama Kartları */}
      <div className="hizmet-aciklamalar">
        <div className="hizmet-card">
          <h2>🔎 Hizmetleri Keşfedin</h2>
          <p>Size en uygun hizmeti bulun, detaylarını inceleyin ve kolayca randevu alın.</p>
        </div>

        <div className="hizmet-card">
          <h2>⭐ Hizmetleri Değerlendirin</h2>
          <p>Randevunuzdan sonra memnuniyetinizi belirtin, yorumlarınızı paylaşın.</p>
        </div>

        <div className="hizmet-card">
          <h2>⏳ Zamandan Tasarruf Edin</h2>
          <p>İstediğiniz saatte randevu oluşturun, değiştirin veya iptal edin.</p>
        </div>
      </div>

      {/* Yeni Görsel Alanı */}
      <div className="hizmet-ekstra">
        <div className="hizmet-text animate-text">
          <h2>Hizmet Seçimini Kolaylaştırıyoruz</h2>
          <p>
            Artık randevu almak çok daha basit! Kullanıcı dostu arayüzümüzle en iyi salonları keşfedin,
            fiyatları karşılaştırın ve anında randevunuzu oluşturun. Kaliteli hizmete hızlı erişim sağlayın!
          </p>
        </div>
        <div className="hizmet-image animate-image">
          <img src={hizmetlerImage} alt="Hizmet Görseli" className="image-effect" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Hizmetler;
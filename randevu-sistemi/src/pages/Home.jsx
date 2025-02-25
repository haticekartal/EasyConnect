import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Footer'ı dahil et
import "../styles/Home.css";
import isletmeHomepage from "../assets/isletmehomepage.png"; 
import homerandevu from "../assets/homerandevu.png"; 
import { SearchOutlined } from "@ant-design/icons"; // Ant Design Büyüteç İkonu
import { LikeOutlined, DislikeOutlined, ClockCircleOutlined } from "@ant-design/icons"; // Ant Design İkonları

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        {/* Ana Fotoğraf */}
        <img
          src={isletmeHomepage}
          alt="İşletme Homepage"
          className="homepage-img"
        />

        {/* Arama Çubuğu */}
        <div className="search-bar-container">
          <select aria-label="Hizmet seçiniz">
            <option value="">Aradığınız hizmeti seçiniz</option>
            <option value="sac-boyama">Saç Boyama</option>
            <option value="fon">Fön</option>
            <option value="sac-kesimi">Saç Kesimi</option>
          </select>

          <select aria-label="Şehir seçiniz">
            <option value="">Şehir seçiniz</option>
            <option value="istanbul">İstanbul</option>
            <option value="ankara">Ankara</option>
            <option value="izmir">İzmir</option>
          </select>

          <button>
            <SearchOutlined style={{ fontSize: "20px", color: "white" }} /> ARA
          </button>
        </div>

        {/* Yeni PNG Fotoğraf */}
        <img
          src={homerandevu}
          alt="Homerandevu"
          className="homerandevu-img"
        />

        {/* Kartlar */}
        <div className="card-container">
          {/* Birinci Kart */}
          <div className="info-card">
            <div className="card-icon">
              <SearchOutlined style={{ fontSize: "70px", color: "white" }} />
            </div>
            <h3>Salonları Arayın</h3>
            <p>
              Binlerce salon arasından arama yapın, size en uygun hizmet veren
              yerleri bulun ve randevunuzu hemen kolayca alın.
            </p>
          </div>

          {/* İkinci Kart */}
          <div className="info-card">
            <div className="card-icon">
              <LikeOutlined style={{ fontSize: "70px", color: "white" }} />
            </div>
            <h3>Hizmetleri Değerlendirin</h3>
            <p>
              Randevunuzdan sonra memnuniyetinizi alalım, herhangi bir
              memnuniyetsizliğiniz olursa ilgilenelim.
            </p>
          </div>

          {/* Üçüncü Kart */}
          <div className="info-card">
            <div className="card-icon">
              <ClockCircleOutlined style={{ fontSize: "70px", color: "white" }} />
            </div>
            <h3>Zamandan Tasarruf Edin</h3>
            <p>
              Randevunuzu istediğiniz saate göre ayarlayın ve istediğiniz
              zaman iptal ederek yeni randevu oluşturma imkanıyla tanışın.
            </p>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer'ı buraya dahil ettik */}
    </div>
  );
};

export default Home;
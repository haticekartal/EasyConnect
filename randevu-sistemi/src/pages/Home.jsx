import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
import isletmeHomepage from "../assets/isletmehomepage.png";
import homerandevu from "../assets/homerandevu.png";
import { SearchOutlined, LikeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7263/Service/GetAll")
      .then(response => {
        if (response.data.success) {
          setServices(response.data.data);
        } else {
          console.error("Hizmet listesi alınamadı.");
        }
      })
      .catch(error => {
        console.error("Hizmet verisi alınırken hata oluştu:", error);
      });

    axios.get("https://turkiyeapi.dev/api/v1/provinces")
      .then(response => {
        setCities(response.data.data);
      })
      .catch(error => {
        console.error("Şehir verisi alınırken hata oluştu:", error);
      });
  }, []);

  const handleSearch = () => {
    const selectedServiceRaw = document.querySelector('select[aria-label="Hizmet seçiniz"]').value;
    const selectedCityRaw = document.querySelector('select[aria-label="Şehir seçiniz"]').value;
  
    if (!selectedServiceRaw || !selectedCityRaw) {
      alert("Lütfen hizmet ve şehir seçiniz.");
      return;
    }
  
    const selectedService = JSON.parse(selectedServiceRaw);
    const selectedCity = JSON.parse(selectedCityRaw);
  
    navigate(`/hizmetlerin_listesi/${selectedService.id}/${selectedCity.id}`, {
      state: {
        serviceTitle: selectedService.title,
        cityName: selectedCity.name
      }
    });
  };
  

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <img src={isletmeHomepage} alt="İşletme Homepage" className="homepage-img" />

        <div className="search-bar-container">
        <select aria-label="Hizmet seçiniz">
  <option value="">Aradığınız hizmeti seçiniz</option>
  {services.map(service => (
    <option key={service.id} value={JSON.stringify({ id: service.id, title: service.title })}>
      {service.title}
    </option>
  ))}
</select>

          <select aria-label="Şehir seçiniz">
  <option value="">Şehir seçiniz</option>
  {cities.map(city => (
    <option key={city.id} value={JSON.stringify({ id: city.id, name: city.name })}>
      {city.name}
    </option>
  ))}
</select>

          <button onClick={handleSearch}>
            <SearchOutlined style={{ fontSize: "20px", color: "white" }} /> ARA
          </button>
        </div>

        <img src={homerandevu} alt="Homerandevu" className="homerandevu-img" />

        <div className="card-container">
          <div className="info-card">
            <div className="card-icon">
              <SearchOutlined style={{ fontSize: "70px", color: "white" }} />
            </div>
            <h3>Salonları Arayın</h3>
            <p>Binlerce salon arasından arama yapın...</p>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <LikeOutlined style={{ fontSize: "70px", color: "white" }} />
            </div>
            <h3>Hizmetleri Değerlendirin</h3>
            <p>Randevunuzdan sonra memnuniyetinizi alalım...</p>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <ClockCircleOutlined style={{ fontSize: "70px", color: "white" }} />
            </div>
            <h3>Zamandan Tasarruf Edin</h3>
            <p>Randevunuzu istediğiniz saate göre ayarlayın...</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

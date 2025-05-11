import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Card, Rate } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HizmetListesi.css";
import fotoDeneme from "../assets/salon.png";


const HizmetListesi = () => {
  const { service, city } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ burada olmalı

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceTitle = location.state?.serviceTitle || "Hizmet";
  const cityName = location.state?.cityName || "Şehir";

  useEffect(() => {
    const sid = parseInt(service);
    const pid = parseInt(city);

    console.log("service param:", service);
    console.log("city param:", city);
    console.log("parsed sid:", sid);
    console.log("parsed pid:", pid);

    if (isNaN(sid) || isNaN(pid) || sid <= 0 || pid <= 0) {
      console.warn("Geçersiz service veya city parametresi");
      setLoading(false);
      return;
    }


    const fetchData = async () => {


      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5160/Business/GetListForServiceAndProvince/${sid}/${pid}`
        );
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("API hatası:", error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service, city]);

  return (
    <div className="hizmet-listesi-container">
      <Navbar />
      <h2 className="page-title">
        {cityName} şehrindeki "{serviceTitle}" hizmeti veren yerler
      </h2>

      <div className="card-wrapper">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : businesses.length > 0 ? (
          businesses.map((item, index) => (
            <Card
              key={index}
              className="salon-card"
              hoverable
              onClick={() =>
                navigate(`/isletme/${item.businessName.replace(/\s+/g, "-")}`, {
                  state: item,
                })
              }
              cover={
                <img
                  className="salon-image"
                  alt={item.businessName}
                  src={fotoDeneme}
                />
              }
            >
              <h3>{item.businessName}</h3>
              <p>{item.address}</p>
              <Rate disabled allowHalf defaultValue={4.5} />
              <p className="price">Fiyat bilgisi yok</p>
            </Card>
          ))
        ) : (
          <p className="no-result">
            Maalesef bu şehirde bu hizmet için işletme bulunamadı.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HizmetListesi;

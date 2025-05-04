import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Card, Rate } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HizmetListesi.css";
import fotoDeneme from "../assets/salon.png";


const HizmetListesi = () => {
  const { serviceId, provinceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ burada olmalı

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceTitle = location.state?.serviceTitle || "Hizmet";
  const cityName = location.state?.cityName || "Şehir";

  useEffect(() => {
    const sid = parseInt(serviceId);
    const pid = parseInt(provinceId);

    if (!sid || !pid) {
      console.warn("Geçersiz serviceId veya provinceId");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7263/Business/GetListForServiceAndProvince/${sid}/${pid}`
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
  }, [serviceId, provinceId]);

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

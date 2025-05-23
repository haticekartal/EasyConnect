// ✅ Güncellenmiş `HizmetListesi.jsx`
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HizmetListesi.css";
import fotoDeneme from "../assets/salon.png";

const HizmetListesi = () => {
  const { service, city } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceTitle = location.state?.serviceTitle || "Hizmet";
  const cityName = location.state?.cityName || "Şehir";
  const mode = location.state?.mode || "service";
  const salonAdi = query.get("salon");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5160/Business/GetAll");
        const result = await response.json();

        if (result.success) {
          let filtered = [];
          if (mode === "service") {
            const sid = parseInt(service);
            const pid = parseInt(city);
            filtered = result.data.filter(
              (b) => b.categoryId === sid && b.provinceCode === pid
            );
          } else if (mode === "name" && salonAdi) {
            filtered = result.data.filter((b) =>
              b.businessName.toLowerCase().includes(salonAdi.toLowerCase())
            );
          }
          setBusinesses(filtered);
        } else {
          console.warn("Veri alınamadı:", result.message);
          setBusinesses([]);
        }
      } catch (error) {
        console.error("API hatası:", error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service, city, mode, salonAdi]);

  return (
    <div className="hizmet-listesi-container">
      <Navbar />
      <h2 className="page-title">
        {mode === "service"
          ? `${cityName} Şehrindeki "${serviceTitle}" Hizmeti Veren Yerler`
          : `"${salonAdi}" isimli salonlar`}
      </h2>

      <div className="card-wrapper">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : Array.isArray(businesses) && businesses.length > 0 ? (
          businesses.map((item, index) => (
            <Card
              key={index}
              className="salon-card horizontal-card"
              hoverable
              onClick={() =>
                navigate(`/isletme/${item.businessName?.replace(/\s+/g, "-")}`, {
                  state: item,
                })
              }
            >
              <div className="card-content">
                <div className="card-image">
                  <img
                    className="salon-image"
                    alt={item.businessName || "İşletme"}
                    src={
                      item.imageData
                        ? `data:image/jpeg;base64,${item.imageData}`
                        : fotoDeneme
                    }
                  />
                </div>
                <div className="card-info">
                  <h3>{item.businessName}</h3>
                  <p>{item.address}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="no-result">Sonuç bulunamadı.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HizmetListesi;

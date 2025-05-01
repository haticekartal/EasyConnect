import React from "react";
import { useParams } from "react-router-dom";
import { Card, Rate } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HizmetListesi.css";
import fotoDeneme from "../assets/salon.png"
import { useNavigate } from "react-router-dom";
const HizmetListesi = () => {
  const { service, city } = useParams();
  const navigate = useNavigate();

  // Örnek veri
  const hizmetler = [
    {
      name: "Bloom Hair Lounge",
      rating: 4.9,
      address: "Sur Yapı Marka AVM Odunluk Mah Akademi Cad No:6 A/3 Nilüfer Bursa",
      price: 800,
      image: fotoDeneme,
      city: "bursa",
      service: "sac-boyama",
      phone: "(0850) 308 25 91",
      services: [
        { name: "Saç Kesimi", price: 400 },
        { name: "Manikür", price: 300 },
        { name: "Fön", price: 450 },
        { name: "Saç Bakımı", price: 700 },
        { name: "Profesyonel Makyaj", price: 1500 },
      ],
      images: [
        fotoDeneme,
        fotoDeneme,
        fotoDeneme,
      ],
      workingHours: {
        Pazartesi: "10:00–20:00",
        Salı: "10:00–20:00",
        Çarşamba: "10:00–20:00",
        Perşembe: "10:00–20:00",
        Cuma: "10:00–20:00",
        Cumartesi: "10:00–20:00",
        Pazar: "10:00–20:00",
      },
      staff: ["Hatice Kartal", "Ali Ürdem"]
    },
    {
      name: "Piel Clara Beauty Aesthetics",
      rating: 4.1,
      address: "Dumlupınar Mah. Pamukkale Cad. No:21 Kat:6 Görükle Nilüfer Bursa",
      price: 600,
      image: fotoDeneme,
      city: "bursa",
      service: "sac-boyama",
      phone: "(0850) 456 12 34",
      services: [
        { name: "Saç Boyama", price: 600 },
        { name: "Kaş Tasarımı", price: 250 },
      ],
      images: [
        fotoDeneme,
        fotoDeneme,
        fotoDeneme
      ],
      workingHours: {
        Pazartesi: "10:00–19:00",
        Salı: "10:00–19:00",
        Çarşamba: "10:00–19:00",
        Perşembe: "10:00–19:00",
        Cuma: "10:00–19:00",
        Cumartesi: "10:00–18:00",
        Pazar: "Kapalı",
      },
      staff: ["Zeynep Çelik", "Melisa Kuru"]
    },
    {
      name: "Haircut Masters",
      rating: 4.7,
      address: "Kadıköy, İstanbul",
      price: 750,
      image: fotoDeneme,
      city: "istanbul",
      service: "sac-kesimi",
      phone: "(0212) 789 00 00",
      services: [
        { name: "Saç Kesimi", price: 750 },
        { name: "Sakal Tıraşı", price: 300 },
      ],
      images: [
        fotoDeneme,
        "/images/salon3-alt1.jpg"
      ],
      workingHours: {
        Pazartesi: "09:00–21:00",
        Salı: "09:00–21:00",
        Çarşamba: "09:00–21:00",
        Perşembe: "09:00–21:00",
        Cuma: "09:00–21:00",
        Cumartesi: "09:00–20:00",
        Pazar: "Kapalı",
      },
      staff: ["Kaan Yıldırım", "Mert Aydoğan"]
    },
  ];
  

  // Filtrele: küçük-büyük harf duyarsız
  const filtered = hizmetler.filter((item) =>
    item.city.toLowerCase() === city.toLowerCase() &&
    item.service.toLowerCase() === service.toLowerCase()
  );

  return (
    <div className="hizmet-listesi-container">
      <Navbar />
      <h2 className="page-title">
        {service} hizmeti veren yerler - {city}
      </h2>

      <div className="card-wrapper">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <Card
              key={index}
              className="salon-card"
              hoverable
              onClick={() => navigate(`/isletme/${item.name.replace(/\s+/g, "-")}`, { state: item })}
              cover={<img className="salon-image" alt={item.name} src={item.image} />}
            >
              <h3>{item.name}</h3>
              <p>{item.address}</p>
              <Rate disabled allowHalf defaultValue={item.rating} />
              <p className="price">{item.price} TL'den başlayan fiyatlarla</p>
            </Card>
          ))
        ) : (
          <p className="no-result">
            Maalesef {city} şehrinde "{service}" hizmeti bulunamadı.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HizmetListesi;

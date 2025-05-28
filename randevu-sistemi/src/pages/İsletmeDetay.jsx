import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StaffList from "../components/StaffList";
import "../styles/IsletmeDetay.css";
import { Modal, Select, TimePicker, DatePicker, message, Rate } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import CreateAppointment from "../components/CreateAppointment";
import CommentSection from "../components/CommentSection";

const { Option } = Select;

const days = [
  "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"
];

const IsletmeDetay = () => {
  const { name } = useParams();
  const { state: salon } = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [salonId, setSalonId] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!salon?.userId) return;

    axios
      .get(`http://localhost:5160/business/get-by-user/${salon.userId}`)
      .then((res) => {
        const id = res.data.id;
        setSalonId(id);

        axios.get("http://localhost:5160/staff/getall").then((res2) => {
          const filtered = res2.data.data.filter(
            (s) => s.businessProfileId === id
          );
          setStaffList(filtered);
        });

        axios
          .get(`http://localhost:5160/Business/GetServicesForBusinessProfile/${id}`)
          .then((res3) => {
            setServiceList(res3.data.data || []);
          });

        axios
          .get(`http://localhost:5160/WorkingHour/GetByBusinessProfileId/${id}`)
          .then((res4) => {
            setWorkingHours(res4.data.data || []);
          });

        // Ortalama puanı çek
        axios.get(`http://localhost:5160/Comment/get-by-business/${id}`)
          .then((res) => {
            const yorumlar = res.data.data;
            if (yorumlar.length > 0) {
              const toplam = yorumlar.reduce((sum, y) => sum + y.rating, 0);
              setAverageRating(toplam / yorumlar.length);
            } else {
              setAverageRating(0);
            }
          });
      })
      .catch((err) => {
        console.error("Salon ID alınamadı:", err);
      });
  }, [salon?.userId]);

  const handleRandevuAl = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleOnayla = () => {
    if (!selectedDate || !selectedTime || !selectedStaff || !selectedService) {
      message.error("Lütfen tarih, saat, personel ve hizmet seçiniz.");
      return;
    }

    message.success("Randevunuz başarıyla alındı!");
    setModalOpen(false);

    setSelectedStaff(null);
    setSelectedTime(null);
    setSelectedDate(null);
    setSelectedService(null);
  };

  if (!salon) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Salon bilgisi bulunamadı. Lütfen hizmet listesinden erişiniz.
        </h2>
        <Footer />
      </div>
    );
  }

  return (
    <div className="isletme-detay-container">
      <Navbar />
      <div className="business-box">
        {/* SOL TARAF */}
        <div className="left-side">
          <h2>{salon.businessName}</h2>
          {averageRating > 0 && (
            <div style={{ marginTop: 5 }}>
              <span style={{ fontWeight: "500", fontSize: 14 }}>Puan:</span>{" "}
              <span style={{ fontSize: 16 }}>
                <Rate allowHalf disabled value={averageRating} /> ({averageRating.toFixed(1)})
              </span>
            </div>
          )}

          <img
            src={
              salon.imageData
                ? `data:image/jpeg;base64,${salon.imageData}`
                : "https://via.placeholder.com/600x300?text=Fotoğraf+Yok"
            }
            alt="Ana Fotoğraf"
            className="main-img"
          />

          <div className="hours-box">
            <h3>Çalışma Saatleri</h3>
            {workingHours.length > 0 ? (
              workingHours
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                .map((item) => (
                  <p key={item.id}>
                    {days[item.dayOfWeek]}: {item.startTime.slice(0, 5)} - {item.endTime.slice(0, 5)}
                  </p>
                ))
            ) : (
              <p>Bilgi bulunamadı.</p>
            )}
          </div>
        </div>

        {/* SAĞ TARAF */}
        <div className="right-side">
          <div className="hizmetler">
            <h3>Hizmetler</h3>
            {serviceList.length > 0 ? (
              serviceList.map((s, i) => (
                <p key={i}>
                  {s.title} - <b>{s.price} TL</b>
                </p>
              ))
            ) : (
              <p>Hizmet bilgisi bulunamadı.</p>
            )}
          </div>

          <button className="randevu-btn" onClick={handleRandevuAl}>
            Randevu Al
          </button>

          <div className="contact-info">
            <p><b>📞 Telefon:</b> {salon.phone || "Bilinmiyor"}</p>
            <p><b>📍 Adres:</b> {salon.address}</p>
          </div>

          <div className="staff-box">
            <h3>Personeller</h3>
            {salonId ? <StaffList businessId={salonId} /> : <p>Yükleniyor...</p>}
          </div>
        </div>
      </div>
      <CommentSection businessId={salonId} />
      <Footer />

      {/* MODAL - RANDEVU */}
      {salonId && (
        <CreateAppointment
          open={modalOpen}
          onClose={handleModalClose}
          salonId={salonId}
          staffList={staffList}
          serviceList={serviceList}
          userId={localStorage.getItem("userId")}
        />
      )}
    </div>
  );
};

export default IsletmeDetay;
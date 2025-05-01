import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/IsletmeDetay.css";
import { Modal, Select, TimePicker, DatePicker, message } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const IsletmeDetay = () => {
  const { name } = useParams();
  const { state: salon } = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

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

  const handleRandevuAl = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleOnayla = () => {
    if (!selectedDate || !selectedTime || !selectedStaff || !selectedService) {
      message.error("Lütfen tarih, saat, personel ve hizmet seçiniz.");
      return;
    }

    console.log("📅 Tarih:", selectedDate.format("YYYY-MM-DD"));
    console.log("⏰ Saat:", selectedTime.format("HH:mm"));
    console.log("👤 Personel:", selectedStaff);
    console.log("💇 Hizmet:", selectedService);

    message.success("Randevunuz başarıyla alındı!");
    setModalOpen(false);

    // Seçimleri sıfırla
    setSelectedStaff(null);
    setSelectedTime(null);
    setSelectedDate(null);
    setSelectedService(null);
  };

  return (
    <div className="isletme-detay-container">
      <Navbar />
      <div className="business-box">
        {/* SOL TARAF */}
        <div className="left-side">
          <h2>{salon.name}</h2>
          <p>⭐ {salon.rating}</p>
          <img src={salon.image} alt="Ana Fotoğraf" className="main-img" />

          {salon.images && salon.images.length > 1 && (
            <div className="sub-images">
              {salon.images.map((img, i) => (
                <img key={i} src={img} alt={`galeri-${i}`} />
              ))}
            </div>
          )}

          <div className="hours-box">
            <h3>Çalışma Saatleri</h3>
            {salon.workingHours
              ? Object.entries(salon.workingHours).map(([gun, saat]) => (
                  <p key={gun}>
                    {gun}: {saat}
                  </p>
                ))
              : <p>Bilgi bulunamadı.</p>}
          </div>
        </div>

        {/* SAĞ TARAF */}
        <div className="right-side">
          <div className="hizmetler">
            <h3>Hizmetler</h3>
            {salon.services && salon.services.length > 0 ? (
              salon.services.map((s, i) => (
                <p key={i}>
                  {s.name} - <b>{s.price} TL</b>
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
            {salon.staff && salon.staff.length > 0 ? (
              salon.staff.map((p, i) => <p key={i}>👤 {p}</p>)
            ) : (
              <p>Personel bilgisi bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* MODAL - RANDEVU */}
      <Modal
        title="Randevu Oluştur"
        open={modalOpen}
        onCancel={handleModalClose}
        onOk={handleOnayla}
        okText="Onayla"
        cancelText="Vazgeç"
      >
        {/* Tarih seçimi */}
        <div style={{ marginBottom: 20 }}>
          <label>Tarih Seç:</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(date) => setSelectedDate(date)}
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </div>

        {/* Saat seçimi */}
        <div style={{ marginBottom: 20 }}>
          <label>Saat Seç:</label>
          <TimePicker
            use12Hours={false}
            format="HH:mm"
            onChange={(time) => setSelectedTime(time)}
            style={{ width: "100%" }}
            minuteStep={15}
          />
        </div>

        {/* Hizmet seçimi */}
        <div style={{ marginBottom: 20 }}>
          <label>Hizmet Seç:</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Hizmet seçiniz"
            onChange={(value) => setSelectedService(value)}
          >
            {salon.services.map((s, i) => (
              <Option key={i} value={s.name}>
                {s.name} - {s.price} TL
              </Option>
            ))}
          </Select>
        </div>

        {/* Personel seçimi */}
        <div style={{ marginBottom: 0 }}>
          <label>Personel Seç:</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Personel seçiniz"
            onChange={(value) => setSelectedStaff(value)}
          >
            {salon.staff.map((person, i) => (
              <Option key={i} value={person}>
                {person}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default IsletmeDetay;

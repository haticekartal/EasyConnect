import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Typography, Spin, message } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dayjs from "dayjs";

const { Title } = Typography;

const IsletmeRandevular = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchAppointments = async () => {
      try {
        // ✅ 1. İşletme ID’sini al
        const businessRes = await axios.get(
          `http://localhost:5160/business/get-by-user/${userId}`
        );
        const businessId = businessRes.data.id;

        // ✅ 2. Randevular, hizmetler ve personelleri paralel al
        const [appointmentsRes, servicesRes, staffRes] = await Promise.all([
          axios.get("http://localhost:5160/Appointment/GetAll"),
          axios.get("http://localhost:5160/Service/GetAll"),
          axios.get("http://localhost:5160/Staff/GetAll"),
        ]);

        const allAppointments = appointmentsRes.data.data;
        const allServices = servicesRes.data.data;
        const allStaff = staffRes.data.data;

        // ✅ 3. Filtrele ve zenginleştir: serviceTitle & staffName
        const myAppointments = allAppointments
          .filter((a) => a.businessProfileId === businessId)
          .map((appt) => {
            const matchedService = allServices.find((s) => s.id === appt.serviceId);
            const matchedStaff = allStaff.find((s) => s.id === appt.staffId);

            return {
              ...appt,
              serviceTitle: matchedService?.title || "Bilinmiyor",
              staffName: matchedStaff?.fullName || "Bilinmiyor",
            };
          });

        setAppointments(myAppointments);
      } catch (error) {
        console.error("❌ Randevu çekme hatası:", error);
        message.error("Randevular alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const columns = [
    {
      title: "Müşteri",
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "Hizmet",
      dataIndex: "serviceTitle",
      key: "serviceTitle",
    },
    {
      title: "Personel",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Tarih",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) => dayjs(date).format("DD MMMM YYYY"),
    },
    {
      title: "Saat",
      dataIndex: "appointmentDate",
      key: "appointmentTime",
      render: (date) => dayjs(date).format("HH:mm"),
    },
  ];

  return (
    <div>
      <Navbar />
      <div style={{ padding: "100px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <Title level={3}>İşletmenize Gelen Randevular</Title>
        {loading ? (
          <Spin tip="Yükleniyor..." />
        ) : (
          <Table
            dataSource={appointments}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 6 }}
            locale={{ emptyText: "Henüz bir randevu alınmamış." }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IsletmeRandevular;

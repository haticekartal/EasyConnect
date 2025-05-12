import React, { useEffect, useState } from "react";
import { Table, Tag, Typography, Spin, Button, Popconfirm, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const { Title } = Typography;

const statusMap = {
    0: { text: "Bekliyor", color: "gold" },
    1: { text: "Onaylandı", color: "green" },
    2: { text: "Reddedildi", color: "red" }
};

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    const fetchAppointments = () => {
        setLoading(true);
        axios
            .get(`http://localhost:5160/Appointment/GetByUserId/${userId}`)
            .then((res) => {
                const appointments = res.data.data;
                return Promise.all(
                    appointments.map(async (a) => {
                        const [staffRes, serviceRes, businessRes] = await Promise.all([
                            axios.get(`http://localhost:5160/Staff/${a.staffId}`),
                            axios.get(`http://localhost:5160/Service/${a.serviceId}`),
                            axios.get(`http://localhost:5160/Business/${a.businessProfileId}`)
                        ]);
                        return {
                            ...a,
                            staff: staffRes.data.data,
                            service: serviceRes.data.data,
                            business: businessRes.data.data
                        };
                    })
                );
            })
            .then((fullDetails) => {
                setAppointments(fullDetails);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Randevular alınamadı:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (userId) {
            fetchAppointments();
        }
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5160/Appointment/${id}`);
            message.success("Randevu silindi.");
            fetchAppointments(); // yeniden listele
        } catch (error) {
            console.error("Silme hatası:", error);
            message.error("Randevu silinemedi.");
        }
    };

    const columns = [
        {
            title: "İşletme",
            dataIndex: ["business", "businessName"],
            render: (_, record) => record.business?.businessName || "-"
        },
        {
            title: "Tarih",
            dataIndex: "appointmentDate",
            render: (val) => dayjs(val).format("DD MMMM YYYY - HH:mm")
        },
        {
            title: "Hizmet",
            dataIndex: ["service", "title"],
            render: (_, record) => record.service?.title || "-"
        },
        {
            title: "Personel",
            dataIndex: ["staff", "fullName"],
            render: (_, record) => record.staff?.fullName || "-"
        },
        {
            title: "Durum",
            dataIndex: "status",
            render: (status) => {
                const tag = statusMap[status] || { text: "Bilinmiyor", color: "default" };
                return <Tag color={tag.color}>{tag.text}</Tag>;
            }
        },
        {
            title: "İşlem",
            dataIndex: "id",
            render: (id) => (
                <Popconfirm
                    title="Bu randevuyu silmek istediğinizden emin misiniz?"
                    onConfirm={() => handleDelete(id)}
                    okText="Evet"
                    cancelText="Hayır"
                >
                    <Button danger>Sil</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div style={{ padding: 24 }}>
            <Navbar/>
            <Title level={3}>Randevularım</Title>
            {loading ? <Spin /> : <Table columns={columns} dataSource={appointments} rowKey="id" />}
            <Footer/>
        </div>
    );
};

export default MyAppointments;

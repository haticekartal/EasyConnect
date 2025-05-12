import React, { useEffect, useState } from "react";
import { TimePicker, Button, Select, message, Divider, Alert, Table, Popconfirm } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const days = [
    { label: "Pazar", value: 0 },
    { label: "Pazartesi", value: 1 },
    { label: "Salı", value: 2 },
    { label: "Çarşamba", value: 3 },
    { label: "Perşembe", value: 4 },
    { label: "Cuma", value: 5 },
    { label: "Cumartesi", value: 6 },
];

const WorkingHourForm = ({ businessId }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [success, setSuccess] = useState(false);
    const [hours, setHours] = useState([]);

    const fetchHours = () => {
        axios.get("http://localhost:5160/WorkingHour/GetAll")
            .then(res => {
                const filtered = res.data.data.filter(x => x.businessProfileId === businessId);
                setHours(filtered);
            });
    };

    useEffect(() => {
        fetchHours();
    }, [businessId]);

    const handleSave = () => {
        if (!selectedDay || !startTime || !endTime) {
            message.warning("Lütfen gün, başlangıç ve bitiş saatini seçiniz.");
            return;
        }

        const payload = {
            id: 0,
            businessProfileId: businessId,
            dayOfWeek: selectedDay,
            startTime: startTime.format("HH:mm:ss"),
            endTime: endTime.format("HH:mm:ss")
        };

        axios.post("http://localhost:5160/WorkingHour/Upsert", payload)
            .then(() => {
                setSuccess(true);
                setSelectedDay(null);
                setStartTime(null);
                setEndTime(null);
                fetchHours();
                setTimeout(() => setSuccess(false), 3000);
            })
            .catch(() => {
                message.error("Kayıt sırasında bir hata oluştu.");
            });
    };

    const handleDelete = (id) => {
    axios.delete(`http://localhost:5160/WorkingHour/${id}`)
        .then(() => {
            message.success("Çalışma günü başarıyla kaldırıldı.");
            fetchHours();
        })
        .catch(() => {
            message.error("Silme işlemi başarısız.");
        });
};


    const columns = [
        {
            title: "Gün",
            dataIndex: "dayOfWeek",
            render: val => days.find(d => d.value === val)?.label || "-"
        },
        {
            title: "Başlangıç",
            dataIndex: "startTime"
        },
        {
            title: "Bitiş",
            dataIndex: "endTime"
        },
        {
            title: "İşlem",
            render: (_, record) => (
                <Popconfirm title="Silmek istediğinize emin misiniz?" onConfirm={() => handleDelete(record.id)}>
                    <Button danger>Kaldır</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
            <Divider>Çalışma Saatleri</Divider>

            {success && (
                <Alert
                    message="Çalışma saati başarıyla kaydedildi."
                    type="success"
                    showIcon
                    closable
                    style={{ marginBottom: 16 }}
                />
            )}

            <Select
                placeholder="Gün Seç"
                value={selectedDay}
                onChange={setSelectedDay}
                style={{ width: "100%", marginBottom: 16 }}
            >
                {days.map((day) => (
                    <Option key={day.value} value={day.value}>
                        {day.label}
                    </Option>
                ))}
            </Select>

            <TimePicker
                format="HH:mm"
                value={startTime}
                onChange={setStartTime}
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Başlangıç Saati"
            />

            <TimePicker
                format="HH:mm"
                value={endTime}
                onChange={setEndTime}
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Bitiş Saati"
            />

            <Button type="primary" block onClick={handleSave}>
                Kaydet
            </Button>

            <Divider>Mevcut Saatler</Divider>
            <Table dataSource={hours} columns={columns} rowKey="id" pagination={false} />
        </div>
    );
};

export default WorkingHourForm;

import React, { useEffect, useState } from "react";
import { Modal, DatePicker, TimePicker, Select, message, Alert } from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Option } = Select;

const CreateAppointment = ({ open, onClose, salonId, staffList, serviceList }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const userId = JSON.parse(localStorage.getItem("user"))?.userId;

    useEffect(() => {
        if (!salonId) return;

        axios.get("http://localhost:5160/WorkingHour/GetAll").then((res) => {
            const filtered = res.data.data.filter((x) => x.businessProfileId === salonId);
            setWorkingHours(filtered);
        });

        axios.get("http://localhost:5160/Appointment/GetAll").then((res) => {
            setAppointments(res.data.data);
        });
    }, [salonId]);

    const getDisabledHours = () => {
        if (!selectedDate) return [];

        const day = dayjs(selectedDate).day();
        const dayInfo = workingHours.find(w => w.dayOfWeek === day);
        if (!dayInfo) return Array.from({ length: 24 }, (_, i) => i);

        const now = dayjs();
        const isToday = dayjs(selectedDate).isSame(now, "day");
        const earliestAllowed = now.add(30, "minute");

        const startHour = parseInt(dayInfo.startTime.split(":")[0], 10);
        const endHour = parseInt(dayInfo.endTime.split(":")[0], 10);

        return Array.from({ length: 24 }, (_, hour) => {
            const time = dayjs(selectedDate).hour(hour);
            if (hour < startHour || hour >= endHour) return hour;
            if (isToday && time.isBefore(earliestAllowed, "hour")) return hour;
            return null;
        }).filter(x => x !== null);
    };

    const handleSave = () => {
        setErrorMessage(null);

        if (!selectedDate || !selectedTime || !selectedService || !selectedStaff) {
            setErrorMessage("Lütfen tüm alanları doldurunuz.");
            return;
        }

        const service = serviceList.find(s => s.title === selectedService);
        const staff = staffList.find(s => s.fullName === selectedStaff);

        if (!service || !staff) return;

        const duration = service.duration;
        const appointmentDate = dayjs(selectedDate)
            .hour(selectedTime.hour())
            .minute(selectedTime.minute())
            .second(0)
            .format("YYYY-MM-DDTHH:mm:ss");

        const isBusy = appointments.some(
            a =>
                a.staffId === staff.id &&
                dayjs(a.appointmentDate).isSame(appointmentDate, "minute")
        );

        if (isBusy) {
            setErrorMessage("Bu personel seçilen saatte meşgul.");
            return;
        }

        const payload = {
            id: 0,
            businessProfileId: salonId,
            staffId: staff.id,
            serviceId: service.id,
            userId: userId,
            appointmentDate,
            duration,
            customerPhone: "-",
            status: 0
        };

        console.log("📦 Gönderilen Randevu Payload:", payload);

        axios.post("http://localhost:5160/Appointment", payload)
            .then(() => {
                message.success("Randevu başarıyla alındı!");
                onClose();
                setSelectedDate(null);
                setSelectedTime(null);
                setSelectedService(null);
                setSelectedStaff(null);
                setErrorMessage(null);
            })
            .catch(err => {
                const errorMsg = err.response?.data?.message || "Bir hata oluştu.";
                console.error("🛑 POST Appointment Hatası:", err.response?.data || err.message);
                setErrorMessage(errorMsg);
            });
    };

    return (
        <Modal
            title="Randevu Oluştur"
            open={open}
            onCancel={() => {
                onClose();
                setErrorMessage(null);
            }}
            footer={
                userId ? (
                    [
                        <button key="cancel" onClick={onClose} className="ant-btn">
                            Vazgeç
                        </button>,
                        <button key="ok" onClick={handleSave} className="ant-btn ant-btn-primary">
                            Onayla
                        </button>
                    ]
                ) : (
                    <Alert
                        message="Randevu oluşturmak için lütfen giriş yapınız."
                        type="warning"
                        showIcon
                        style={{ marginBottom: 0, width: "100%" }}
                    />
                )
            }
        >
            {errorMessage && (
                <Alert
                    message={errorMessage}
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <div style={{ marginBottom: 16 }}>
                <label>Tarih Seç:</label>
                <DatePicker
                    style={{ width: "100%" }}
                    onChange={setSelectedDate}
                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <label>Saat Seç:</label>
                <TimePicker
                    use12Hours={false}
                    format="HH:mm"
                    minuteStep={15}
                    style={{ width: "100%" }}
                    onChange={setSelectedTime}
                    disabledHours={getDisabledHours}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <label>Hizmet Seç:</label>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Hizmet seçiniz"
                    onChange={setSelectedService}
                >
                    {serviceList.map((s) => (
                        <Option key={s.id} value={s.title}>
                            {s.title} - {s.price} TL
                        </Option>
                    ))}
                </Select>
            </div>

            <div>
                <label>Personel Seç:</label>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Personel seçiniz"
                    onChange={setSelectedStaff}
                >
                    {staffList.map((p) => (
                        <Option key={p.id} value={p.fullName}>
                            {p.fullName}
                        </Option>
                    ))}
                </Select>
            </div>
        </Modal>
    );
};

export default CreateAppointment;

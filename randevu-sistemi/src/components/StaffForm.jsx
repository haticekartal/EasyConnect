// StaffForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, message, Table, Popconfirm } from "antd";
import "../styles/StaffForm.css";

const StaffForm = ({ businessId }) => {
    const [name, setName] = useState("");
    const [staffList, setStaffList] = useState([]);

    const getStaffs = async () => {
        try {
            const res = await axios.get("http://localhost:5160/Staff/GetAll");
            console.log("Tüm çalışanlar:", res.data);
            const filtered = res.data.data.filter(s => s.businessProfileId === businessId);
            console.log("✓ Filtrelenmiş çalışanlar:", filtered);
            setStaffList(filtered);
        } catch (err) {
            message.error("Çalışanlar getirilemedi.");
        }
    };

    useEffect(() => {
        if (businessId) getStaffs();
    }, [businessId]);

    const handleAdd = async () => {
        if (!name.trim()) return message.warning("İşçi adı giriniz");
        try {
            await axios.post("http://localhost:5160/Staff", {
                fullName: name,
                businessProfileId: businessId,
            });
            message.success("Çalışan eklendi.");
            setName("");
            getStaffs();
        } catch (err) {
            message.error("Ekleme başarısız oldu.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5160/Staff/${id}`);
            message.success("Çalışan silindi.");
            getStaffs();
        } catch (err) {
            message.error("Silme başarısız oldu.");
        }
    };

    return (
        <div className="staff-form-container">
            <h3>Çalışan Ekle</h3>
            <div className="staff-inputs">
                <Input
                    placeholder="İşçi Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="primary" onClick={handleAdd}>Ekle</Button>
            </div>

            <h4>Mevcut Çalışanlar</h4>
            <Table
                dataSource={staffList}
                rowKey="id"
                pagination={false}
                bordered
                columns={[
                    {
                        title: "Adı",
                        dataIndex: "fullName",
                        key: "fullName",
                    },
                    {
                        title: "",
                        key: "action",
                        render: (_, record) => (
                            <Popconfirm
                                title="Çalışanı silmek istediğinize emin misiniz?"
                                onConfirm={() => handleDelete(record.id)}
                                okText="Evet"
                                cancelText="Hayır"
                            >
                                <Button danger>Kaldır</Button>
                            </Popconfirm>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default StaffForm;
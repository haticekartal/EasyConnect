import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Button, message, Divider } from "antd";

const AssignService = ({ businessId }) => {
    const [allServices, setAllServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [savedServices, setSavedServices] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5160/Service/GetAll")
            .then((res) => {
                setAllServices(res.data?.data || []);
            });

        axios
            .get(`http://localhost:5160/Business/GetServicesForBusinessProfile/${businessId}`)
            .then((res) => {
                const ids = (res.data?.data || []).map((s) => s.id);
                setSelectedServices(ids);
                setSavedServices(ids);
            });
    }, [businessId]);

    const handleChange = (checkedValues) => {
        setSelectedServices(checkedValues);
    };

    const handleSave = () => {
        axios
            .post("http://localhost:5160/Business/AssignServices", {
                businessProfileId: businessId,
                serviceIds: selectedServices,
            })
            .then(() => {
                message.success("Hizmetler başarıyla güncellendi.");
                setSavedServices(selectedServices);
            })
            .catch(() => {
                message.error("Hizmet kaydı sırasında bir hata oluştu.");
            });
    };

    return (
        <div style={{ padding: 24, maxWidth: 1000, margin: "40px auto", borderTop: "1px solid #eee" }}>
            <Divider>Hizmet Seç</Divider>
            <Checkbox.Group
                value={selectedServices}
                onChange={handleChange}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}
                >
                    {allServices.map((s) => (
                        <Checkbox
                            key={s.id}
                            value={s.id}
                            style={{ width: "30%", minWidth: "280px" }}
                        >
                            {s.title} - {s.price} TL
                        </Checkbox>
                    ))}
                </div>
            </Checkbox.Group>

            <Button
                type="primary"
                onClick={handleSave}
                style={{ marginTop: 20 }}
                disabled={JSON.stringify(savedServices) === JSON.stringify(selectedServices)}
                color = "white"
            >
                Kaydet
            </Button>
        </div>
    );
};

export default AssignService;

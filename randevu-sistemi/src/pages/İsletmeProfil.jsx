import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Select, message, Alert } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/İsletmeProfil.css";
import StaffForm from "../components/StaffForm";
import AssignService from "../components/AssignService";
import WorkingHourForm from "../components/WorkingHourForm";

const { Option } = Select;

const IsletmeProfil = () => {
    const [formData, setFormData] = useState({
        id: null,
        userId: "",
        businessName: "",
        phone: "",
        address: "",
        provinceCode: 0,
        categoryId: 0,
        imageData: ""
    });

    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log("📌 userId (localStorage):", userId);

        if (!userId) {
            message.error("Kullanıcı girişi yapılmamış.");
            return;
        }

        setFormData((prev) => ({ ...prev, userId }));

        axios.get(`http://localhost:5160/business/get-by-user/${userId}`)
            .then((res) => {
                if (res.data) {
                    setFormData(res.data);
                }
            })
            .catch(() => {
                console.log("Henüz kayıtlı işletme yok.");
            });

        axios.get("https://turkiyeapi.dev/api/v1/provinces")
            .then((res) => {
                if (Array.isArray(res.data.data)) {
                    setCities(res.data.data);
                }
            })
            .catch(() => message.error("Şehirler alınamadı."));

        axios.get("http://localhost:5160/Category/GetAll")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setCategories(res.data);
                } else if (Array.isArray(res.data.data)) {
                    setCategories(res.data.data);
                }
            })
            .catch(() => message.error("Kategoriler alınamadı."));
    }, []);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    imageData: reader.result.split(",")[1], // sadece base64 içeriği al
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const { businessName, phone, address, provinceCode, categoryId } = formData;

        if (!businessName || !phone || !address || !provinceCode || !categoryId) {
            message.warning("Lütfen tüm zorunlu alanları doldurunuz.");
            return;
        }

        console.log("📦 Gönderilecek formData:", formData);

        try {
            if (formData.id) {
                await axios.patch("http://localhost:5160/Business", formData);
                setSuccessMessage("İşletme bilgileri başarıyla güncellendi.");
            } else {
                const { id, ...postData } = formData;
                await axios.post("http://localhost:5160/Business", postData);
                setSuccessMessage("İşletme başarıyla kaydedildi.");

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error("Kayıt hatası:", error);
            message.error("İşlem sırasında bir hata oluştu.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="isletme-kayit-container">
                <h2>İşletme Kaydı</h2>

                {successMessage && (
                    <Alert
                        message={successMessage}
                        type="success"
                        showIcon
                        closable
                        style={{ marginBottom: 20 }}
                        onClose={() => setSuccessMessage("")}
                    />
                )}

                <Input
                    placeholder="İşletme Adı"
                    value={formData.businessName}
                    onChange={(e) => handleChange("businessName", e.target.value)}
                />

                <Input
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                />

                <Input
                    placeholder="Adres"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                />

                <Select
                    placeholder="Şehir Seçiniz"
                    value={formData.provinceCode || undefined}
                    onChange={(value) => handleChange("provinceCode", value)}
                    style={{ width: "100%", marginTop: 10 }}
                >
                    {cities.map((city) => (
                        <Option key={city.id} value={city.id}>
                            {city.name}
                        </Option>
                    ))}
                </Select>

                <Select
                    placeholder="Hizmet Kategorisi"
                    value={formData.categoryId || undefined}
                    onChange={(value) => handleChange("categoryId", value)}
                    style={{ width: "100%", marginTop: 10 }}
                >
                    {categories.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                            {cat.name}
                        </Option>
                    ))}
                </Select>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: 10 }}
                />

                <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: 20, width: "100%" }}
                >
                    {formData.id ? "Güncelle" : "Kaydet"}
                </Button>
            </div>

            {formData.id && <StaffForm businessId={formData.id} />}
            {formData.id && <AssignService businessId={formData.id} />}
            {formData.id && <WorkingHourForm businessId={formData.id} />}
            <Footer />
        </div>
    );
};

export default IsletmeProfil;

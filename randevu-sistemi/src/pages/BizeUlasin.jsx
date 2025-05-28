import React, { useState } from "react";
import { Input, Button, Select, message, Typography, Form } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/BizeUlasin.css";
import background from "../assets/bizeulasin.jpg"; // webpack import

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const BizeUlasin = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { businessName, email, message } = formData;
    if (!businessName || !email || !message) {
      message.warning("Lütfen tüm gerekli alanları doldurunuz.");
      return;
    }

    console.log("📨 Gönderilen veri:", formData);
    message.success("Talebiniz alındı. En kısa sürede dönüş yapılacaktır.");
    setFormData({ businessName: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <Navbar />
      <div
        className="bize-ulasin-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="form-card">
          <Title level={3}>Bize Ulaşın</Title>
          <Text style={{ color: "white", fontWeight: "bold" }}>
  Kategorinizi veya hizmetinizi bulamıyorsanız, lütfen aşağıdaki formdan bize ulaşın veya
  <Text strong style={{ color: "white" }}> easyconnectdestek@mail.com </Text> adresine mail gönderin.
</Text>


          <Form layout="vertical" style={{ marginTop: 20 }}>
            <Form.Item label="İşletme Adı" required>
              <Input
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                placeholder="Örn: Fey Masaj Salonu"
              />
            </Form.Item>

            <Form.Item label="E-posta Adresiniz" required>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="example@mail.com"
              />
            </Form.Item>

            <Form.Item label="Konu">
              <Select
                value={formData.subject}
                onChange={(value) => handleChange("subject", value)}
                placeholder="Bir seçenek belirleyin"
              >
                <Option value="kategori">Eksik Kategori</Option>
                <Option value="hizmet">Eksik Hizmet</Option>
                <Option value="teknik">Teknik Sorun</Option>
                <Option value="diger">Diğer</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Mesajınız" required>
              <TextArea
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Lütfen talebinizi detaylı bir şekilde belirtin..."
              />
            </Form.Item>

            <Button type="primary" block onClick={handleSubmit}>
              Gönder
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BizeUlasin;

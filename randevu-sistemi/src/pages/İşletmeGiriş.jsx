import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, Card, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import "../styles/İşletmeGiriş.css";

const { Option } = Select;

const IsletmeGiris = () => {
  const [form] = Form.useForm();
  const [isletmeTuru, setIsletmeTuru] = useState("");
  const [fileList, setFileList] = useState([]);

  // Fotoğraf yükleme işlemi
  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  // Formu gönderme işlemi
  const handleSubmit = async (values) => {
    if (fileList.length !== 3) {
      message.error("Lütfen 3 adet işletme fotoğrafı yükleyin!");
      return;
    }

    const formData = new FormData();
    formData.append("isletmeAdi", values.isletmeAdi);
    formData.append("isletmeTuru", values.isletmeTuru);
    formData.append("personelIsimleri", values.personelIsimleri);
    
    values.islemler.forEach((islem, index) => {
      formData.append(`islemAdi_${index}`, islem.islemAdi);
      formData.append(`fiyat_${index}`, islem.fiyat);
    });

    fileList.forEach((file, index) => {
      formData.append(`photo_${index}`, file.originFileObj);
    });

    try {
      const response = await fetch("http://localhost:5000/isletme-kaydet", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        message.success("İşletme başarıyla kaydedildi!");
        form.resetFields();
        setFileList([]);
      } else {
        message.error("İşletme kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      message.error("Bağlantı hatası! Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="isletme-giris-container">
      <Navbar />
      <Card className="form-card">
        <h2 className="form-title">İşletme Bilgileri</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="isletme-form">
          
          {/* İşletme Adı */}
          <Form.Item label="İşletme Adı" name="isletmeAdi" rules={[{ required: true, message: "Lütfen işletme adını girin!" }]}>
            <Input placeholder="İşletme Adınızı Girin" />
          </Form.Item>

          {/* İşletme Türü */}
          <Form.Item label="İşletme Türü" name="isletmeTuru" rules={[{ required: true, message: "Lütfen işletme türünü seçin!" }]}>
            <Select placeholder="İşletme Türünü Seçin" onChange={(value) => setIsletmeTuru(value)}>
              <Option value="kuafor">Kuaför</Option>
              <Option value="makyaj">Makyaj Stüdyosu</Option>
              <Option value="diyetisyen">Diyetisyen</Option>
            </Select>
          </Form.Item>

          {/* Personel İsimleri */}
          <Form.Item label="Personel İsimleri" name="personelIsimleri" rules={[{ required: true, message: "Lütfen personel isimlerini girin!" }]}>
            <Input placeholder="Personel isimlerini virgülle ayırarak girin" />
          </Form.Item>

          {/* Yapılacak İşlemler */}
          <Form.List name="islemler">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="islem-container">
                    <Form.Item {...restField} label="İşlem Adı" name={[name, "islemAdi"]} rules={[{ required: true, message: "Lütfen işlem adını girin!" }]}>
                      <Input placeholder="İşlem Adı" />
                    </Form.Item>
                    <Form.Item {...restField} label="Fiyat" name={[name, "fiyat"]} rules={[{ required: true, message: "Lütfen fiyat girin!" }]}>
                      <Input placeholder="Fiyat (TL)" type="number" />
                    </Form.Item>
                    <Button type="danger" onClick={() => remove(name)}>İşlemi Kaldır</Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} className="islem-ekle">+ İşlem Ekle</Button>
              </>
            )}
          </Form.List>

          {/* İşletme Fotoğrafları */}
          <Form.Item label="İşletme Fotoğrafları" required>
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false} 
              onChange={handleUpload}
              multiple
              maxCount={3}
            >
              <Button icon={<UploadOutlined />}>Fotoğraf Yükle (3 Adet)</Button>
            </Upload>
          </Form.Item>

          {/* Kaydet Butonu */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="kaydet-button">Kaydet</Button>
          </Form.Item>

        </Form>
      </Card>
    </div>
  );
};

export default IsletmeGiris;
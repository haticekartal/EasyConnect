import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rate, Input, Button, List, message, Avatar } from "antd";

const { TextArea } = Input;

const CommentSection = ({ businessId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);

    const user = JSON.parse(localStorage.getItem("user")); // ✅ Full user objesi
    const userId = user?.userId;
    const userName = user?.fullName || "Kullanıcı";

    useEffect(() => {
        if (!businessId) return;

        axios
            .get(`http://localhost:5160/Comment/get-by-business/${businessId}`)
            .then((res) => setComments(res.data.data || []))
            .catch((err) => console.error("Yorumlar alınamadı", err));
    }, [businessId]);

    const handleSubmit = () => {
        if (!text.trim()) {
            message.warning("Yorum boş olamaz.");
            return;
        }

        if (rating < 1 || rating > 5) {
            message.warning("Lütfen 1 ile 5 arasında bir puan verin.");
            return;
        }

        const dto = {
            businessProfileId: businessId,
            userId: userId,
            text: text.trim(),
            rating,
        };

        console.log("👉 Gönderilen yorum DTO:", dto);

        axios
            .post("http://localhost:5160/Comment", dto)
            .then(() => {
                message.success("Yorum eklendi.");
                setText("");
                setRating(5);
                return axios.get(
                    `http://localhost:5160/Comment/get-by-business/${businessId}`
                );
            })
            .then((res) => setComments(res.data.data || []))
            .catch((err) => {
                console.error("🛑 Yorum gönderme hatası:", err.response?.data || err.message);
                message.error("Yorum eklenirken hata oluştu.");
            });
    };

    return (
        <div
            className="yorum-container"
            style={{
                marginTop: "40px",
                padding: "24px",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                border: "1px solid #e8e8e8",
            }}
        >
            <h3 style={{ marginBottom: "16px" }}>Yorumlar</h3>

            {userId ? (
                <div style={{ marginBottom: 24 }}>
                    <TextArea
                        rows={3}
                        placeholder="Yorumunuzu yazın..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
                        <Rate value={rating} onChange={setRating} />
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            style={{ marginLeft: 12 }}
                        >
                            Gönder
                        </Button>
                    </div>
                </div>
            ) : (
                <p style={{ color: "gray" }}>
                    Yorum yapabilmek için giriş yapmalısınız.
                </p>
            )}

            <List
                itemLayout="horizontal"
                dataSource={comments}
                locale={{ emptyText: "Henüz yorum yapılmamış." }}
                renderItem={(item) => (
                    <List.Item style={{ borderBottom: "1px solid #eee" }}>
                        <List.Item.Meta
                            avatar={
                                <Avatar style={{ backgroundColor: "#87d068", textTransform: "uppercase" }}>
                                    {item.fullName?.charAt(0) || "U"}
                                </Avatar>
                            }

                            title={
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>
                                        {item.userId === userId ? <b>{userName}</b> : "Bir kullanıcı"}
                                    </span>
                                    <Rate value={item.rating} disabled style={{ fontSize: 14 }} />
                                </div>
                            }
                            description={
                                <>
                                    <p style={{ margin: "4px 0" }}>{item.text}</p>
                                    <span style={{ fontSize: "12px", color: "#999" }}>
                                        {new Date(item.createdAt).toLocaleString()}
                                    </span>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CommentSection;

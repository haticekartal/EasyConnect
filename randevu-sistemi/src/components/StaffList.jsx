import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffList = ({ businessId }) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5160/Staff/GetAll")
      .then(res => {
        const all = res.data?.data || [];
        const filtered = all.filter(s => s.businessProfileId === businessId);
        setStaffList(filtered);
      })
      .catch(err => console.error("Çalışanlar alınamadı:", err));
  }, [businessId]);

  if (!staffList.length) return <p>Personel bilgisi bulunamadı.</p>;

  return (
    <ul style={{ paddingLeft: 20 }}>
      {staffList.map((staff) => (
        <li key={staff.id}>👤 {staff.fullName}</li>
      ))}
    </ul>
  );
};

export default StaffList;

import React from "react";
import "../styles/BizKimiz.css";
import Navbar from "../components/Navbar";

// LinkedIn ve GitHub logo linklerini ekle
import linkedinLogo from "../assets/linkedin-logo.svg"; // LinkedIn logosu
import githubLogo from "../assets/github-logo.svg"; // GitHub logosu

const BizKimiz = () => {
  return (
    <div className="bizkimiz-container">
      <Navbar />
      <div className="bizkimiz-content">
        {/* Sol Taraf */}
        <div className="bizkimiz-left">
          <div className="profile-container">
            <div className="profile-picture sol-taraf"></div>
            <p className="profile-text">
              Trakya Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Bu projede frontend tarafını geliştirmekten sorumluyum. 
              Web tasarımı, kullanıcı deneyimi ve site işlevselliğini geliştirmek için React, Ant Design gibi teknolojilerle çalışıyorum. 
              Amacım, kullanıcıların kolaylıkla randevu almalarını sağlayarak işletme ve müşteri arasında bağlantıyla kullanıcı dostu ve görsel olarak çekici bir web sitesi oluşturmak.
            </p>
            {/* LinkedIn ve GitHub bağlantıları */}
            <div className="social-links">
              <a href="https://www.linkedin.com/in/hatice-kartal/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" />
                LinkedIn Profili
              </a>
              <a href="https://github.com/haticekartal" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" />
                GitHub Profili
              </a>
            </div>
          </div>
        </div>

        {/* Sağ Taraf */}
        <div className="bizkimiz-right">
          <div className="profile-container">
            <div className="profile-picture sag-taraf"></div>
            <p className="profile-text">
              Trakya Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim.
              Bu projede backend tarafını geliştirmekle sorumluyum. Benim görevim, kullanıcıların seçimlerine göre uygun randevu oluşturulmasını 
              sağlayan sistemin altyapısını kurmak ve veritabanı entegrasyonunu sağlamak. Amacım, kullanıcıların ihtiyaçlarına göre esnek ve verimli bir rezervasyon sistemi oluşturmak, 
              böylece siteyi daha işlevsel ve kullanıcı dostu hale getirmektir.
            </p>
            {/* LinkedIn ve GitHub bağlantıları */}
            <div className="social-links">
              <a href="https://www.linkedin.com/in/ali-eren-%C3%BCrdem-9b0432234/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" />
                LinkedIn Profili
              </a>
              <a href="https://github.com/aliurdem?" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" />
                GitHub Profili
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BizKimiz;
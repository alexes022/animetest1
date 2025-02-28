import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/global.css";

export default function EpisodePage() {
  const router = useRouter();
  const { id } = router.query;
  const [videoLinks, setVideoLinks] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/episode/${id}`).then((response) => {
        setVideoLinks(response.data);
      });
    }
  }, [id]);

  return (
    <div className="container">
      <Header />
      <h1>🔥 مشاهدة الحلقة</h1>
      {videoLinks.length > 0 ? (
        videoLinks.map((link, index) => (
          <div key={index} className="video-container">
            <iframe src={link} width="800" height="450" allowFullScreen></iframe>
          </div>
        ))
      ) : (
        <p>لا توجد فيديوهات متاحة</p>
      )}
      <Footer />
    </div>
  );
}

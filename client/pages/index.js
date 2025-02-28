import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/global.css";

export default function Home() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/anime").then((response) => {
      setAnimes(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header />
      <h1>🔥 أحدث الأنميات</h1>
      <div className="anime-list">
        {animes.map((anime, index) => (
          <div key={index} className="anime-card">
            <img src={anime.image} alt={anime.title} />
            <h2>{anime.title}</h2>
            <a href={`/anime/${anime.link}`}>مشاهدة الآن</a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

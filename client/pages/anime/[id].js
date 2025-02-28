import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/global.css";

export default function AnimePage() {
  const router = useRouter();
  const { id } = router.query;
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/anime/${id}`).then((response) => {
        setAnime(response.data);
      });
    }
  }, [id]);

  if (!anime) return <p>جاري التحميل...</p>;

  return (
    <div className="container">
      <Header />
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>
      <h2>الحلقات:</h2>
      <ul>
        {anime.episodes.map((episode, index) => (
          <li key={index}>
            <a href={`/episode/${episode}`}>الحلقة {index + 1}</a>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

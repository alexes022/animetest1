const express = require("express");
const cors = require("cors");
const scraper = require("./scraper");

const app = express();
app.use(cors());

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.json({ message: "مرحبًا بك في API موقع الأنمي" });
});

// API لجلب قائمة الأنمي
app.get("/api/anime", async (req, res) => {
  const animes = await scraper.getAnimeList();
  res.json(animes);
});

// API لجلب تفاصيل الأنمي
app.get("/api/anime/:id", async (req, res) => {
  const anime = await scraper.getAnimeDetails(req.params.id);
  res.json(anime);
});

// API لجلب روابط الفيديو للحلقات باستخدام Selenium
app.get("/api/episode/:id", async (req, res) => {
  const videoLinks = await scraper.getEpisodeLinks(req.params.id);
  res.json(videoLinks);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
});

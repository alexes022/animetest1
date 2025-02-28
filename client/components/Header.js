export default function Header() {
  return (
    <header style={{ background: "#111", padding: "10px", textAlign: "center" }}>
      <h1 style={{ color: "#ffcc00" }}>🔥 Fire Anime</h1>
      <nav>
        <a href="/" style={{ color: "#ffffff", margin: "0 10px" }}>الرئيسية</a>
        <a href="/search" style={{ color: "#ffffff", margin: "0 10px" }}>البحث</a>
      </nav>
    </header>
  );
}

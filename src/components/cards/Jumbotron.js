export default function Jumbotron({
  title,
  subTitle = "Welcome to React E-commerce",
}) {
  return (
    <div className="hero-panel">
      <div className="container hero-content">
        <div className="hero-kicker">Curated marketplace</div>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-copy">{subTitle}</p>
      </div>
    </div>
  );
}

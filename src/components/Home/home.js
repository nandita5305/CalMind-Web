import "./home.css";
import homeImage from "../../assets/home.jpeg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="home">
      {/* SPLINE RELATIVE */}
      <div className="spline-bg">
        <iframe
          src="https://my.spline.design/flowingribbon-TlkEaNrvCCNZuJBNJN3LXpRF"
          frameBorder="0"
          title="CalMind Aura"
        />
      </div>

      {/* LEFT TEXT */}
      <div className="home-text">
        <span className="section-tag">01 — CALM SYSTEM</span>
        <h1>
          CALM <br />
          BEYOND <br />
          CHAOS
        </h1>
        <p>
          CalMind is an AI-powered mental health companion that
          understands your emotions, tracks your wellbeing,
          and gently guides you through calm, connection,
          and professional care when needed.
        </p>

        <div className="home-buttons">
          <button className="primary-btn" onClick={() => navigate("/register")}>Start Free</button>
          <button className="secondary-btn">How it Works →</button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="home-visual">
        <div className="image-card">
          <img src={homeImage} alt="CalMind Interface" />
          <span className="live-status">● System Active</span>
        </div>
      </div>
    </section>
  );
};

export default Home;

import "./features.css";

const Features = () => {
  return (
    <section id="features" className="features-section">
      {/* LEFT HEADER */}
      <div className="features-header">
        <span className="features-tag">
          <span className="tag-number">02</span> — TECHNOLOGY
        </span>

        <h1 className="features-title">
          Optical <span>Precision</span>
        </h1>
      </div>

      {/* RIGHT DESCRIPTION */}
      <div className="features-description">
        <p>
          We’ve shrunk the supercomputer. Spectra integrates advanced
          LiDAR, eye-tracking, and holographic projection into a frame
          that weighs less than 60g.
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className="features-cards">
        <div className="feature-card">
          <div className="icon">⦿</div>
          <h3>Spatial Mapping</h3>
          <p>
            Real-time LiDAR sensors map your physical environment
            instantly, allowing digital objects to anchor perfectly
            to surfaces.
          </p>
          <span className="phase">PHASE 01</span>
        </div>

        <div className="feature-card">
          <div className="icon">⌬</div>
          <h3>Dual Processing</h3>
          <p>
            The S1 Neural Engine handles gesture recognition and spatial
            audio, while the R2 chip powers high-fidelity graphics.
          </p>
          <span className="phase">PHASE 02</span>
        </div>

        <div className="feature-card">
          <div className="icon">◉</div>
          <h3>Retinal Projection</h3>
          <p>
            Images are beamed directly onto the retina using photon-
            splicing technology, creating indistinguishable clarity.
          </p>
          <span className="phase">PHASE 03</span>
        </div>
      </div>
    </section>
  );
};

export default Features;

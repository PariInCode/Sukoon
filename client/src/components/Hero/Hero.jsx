import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true"></div>
      <div className="hero__content">
        <span className="hero__badge">Built for how India actually talks about mental health</span>
        <h1 className="hero__title">
          A quiet place to check in with <span className="hero__title-accent">yourself</span>, every day.
        </h1>
        <p className="hero__subtitle">
          Track your mood, talk to an AI companion that gets context, and find people
          nearby who understand — all in one calm, judgment-free space.
        </p>
        <div className="hero__actions">
          <Link to="/signup" className="btn btn--gradient btn--lg">
            Get started free
          </Link>
          <Link to="/ai-chat" className="btn btn--ghost btn--lg">
            Try AI Chat
          </Link>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">12k+</span>
            <span className="hero__stat-label">Check-ins logged</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">28</span>
            <span className="hero__stat-label">States represented</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">4.8/5</span>
            <span className="hero__stat-label">Avg. user rating</span>
          </div>
        </div>
      </div>

      <div className="hero__card">
        <div className="hero__card-header">
          <span className="hero__card-dot"></span>
          <span className="hero__card-dot"></span>
          <span className="hero__card-dot"></span>
        </div>
        <div className="hero__card-body">
          <p className="hero__card-label">Today's check-in</p>
          <div className="hero__mood-row">
            {["😔", "😕", "😐", "🙂", "😄"].map((emoji, i) => (
              <button
                key={i}
                className={`hero__mood-btn ${i === 3 ? "hero__mood-btn--active" : ""}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="hero__card-note">
            "Feeling a bit more settled after yesterday's session."
          </div>
        </div>
      </div>
    </section>
  );
}
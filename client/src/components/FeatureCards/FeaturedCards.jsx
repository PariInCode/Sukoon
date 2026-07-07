import "./FeaturedCards.css";

const FEATURES = [
  {
    icon: "💬",
    title: "AI Chat",
    description: "A companion that remembers context and responds like it actually read what you wrote.",
  },
  {
    icon: "📊",
    title: "Mood Tracker",
    description: "Log how you feel in seconds. See patterns build over weeks, not just single days.",
  },
  {
    icon: "🫂",
    title: "Community",
    description: "Connect with people in your state going through similar things — anonymously if you want.",
  },
  {
    icon: "📚",
    title: "Resources",
    description: "Curated, India-relevant articles and helplines — not generic Western advice.",
  },
];

export default function FeatureCards() {
  return (
    <section className="section features">
      <span className="section__eyebrow">What's inside</span>
      <h2 className="section__title">Everything you need, nothing you don't</h2>
      <p className="section__subtitle">
        Four tools that work together, not four separate apps pretending to be one.
      </p>

      <div className="features__grid">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="feature-card__icon">{feature.icon}</div>
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
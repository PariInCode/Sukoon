import "./IndianMap.css";

const TOP_STATES = [
  { name: "Maharashtra", users: "2,140" },
  { name: "Karnataka", users: "1,860" },
  { name: "Delhi NCR", users: "1,520" },
  { name: "Tamil Nadu", users: "1,310" },
  { name: "Uttar Pradesh", users: "1,180" },
];

export default function IndiaMap() {
  return (
    <section className="section india-map">
      <span className="section__eyebrow">Community, mapped</span>
      <h2 className="section__title">Growing across India</h2>
      <p className="section__subtitle">
        A live snapshot of where the Sukoon community is checking in from.
      </p>

      <div className="india-map__panel">
        <div className="india-map__visual" aria-hidden="true">
          <span className="india-map__pulse india-map__pulse--1"></span>
          <span className="india-map__pulse india-map__pulse--2"></span>
          <span className="india-map__pulse india-map__pulse--3"></span>
          <span className="india-map__pulse india-map__pulse--4"></span>
          <span className="india-map__glow"></span>
          <span className="india-map__center">🇮🇳</span>
        </div>

        <ul className="india-map__list">
          {TOP_STATES.map((state, i) => (
            <li key={state.name} className="india-map__row">
              <span className="india-map__rank">{i + 1}</span>
              <span className="india-map__name">{state.name}</span>
              <span className="india-map__users">{state.users} users</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
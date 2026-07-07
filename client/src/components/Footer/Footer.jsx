import { Link } from "react-router-dom";
import "./Footer.css";

const FOOTER_LINKS = {
    Product: [
        { label: "Dashboard", path: "/dashboard" },
        { label: "AI Chat", path: "/ai-chat" },
        { label: "Mood Tracker", path: "/mood-tracker" },
        { label: "Community", path: "/community" },
    ],
    Resources: [
        { label: "Articles", path: "/resources" },
        { label: "Helplines", path: "/resources" },
        { label: "FAQs", path: "/resources" },
    ],
    Company: [
        { label: "About", path: "/about" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Contact", path: "/contact" },
    ],
};

const SOCIALS = [
    { label: "Instagram", icon: "IG", url: "#" },
    { label: "Twitter", icon: "X", url: "#" },
    { label: "LinkedIn", icon: "in", url: "#" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <span className="footer__logo-mark">S</span>
                        <span className="footer__logo-text">Sukoon</span>
                    </Link>
                    <p className="footer__tagline">
                        A quiet place to check in with yourself — built for how India actually
                        talks about mental health.
                    </p>
                    <div className="footer__socials">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                aria-label={social.label}
                                className="footer__social-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer__links">
                    {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                        <div key={section} className="footer__col">
                            <p className="footer__col-title">{section}</p>
                            <ul className="footer__col-list">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.path} className="footer__link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer__newsletter">
                    <p className="footer__col-title">Stay in the loop</p>
                    <p className="footer__newsletter-text">
                        One thoughtful email a month. No spam, ever.
                    </p>
                    <form
                        className="footer__newsletter-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="footer__newsletter-input"
                            required
                        />
                        <button type="submit" className="footer__newsletter-btn">
                            Join
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer__bottom">
                <p className="footer__copyright">
                    © {year} Sukoon. All rights reserved.
                </p>
                <p className="footer__crisis">
                    In crisis?{" "}
                    <a href="tel:+919152987821" className="footer__crisis-link">
                        iCall: +91 9152987821
                    </a>
                </p>
            </div>
        </footer>
    );
}
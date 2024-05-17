import { NavLink } from "react-router-dom";
import styles from "@/styles/Navbar.module.scss";

export default function Navbar() {
  const navigation = [
    { name: "Reverse Calculator", href: "#" },
    { name: "Mini Calculator", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];
  return (
    <nav className={styles.nav}>
      <div className={styles.start}>
        <NavLink to="/" style={{ color: "#000" }}>
          <b>R</b>ester
        </NavLink>
      </div>
      <div className={styles.menu}>
        {navigation.map((link, i) => (
          <NavLink key={i} to={link.href}>
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className={styles.end}>
        <div className="button-group">
          <button className="button clear">
            <NavLink to="/login">Log in</NavLink>
          </button>
          <button className="button primary">
            <NavLink to="/signup">Get Started</NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
}

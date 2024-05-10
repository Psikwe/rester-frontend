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
        <b>R</b>ester
      </div>
      <div className={styles.menu}>
        {navigation.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>
      <div className={styles.end}>
        <div className="button-group">
          <button className="button clear">Log in</button>
          <button className="button primary">Get Started</button>
        </div>
      </div>
    </nav>
  );
}

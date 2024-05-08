import styles from "@/styles/Footer.module.scss";

export default function Footer() {
  const navigation = [
    { name: "Reverse Calculator", href: "#" },
    { name: "Mini Calculator", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];

  const support = [
    { name: "FAQs", href: "#" },
    { name: "Guides & How-Tos", href: "#" },
    { name: "Report an Issue", href: "#" },
  ];
  const contact = [
    { name: "Reverse Calculator", href: "#" },
    { name: "Mini Calculator", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];
  return (
    <footer className="flex row space-around">
      <div className="flex column">
        <div className={styles.start}>Rester</div>
        {navigation.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex column">
        <div className={styles.footerHeader}>Support</div>
        {support.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex column">
        <div className={styles.footerHeader}>Contact</div>
        {contact.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

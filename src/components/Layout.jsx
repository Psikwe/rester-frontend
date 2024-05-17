import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="main">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

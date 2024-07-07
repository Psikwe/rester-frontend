import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whatsapp from "../assets/whatsapp.png";
import gmail from "../assets/gmail.png";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="">
        <section className="main">
          <div className="fixed z-50 right-8 bottom-8">
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=447436942211"
            >
              <img src={whatsapp} className="w-8" />
            </a>
            <a target="_blank" href="mailto:clint.danso@gmail.com">
              <img src={gmail} className="w-8 mt-5" />
            </a>
          </div>

          <Outlet />
        </section>
        <div className="bottom-0 w-full ">
          <Footer />
        </div>
      </div>
    </>
  );
}

import "./App.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function App() {
  return (
    <>
      <section>
        <header className="flex column">
          <Navbar />
          <div className="flex row hero">
            <div className="flex column hero-text">
              <p className="title">
                Simple Tax Calculation for Ghanaian Businesses
              </p>
              <p>
                Empower your business with Rester, the ultimate tool to
                effortlessly compute PAYE and generate reports compliant with
                Ghanaian tax laws.
              </p>
              <div className="button-group hero-buttons">
                <button className="button primary">Get Started</button>
              </div>
            </div>

            <div className="flex hero-image">
              <img alt="dashboard image" src="/dashboard.png" />
            </div>
          </div>
        </header>
        <section className="features flex column">
          <p className=" flex title center ">Features</p>

          <div className="feature flex row">
            <div className="flex column feature-text">
              <p className="subtitle">Tax Calculation</p>
              <p>
                Streamline your HR processes by efficiently onboarding,
                offboarding, and managing your employees with our user-friendly
                tools. Keep your team organized and focused on what matters
                most.
              </p>
            </div>
            <div className="flex feature-image">
              <img alt="dashboard image" src="/dashboard.png" />
            </div>
          </div>

          <div className="feature flex row">
            <div className="flex feature-image">
              <img alt="dashboard image" src="/dashboard.png" />
            </div>
            <div className="flex column feature-text">
              <p className="subtitle">Manage Employees</p>
              <p>
                Streamline your HR processes by efficiently onboarding,
                offboarding, and managing your employees with our user-friendly
                tools. Keep your team organized and focused on what matters
                most.
              </p>
            </div>
          </div>

          <div className="feature flex row">
            <div className="flex column feature-text">
              <p className="subtitle">Collaboration</p>
              <p>
                Enhance teamwork and efficiency by inviting co-admins to
                entities for seamless collaboration and precise access control.
                Work together effortlessly, ensuring everyone has the right
                level of access.
              </p>
            </div>
            <div className="flex feature-image">
              <img alt="dashboard image" src="/dashboard.png" />
            </div>
          </div>

          <div className="feature flex row">
            <div className="flex feature-image">
              <img alt="dashboard image" src="/dashboard.png" />
            </div>
            <div className="flex column feature-text">
              <p className="subtitle">Statutory and Financial Reporting</p>
              <p>
                Stay compliant and informed by generating statutory and
                financial reports effortlessly. Rester makes it easy to create
                accurate and compliant reports, giving you peace of mind and
                saving you time and effort.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
}

export default App;

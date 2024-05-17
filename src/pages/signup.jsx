function Signup() {
  return (
    <>
      <section>
        <header></header>
        <div className="signup-container">
          <form className="signup-form">
            <p className="title">Signup</p>
            <div className="field">
              <label className="label bold">First Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="First Name" />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="label bold">Last Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Last Name" />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="label bold">Email</label>
              <div className="control">
                <input className="input" type="email" placeholder="Email" />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="label bold">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
            <div className="field">
              <label className="label bold">Password Confirmation</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password Confirmation"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;

function Login() {
  return (
    <>
      <section>
        <header></header>
        <div className="login-container">
          <p className="title">Login</p>
          <form className="login-form">
            <div className="field">
              <label className="label bold">Email</label>
              <div className="control">
                <input className="input" type="email" placeholder="Email" />
              </div>
   
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
            <button type="submit" className="inverse">
              Log in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;

import { useState, useMemo } from "react";
import { Navbar } from "../components/Navbar";

function EyeIcon({ off = false }) {
  return off ? (
    <svg className="password-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M2.1 3.5 3.5 2.1l18.4 18.4-1.4 1.4-3.1-3.1A11.7 11.7 0 0 1 12 19.5C6.5 19.5 2 14.8 1 12c.4-1.2 1.4-3 3-4.8L2.1 3.5Zm4.6 4.6A8.6 8.6 0 0 0 3.2 12c1.2 2.2 4.6 6 8.8 6 1.5 0 2.9-.4 4.1-1.1l-2.2-2.2a3.8 3.8 0 0 1-5.3-5.3L6.7 8.1Zm5.1.4 4.7 4.7a3.8 3.8 0 0 0-4.7-4.7Z" />
    </svg>
  ) : (
    <svg className="password-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 5c5.5 0 10 4.7 11 7.5-1 2.8-5.5 7.5-11 7.5S2 15.3 1 12.5C2 9.7 6.5 5 12 5Zm0 2.5A5 5 0 1 0 17 12.5 5 5 0 0 0 12 7.5Zm0 2A3 3 0 1 1 9 12.5 3 3 0 0 1 12 9.5Z" />
    </svg>
  );
}

function StatusIcon({ valid }) {
  return valid ? (
    <svg className="status-icon" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#11b981" />
      <path d="M4.5 8.3 7 10.7 11.6 5.7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg className="status-icon" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#ff5c8a" />
      <path d="M5.2 5.2 10.8 10.8M10.8 5.2 5.2 10.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Login() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createPass, setCreatePass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const passwordChecks = useMemo(() => ({
    length: createPass.length >= 8,
    lowercase: /[a-z]/.test(createPass),
    uppercase: /[A-Z]/.test(createPass),
    number: /[0-9]/.test(createPass),
    special: /[^A-Za-z0-9]/.test(createPass),
  }), [createPass]);

  function loginUser(e) {
    e?.preventDefault();
    console.log("Login", { email, password });
    alert(`Logging in as ${email}`);
  }

  function setUserDetails(e) {
    e?.preventDefault();
    console.log("Signup", { firstName, lastName, username, signupEmail, phone, createPass });
    alert(`Signed up ${firstName} ${lastName}`);
    setMode("login");
  }

  return (
    <>
      <Navbar mode={mode} onNavigate={setMode} />

      <section className={`content ${mode === "signup" ? "signup-mode" : ""}`}>
        <div className="container">
          {mode === "login" && (
            <div className="login" id="login">
              <h1>Welcome Back</h1>
              <p className="eyebrow">Log in to continue</p>
              <input
                type="email"
                placeholder="Email"
                className="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="Pass">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pass"
                  id="login-pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="password-toggle" aria-label="Toggle password visibility" onClick={() => setShowPassword((s) => !s)}>
                  <EyeIcon off={showPassword} />
                </button>
              </div>
              <button className="btn" onClick={loginUser}>Login</button>
              <p><a href="#forgot-password" className="fpass">Forgot password?</a></p>
              <p>
                Don't have an account?
                <a href="#signup" className="sign signup-link" onClick={(e) => { e.preventDefault(); setMode("signup"); }}>Sign up</a>
              </p>
            </div>
          )}

          {mode === "signup" && (
            <div className="signup" id="signup">
              <h1>Create Account</h1>
              <p className="eyebrow">Join in a few steps</p>
              <div className="name">
                <input id="first-name" type="text" placeholder="First Name" className="email" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input id="last-name" type="text" placeholder="Last Name" className="email" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <input id="username" type="text" placeholder="Username" className="email" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input id="signup-email" type="email" placeholder="Email" className="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
              <input id="phone" type="text" placeholder="Phone Number" className="email" value={phone} onChange={(e) => setPhone(e.target.value)} />

              <div className="Pass">
                <input
                  type={showCreatePass ? "text" : "password"}
                  placeholder="Create Password"
                  className="pass"
                  id="create-pass"
                  value={createPass}
                  onChange={(e) => setCreatePass(e.target.value)}
                  onFocus={() => setShowParameters(true)}
                  onBlur={() => setShowParameters(false)}
                />
                <button type="button" className="password-toggle" aria-label="Toggle password visibility" onClick={() => setShowCreatePass((s) => !s)}>
                  <EyeIcon off={showCreatePass} />
                </button>
              </div>

              <div id="paramters" className={`parameters ${showParameters ? "" : "is-hidden"}`}>
                <p id="length">
                  <StatusIcon valid={passwordChecks.length} />
                  <span className={passwordChecks.length ? "is-valid" : "is-invalid"}>Should be at least 8 characters long.</span>
                </p>
                <p id="lowercase">
                  <StatusIcon valid={passwordChecks.lowercase} />
                  <span className={passwordChecks.lowercase ? "is-valid" : "is-invalid"}>Should contain at least one lowercase letter.</span>
                </p>
                <p id="uppercase">
                  <StatusIcon valid={passwordChecks.uppercase} />
                  <span className={passwordChecks.uppercase ? "is-valid" : "is-invalid"}>Should contain at least one uppercase letter.</span>
                </p>
                <p id="number">
                  <StatusIcon valid={passwordChecks.number} />
                  <span className={passwordChecks.number ? "is-valid" : "is-invalid"}>Should contain at least one number.</span>
                </p>
                <p id="special">
                  <StatusIcon valid={passwordChecks.special} />
                  <span className={passwordChecks.special ? "is-valid" : "is-invalid"}>Should contain at least one special character.</span>
                </p>
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                className="pass"
                onFocus={() => setShowMessage(true)}
                onBlur={() => setShowMessage(false)}
                id="confirm-pass"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              {showMessage && (
                <div id="confirm-message" className="parameters">
                  <p>
                    <StatusIcon valid={Boolean(createPass && confirmPass && createPass === confirmPass)} />
                    <span className={createPass && confirmPass && createPass === confirmPass ? "is-valid" : "is-invalid"}>
                      {createPass && confirmPass && createPass === confirmPass ? "Passwords match." : "Passwords do not match."}
                    </span>
                  </p>
                </div>
              )}

              <button className="btn" onClick={setUserDetails}>Sign Up</button>
              <p>
                Already have an account?
                <a href="#login" className="sign login-link" onClick={(e) => { e.preventDefault(); setMode("login"); }}>Login</a>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Login;

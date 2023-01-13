import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFromApi } from "../store/fetchFromApi";
import AuthContext from "../store/auth-context";
import "../styles/login.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const logInHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetchFromApi(`user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((data) => {
        authCtx.login(data);
        navigate("/main", { replace: true });
      })
      .then(() => toast.success(`Welkom, ${authCtx.name}!`));
  };

  return (
    <div>
      <div className="login-header">
        <h4>INLOG SCHERM</h4>
        <h2>Boeken reserveren</h2>
      </div>

      <form className="login-input" onSubmit={logInHandler}>
        <label>
          <input
            type="email"
            ref={emailInputRef}
            required
            placeholder="E-mailadres"
          />
        </label>
        <label>
          <input
            type="password"
            ref={passwordInputRef}
            required
            placeholder="Wachtwoord"
          />
        </label>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

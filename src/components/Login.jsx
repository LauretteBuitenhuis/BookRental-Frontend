import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const logInHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const options = {
      method: "Post",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data);
        navigate("/main", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="input-container">
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

import React, { useRef, useContext } from 'react'
import AuthContext from '../Store/auth-context';

function Login() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);


    function logInHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const options = {
            method: 'Post',
            body: JSON.stringify({
                "email":enteredEmail,
                "password":enteredPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch("http://localhost:8082/user/login", options)
            .then((res) => {
                console.log(res)
                if (res.ok) {
                    console.log("is this ok?")
                    console.log(res)
                    return res.json();
                }
                else {
                    console.log("entered else statement")
                    return res.json().then((data) => {
                        let errorMessage = 'Authentification failed!';
                        console.log(data);
                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {
                console.log(data);
                authCtx.login(data);
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
                        type='email'
                        ref={emailInputRef}
                        required
                        placeholder="E-mailadres"
                    />
                </label>
                <label>
                    <input
                        type='password'
                        ref={passwordInputRef}
                        required
                        placeholder="Wachtwoord"
                    />
                </label>
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
import React, {useRef} from 'react'
import { Link } from "react-router-dom";

function Login() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    function logInHandler(event){
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const options = {
            method: 'Post',
            Body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
        }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch("http://localhost:8082/user/login",options)
        .then((res) => {
            console.log(res)
            return res.json()});
    }  

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
                            placeholder = "E-mailadres"
                        />
                    </label>
                    <label>
                        <input
                            type='password'
                            ref={passwordInputRef}
                            placeholder = "Wachtwoord"
                        />
                    </label> 
                    <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
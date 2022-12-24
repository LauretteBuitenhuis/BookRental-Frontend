import React, { useState } from 'react'
import "../styles/createAccount.css"
import { TextInput } from './FormInput';

export function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');

  const handleClick=(e) => {
    const user = { firstName, lastName, email, password, admin };
    console.log(user);
    fetch("http://localhost:8082/user/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then(() => {
      console.log("New user added")
  });
};  
    return (
      <div className="createaccount-container">
        <h2>Nieuwe gebruiker</h2>

      <form>
        <TextInput placeholder = "Voornaam" value={firstName}/>
        <TextInput placeholder = "Achternaam" value={lastName}/>
        <TextInput placeholder = "Email" value={email}/>  
        
        <input type="password" placeholder="Wachtwoord" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>

        <label htmlFor="is-admin-checkbox">
        <input id="is-admin-checkbox" type="checkbox"></input>
          Admin</label>

        <button type="submit" onClick={handleClick}>Aanmaken</button>
      </form>
      </div>
    )
}

import React, { useState } from 'react'
import "../styles/createAccount.css"
import { AdminInput, TextInput } from './FormInput';

export function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');

  const handleClick=(e) => {
    const user = { firstName, lastName, email, password};
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
        <TextInput placeholder = "Voornaam" value={firstName} onChange={(e)=>setFirstName(e.target.value)}required/>
        <TextInput placeholder = "Achternaam" value={lastName} required/>
        <TextInput placeholder = "Email" value={email} required/>  
        
        <input type="password" placeholder="Wachtwoord" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>

        {/* TODO - it's not submitting anything */}
        <label htmlFor="is-admin-checkbox"><AdminInput></AdminInput>Admin</label>

        <button type="submit" onClick={handleClick} onSubmit="AdminInput()">Aanmaken</button>
      </form>
      </div>
    )
}

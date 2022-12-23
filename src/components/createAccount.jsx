import React, { useState } from 'react'
import "../styles/createAccount.css"

export function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');

    return (
      <div className="createaccount-container">
        <h2>Nieuwe gebruiker</h2>

      <form className="createaccount-form">
        <input className="createacccount-input" type="text" placeholder="Voornaam" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required></input>
        <input className="createacccount-input" type="text" placeholder="Achternaam" value={lastName} onChange={(e)=>setLastName(e.target.value)}  required></input>
        <input className="createacccount-input" type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}  required></input>
        <input className="createacccount-input" type="password" placeholder="Wachtwoord" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>

        <label htmlFor="is-admin-checkbox" className="createaccount-label">
        <input id="is-admin-checkbox" type="checkbox" className="createacccount-input"></input>
          Admin</label>

        <button type="submit" className="createaccount-button">Aanmaken</button>
      </form>
      </div>
    )
}
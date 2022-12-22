import React from 'react'
import "../styles/createAccount.css"

export function CreateAccount() {
    return (
      <div className="createaccount-container">
        <h2>Nieuwe gebruiker</h2>

      <form className="createaccount-form">
        <input className="createacccount-input" type="text" placeholder="Voornaam"></input>
        <input className="createacccount-input" type="text" placeholder="Achternaam"></input>
        <input className="createacccount-input" type="text" placeholder="Email"></input>
        <input className="createacccount-input" type="text" placeholder="Wachtwoord"></input>

        <label htmlFor="is-admin-checkbox" className="createaccount-label">
        <input id="is-admin-checkbox" type="checkbox" className="createacccount-input"></input>
          Admin</label>

        <button type="submit" className="createaccount-button">Aanmaken</button>
      </form>

      </div>
    )
}

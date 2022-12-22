import React from 'react'
import "../styles/createAccount.css" // TODO - this somehow impacts the login page ... 

export function CreateAccount() {
    return (
      <div className="container">
        <h2>Nieuwe gebruiker</h2>

      <form>
        <input type="text" placeholder="Voornaam"></input>
        <input type="text" placeholder="Achternaam"></input>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Wachtwoord"></input>

        <label htmlFor="is-admin-checkbox">
        <input id="is-admin-checkbox" type="checkbox" placeholder="Admin"></input>
          Admin</label>

        <button type="submit" className="button">Aanmaken</button>
      </form>

      </div>
    )
}

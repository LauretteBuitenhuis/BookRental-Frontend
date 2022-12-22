import React from 'react'
import "../styles/newUser.css"

export function NewUser() {
    return (
      <div class="container">
        <h2>Nieuwe gebruiker</h2>

      <form>
        <input type="text" placeholder="Voornaam"></input>
        <input type="text" placeholder="Achternaam"></input>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Wachtwoord"></input>

        <label for="is-admin-checkbox">
        <input id="is-admin-checkbox" type="checkbox" placeholder="Admin"></input>
          Admin</label>
        

        <button type="submit" class="button">Toevoegen</button>
      </form>

      </div>
    )
}

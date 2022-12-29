import React, { useState } from "react";
import "../styles/createAccount.css";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";

export function CreateAccount() {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password, isAdmin } =
      event.target.elements;

    const userDto = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      isAdmin: isAdmin.checked,
    };

    fetch("http://localhost:8082/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDto),
    }).then(() => {
      console.log("New user added");
    });
  };

  return (
    <div className="createaccount-container">
      <h2>Nieuwe gebruiker</h2>

      <form onSubmit={handleSubmit}>
        <TextInput name="firstName" placeholder="Voornaam" />
        <TextInput name="lastName" placeholder="Achternaam" />
        <TextInput name="email" placeholder="Email" />

        <input
          name="password"
          type="password"
          placeholder="Wachtwoord"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>

        <CheckboxInput name="isAdmin" label="Admin" />

        <button type="submit">Aanmaken</button>
      </form>
    </div>
  );
}

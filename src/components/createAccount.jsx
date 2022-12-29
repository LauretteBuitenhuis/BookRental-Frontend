import React, { useState } from "react";
import "../styles/createAccount.css";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";

export function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");

  const handleClick = (event) => {
    const user = { firstName, lastName, email, password };
    console.log(user);
    fetch("http://localhost:8082/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      console.log("New user added");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const user = {
      firstName: elements["first-name"].value,
      lastName: elements["last-name"].value,
      email: elements.email.value,
      password: elements.password.value,
      admin: elements["is-admin"].value,
    };
  };

  return (
    <div className="createaccount-container">
      <h2>Nieuwe gebruiker</h2>

      <form onSubmit={handleSubmit}>
        <TextInput
          name="firstName"
          placeholder="Voornaam"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput name="lastName" placeholder="Achternaam" value={lastName} />
        <TextInput name="email" placeholder="Email" value={email} />

        <input
          name="password"
          type="password"
          placeholder="Wachtwoord"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>

        {/* TODO - it's not submitting anything */}
        <CheckboxInput name="isAmin" label="Admin" />

        <button type="submit">Aanmaken</button>
      </form>
    </div>
  );
}

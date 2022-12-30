import React, { useState } from "react";
import "../styles/createAccount.css";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";
import { PasswordInput } from "./PasswordInput";

export function CreateAccount() {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const element = document.querySelector(`#get-request .result`);

    const { firstName, lastName, email, password, isAdmin } =
      event.target.elements;

    const userDto = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      isAdmin: isAdmin.checked,
    };

    // TODO - fix: TypeError: Cannot read properties of undefined (reading 'JSON')
    // TODO - show error code and message
    fetch("http://localhost:8082/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Nn61QRfP0T2qthQ9uqQp2AxtrLmUmaG8iAYsSP3mWck6dUlNPe4REATLmVuMUy3sa0PQUdqQqFkxR2hEBoYHXCj2SmDYExsiPjX4ywjNj7WIzAN7yoyzHxXeICB5HnwhgZpcHggSe55pxQZAsMBKhx",
      },
      body: JSON.stringify(userDto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status, response.statusText);
        }
      })
      .then((response) => response.JSON())
      .then((user) =>
        alert(`User with email ${user.email} was successfully created`)
      )
      .catch((error) => {
        alert("Oops! An error occurred.\n\n" + "Request failed:\n" + error);
      });
  };

  return (
    <div className="createaccount-container">
      <h2>Nieuwe gebruiker</h2>

      <form onSubmit={handleSubmit}>
        <TextInput name="firstName" placeholder="Voornaam" />
        <TextInput name="lastName" placeholder="Achternaam" />
        <TextInput name="email" placeholder="Email" />
        <PasswordInput name="password" placeholder="password" />
        <CheckboxInput name="isAdmin" label="Admin" />
        <button type="submit">Aanmaken</button>
      </form>
    </div>
  );
}

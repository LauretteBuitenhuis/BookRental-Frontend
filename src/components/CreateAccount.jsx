import "../styles/createAccount.css";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";
import { PasswordInput } from "./PasswordInput";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import { fetchFromApi } from "../store/fetchFromApi";
import { toast } from "react-toastify";

export function CreateAccount() {
  const auth = useContext(AuthContext);

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

    fetchFromApi(`user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(userDto),
    }).then(() => toast.success(`Nieuwe gebruiker aangemaakt.`));
  };

  return (
    <div className="createaccount-container">
      <h2>Nieuwe gebruiker</h2>
      <form onSubmit={handleSubmit}>
        <TextInput name="firstName" placeholder="Voornaam" />
        <TextInput name="lastName" placeholder="Achternaam" />
        <TextInput name="email" placeholder="Email" />
        <PasswordInput name="password" placeholder="Password" />
        <CheckboxInput name="isAdmin" label="Admin" />
        <button type="submit">Aanmaken</button>
      </form>
    </div>
  );
}

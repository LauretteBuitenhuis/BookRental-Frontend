import { useState } from "react";

export function PasswordInput(props) {
  const { name, placeholder } = props;
  const [value, setValue] = useState("");

  return (
    <input
      type="password"
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
}

import { useState } from "react";

export function TextInput(props) {
  const { name, placeholder } = props;
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
}

import { useState } from "react";

export function CheckboxInput(props) {
  const { name, label } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((isChecked) => !isChecked);
  };

  return (
    <label htmlFor={name}>
      <input
        name={name}
        type="checkbox"
        onChange={handleChange}
        defaultChecked={checked}
      ></input>
      {label}
    </label>
  );
}

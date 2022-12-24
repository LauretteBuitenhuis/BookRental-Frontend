import { useState } from "react";

export function TextInput(props) {
    const { placeholder } = props;
    const [value, setValue] = useState('');

    return (
        <input type="text" placeholder={ placeholder } value={ value } onChange={(e)=>setValue(e.target.value)}></input>
    )
}

export function PasswordInput(props) {
    return
}

export function BooleanInput(props) {
    return
}
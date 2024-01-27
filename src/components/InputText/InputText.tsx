import { ChangeEvent, useState } from "react";


export default function InputText(): JSX.Element {
  const [value, setValue] = useState('');
  
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <label>
      <span>enter your name</span>
      <input placeholder="enter your name" type="text" name="name" value={value} onChange={handleInput} />
    </label>
  )
}
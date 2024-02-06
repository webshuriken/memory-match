import { ChangeEvent, useState } from "react";


type Props = {
  handleInput: (value: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function InputText({ handleInput, value }: Props): JSX.Element {
  return (
    <label>
      <span>enter your name</span>
      <input placeholder="max 20 characters" type="text" name="name" value={value} onChange={handleInput} />
    </label>
  )
}
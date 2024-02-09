import { ChangeEvent, useState } from 'react';


type Props = {
  handlePlayerName: (value: string) => void;
}

export default function InputText({ handlePlayerName }: Props): JSX.Element {
  const [value, setValue] = useState<string>('');

  function handleInput(e: ChangeEvent<HTMLInputElement>):void {
    setValue(e.target.value);
    handlePlayerName(e.target.value);
  }

  return (
    <label>
      <span>enter your name</span>
      <input 
        placeholder="max 20 characters" 
        type="text" 
        name="name" 
        maxLength={20}
        value={value} 
        onChange={handleInput}
      />
    </label>
  )
}
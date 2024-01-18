import React from "react";


export default function Button({value = 'Button'}): JSX.Element {
  return (
    <button>{value}</button>
  )
}

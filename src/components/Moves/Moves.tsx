import { useContext } from "react";
import { MovesContext } from "../../context/MovesContext";


export default function Moves(): JSX.Element {
  const moves = useContext(MovesContext);

  return (
    <article>
      <p>Moves</p>
      <p>
        <span>{moves}</span>
      </p>
    </article>
  )
}

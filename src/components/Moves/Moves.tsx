import { useMovesContext } from "../../context/MovesContext";


export default function Moves(): JSX.Element {
  const moves = useMovesContext();

  return (
    <article>
      <p>Moves</p>
      <p>
        <span>{moves}</span>
      </p>
    </article>
  )
}

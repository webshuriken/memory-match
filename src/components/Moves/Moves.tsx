import { useMovesContext } from "../../context/MovesContext";


export default function Moves(): JSX.Element {
  const moves = useMovesContext();

  return (
    <article className="gamedash-moves">
      <p>Moves</p>
      <p>
        <span>{moves}</span>
      </p>
    </article>
  )
}

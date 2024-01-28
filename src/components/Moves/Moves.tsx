type Props = {
  children: string
}

export default function Moves({ children }: Props): JSX.Element {
  return (
    <article>
      <p>Moves</p>
      <p>
        <span>{children}</span>
      </p>
    </article>
  )
}

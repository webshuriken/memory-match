export default function Moves({ children }: {children: string}): JSX.Element {
  return (
    <article>
      <p>Moves</p>
      <p>
        <span>{children}</span>
      </p>
    </article>
  )
}

export default function Moves({ children }: {children: string}) {
  return (
    <article>
      <p>Moves</p>
      <p>
        <span>{children}</span>
      </p>
    </article>
  )
}

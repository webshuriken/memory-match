type Props = {
  children: string
}

export default function Timer({children}: Props): JSX.Element {
  return (
    <article>
      <p>Timer</p>
      <div role="timer">{children}</div>
    </article>
  )
}

import ButtonChip from "../ButtonChip/ButtonChip"


type Props = {
  title: string;
  msg: string;
}

// About and Leaderboard pages have similar headers, all that changes is the title and message they display.
// A simple component to avoid duplication
export default function PageHeader({
  title = 'PAGE HEADER', 
  msg = 'Your header paragraph goes here. Whatever text you want it to be'
}: Props): JSX.Element {

  return (
    <header>
      <h2>{title}</h2>
      <p>{msg}</p>
      <ButtonChip url="/" value="Play Again" handleClick={() => {}} />
    </header>
  )
}
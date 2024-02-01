import { ButtonHTMLAttributes, useState } from "react";


export type Props = {
  alt: string;
  cover: {
    src: string;
    alt: string;
  },
  card: {
    src: string;
    flipped?: boolean;
    id?: string;
  },
  handleClick: (a: string) => void;
}

export default function Card({
  cover, 
  card: { src, id, flipped }, 
  alt,
  handleClick
}: Props): JSX.Element {
  const [cardID, setCardID] = useState<string>(id!);

  return (
    <div role="button" aria-label="game card" onClick={() => handleClick(cardID) }>
      <img src={cover.src} alt={cover.alt} />
      <img src={src} alt={alt} />
    </div>
  )
}
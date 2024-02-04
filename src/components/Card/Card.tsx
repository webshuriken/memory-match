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
    id?: number;
  },
  handleClick: (a: number) => void;
}

export default function Card({
  cover, 
  card: { src, id, flipped }, 
  alt,
  handleClick
}: Props): JSX.Element {
  const [cardID, setCardID] = useState<number>(id!);

  return (
    <div role="button" aria-label="game card" onClick={() => handleClick(cardID) }>
      <img src={cover.src} alt={cover.alt} />
      <img src={src} alt={alt} />
    </div>
  )
}
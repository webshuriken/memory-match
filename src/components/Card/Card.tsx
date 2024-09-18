import { useState } from "react";
import { iCardFacesType } from "../../custom-types/types";


export interface Props {
  alt: string;
  cover: {
    src: string;
    alt: string;
  },
  face: iCardFacesType,
  handleClick: (a: State) => void;
}

interface State {
  id: number;
  pairID: number;
}

export default function Card({
  cover, 
  face: { src, id, flipped, pairID }, 
  alt,
  handleClick
}: Props): JSX.Element {
  const [cardID, setCardID] = useState<State>({id: id!, pairID: pairID!});
  // shall we flip card
  let cardClass = 'card';
  if (flipped) {
    cardClass = 'card flip-card';
  }

  return (
    <div className={cardClass} role="button" aria-label="game card" onClick={() => handleClick(cardID) }>
      <div className="card-wrapper">
        <img src={cover.src} alt={cover.alt} className="card-back" />
        <img src={src} alt={alt} className="card-face" />
      </div>
    </div>
  )
}
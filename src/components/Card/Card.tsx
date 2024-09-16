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

  return (
    <div className="card" role="button" aria-label="game card" onClick={() => handleClick(cardID) }>
      <div className="card-wrapper">
        <img src={cover.src} alt={cover.alt} className="card-back" />
        <img src={src} alt={alt} className="card-face" />
      </div>
    </div>
  )
}
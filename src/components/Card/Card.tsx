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
    <div role="button" aria-label="game card" onClick={() => handleClick(cardID) }>
      <img src={cover.src} alt={cover.alt} />
      <img src={src} alt={alt} />
    </div>
  )
}
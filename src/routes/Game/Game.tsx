import { useState } from "react";
import { MovesProvider } from "../../context/MovesContext";
import { TimerProvider } from "../../context/TimerContext";
import GamePlay from "../../components/GamePlay/GamePlay";
import GameEnd from "../../components/GameEnd/GameEnd";
import { DeckOfCards, CloudinaryCardsList } from "../../globals/gameData";


type CardsURLsType = {
  faces: {
    src: string
  }[];
  cover: string;
}

export default function Game():JSX.Element {
  // indicates the game can be started at the users first click on a card
  const [gameReady, setGameReady] = useState<boolean>(true);
  // prep state with intial values
  const [cardURLs, setCardURLs] = useState<CardsURLsType | null>(null);

  /**
   * Takes a string and returns the URL made available by Cloudinary
   * @param {string} imagePublicID - Cloudinary public ID for the image
   * @returns {string} url of the image
   */
  function fetchImageURL(imagePublicID: string): string {
    const folderName = 'memory-match-cards';
    const url = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/${folderName}/${imagePublicID}`
    return url;
  }

  /**
   * Takes the Deck of Cards and populates the faces and cover with Cloudinary URL
   */
  function updateDeck(): void {
    // TODO: FEAT-Game-1: isolate this part so that new decks can be selected and used
    // get the url for the card images
    DeckOfCards.cards.faces = CloudinaryCardsList.faces.map(imagePublicID => {
      return {
        src: fetchImageURL(imagePublicID)
      }
    });
    DeckOfCards.cards.cover.src = fetchImageURL(CloudinaryCardsList.cover);
  }

  // only populate when game is ready
  if (gameReady) { updateDeck(); }

  return (
    <MovesProvider>
      <TimerProvider>
        <article>
          {
            (gameReady && DeckOfCards)
            ?
              <GamePlay cards={DeckOfCards.cards} setGameReady={setGameReady} />
            :
              <GameEnd />
          }
        </article>
      </TimerProvider>
    </MovesProvider>
  );
}

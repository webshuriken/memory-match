import React, {useState, useEffect} from "react";


function GameCards({cards}) {
  console.log("LOADING THE GAME CARDS")
  /**
   * TODO:
   * 2. create a random order generator
   * 3. spread it all around
   */
  const [deckOfCards, setDeckOfCards] = useState(false);


  useEffect(() => {
    // lets prep the starting deck of cards
    // double the deck to create pairs
    let deck = [...cards, ...cards];
    deck = deck.map(card => ({
      ...card,
      id: Math.floor(Math.random * 102),
      active: false,
    }));
    // cards ready for state
    setDeckOfCards(() => deck);
  }, []);

  return (
    <article>
      <ul>
        {
          deckOfCards ?
            deckOfCards.map((card, i) => {
              return (
                <li
                  key={i}
                >
                  {card.alt}
                </li>
              );
            })
          :
          <li>Loading the card deck</li>
        }
      </ul>
    </article>
  )
}

export default GameCards;
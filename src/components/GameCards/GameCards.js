import React, {useState, useEffect} from "react";


function GameCards({cards}) {
  console.log("LOADING THE GAME CARDS")
  /**
   * TODO:
   * 2. create a random order generator
   * 3. spread it all around
   */
  const [deckOfCards, setDeckOfCards] = useState(false);
  // only job is to always hold the last card to be flipped
  const [lastFlip, setLastFlip] = useState('');

  /**
   * @description deal with a click event on a card
   */
  function handleClick(e) {
    console.log("HANDLING THE CARD CLICK: ", lastFlip);
    if (lastFlip === '') {
      setLastFlip(() => e.target.dataset.cardName);
    }else{
      checkFlip(e.target.dataset.cardName);
    }
  }

  /**
   * @description checks for pairs and updates the state depending on the check outcome
   */
  function checkFlip(name) {
    console.log("CHECKING THE CARD FLIP");
    // when there is a match, update the state for the deck of cards
    if (name == lastFlip) {
      setDeckOfCards(deck => deck.map(card => {
        if (name == card.name) {
          return ({
            ...card,
            active: true
          });
        }
        return card;
      }));
    }
    // at this stage we will always reset the last card flipped
    setLastFlip(() => '');
  }

  useEffect(() => {
    // lets prep the starting deck of cards
    // double the deck to create pairs
    let deck = [...cards, ...cards];
    deck = deck.map(card => ({
      ...card,
      id: Math.floor(Math.random() * 102),
      active: false,
    }));
    // cards ready for state
    setDeckOfCards(() => deck);
  }, []);

  console.log("UPDATED DECK OF CARDS: ", deckOfCards);

  return (
    <article>
      <ul>
        {
          deckOfCards ?
            deckOfCards.map(card => {
              return (
                <li
                  key={card.id}
                  data-card-name={card.name}
                  data-card-id={card.id}
                  onClick={handleClick}
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
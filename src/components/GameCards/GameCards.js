import React, {useState, useEffect} from "react";


function GameCards({cards, setGameMoves}) {
  const [deckOfCards, setDeckOfCards] = useState(false);
  // only job is to always hold the last card to be flipped
  const [lastFlip, setLastFlip] = useState({name: '', id: ''});

  /**
   * @description deal with a click event on a card
   */
  function handleClick(e) {
    if (lastFlip.name === '') {
      setLastFlip(() => ({
        name: e.target.dataset.cardName,
        id: e.target.dataset.cardId
      }));
    }else{
      checkFlip(e.target.dataset.cardName);
    }
  }

  /**
   * @description checks for pairs and updates the state depending on the check outcome
   */
  function checkFlip(name) {
    console.log("CHECKING CARD FLIP")
    // when there is a match, update the state for the deck of cards
    if (name === lastFlip.name) {
      setDeckOfCards(deck => deck.map(card => {
        if (name === card.name) {
          return ({
            ...card,
            active: true
          });
        }
        return card;
      }));
    }
    // at this stage we will always reset the last card flipped
    setLastFlip(() => ({name: '', id: ''}));
    // player has flipped two pairs so it counts as a move
    setGameMoves(state => state += 1);
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

  return (
    <article>
      <ul>
        {
          deckOfCards ?
            deckOfCards.map(card => {
              let active = card.active || card.id === lastFlip.id;
              let classes = active ? 'card-item active' : 'card-item';
              // there must be a way to improve the code here..
              if (active) {
                return (
                  <li
                    data-card-name={card.name}
                    data-card-id={card.id}
                    key={card.id}
                    className={classes}
                  >
                    {card.alt}
                  </li>
                );
              }else{
                return (
                  <li
                    data-card-name={card.name}
                    data-card-id={card.id}
                    key={card.id}
                    className={classes}
                    onClick={handleClick}
                  >
                    {card.alt}
                  </li>
                )
              }
            })
          :
          <li>Loading the card deck</li>
        }
      </ul>
    </article>
  )
}

export default GameCards;
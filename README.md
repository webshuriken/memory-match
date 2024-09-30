# Memory Match

A fun memory game with cards, just find the pairs.

## To Tackle

A list of things to tackle that are not features but possible issues:

- the `short-unique-id` npm package is not working properly with TS
  - The documentation says that it is compatible but i get errors.
  - Tried copying the code form the docs which says TS and still get error
  - Had to give it a type of any _not so nice hack_ to get it to work

- Leaderboard.tsx implements the leaderboard table update assuming that
the list is given in ascending order according to the players position.
If the list is given in random order then it can cause trouble with the position
of players.

## Thoughts

The project was an excellent opportunity to practice my Typescript. To tell the truth, slow start and strong finish. I am loving the idea of typing in JS, specially the ability to create custom types. Dwelling on the past is no use when you want to evolve. I do want to point out, that adding types to a project definately needs planning and takes time!, still fun.

The images for the app are hosted in Cloudinary and so far their service has been fantastic. Getting started with the SDK was a struggle because it kept talking about transforming images and not so much on how to create simple requests for an image. The SDK for React is nice but a little much for this project. In the end I used a basic request for the images url so I can display them.

## Future features

- **FEAT-Game-1**
  - refactor the code so we can use other set of images for the deck of cards.
  - allows a user to select the deck they want to use

- Create the setting page to allow a user to:
  - choose a deck of cards (this can be added through github PR)
  - choose the difficulty (how many cards to play with).
  Any deck will work as the app will only need to deal the amount matching the difficulty level.
  So if a deck has 16 cards and easy level is 6 cards, then we will only deal 6 random cards from the deck of 16.
  - night or day time mode
- Store players data in a DB so we can use this data to make the game more competitive.

## Acknowledgements

Here are some of the npm packages I used for the project:

- [badwords-filter](https://www.npmjs.com/package/badwords-filter) An easy-to-use word filter with advanced detection techniques.
- [badwords](https://www.npmjs.com/package/badwords) A highly consumable list of bad (profanity) English words based on the nice short and simple list found in Google's "what do you love" project made accessible by Jamie Wilkinson.
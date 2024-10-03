# Contributing to Memory Match

Ideas are ready to be devoured and redefined.

## About

If you see something in the project which could be improved upon and want to do so, please do.
Software development is about constant learning and improvement. Make sure to follow procedure, see Submitting a Pull Request.

## Code Style Guide

### JavaScript

* Use the JSDoc documentation style when commenting your code
* 2-space indentation ( I know a lot of people prefer to use the 4-spaces )
* Naming: functionNamesLikeThis, variableNamesLikeThis, ClassNamesLikeThis, methodNamesLikeThis, CONSTANT_VALUES_LIKE_THIS and ComponentsLikeThis.tsx
* Please end your statements with a semicolon, (I know it't not required but it helps with redability)

### Typescript

* If the type is used in more than one file please add it to the `types.d.ts` file
* When you don't want to rely on TS type inferance, feel free to tell it the type.

### CSS

* Use the BEM approach when writting class names
* Naming: class-names-like-this, IDsLikeThis
* 2-space indentation

## New Deck Of Cards

You can also create your own deck of cards to be used in the game. Currently, the app only loads images from Cloudinary but if you have your images hosted with someone else, I can always implement the new hosting service.

For safety reason I will review the images to check for integrity.

Rules about images:

1. No implicit images, no porn of any kind, or naked images, real or fake.
2. Make sure you fill in the object below with all the information. PRs missing any of the attributes will not be accepted.
3. Make sure to add the object and the last item in the `AvailableGameDecks` array found in `globals/gameData.ts`.

```javascript
export const AvailableGameDecks: iDeckOfCardsType[] = [
  {
    author: {
      name: [
        'AUTHORS_NAMES',
      ],
      site: [
        'URL_TO_PORTFOLIO',
      ]
    },
    cards: {
      alt: 'ALTERNATIVE_TEXT_USED_FOR_EACH_FACE_CARD',
      faces: [
        { src: 'CLOUDINARY_ID.png' }
      ],
      cover: {
        alt: 'ALTERNATIVE_TEXT_FOR_YOUR_COVER_IMAGE_CARD',
        src: 'CLOUDINARY_COVER_ID.png'
      },
    },
    size: 8,
    theme: 'THEME_DESCRIPTION'
  }
];
```

## Submitting a Pull Request

1. [Fork](https://github.com/webshuriken/memory-match/) the official repository
2. Create a [topic branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/)
3. Implement your feature of bug fix
4. Add, commit and push your changes
5. Submit a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

# Plan

Plan for the Memory Match game developed in React.

## Steps

- Create components design tree, to visualise the parents and props passed around
- Create HTML structure for all components
- Implement react-router to move around the app. This is basic at the moment.
- Use pure CSS to styles the components

## TODOs

A list of latest things to do separate along side the plan LIFO style.

- Workout the details between the GamePlay component and the GameCards components
  - What are their jobs.. what exactly are they looking after. What are their roles?
- Wait until all types have been moved inside the types.ts file before you COMMIT

## Types

A component or file will only create a type within the same file for:

- Props
- State (unless the state is used by more than one component)

## Routes

- Provider inside index.tsx
- Root route, App.tsx
- Navigations links will live inside Nav.tsx

The games has only 4 routes to choose from.

- **App.tsx** (RootRoute) _Menu, Game, Leaderboard, Settings, About_
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **Game.tsx** _GamePlay, GameEnd_
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
    - integrate CLoudinary to load the game assets (card images) ✅
  - style with pure CSS ✅

- **Leaderboard.tsx** _LeaderboardTable_ **TODO: NEXT 4**
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - useEffect to extract DB data and prep table (debounce it?) ✅
  - style with pure CSS ✅

- **Settings.tsx** NOT MVP
  - write integration and unit tests (Not part of the MVP) ✅
  - basic html structure (Says under construction) ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **About.tsx**
  - write unit tests
  - basic html structure
  - transform to TS
  - style with pure CSS

## Components

These are used throughout the app by one or various components.

- **Nav.tsx**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS

- **_ButtonChip.tsx**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **GamePlay** _GameDash, GameCards_
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS

- **GameDash.tsx** _Time, Moves, ButtonChip_
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **Timer.tsx**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - custom context (see context section) ✅
  - style with pure CSS ✅

- **Moves.tsx**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - custom context (see context section) ✅
  - style with pure CSS ✅

- **GameCards.tsx** _Card_
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **Card.tsx**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **GameEnd.tsx** _InputText, ButtonChip_ **TODO: NEXT 2**
  - write integration and unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - prep player stats to send to database via custom hook ✅
  - style with pure CSS ✅

- **InputText.tsx**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

- **LeaderboardTable** **TODO: NEXT 3**
  - write unit tests ✅
  - basic html structure ✅
  - transform to TS ✅
  - style with pure CSS ✅

## Context

- write TimerContext ✅
- create MovesContext ✅

## Game Data

These data will be created in a file locally called `gameData.ts`.

- **Cloudinary Cards List**
  - public id for the face card images ✅
  - public id for the cover image ✅

- **Deck of cards**
  - the deck of 8 cards ✅
  - the cover card ✅
  - other meta about the cards ✅
  - placeholder image for the cards ✅

- **Leaderboard** **TODO: NEXT 4.2**
  - create type for the leaderboard data ✅
  - create dummy data, for the player to feel competition ✅

## Commit styles

- **feat**: a new feature is introduced with the changes
- **fix**: a bug fix has occurred
- **chore**: changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- **refactor**: refactored code that neither fixes a bug nor adds a feature
- **docs**: updates to documentation such as a the README or other markdown files
- **style**: changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- **test**: including new or correcting previous tests
- **perf**: performance improvements
- **ci**: continuous integration related
- **build**: changes that affect the build system or external dependencies
- **revert**: reverts a previous commit 
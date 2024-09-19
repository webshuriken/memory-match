import {render, screen, within} from '@testing-library/react';
import GameCards from './GameCards';
import { DeckOfCards } from '../../globals/gameData';

const gameInProgress = false;

describe('Game Cards component', () => {
  let list: HTMLElement;
  let items: HTMLElement[];

  beforeEach(() => {
    render(<GameCards handleCardClick={jest.fn} />);
    list = screen.getByRole('list');
    items = within(list).getAllByRole('listitem');
  });

  test('renders with no issues', () => {
    expect(screen).toBeTruthy();
  });

  test('has element with role: list', () => {
    expect(list).toBeInTheDocument();
  });

  // generic test, as the game currently only handles a deck of 8 cards
  test('list has 16 items', () => {
    const deckLength = DeckOfCards.cards.faces.length;
    expect(items).toHaveLength(deckLength);
  });
  
  test('inside each items,there is element with role: button', () => {
    const button = within(items[0]).getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('each role: button has 2 images', () => {
    const images = within(items[0]).getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  test('cover image has src = "cards-placeholder.png" with alt = "poker mixed with some old doodles"', () => {
    const imgSrc = 'cards-placeholder.png';
    const imgAlt = 'poker mixed with some old doodles';
    const images = within(items[0]).getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', imgSrc);
    expect(images[0]).toHaveAttribute('alt', imgAlt);
  });

  test('face image has src = "cards-placeholder.png" with alt = "this is a memory card so, no peaking"', () => {
    const imgSrc = 'cards-placeholder.png';
    const imgAlt = 'this is a memory card so, no peaking';
    const images = within(items[0]).getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', imgSrc);
    expect(images[1]).toHaveAttribute('alt', imgAlt);
  });
});
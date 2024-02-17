import {render, screen, within} from '@testing-library/react';
import GameCards from './GameCards';
import { DeckOfCards } from '../../globals/gameData';


describe('Game Cards component', () => {
  let list: HTMLElement;
  let items: HTMLElement[];

  beforeEach(() => {
    render(<GameCards cards={DeckOfCards.cards} handleMatchFound={jest.fn} />);
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
    expect(items).toHaveLength(16);
  });
  
  test('inside each items,there is element with role: button', () => {
    const button = within(items[0]).getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('each role: button has 2 images', () => {
    const images = within(items[0]).getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  test('one image has src = "cards-placeholder.png" with alt = "this is a memory card so, no peaking"', () => {
    const imgSrc = 'cards-placeholder.png';
    const imgAlt = 'this is a memory card so, no peaking';
    const images = within(items[0]).getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', imgSrc);
    expect(images[1]).toHaveAttribute('alt', imgAlt);
  });
});
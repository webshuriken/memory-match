import {render, screen, within} from '@testing-library/react';
import GameCards from './GameCards'
import { DeckOfCardsIntfc } from '../../globals/types';


// deck of card object demo
const desckOfCards: DeckOfCardsIntfc = {
  author: {
    name: [
      'Amy Sutton',
      'Carlos E Alford'
    ],
    site: [
      'https://amythehatter.com/',
      'https:carlosealford.com/'
    ]
  },
  cards: {
    alt: 'no peaking',
    faces: [{
      src: '#'
    },
    {
      src: '#'
    },
    {
      src: '#'
    },
    {
      src: '#'
    },
    {
      src: '#'
    },
    {
      src: '#'
    },
    {
      src: '#'
    },
    {
      src: '#'
    }],
    cover: {
      alt: 'poker mixed with some old doodles',
      src: '#'
    },
  },
  size: 8,
  theme: 'poker'
}

describe('Game Cards component', () => {
  beforeEach(() => {
    render(<GameCards cards={desckOfCards.cards} handleMatchFound={jest.fn} />);
  });

  test('renders with no issues', () => {
    expect(screen).toBeTruthy();
  });

  test('has element with role: list', () => {
    const ul = screen.getByRole('list');
    expect(ul).toBeInTheDocument();
  });

  // generic test, as the game currently only handles a deck of 8 cards
  test('renders correct number of list items', () => {
    const ul = screen.getByRole('list');
    const li = within(ul).getAllByRole('listitem');
    expect(li).toHaveLength(16);
  });
  
  test('list items, enclose element with role: button', () => {
    const ul = screen.getByRole('list');
    const li = within(ul).getAllByRole('listitem');
    const button = within(li[0]).getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
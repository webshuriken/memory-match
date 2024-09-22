import { screen, render, within } from "@testing-library/react";
import GamePlay from "./GamePlay";
import { iCardsType } from "../../custom-types/types";
import { DeckOfCards } from "../../globals/gameData";


const cards: iCardsType = {
  alt: 'no peaking',
  faces: [{
    src: '#'
  }],
  cover: {
    alt: 'poker mixed with some old doodles',
    src: '#'
  },
}

describe('GamePlay component', () => {
  beforeEach(() => {
    render(<GamePlay gameReady setGameReady={jest.fn} />);
  });

  test('game component renders', () => {
    expect(screen).toBeTruthy();
  });

  test('the dashboard renders', () => {
    const dashboard = screen.getByRole('complementary');
    expect(within(dashboard).getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(within(dashboard).getByText('0')).toBeInTheDocument();
    expect(within(dashboard).getByText('Moves')).toBeInTheDocument();
    expect(within(dashboard).getByText('Timer')).toBeInTheDocument();
    expect(screen.getByRole('timer', { name: /game timer/i })).toBeInTheDocument();
  });

  test('the gamecard renders', () => {
    const list = screen.getByRole('list');
    const listitem = within(list).getAllByRole('listitem');
    const metaDeckLength = DeckOfCards.cards.faces.length * 2;
    expect(list).toBeInTheDocument();
    expect(listitem[0]).toBeInTheDocument();
    expect(listitem).toHaveLength(metaDeckLength);
    expect(within(listitem[0]).getByRole('button'));
  });
});

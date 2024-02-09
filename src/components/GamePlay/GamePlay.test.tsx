import { screen, render, within } from "@testing-library/react";
import GamePlay from "./GamePlay";
import { Cards } from "../../globals/types";


const cards: Cards = {
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
    render(<GamePlay cards={cards} gameInProgress={jest.fn} />);
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
    expect(list).toBeInTheDocument();
    expect(listitem[0]).toBeInTheDocument();
    expect(listitem).toHaveLength(2);
    expect(within(listitem[0]).getByRole('button'));
  });
});

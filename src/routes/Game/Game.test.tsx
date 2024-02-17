import { within, render, screen } from '@testing-library/react'
import Game from './Game'
import { MemoryRouter } from 'react-router-dom'


describe('Game component tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
  });

  test('component renders', () => {
    expect(screen).toBeTruthy();
  });

  describe('Dashboard section', () => {
    // the status section
    test('reset button loads', () => {
      const resetButton = screen.getByRole('button', { name: /reset/i });
      expect(resetButton).toBeInTheDocument();
    });

    test('moves section renders', () => {
      const dashboard = screen.getByRole('status');
      expect(within(dashboard).getByText(/moves/i)).toBeInTheDocument();
      expect(within(dashboard).getByText('0')).toBeInTheDocument();
    });

    test('timer renders', () => {
      const dashboard = screen.getByRole('status');
      const timer = within(dashboard).getByRole('timer');
      expect(within(dashboard).getByText(/timer/i)).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(within(timer).getByText('00:00')).toBeInTheDocument();
    });

    describe('Cards section', () => {
      let list:HTMLElement;
      let items:HTMLElement[];

      beforeEach(() => {
        list = screen.getByRole('list');
        items = within(list).getAllByRole('listitem')
      });

      test('has a list', () => {
        expect(list).toBeInTheDocument();
      });

      test('list has 16 items', () => {
        expect(items).toHaveLength(16);
      });

      test('an item has a button', () => {
        expect(within(items[0]).getByRole('button')).toBeInTheDocument();
      });

      test('a button has 2 images', () => {
        const images = within(items[0]).getAllByRole('img');
        expect(images).toHaveLength(2);
      });

      test('cover image does not have default src "cards-placeholder.png" with alt "poker mixed with some old doodles"', () => {
        const imgSrc = 'cards-placeholder.png';
        const imgAlt = 'poker mixed with some old doodles';
        const images = within(items[0]).getAllByRole('img');
        expect(images[0]).not.toHaveAttribute('src', imgSrc);
        expect(images[0]).toHaveAttribute('alt', imgAlt);
      });

      test('face image cover does not have default src = "" with alt = "this is a memory card so, no peaking"', () => {
        const imgSrc = 'cards-placeholder.png';
        const imgAlt = 'this is a memory card so, no peaking';
        const images = within(items[0]).getAllByRole('img');
        expect(images[1]).not.toHaveAttribute('src', imgSrc);
        expect(images[1]).toHaveAttribute('alt', imgAlt);
      });
    });
  });
});
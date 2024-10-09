import { within, render, screen } from '@testing-library/react'
import Game from './Game'
import App from '../App/App'
import { MemoryRouter, Routes, Route } from 'react-router-dom'


const RouterWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Game component tests', () => {
  test('component renders', () => {
    render(<Game />, { wrapper: RouterWrapper });
    expect(screen).toBeTruthy();
  });

  describe('Dashboard section', () => {
    // the status section
    test('reset button loads', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const resetButton = screen.getByRole('button', { name: /reset/i });

      expect(resetButton).toBeInTheDocument();
    });

    test('moves section renders', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const dashboard = screen.getByRole('status');

      expect(within(dashboard).getByText(/moves/i)).toBeInTheDocument();
      expect(within(dashboard).getByText('0')).toBeInTheDocument();
    });

    test('timer renders', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const dashboard = screen.getByRole('status');
      const timer = within(dashboard).getByRole('timer');

      expect(within(dashboard).getByText(/timer/i)).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(within(timer).getByText('00:00')).toBeInTheDocument();
    });
  });

  describe('Cards section', () => {
    test('has a list', () => {
      render(<Game />, { wrapper: RouterWrapper });
      expect(screen.getAllByRole('list')[1]).toBeInTheDocument();
    });

    test('list has 16 items', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const list = screen.getAllByRole('list');
      expect(within(list[1]).getAllByRole('listitem')).toHaveLength(16);
    });

    test('an item has a button', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const list = screen.getAllByRole('list');
      const items = within(list[1]).getAllByRole('listitem');
      expect(within(items[0]).getByRole('button')).toBeInTheDocument();
    });

    test('a button has 2 images', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const list = screen.getAllByRole('list');
      const items = within(list[1]).getAllByRole('listitem');
      const images = within(items[0]).getAllByRole('img');
      expect(images).toHaveLength(2);
    });

    test('cover image does not have default src "cards-placeholder.png" with alt "poker mixed with some old doodles"', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const list = screen.getAllByRole('list');
      const items = within(list[1]).getAllByRole('listitem');
      const imgSrc = 'cards-placeholder.png';
      const imgAlt = 'poker mixed with some old doodles';
      const images = within(items[0]).getAllByRole('img');
      expect(images[0]).not.toHaveAttribute('src', imgSrc);
      expect(images[0]).toHaveAttribute('alt', imgAlt);
    });

    test('face image cover does not have default src = "" with alt = "this is a memory card so, no peaking"', () => {
      render(<Game />, { wrapper: RouterWrapper });
      const list = screen.getAllByRole('list');
      const items = within(list[1]).getAllByRole('listitem');
      const imgSrc = 'cards-placeholder.png';
      const imgAlt = 'this is a memory card so, no peaking';
      const images = within(items[0]).getAllByRole('img');
      expect(images[1]).not.toHaveAttribute('src', imgSrc);
      expect(images[1]).toHaveAttribute('alt', imgAlt);
    });
  });
});
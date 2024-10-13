import { render, screen, within, fireEvent } from '@testing-library/react';
import Settings from './Settings';
import App from '../App/App';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AvailableGameDecks } from '../../globals/gameData';


const RoutesWrapper: React.FC<{children: JSX.Element}> = ({children}) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Settings component tests', () => {
  test('component renders', () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    expect(screen).toBeTruthy();
  });

  test('shows correct title', () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  test('Play Again buttons shows up', () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
  });

  test('Available Decks title is there', () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    expect(screen.getByText('Available Decks')).toBeInTheDocument();
  });

  test('Both decks show up within list items', () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    const deckAName = AvailableGameDecks[0].theme;
    const deckBName = AvailableGameDecks[1].theme;
    expect(screen.getByText(deckAName)).toBeInTheDocument();
    expect(screen.getByText(deckBName)).toBeInTheDocument();
  });

  test('First deck shows as Active and seconds as Disabled', () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    // a bit of prep to grab what we need
    const deckAName = screen.getByText(AvailableGameDecks[0].theme);
    const deckBName = screen.getByText(AvailableGameDecks[1].theme);
    const deckAArticle = deckAName.closest('article');
    const deckBArticle = deckBName.closest('article');
    let deckAState, deckBState;
    // the component can be null so lets catch that bit
    if (deckAArticle && deckBArticle) {
      deckAState = within(deckAArticle).getByText(/active/i);
      deckBState = within(deckBArticle).getByText(/disabled/i);
    }
    // check deck one for active state
    expect(deckAState).toBeInTheDocument();
    // check deck two for inactive state
    expect(deckBState).toBeInTheDocument();
  });

  test('Selecting second deck makes it Active and first deck Disabled', async () => {
    render(<Settings />, { wrapper: RoutesWrapper });
    // check the first deck is active and second one is disabled
    const firstDeckStatus = screen.getByText('active');
    const secondDeckStatus = screen.getByText('disabled');
    const deckAArticle = firstDeckStatus.closest('article');
    const deckBArticle = secondDeckStatus.closest('article');

    expect(firstDeckStatus).toBeInTheDocument();
    expect(secondDeckStatus).toBeInTheDocument();

    // Find the "Select Deck" button for the second deck
    const selectDeckButtons = screen.getAllByRole('button', { name: /Select Deck/i });
    const selectSecondDeckButton = selectDeckButtons[1]; // Assuming the second button belongs to the second deck

    // Simulate a click event on the "Select Deck" button for the second deck
    // used fireEvent instead of userEvent because it was not working
    fireEvent.click(selectSecondDeckButton);
    
    let updatedFirstDeckStatus, updatedSecondDeckStatus;
    // the component can be null so lets catch that bit
    if (deckAArticle && deckBArticle) {
      updatedFirstDeckStatus = within(deckAArticle).getByText(/disabled/i);
      updatedSecondDeckStatus = within(deckBArticle).getByText(/active/i);
    }

    expect(updatedFirstDeckStatus).toBeInTheDocument();
    expect(updatedSecondDeckStatus).toBeInTheDocument();
  });
});
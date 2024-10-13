import { render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Game from '../Game/Game';
import Leaderboard from '../Leaderboard/Leaderboard';
import Settings from '../Settings/Settings';
import About from '../About/About';


// This component is made up of other bigger component so lets do 
// some intergration tests, and make sure the pages load with the navigation
const routesWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={children}>
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

// unit tests for the small section created by this component
describe('App component and children', () => {
  test('app banner shows up', () => {
    render(<App />, { wrapper: routesWrapper });
    const appHeader = screen.getByRole('banner');

    expect(appHeader).toBeInTheDocument();
  });

  test('user click on menu button expands navigation', () => {
    render(<App />, { wrapper: routesWrapper });
    const appHeader = screen.getByRole('banner');
    const menuButton = within(appHeader).getByRole('button', {name: 'Menu'});
    
    act(() => {
      userEvent.click(menuButton);
    });

    // the navigation component must load before we can do intergration tests
    expect(within(appHeader).getByRole('navigation')).toBeInTheDocument();
  });

  // Dashboard
  describe('Renders the root route', () => {
    test('reset button renders', () => {
      render(<App />, { wrapper: routesWrapper });
      const daddyElem = screen.getByRole('main');

      const button = within(daddyElem).getByRole('button', {name: /reset/i});
      expect(button).toBeInTheDocument();
    });
    
    test('moves title and starting value are correct', () => {
      render(<App />, { wrapper: routesWrapper });
      const daddyElem = screen.getByRole('main');
      
      expect(within(daddyElem).getByText(/moves/i)).toBeInTheDocument();
      expect(within(daddyElem).getByText('0')).toBeInTheDocument();
    });
    
    test('timer renders with correct title and timer value', () => {
      render(<App />, { wrapper: routesWrapper });
      const daddyElem = screen.getByRole('main');

      expect(within(daddyElem).getByText(/timer/i)).toBeInTheDocument();
      expect(within(daddyElem).getByText('00:00')).toBeInTheDocument();
    });

    test('loads a deck of 16 cards', () => {
      render(<App />, { wrapper: routesWrapper });
      const daddyElem = screen.getByRole('main');
      const list = within(daddyElem).getByRole('list')
      
      expect(within(list).getAllByRole('listitem')).toHaveLength(16);
    });
  });

  
  // integration test for the leaderboard page
  describe('Renders the leaderboard route', () => {
    test('renders the leaderboard header', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/leaderboard/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByRole('heading', {name: /leaderboard/i})).toBeInTheDocument();
    });
    
    test('renders button to play again', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/leaderboard/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByRole('button', {name: /play again/i})).toBeInTheDocument();
    });
    
    test('check a table exists on the page', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/leaderboard/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByRole('table')).toBeInTheDocument();
    });
  });

  // integration test for the settings page
  describe('Renders the Settings page', () => {
    test('renders the settings page header', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/settings/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByRole('heading', {name: /settings/i})).toBeInTheDocument();
    });
  });

  // integration test for the about page
  describe('Renders the About page', () => {
    test('renders the page heading', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/about/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByRole('heading', {name: /about/i})).toBeInTheDocument();
    });

    test('button to replay is rendered', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/about/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByRole('button', {name: /play again/i})).toBeInTheDocument();
    });

    test('team heading is loaded', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/about/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getByText(/team effort/i)).toBeInTheDocument();
    });

    test('renders two images', () => {
      render(<App />, { wrapper: routesWrapper });
      const navigation = screen.getByRole('navigation');
      // click on the leaderboard button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/about/i));
      });

      const daddyElem = screen.getByRole('main');
      expect(within(daddyElem).getAllByRole('img')).toHaveLength(2);
    });
  });

});
import { render, screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Play from '../Play/Play';
import Leaderboard from '../Leaderboard/Leaderboard';
import Settings from '../Settings/Settings';
import About from '../About/About';


// This component is made up of other bigger component so lets do 
// some intergration tests, and make sure the pages load with the navigation
beforeEach(() => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Play />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
});

// unit tests for the small section created by this component
describe('App header render all components within', () => {
  let appHeader: HTMLElement;

  beforeEach(() => {
    appHeader = screen.getByRole('banner');
  })
  
  test('app banner shows up', () => {
    expect(appHeader).toBeInTheDocument();
  });

  test('user click on menu button expands navigation', async () => {
    const menuButton = within(appHeader).getByRole('button', {name: 'Menu'});
    
    act(() => {
      userEvent.click(menuButton);
    });

    // the navigation component must load before we can do intergration tests
    expect(within(appHeader).getByRole('navigation')).toBeInTheDocument();
  });
});


// integration test for root route
describe('Renders all the routes when user clicks on nav link', () => {
  // use the menu button to open the navigation before each test
  let menuButton: HTMLElement;
  // we will use this to check that the page was loaded within the main element
  let daddyElem: HTMLElement;

  beforeEach(() => {
    menuButton = screen.getByRole('button', {name: 'Menu'});
    daddyElem = screen.getByRole('main');

    // open the navigation ready for the tests
    act(() => {
      userEvent.click(menuButton);
    })
  });

  // Dashboard
  describe('Renders the root route', () => {
    // locate the navigation links
    let navigation: HTMLElement;

    // load the root route before each test
    beforeEach(() => {
      navigation = screen.getByRole('navigation');
      
      // click on the Play (home) button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/play/i));
      });
    });

    test('reset button renders', () => {
      const button = within(daddyElem).getByRole('button', {name: /reset/i});
      expect(button).toBeInTheDocument();
    });
    
    test('moves title and starting value are correct', () => {
      expect(within(daddyElem).getByText(/moves/i)).toBeInTheDocument();
      expect(within(daddyElem).getByText('0')).toBeInTheDocument();
    });
    
    test('timer renders with correct title and timer value', () => {
      expect(within(daddyElem).getByText(/timer/i)).toBeInTheDocument();
      expect(within(daddyElem).getByText('00:00')).toBeInTheDocument();
    });

    test('loads a deck of 16 cards', () => {
      expect(within(daddyElem).getByRole('list').children).toHaveLength(16);
    });
  });

  // integration test for the leaderboard page
  describe('Renders the leaderboard route', () => {
    // locate the navigation links
    let navigation: HTMLElement;

    // load the root route before each test
    beforeEach(() => {
      navigation = screen.getByRole('navigation');
      
      // click on the Play (home) button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/leaderboard/i));
      });
    });

    test('renders the leaderboard header', () => {
      expect(within(daddyElem).getByRole('heading', {name: /leaderboard/i})).toBeInTheDocument();
    });

    test('renders button to play again', () => {
      expect(within(daddyElem).getByRole('button', {name: /play again/i})).toBeInTheDocument();
    });

    test('check a table exists on the page', () => {
      expect(within(daddyElem).getByRole('table')).toBeInTheDocument();
    });
  });

  // integration test for the settings page, not MVP
  // just test the title and under construction message
  describe('Renders the Settings page, not MVP', () => {
    // locate the navigation links
    let navigation: HTMLElement;

    // load the root route before each test
    beforeEach(() => {
      navigation = screen.getByRole('navigation');
      
      // click on the Play (home) button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/settings/i));
      });
    });

    test('renders the settings page header', () => {
      expect(within(daddyElem).getByRole('heading', {name: /settings/i})).toBeInTheDocument();
    });

    test('shows underconstruction text', () => {
      expect(within(daddyElem).getByText(/under construction/i)).toBeInTheDocument();
    });
  });

  // integration test for the about page
  describe('Renders the About page', () => {
    // locate the navigation links
    let navigation: HTMLElement;

    // load the root route before each test
    beforeEach(() => {
      navigation = screen.getByRole('navigation');
      
      // click on the Play (home) button to load page
      act(() => {
        userEvent.click(within(navigation).getByText(/settings/i));
      });
    });

    test('renders the page heading', () => {
      expect(within(daddyElem).getByRole('heading', {name: /about/i})).toBeInTheDocument();
    });

    test('button to replay is rendered', () => {
      expect(within(daddyElem).getByRole('button', {name: /play again/i})).toBeInTheDocument();
    });

    test('team heading is loaded', () => {
      expect(within(daddyElem).getByText(/team effort/i)).toBeInTheDocument();
    });

    test('renders two images', () => {
      expect(within(daddyElem).getAllByRole('img')).toHaveLength(2);
    });
  });
});
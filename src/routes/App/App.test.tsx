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

import { act, cleanup, render, screen, within } from '@testing-library/react';
import Moves from './Moves';
import { MovesContext } from '../../context/MovesContext';


describe('Moves component renders', () => {
  let mother: HTMLElement;

  beforeEach(() => {
    render(<Moves />);
    mother = screen.getByRole('article');
  });

  test('component renders within article element', () => {    
    expect(mother).toBeInTheDocument();
  });
  
  test('renders with a text saying Moves', () => {
    const expectedText = 'Moves';
    expect(within(mother).getByText(expectedText)).toBeInTheDocument();
  });
  
  test('moves counter text starts with 0', () => {
    expect(within(mother).getByText('0')).toBeInTheDocument();
  });
});

describe('Moves text reflects a users move', () => {
  test('lets move twice and see the number 2', () => {
    const expectedText = 2;

    render(
      <MovesContext.Provider value={expectedText}>
        <Moves />
      </MovesContext.Provider>
    );
    
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
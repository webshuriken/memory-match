import {render, screen, within} from '@testing-library/react';
import Moves from './Moves';


describe('Moves component renders', () => {
  let mother: HTMLElement;

  beforeEach(() => {
    render(<Moves>0</Moves>);
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

// separate this test as I need to pass a different child to it
test('the components children appear as they should', () => {
  render(<Moves>1</Moves>);
  let mother: HTMLElement = screen.getByRole('article');

  expect(within(mother).getByText('1')).toBeInTheDocument();
});
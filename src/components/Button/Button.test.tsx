import renderer from 'react-test-renderer';
import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Button from './Button';

// snapshot tests
it('renders a button correctly', () => {
  const component = renderer.create(<Button value="Play" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

// Units tests
test('renders a button with the value Play', () => {
  render(<Button value="Play" />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('Play');
});
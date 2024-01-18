import renderer from 'react-test-renderer';
import { describe, expect, test } from '@jest/globals';
import Button from './Button';

it('renders a button correctly', () => {
  const component = renderer.create(<Button value="Play" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

// test('renders a button with the value Test', () => {
//   render(<Button value="Test" />);
//   const button = screen.getByRole('button');
//   expect(button).toHaveTextContent('Test');
// });
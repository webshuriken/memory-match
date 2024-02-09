import { act, render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card, { Props } from "./Card";


const cardDetails:Props = {
  alt: 'no peeking',
  cover: {
    src: '#',
    alt: 'back of the card'
  },
  card: {
    src: '#',
    flipped: false,
    id: 1
  },
  handleClick: jest.fn()
}

describe('Card component', () => {
  test('component renders', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        card={cardDetails.card} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick}
      />
    );
    expect(screen).toBeTruthy();
  });

  describe('Component parts render', () => {
    let button: HTMLElement;
  
    beforeEach(() => {
      render(
        <Card 
          cover={cardDetails.cover} 
          card={cardDetails.card} 
          alt={cardDetails.alt} 
          handleClick={cardDetails.handleClick} 
        />
      );
      button = screen.getByRole('button', { name: /game card/i });
    });

    test('found element role: button and name: game card', () => {
      expect(button).toBeInTheDocument();
    });

    test('there is an image with aria label: no peeking', () => {
      const img = within(button).getByRole('img', { name: /no peeking/i });
      expect(img).toBeInTheDocument();
    });

    test('image with aria label: no peeking has correct attributes', () => {
      const img = within(button).getByRole('img', { name: /no peeking/i });
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });

    test('there is an image with aria label: back of the card', () => {
      const img = within(button).getByRole('img', { name: /back of the card/i });
      expect(img).toBeInTheDocument();
    });

    test('image with aria label: back of the card has correct attributes', () => {
      const img = within(button).getByRole('img', { name: /back of the card/i });
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });

    test('button calls the passed in function', () => {
      act(() => {
        userEvent.click(button);
        userEvent.click(button);
      });

      expect(cardDetails.handleClick).toHaveBeenCalledTimes(2);
    });
  });
});

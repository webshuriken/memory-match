import { render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card, { Props } from "./Card";


const cardDetails:Props = {
  alt: 'no peeking',
  cover: {
    src: '#',
    alt: 'back of the card'
  },
  face: {
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
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick}
      />
    );
    expect(screen).toBeTruthy();
  });

  test('found element role: button and name: game card', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick} 
      />
    );
    const button = screen.getByRole('button', { name: /game card/i });
    expect(button).toBeInTheDocument();
  });

  test('there is an image with aria label: no peeking', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick} 
      />
    );
    const button = screen.getByRole('button', { name: /game card/i });
    const img = within(button).getByRole('img', { name: /no peeking/i });
    expect(img).toBeInTheDocument();
  });

  test('image with aria label: no peeking has correct attributes', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick} 
      />
    );
    const button = screen.getByRole('button', { name: /game card/i });
    const img = within(button).getByRole('img', { name: /no peeking/i });
    expect(img).toHaveAttribute('src');
    expect(img).toHaveAttribute('alt');
  });

  test('there is an image with aria label: back of the card', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick} 
      />
    );
    const button = screen.getByRole('button', { name: /game card/i });
    const img = within(button).getByRole('img', { name: /back of the card/i });
    expect(img).toBeInTheDocument();
  });

  test('image with aria label: back of the card has correct attributes', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick} 
      />
    );
    const button = screen.getByRole('button', { name: /game card/i });
    const img = within(button).getByRole('img', { name: /back of the card/i });
    expect(img).toHaveAttribute('src');
    expect(img).toHaveAttribute('alt');
  });

  test('button calls the passed in function', () => {
    render(
      <Card 
        cover={cardDetails.cover} 
        face={cardDetails.face} 
        alt={cardDetails.alt} 
        handleClick={cardDetails.handleClick} 
      />
    );
    const button = screen.getByRole('button', { name: /game card/i });
    userEvent.click(button);
    userEvent.click(button);

    expect(cardDetails.handleClick).toHaveBeenCalledTimes(2);
  });
});

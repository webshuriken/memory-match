import React from 'react';
import Button from '../Button/Button';


function Home() {
  return (
    <div>
      <h1>Memory Match</h1>
      <p data-testid="welcomeMsg">Are you ready to test your memory?</p>
      <Button bText="Play" />
    </div>
  );
}

export default Home;
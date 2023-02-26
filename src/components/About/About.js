import React from "react";
import Button from "../Button/Button";


function About() {
  return (
    <section>
      <p data-testid="aboutContent">A little something about the game and stuff</p>
      <Button bText="Exit" />
    </section>
  )
}

export default About;
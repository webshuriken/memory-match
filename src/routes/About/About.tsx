import PageHeader from "../../components/PageHeader/PageHeader";
import './About.css';
import webshurikenURL from '../../globals/carlos-profile.png';
import amythehatterURL from '../../globals/amy-the-hatter.png';


export default function About(): JSX.Element {
  const msg = "Memory Match is a fun memory game using cards.";

  return (
    <section className="about">
      <PageHeader 
        title="About" 
        msg={msg}
      />
      <div className="about-body">
        <div className="about-body__content">
          <p>There are 16 cards on the deck, each with a matching pair. The goal is to find all the pairs in the quickest time possible, using the least amount of moves.</p>
          <p>Currently there is only 1 set of cards to choose from. I shall be bringing out move decks to choose from and in the near future make it possible for people to submit their own decks.</p>
        </div>
        <div className="about-body__team">
          <h2>Team effort</h2>
          <ul className="about-team-list">
            <li>
              <img src={amythehatterURL} height="60" width="60" alt="profile" className="team-list__profile" />
              <p className="team-list__profession">Miller / Character designer</p>
              <p>
                <a href="https://amythehatter.com" className="team-list__name">Amy L Sutton @amythehatter</a>
              </p>
            </li>
            <li>
              <img src={webshurikenURL} height="60" width="60" alt="profile" className="team-list__profile" />
              <p className="team-list__profession">Software Developer</p>
              <p>
                <a href="https://carlosealford.com" className="team-list__name">Carlos E Alford @webshuriken</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

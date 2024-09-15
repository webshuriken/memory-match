import PageHeader from "../../components/PageHeader/PageHeader";


export default function About(): JSX.Element {
  return (
    <article>
      <PageHeader 
        title="About" 
        msg="Memory Match is a fun memory game using cards."
      />
      <div className="about-body">
        <div className="about-body__content">
          <p>There are 16 cards on the deck, each with a matching pair. The goal is to find all the pairs in the quickest time possible, using the least amount of moves.</p>
          <p>Currently there is only 1 set of cards to choose from. I shall be bringing out move decks to choose from and in the near future make it possible to people to submit their own decks.</p>
        </div>
        <div className="about-body__team">
          <h2>Team effort</h2>
          <ul>
            <li>
              <img src="" alt="profile image" className="about-team__profile" />
              <p className="about-team__profession">Miller - the hatter</p>
              <p>
                <a href="https://amythehatter.com" className="about-team__name">Amy L Sutton</a>
              </p>
            </li>
            <li>
              <img src="" alt="profile image" className="about-team__profile" />
              <p className="about-team__profession">Software Developer - webshuriken</p>
              <p>
                <a href="https://carlosealford.com" className="about-team__name">Carlos Alford</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}

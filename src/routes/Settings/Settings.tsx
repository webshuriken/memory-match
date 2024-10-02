import PageHeader from "../../components/PageHeader/PageHeader";
import { useSettings } from "../App/App";
import { fetchImageURL } from "../../utils";
import './Settings.css';


export default function Settings(): JSX.Element {
  // global context so we can change some game settings
  const [settings, setSettings] = useSettings();

  const msg = "Want to make some changes to the game?";

  return (
    <section className="settings">
      <PageHeader 
        title="Leaderboard" 
        msg={msg}
      />
      <div className="settings-body">
        <ul className="settings-decks-list">
          {
            settings == null 
            ?
              <p>NO SETTINGS AVAILABLE</p>
            :
              settings.availableDecks.map((deck, index) => (
                <li>
                  <article className="deck-view">
                    <img src={fetchImageURL(deck.cards.cover.src)} alt="" className="deck-view__cover" />
                    <h3 className="deck-view__name">
                      <span>Name: </span>
                      {deck.theme}
                    </h3>
                    <p className="deck-view__authors">
                      <span>Author(s): </span>
                      {deck.author.name.join(", ")}
                    </p>
                    <button className="deck-view__button">
                      {settings.activeDeckIndex === index ? "Active" : "disabled"}
                    </button>
                    <ul className="deck-view__face-list">
                      {
                        deck.cards.faces.map(face => (
                          <li>
                            <img src={fetchImageURL(face.src)} alt={deck.cards.alt} className="deck-view__face-list-img" />
                          </li>
                        ))
                      }
                    </ul>
                  </article>
                </li>
              ))
          }
        </ul>
      </div>
    </section>
  )
}

import PageHeader from "../../components/PageHeader/PageHeader";
import { useSettings } from "../App/App";
import { fetchImageURL } from "../../utils";
import './Settings.css';


export default function Settings(): JSX.Element {
  // global context so we can change some game settings
  const [settings, setSettings] = useSettings();
  const msg = "Want to make some changes to the game?";

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    console.log("WHEN YOU ARE NOT HERE WITH ME");
  }

  return (
    <section className="settings">
      <PageHeader 
        title="Settings" 
        msg={msg}
      />
      <div className="settings-body">
        <ul className="settings-decks-list">
          {
            settings == null 
            ?
              <p>NO SETTINGS AVAILABLE</p>
            :
              settings.availableDecks.map((deck, index) => {
                const buttonState = settings.activeDeckIndex === index ? "active" : "disabled";
                return (
                  <li key={index}>
                    <article className="deck-view">
                      <img src={fetchImageURL(deck.cards.cover.src)} alt="" className="deck-view__cover" />
                      <h3 className="deck-view__name">{deck.theme}</h3>
                      <p className="deck-view__authors">{deck.author.name.join(", ")}</p>
                      <button onClick={handleClick} className={`deck-view__button ${buttonState}`}>
                        {buttonState}
                      </button>
                      <ul className="deck-view__face-list">
                        {
                          deck.cards.faces.map(face => (
                            <li key={face.src}>
                              <img src={fetchImageURL(face.src)} alt={deck.cards.alt} className="deck-view__face-list-img" />
                            </li>
                          ))
                        }
                      </ul>
                    </article>
                  </li>
                )
            })
          }
        </ul>
      </div>
    </section>
  )
}

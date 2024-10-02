import PageHeader from "../../components/PageHeader/PageHeader";
import './Settings.css';


const msg = "Want to make some changes to the game?";

export default function Settings(): JSX.Element {
  return (
    <section className="settings">
      <PageHeader 
        title="Leaderboard" 
        msg={msg}
      />
      <div className="settings-body">
        <p>Comings soon..</p>
      </div>
    </section>
  )
}

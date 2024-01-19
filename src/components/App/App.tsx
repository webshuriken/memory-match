import './App.css';
import Home from '../Home/Home';
import Game from '../Game/Game.js';
import Leaderboard from '../Leaderboard/Leaderboard.js';
import About from '../About/About.js';
import Settings from '../Settings/Settings';


// TODO:
// - Implemente react router
// - I dont know if i want to separate the Header and Footer into their own components..
// - Import and use the Nav component
export default function App(): JSX.Element {
  return (
    <section className="App">
      <header>
        <h2>Memory Match</h2>
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <p data-testid="footerCopyright">2023 Memory Match - All rights reserved.</p>
        <p>Developed by <a href="https://carlosealford.com">Carlos E Alford</a></p>
      </footer>
    </section>
  );
}

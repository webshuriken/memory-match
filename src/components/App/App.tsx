import './App.css';
import Home from '../Home/Home';
import Game from '../Game/Game.js';
import Leaderboard from '../Leaderboard/Leaderboard.js';
import About from '../About/About.js';
import Settings from '../Settings/Settings';


export default function App(): JSX.Element {
  return (
    <section className="App">
      <header>
        <p data-testid="brandName">Memory Match</p>
      </header>
      {/* the main content will be one of 5 pages, home, game, settings, leaderboard, about */}
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

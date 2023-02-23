import './App.css';
import Home from '../Home/Home.js';
import Game from '../Game/Game.js';
import Leaderboard from '../Leaderboard/Leaderboard.js';
import About from '../About/About.js';
import Settings from '../Settings/Settings';


function App() {
  return (
    <section className="App">
      <header>
        <p>Memory Match</p>
      </header>
      {/* the main content will be one of 5 pages, home, game, settings, leaderboard, about */}
      <main>
        <Home />
      </main>
      <footer>
        <p>2023 copyright - memory match</p>
        <p>Developed by <a href="https://carlosealford.com">Carlos E Alford</a></p>
      </footer>
    </section>
  );
}

export default App;

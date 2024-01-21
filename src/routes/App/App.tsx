import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from '../../components/Nav/Nav';


// TODO:
// - Implemente react router
// - I dont know if i want to separate the Header and Footer into their own components..
// - Import and use the Nav component
export default function App(): JSX.Element {
  console.log("APP component reloading: ", Outlet)

  return (
    <section className="App">
      <header>
        <h2>Memory Match</h2>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p data-testid="footerCopyright">2023 Memory Match - All rights reserved.</p>
        <p>Developed by <a href="https://carlosealford.com">Carlos E Alford</a></p>
      </footer>
    </section>
  );
}

import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';


export default function App(): JSX.Element {

  return (
    <div className="App">
      <header className="app-header">
        <span>Memory Match</span>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

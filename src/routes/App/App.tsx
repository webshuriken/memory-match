import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from '../../components/Nav/Nav';


export default function App(): JSX.Element {

  return (
    <div className="App">
      <header className="app-header">
        <span>Memory Match</span>
        <Nav />
      </header>
      {/* each page declares its own main element */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

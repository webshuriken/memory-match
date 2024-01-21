import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';
import App from './routes/App/App';
import RouteError from './components/RouteError';
import Play from './routes/Play/Play';
import Leaderboard from './routes/Leaderboard/Leaderboard';
import Settings from './routes/Settings/Settings';
import About from './routes/About/About';


// router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/',
        element: <Play />
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'about',
        element: <About />
      },
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

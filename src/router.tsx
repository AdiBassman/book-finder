import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';

/**
 * Central route table. More routes (search, book detail, shelf, stats,
 * 404) are added in later tasks.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
]);

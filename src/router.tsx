import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MyShelf from './pages/MyShelf';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

/**
 * Central route table. The book detail route (`/book/:id`) is added in Task 7.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'shelf', element: <MyShelf /> },
      { path: 'stats', element: <Stats /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

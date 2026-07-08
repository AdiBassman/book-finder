import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { LibraryProvider } from './context/LibraryContext';
import { router } from './router';
import './styles/globals.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <LibraryProvider>
      <RouterProvider router={router} />
    </LibraryProvider>
  </StrictMode>,
);

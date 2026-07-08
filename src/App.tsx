import { Outlet } from 'react-router-dom';

/**
 * Root layout. For now it just renders the active route.
 * Navbar/Footer and the theme wrapper are added in Task 3.
 */
function App() {
  return (
    <div className="app">
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

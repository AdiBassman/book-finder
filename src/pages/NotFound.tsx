import { Link } from 'react-router-dom';

/** 404 page shown for unknown routes. */
function NotFound() {
  return (
    <section style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1>404</h1>
      <p>We couldn't find that page.</p>
      <Link to="/">← Back to home</Link>
    </section>
  );
}

export default NotFound;

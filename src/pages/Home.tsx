import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import CuratedRow from '../components/CuratedRow';
import { CATEGORIES } from '../lib/constants';
import styles from './Home.module.scss';

// A few featured categories for the landing page.
const FEATURED = CATEGORIES.slice(0, 4);

/** Landing page: hero with search, then curated category rows. */
function Home() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.title}>📚 Discover your next read</h1>
        <p className={styles.tagline}>
          Search millions of books, explore by category, and build your personal
          reading shelf.
        </p>
        <div className={styles.search}>
          <SearchBar onSubmit={handleSearch} autoFocus />
        </div>
      </section>

      {FEATURED.map((category) => (
        <CuratedRow key={category} category={category} />
      ))}
    </div>
  );
}

export default Home;

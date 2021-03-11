import Manga from './MangaResult';

import './Mangas.css';

const Mangas = () => {
  return (
    <div className='container-fluid'>
      <div className='mangas'>
        <a href='/manga/new' className='btn btn-primary mb-3'>Add New Manga</a>
        <Manga />
        <Manga />
        <Manga />
        <Manga />
      </div>
    </div>
  );
};

export default Mangas;
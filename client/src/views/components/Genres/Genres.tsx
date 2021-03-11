import Genre from './Genre';
import CreateGenreForm from '../CreateGenreForm';

import './Genres.css';

const Genres = () => {
  return (
    <div className='container-fluid'>
      <div className='genres'>
        <CreateGenreForm />
        <br />
        <Genre />
        <Genre />
        <Genre />
        <Genre />
      </div>
    </div>
  );
};

export default Genres;
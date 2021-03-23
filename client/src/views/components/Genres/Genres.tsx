import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadAllGenres } from '../../../state/ducks/genres/actions';
import store, { RootState } from '../../../state/store';
import { AllGenresProps } from '../../types/Props';

import CreateGenreForm from '../common/modals/CreateGenreForm';
import Genre from './Genre';

import './Genres.css';

const Genres = ({ auth: { isLoading, user }, genres }: AllGenresProps) => {
  useEffect(() => {
    store.dispatch<any>(loadAllGenres());
  }, []);

  if (!isLoading && (!user || user.accessLevel !== 'admin')) {
    return <Redirect to='/404' />;
  }

  return (
    <div className='container-fluid'>
      <div className='genres'>
        <CreateGenreForm />
        <br />
        {
          !genres.isLoading && genres.genres ?
          (genres.genres.map(genre => (<Genre key={genre.name} name={genre.name} />)))
          : (<p className='text-center mt-5'>No Genres Found.</p>)
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  genres: state.genres
});

export default connect(mapStateToProps)(Genres);

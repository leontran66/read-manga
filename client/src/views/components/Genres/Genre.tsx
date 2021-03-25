import { connect } from 'react-redux';
import { deleteGenre } from '../../../state/ducks/genres/actions';
import store, { RootState } from '../../../state/store';
import { GenreProps } from '../../types/Props';

import EditGenreForm from '../common/modals/EditGenreForm';

import './Genres.css';

const Genre = ({ genre }: GenreProps) => {
  const onClick = () => {
    store.dispatch<any>(deleteGenre(genre._id));
  }

  return (
    <div className='genre d-inline-block mb-3 p-2 me-3'>
      <h3 className='d-inline'>
        <a className='text-capitalize' href='/manga?query='>{genre.name}</a>
        <div className='float-end'>
          <EditGenreForm genre={genre} />
          <a href='#!' className='ms-2 btn btn-danger' onClick={() => onClick()}>Delete</a>
        </div>
      </h3>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Genre);

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Props } from '../../types/Props';
import { RootState } from '../../../state/store';

import Genre from './Genre';
import CreateGenreForm from '../CreateGenreForm';

import './Genres.css';

const Genres = (props: Props) => {
  if (!props.isAuthenticated) {
    return <Redirect to='/login' />;
  }

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

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(Genres);

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthProps from '../../types/AuthProps';
import { RootState } from '../../../state/store';

import Genre from './Genre';
import CreateGenreForm from '../CreateGenreForm';

import './Genres.css';

const Genres = (props: AuthProps) => {
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Genres);

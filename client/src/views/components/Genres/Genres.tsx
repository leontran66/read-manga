import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Genre from './Genre';
import { RootState } from '../../../state/store';
import { EnhancedProps } from '../../types/Props';
import CreateGenreForm from '../common/modals/CreateGenreForm';

import './Genres.css';

const Genres = ({ auth }: EnhancedProps) => {
  if (auth.user !== null && auth.user.accessLevel !== 'admin') {
      return <Redirect to='/' />;
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
  auth: state.auth
});

export default connect(mapStateToProps)(Genres);

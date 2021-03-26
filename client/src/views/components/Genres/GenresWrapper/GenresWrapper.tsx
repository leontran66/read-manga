import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { RootState } from '../../../../state/store';
import { AuthProps } from '../types';

import './GenresWrapper.css';

const GenresWrapper = ({ auth: { isAuthenticated, isLoading, user }, children }: AuthProps) => {
  if (!isLoading && (!isAuthenticated || (user && user.accessLevel !== 'admin'))) {
    return <Redirect to='/login' />;
  }
  
  return (
    <div className='genres mx-auto'>{children}</div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(GenresWrapper);

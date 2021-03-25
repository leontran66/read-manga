import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { RootState } from '../../../../state/store';
import { AuthProps } from '../types';

import './ProfileWrapper.css';

const ProfileWrapper = ({ auth: { isAuthenticated, isLoading }, children }: AuthProps) => {
  if (!isLoading && !isAuthenticated) {
    return <Redirect to='/login' />;
  }
  
  return (
    <div className='profile mx-auto'>{children}</div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileWrapper);

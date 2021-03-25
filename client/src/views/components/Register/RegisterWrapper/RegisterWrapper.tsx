import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { RootState } from '../../../../state/store';
import { AuthProps } from '../types';

import './RegisterWrapper.css';

const RegisterWrapper = ({ auth: { isAuthenticated, isLoading }, children }: AuthProps) => {
  if (!isLoading && isAuthenticated) {
    return <Redirect to='/profile' />;
  }
  
  return (
    <div className='register-form mx-auto'>{children}</div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RegisterWrapper);

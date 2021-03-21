import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PrivateProps } from '../types/Props';
import { RootState } from '../../state/store';

const PrivateRoute: React.FC<PrivateProps> = ({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={props =>
        !isAuthenticated && !isLoading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

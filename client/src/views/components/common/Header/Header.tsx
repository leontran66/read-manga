import { Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../../../state/ducks/auth/actions';
import store, { RootState } from '../../../../state/store';
import { HeaderProps } from '../types';

const Header = ({ auth: { isAuthenticated, isLoading, user } }: HeaderProps) => {
  const history = useHistory();

  const onClick = () => {
    store.dispatch<any>(logoutUser());
    history.push('/login');
  };
  
  const authLinks = (
    <ul className='navbar-nav mr-auto mb-2 mb-lg-0'>
      <li className='nav-item'>
        <a className='nav-link' href='/profile'>Profile</a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={() => onClick()}>Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav mr-auto mb-2 mb-lg-0'>
    <li className='nav-item'>
      <a className='nav-link' href='/login'>Login</a>
    </li>
    <li className='nav-item'>
      <a className='nav-link' href='/register'>Register</a>
    </li>
  </ul>
  );

  const genreLink = (
    <li className='nav-item'>
      <a className='nav-link' href='/genres'>Genres</a>
    </li>
  );

  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-dark mb-3'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>MangaTracker</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link' href='/manga'>Manga</a>
            </li>
            <Fragment>{!isLoading && user && user.accessLevel === 'admin' && genreLink}</Fragment>
          </ul>
          <Fragment>{isAuthenticated && !isLoading ? authLinks : guestLinks}</Fragment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts,
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps)(Header);

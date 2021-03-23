import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../../state/ducks/auth/actions';
import store, { RootState } from '../../../../state/store';
import { EnhancedProps } from '../../../types/Props';

const Header = ({ auth: { isAuthenticated, user } }: EnhancedProps) => {
  const onClick = () => {
    store.dispatch<any>(logoutUser());
  };
  
  const authLinks = (
    <ul className='navbar-nav mr-auto mb-2 mb-lg-0'>
      <li className='nav-item'>
        <Link className='nav-link' to='/profile'>Profile</Link>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={() => onClick()}>Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav mr-auto mb-2 mb-lg-0'>
    <li className='nav-item'>
      <Link className='nav-link' to='/login'>Login</Link>
    </li>
    <li className='nav-item'>
      <Link className='nav-link' to='/register'>Register</Link>
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
        <Link className='navbar-brand' to='/'>MangaTracker</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/manga'>Manga</Link>
            </li>
            <Fragment>{user && user.accessLevel === 'admin' ? genreLink : null }</Fragment>
          </ul>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);

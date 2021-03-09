const Header = () => {
  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
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
          </ul>
          <ul className='navbar-nav mr-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link' href='/login'>Login</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/register'>Register</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/profile'>Profile</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/logout'>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
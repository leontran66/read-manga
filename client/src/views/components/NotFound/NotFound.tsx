import { Link, useHistory } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  let history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className='container-fluid'>
      
    <div className='not-found'>
      <div className='position-absolute top-50 start-50 translate-middle'>
        <h1>404</h1>
        <span>Page not found</span>
        <p>The page you are looking for doesn't exist or other error occurred.&nbsp;
          <br />
          <a href='#!' onClick={() => goBack()}>Go back</a>, or head over to the{' '}
          <Link to='/'>Manga Tracker</Link>
          {' '}homepage to choose a new direction.
        </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

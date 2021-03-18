import EditGenreForm from '../EditGenreForm';

import './Genres.css';

const Genre = () => {
  return (
    <div className='genre d-inline-block mb-3 p-2 me-3'>
      <h3 className='d-inline'>
        <a href='/manga?query='>Action</a>
        <div className='float-end'>
          <EditGenreForm />
          <a href='/genres/id/delete' className='ms-2 btn btn-danger'>Delete</a>
        </div>
      </h3>
    </div>
  );
};

export default Genre;

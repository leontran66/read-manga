import { GenreProps } from '../../types/Props';

import EditGenreForm from '../common/modals/EditGenreForm';

import './Genres.css';

const Genre = ({ name }: GenreProps) => {
  return (
    <div className='genre d-inline-block mb-3 p-2 me-3'>
      <h3 className='d-inline'>
        <a className='text-capitalize' href='/manga?query='>{name}</a>
        <div className='float-end'>
          <EditGenreForm />
          <a href='/genres/id/delete' className='ms-2 btn btn-danger'>Delete</a>
        </div>
      </h3>
    </div>
  );
};

export default Genre;

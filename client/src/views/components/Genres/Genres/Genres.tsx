import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../state/ducks/alerts/actions';
import { loadAllGenres, deleteGenre } from '../../../../state/ducks/genres/actions';
import store, { RootState } from '../../../../state/store';
import { GenresProps } from './../types';

import GenreForm from '../../common/modals/GenreForm';

import './Genres.css';

const Genres = ({ genres }: GenresProps) => {
  useEffect(() => {
    store.dispatch<any>(loadAllGenres());
  }, []);

  const [formData, setFormData] = useState({
    isNew: true,
    genre: {
      _id: '',
      name: '',
      manga: ['']
    }
  });

  const { isNew, genre } = formData;

  const onClick = (id: string) => {
    store.dispatch<any>(deleteGenre(id));
  }
  
  const prepareForm = (isNew: boolean, genre: { _id: string, name: string, manga: Array<string> }) => {
    setFormData({ ...formData, isNew, genre });
    store.dispatch<any>(removeAlert('name'));
  };

  return (
    <Fragment>
    {
      !genres.isLoading &&
      <Fragment>
        <GenreForm isNew={isNew} genre={genre} />
        <button type='button' className='btn btn-primary mb-3' data-bs-toggle='modal' data-bs-target='#genreForm' onClick={() => prepareForm(true, { _id: '', name: '', manga: []})}>Add New Genre</button>
        <br />
        {
          !genres.isLoading && genres.genres.length > 0 ?
          genres.genres.map(genre => {
            return (
              <div key={genre._id} className='genre d-inline-block mb-3 p-2 me-3'>
                <h3 className='d-inline'>
                  <p className='d-inline align-middle text-capitalize'>{genre.name}</p>
                  <div className='float-end'>
                    <button type='button' className='btn btn-primary ms-2' data-bs-toggle='modal' data-bs-target='#genreForm' onClick={() => prepareForm(false, { _id: genre._id, name: genre.name, manga: genre.manga })}>Edit</button>
                    <a href='#!' className='ms-2 btn btn-danger' onClick={() => onClick(genre._id)}>Delete</a>
                  </div>
                </h3>
              </div>
            );
          }) : (<p className='text-center mt-5'>No Genres Found.</p>)
        }
      </Fragment>
    }
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  genres: state.genres
});

export default connect(mapStateToProps)(Genres);

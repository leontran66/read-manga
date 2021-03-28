import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../state/ducks/alerts/actions';
import { loadAllGenres } from '../../../../state/ducks/genres/actions';
import { loadAllManga, deleteManga } from '../../../../state/ducks/manga/actions';
import { loadReadings, createReading } from '../../../../state/ducks/readings/actions';
import store, { RootState } from '../../../../state/store';
import { MangaProps, MangaObjectProps } from '../types';

import MangaForm from '../../common/modals/MangaForm';

import './Manga.css';

const Manga = ({ auth, allGenres, mangas, readings }: MangaProps) => {
  useEffect(() => {
    store.dispatch<any>(loadAllGenres());
    store.dispatch<any>(loadAllManga());
    store.dispatch<any>(loadReadings());
  }, []);

  const [formData, setFormData] = useState<MangaObjectProps>({
    isNew: true,
    manga: {
      _id: '',
      title: '',
      author: '',
      genres: [],
      synopsis: '',
      chapters: 0
    }
  });

  const { isNew, manga } = formData;

  const addReading = (title: string, chapter: number) => {
    store.dispatch<any>(createReading(title, chapter));
  }
  
  const removeManga = (id: string) => {
    store.dispatch<any>(deleteManga(id));
  }

  const prepareForm = (isNew: boolean, manga: { _id: string, title: string, author: string, genres: Array<string>, synopsis: string, chapters: number }) => {
    setFormData({ ...formData, isNew, manga });
    store.dispatch<any>(removeAlert('title'));
    store.dispatch<any>(removeAlert('author'));
    store.dispatch<any>(removeAlert('synopsis'));
    store.dispatch<any>(removeAlert('chapters'));
  };

  return (
    <Fragment>
      <MangaForm isNew={isNew} manga={manga} />
      {!auth.isLoading && auth.user && auth.user.accessLevel === 'admin' &&
        <button type='button' className='btn btn-primary mb-3' data-bs-toggle='modal' data-bs-target='#mangaForm' onClick={() => prepareForm(true, { _id: '', title: '', author: '', genres: [], synopsis: '', chapters: 0})}>Add New Manga</button>
      }
      {
        !allGenres.isLoading && !mangas.isLoading && mangas.manga.length > 0 && !readings.isLoading ?
        mangas.manga.map(manga => {
          const hasReading = readings.readings.some(reading => manga._id === reading.manga);

          // create the array of genre ids in preparation to setFormData
          let genreIDs: Array<string> = [];
          const mangaGenres = allGenres.genres.filter(genre => genre.manga.some(id => id === manga._id));
          mangaGenres.forEach(genre => {
            genreIDs.push(genre._id);
          });

          return (
            <div key={manga._id} className='manga-result mb-3 p-3'>
              <h3 className='d-block mb-2'>
                <a className='text-capitalize me-2' href={'/manga/' + manga._id}>{manga.title}</a>
              </h3>
              {!auth.isLoading && auth.user && auth.user.accessLevel === 'admin' &&
                <Fragment>
                  <button type='button' className='btn btn-primary mb-1' data-bs-toggle='modal' data-bs-target='#mangaForm' onClick={() => prepareForm(false, { _id: manga._id, title: manga.title, author: manga.author, genres: genreIDs, synopsis: manga.synopsis, chapters: manga.chapters})}>Edit</button>
                  <a href='#!' className='ms-2 mb-1 btn btn-danger' onClick={() => removeManga(manga._id)}>Delete</a>
                </Fragment>
                }
              <div className='float-end'>
                {
                  !hasReading &&
                  <button className='btn btn-primary' onClick={() => addReading(manga.title, 0)}>Add To Reading List</button>
                }
              </div>
              <div className='accordion mt-2' id={'info-' + manga._id}>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id={'info-heading-' + manga._id}>
                    <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target={'#info-collapse-' + manga._id} aria-expanded='false' aria-controls='info-collapse'>
                      Details
                    </button>
                  </h2>
                  <div id={'info-collapse-' + manga._id} className='accordion-collapse collapse' aria-labelledby={'info-heading-' + manga._id} data-bs-parent={'#info-' + manga._id}>
                    <div className='accordion-body'>
                      {
                        // display genres for manga
                        allGenres.genres.map(genre => 
                          genre.manga.some(id => id === manga._id) &&
                          <span key={genre._id} className='badge bg-primary text-capitalize mb-3 me-1'>{genre.name}</span>
                        )
                      }
                      <h6 className='text-capitalize'><strong>Author: </strong>{manga.author}</h6>
                      <h6><strong>Chapters:</strong> {manga.chapters}</h6>
                      <p>{manga.synopsis}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (<p className='text-center mt-5'>No Manga Found.</p>)
      }
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  allGenres: state.genres,
  mangas: state.manga,
  readings: state.readings
});

export default connect(mapStateToProps)(Manga);

import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadManga } from '../../../state/ducks/manga/actions';
import { loadReadings } from '../../../state/ducks/readings/actions';
import store, { RootState } from '../../../state/store';
import { MangaProps } from '../../types/Props';

import './Manga.css';

const Manga = ({ auth: { user }, manga: { isLoading, manga }, readings }: MangaProps) => {
  const { id }: any = useParams();

  useEffect(() => {
    store.dispatch<any>(loadManga(id));
    store.dispatch<any>(loadReadings());
  }, [id]);

  return (
    <div className='manga mb-3 p-4'>
      <h3 className='d-block mb-2'>
        <p className='d-inline me-2 text-capitalize'>{!isLoading && manga.length > 0 ? manga[0].title : 'Title'}</p>
        {user && user.accessLevel === 'admin' &&
          <Fragment>
            <a href='/manga/id/edit' className='ms-2 mb-1 btn btn-primary'>Edit</a>
            <a href='/manga/id/delete' className='ms-2 mb-1 btn btn-danger'>Delete</a>
          </Fragment>
        }
        <div className='float-end'>
          {
            !isLoading && manga && !readings.some(reading => reading.manga === manga[0]._id) &&
            <button className='btn btn-primary'>Add To Reading List</button>
          }
        </div>
      </h3>
      <span className='badge bg-primary mb-3 me-1'>Action</span>
      <span className='badge bg-primary mb-3 me-1'>Adventure</span>
      <span className='badge bg-primary mb-3 me-1'>Demons</span>
      <span className='badge bg-primary mb-3 me-1'>Drama</span>
      <span className='badge bg-primary mb-3 me-1'>Fantasy</span>
      <span className='badge bg-primary mb-3 me-1'>Horror</span>
      <span className='badge bg-primary mb-3 me-1'>Supernatural</span>
      <span className='badge bg-primary mb-3 me-1'>Military</span>
      <span className='badge bg-primary mb-3 me-1'>Psychological</span>
      <span className='badge bg-primary mb-3 me-1'>Seinen</span>
      <h6 className='text-capitalize'><strong>Author: </strong>{!isLoading && manga.length > 0 ? manga[0].author : 'Author'}</h6>
      <h6><strong>Chapters:</strong> {!isLoading && manga.length > 0 ? manga[0].chapters : 'Chapters'}</h6>
      <h6 className='synopsis'><strong>Synopsis</strong></h6>
      <p>{!isLoading && manga.length > 0 ? manga[0].synopsis : 'Synopsis'}</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  manga: state.manga,
  readings: state.readings.readings
});

export default connect(mapStateToProps)(Manga);

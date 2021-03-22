import { Fragment } from 'react';
import { connect } from 'react-redux';
import { createReading } from '../../../state/ducks/readings/actions';
import store, { RootState } from '../../../state/store';
import { MangaResultProps } from '../../types/Props';

import './Mangas.css';

const Manga = ({ auth: { user }, manga, hasReading }: MangaResultProps) => {

  const onClick = () => {
    store.dispatch<any>(createReading(manga.title, 0));
  }

  return (
    <div className='manga-result mb-3 p-4'>
      <h3 className='d-block mb-2'>
        <a className='text-capitalize me-2' href={'/manga/' + manga._id}>{manga.title}</a>
        {user && user.accessLevel === 'admin' &&
          <Fragment>
            <a href='/manga/id/edit' className='ms-2 mb-1 btn btn-primary'>Edit</a>
            <a href='/manga/id/delete' className='ms-2 mb-1 btn btn-danger'>Delete</a>
          </Fragment>
        }
        <div className='float-end'>
          {
            !hasReading &&
            <button className='btn btn-primary' onClick={() => onClick()}>Add To Reading List</button>
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
      <h6 className='text-capitalize'><strong>Author: </strong>{manga.author}</h6>
      <h6><strong>Chapters:</strong> {manga.chapters}</h6>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts,
  auth: state.auth
});

export default connect(mapStateToProps)(Manga);

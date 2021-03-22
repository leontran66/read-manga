import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import store, { RootState } from '../../../state/store';
import { ReadingProps } from '../../types/Props';
import { loadAllManga } from '../../../state/ducks/manga/actions';
import { deleteReading, loadReadings } from '../../../state/ducks/readings/actions';

import CreateReadingForm from '../common/modals/CreateReadingForm/CreateReadingForm';
import EditReadingForm from '../common/modals/EditReadingForm/EditReadingForm';

import './Readings.css';

const Readings = ({ manga, readings: { readings, isLoading } }: ReadingProps) => {
  useEffect(() => {
    store.dispatch<any>(loadAllManga());
    store.dispatch<any>(loadReadings());
  }, []);

  const onClick = (id: string) => {
    store.dispatch<any>(deleteReading(id));
  };
  
  return (
    <Fragment>
      <CreateReadingForm manga={manga} />
      <div className='table-responsive'>
        <table className='table table-bordered align-middle'>
          <thead className='table-dark'>
            <tr>
              <th className='profile-manga'>Manga</th>
              <th className='profile-chapter'>Chapter</th>
              <th className='profile-actions'>Actions</th>
            </tr>
          </thead>
          <tbody>
              {
                !isLoading && readings.length > 0 ?
                readings.map(reading => {
                  const document = manga.find(manga => reading.manga === manga._id);
                  const data = {
                    title: document!.title,
                    chapter: reading.chapter
                  }
                  return (
                    <tr key={reading.manga}>
                      <td className='profile-manga'><a href='/mangas/id'>{document!.title.slice(0,1).toUpperCase() + document!.title.slice(1)}</a></td>
                      <td className='profile-chapter'>{reading.chapter}/{document!.chapters}</td>
                      <td className='profile-actions'><EditReadingForm reading={data} />{' '}<a href='#!' className='btn btn-sm btn-danger' onClick={() => onClick(reading._id)}>Delete</a></td>
                    </tr>
                  )
                }) : (<tr><td colSpan={3}>No readings found.</td></tr>)
              }
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  manga: state.manga.manga,
  readings: state.readings
});

export default connect(mapStateToProps)(Readings);

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../state/ducks/alerts/actions';
import { loadAllManga } from '../../../../state/ducks/manga/actions';
import { deleteReading, loadReadings } from '../../../../state/ducks/readings/actions';
import store, { RootState } from '../../../../state/store';
import { ReadingsProps } from '../types';
import ReadingForm from '../../common/modals/ReadingForm';

import './Readings.css';

const Readings = ({ manga, readings }: ReadingsProps) => {
  useEffect(() => {
    store.dispatch<any>(loadAllManga());
    store.dispatch<any>(loadReadings());
  }, []);

  const [formData, setFormData] = useState({
    isNew: true,
    reading: {
      manga: '',
      title: '',
      chapter: 0
    }
  });

  const { isNew, reading } = formData;

  const onClick = (id: string) => {
    store.dispatch<any>(deleteReading(id));
  };
  
  const prepareForm = (isNew: boolean, reading: { manga: string, title: string, chapter: number }) => {
    setFormData({ ...formData, isNew, reading });
    store.dispatch<any>(removeAlert('title'));
    store.dispatch<any>(removeAlert('chapter'));
  };

  return (
    <div className="tab-pane fade show active" id="pills-reading" role="tabpanel" aria-labelledby="pills-reading-tab">
      <ReadingForm isNew={isNew} reading={reading} />
      <button type='button' className='btn btn-primary mb-3' data-bs-toggle='modal' data-bs-target='#readingForm' onClick={() => prepareForm(true, { manga: '', title: '', chapter: 0})}>Add New Manga</button>
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
                !manga.isLoading && !readings.isLoading && readings.readings.length > 0 ?
                readings.readings.map(reading => {
                  const document = manga.manga.find(manga => reading.manga === manga._id);
                  const data = {
                    manga: reading.manga,
                    title: document!.title,
                    chapter: reading.chapter
                  }
                  return (
                    <tr key={reading.manga}>
                      <td className='profile-manga text-capitalize'><a href={`/manga?q=${data.title}`}>{data.title}</a></td>
                      <td className='profile-chapter'>{data.chapter}/{document!.chapters}</td>
                      <td className='profile-actions'>
                        <button type='button' className='btn btn-primary btn-sm' data-bs-toggle='modal' data-bs-target='#readingForm' onClick={() => prepareForm(false, { manga: data.manga, title: data.title, chapter: data.chapter })}>Edit</button>{' '}<a href='#!' className='btn btn-sm btn-danger' onClick={() => onClick(reading._id)}>Delete</a></td>
                    </tr>
                  )
                }) : (<tr><td colSpan={3}>No readings found.</td></tr>)
              }
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  manga: state.manga,
  readings: state.readings
});

export default connect(mapStateToProps)(Readings);

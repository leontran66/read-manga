import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';
import { createReading, updateReading } from '../../../../../state/ducks/readings/actions';
import store, { RootState } from '../../../../../state/store';
import { ReadingFormProps } from '../../types';

import './ReadingForm.css';

const ReadingForm = ({ alerts, isNew, manga, reading }: ReadingFormProps) => {
  const titleAlert = alerts.find(alert => alert.field === 'title');
  const chapterAlert = alerts.find(alert => alert.field === 'chapter');
  
  useEffect(() => {
    setFormData({ id: reading ? reading._id : '', title: reading ? reading.title: '', chapter: reading ? reading.chapter : 0 });
  }, [reading]);

  const [formData, setFormData] = useState({
    id: reading ? reading._id : '',
    title: reading ? reading.title : '',
    chapter: reading ? reading.chapter : 0
  });

  const { id, title, chapter } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isNew) {
      store.dispatch<any>(createReading(title, chapter));
    } else {
      store.dispatch<any>(updateReading(id, title, chapter));
    }
  }

  return (
    <Fragment>
      <div className='reading-form modal fade' id='readingForm' tabIndex={-1} aria-labelledby='readingFormLabel' aria-hidden='true'>
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>{isNew ? 'Add Manga' : 'Edit Manga'}</h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <div>
                  <label htmlFor='title' className='form-label'>Manga</label>
                  <select className={`text-capitalize form-select mb-2 ${titleAlert ? 'is-invalid': ''}`} aria-label='title' id='title' name='title' value={title} onChange={e => onChange(e)} disabled={!isNew ? true : false} >
                    <option value=''>Select a title...</option>
                    {
                      !manga.isLoading && manga.manga.length > 0 &&
                      manga.manga.map(manga => <option key={manga.title} value={manga.title}>{manga.title}</option>)
                    }
                  </select>
                  <div id={titleAlert ? titleAlert.id : 'titleInvalid'} className='invalid-feedback'>
                    {titleAlert ? titleAlert.msg : 'Title is invalid.'}
                  </div>
                </div>
                <div>
                  <label htmlFor='chapter' className='form-label'>Chapter</label>
                  <input type='number' className={`form-control ${chapterAlert ? 'is-invalid': ''}`} min={0} name='chapter' value={chapter} onChange={e => onChange(e)} />
                  <div id={chapterAlert ? chapterAlert.id : 'chapterInvalid'} className='invalid-feedback'>
                    {chapterAlert ? chapterAlert.msg : 'Chapter is invalid.'}
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='btn btn-primary'>Save</button>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts,
  manga: state.manga
});

export default connect(mapStateToProps)(ReadingForm);
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { CreateReadingProps } from '../../../../types/Props';
import store, { RootState } from '../../../../../state/store';
import { createReading } from '../../../../../state/ducks/readings/actions';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';

import './CreateReadingForm.css';

const CreateReadingForm = ({ alerts, manga }: CreateReadingProps) => {
  const titleAlert = alerts.find(alert => alert.alertField === 'title');
  const chapterAlert = alerts.find(alert => alert.alertField === 'chapter');

  const [formData, setFormData] = useState({
    title: '',
    chapter: 0
  });

  const { title, chapter } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    const alertToRemove = alerts.find(alert => alert.alertField === e.currentTarget.name);
    if (alertToRemove) {
      store.dispatch<any>(removeAlert(alertToRemove.alertField));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(createReading(title, chapter));
  }

  return (
    <Fragment>
      <button type="button" className='btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#createReadingForm">Add New Manga</button>
      <div className="create-reading-form modal fade" id="createReadingForm" tabIndex={-1} aria-labelledby="createReadingFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Manga</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <div>
                  <label htmlFor='title' className='form-label'>Title</label>
                  <select className={`text-capitalize form-select mb-2 ${titleAlert ? 'is-invalid': ''}`} aria-label='title' name='title' value={title} onChange={e => onChange(e)}>
                    <option value=''>Select a title...</option>
                    {
                      manga.length > 0 &&
                      manga.map(manga => <option key={manga.title} value={manga.title}>{manga.title}</option>)
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(CreateReadingForm);

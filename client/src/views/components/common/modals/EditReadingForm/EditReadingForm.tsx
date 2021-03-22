import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { EditReadingProps } from '../../../../types/Props';
import store, { RootState } from '../../../../../state/store';
import { updateReading } from '../../../../../state/ducks/readings/actions';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';

import './EditReadingForm.css';

const EditReadingForm = ({ alerts, reading }: EditReadingProps) => {
  const titleAlert = alerts.find(alert => alert.alertField === 'title');
  const chapterAlert = alerts.find(alert => alert.alertField === 'chapter');

  const [formData, setFormData] = useState({
    title: reading.title,
    chapter: reading.chapter
  });

  const { title, chapter } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    const alertToRemove = alerts.find(alert => alert.alertField === e.currentTarget.name);
    if (alertToRemove) {
      store.dispatch<any>(removeAlert(alertToRemove.alertField));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(updateReading(title, chapter));
  }

  return (
    <Fragment>
      <button type="button" className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#editReadingForm">Edit</button>
      <div className="edit-reading-form modal fade" id="editReadingForm" tabIndex={-1} aria-labelledby="editReadingFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Manga</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <div>
                  <label htmlFor='title' className='form-label'>Manga</label>
                  <input type='text' className={` text-capitalize form-select mb-2 ${titleAlert ? 'is-invalid': ''}`} name='title' value={title} onChange={e => onChange(e)} disabled={true} />
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

export default connect(mapStateToProps)(EditReadingForm);
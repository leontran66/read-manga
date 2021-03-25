import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';
import { createGenre } from '../../../../../state/ducks/genres/actions';
import store, { RootState } from '../../../../../state/store';
import { AlertProps } from '../../../../types/Props';

import './CreateGenreForm.css';

const CreateGenreForm = ({ alerts }: AlertProps) => {
  const nameAlert = alerts.find(alert => alert.field === 'name');

  const [formData, setFormData] = useState({
    name: ''
  });

  const { name } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(createGenre(name));
  }

  return (
    <Fragment>
      <button type="button" className='btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#createGenreForm">Add New Genre</button>
      <div className="create-genre-form modal fade" id="createGenreForm" tabIndex={-1} aria-labelledby="createGenreFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Genre</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input type='text' className={`form-control ${nameAlert ? 'is-invalid': ''}`} id='name' name='name' value={name} onChange={e => onChange(e)} />
                <div id={nameAlert ? nameAlert.id : 'chapterInvalid'} className='invalid-feedback'>
                  {nameAlert ? nameAlert.msg : 'Chapter is invalid.'}
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

export default connect(mapStateToProps)(CreateGenreForm);

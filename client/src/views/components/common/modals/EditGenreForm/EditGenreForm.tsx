import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';
import { updateGenre } from '../../../../../state/ducks/genres/actions';
import store, { RootState } from '../../../../../state/store';
import { GenreProps } from '../../../../types/Props';

import './EditGenreForm.css';

const EditGenreForm = ({ alerts, genre }: GenreProps) => {
  const nameAlert = alerts.find(alert => alert.field === 'name');

  const [formData, setFormData] = useState({
    name: genre.name.slice(0,1).toUpperCase() + genre.name.slice(1)
  });

  const id = genre._id;
  const { name } = formData;
  const oldName = genre.name;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(updateGenre(id, name, oldName));
  }

  return (
    <Fragment>
      <button type='button' className='ms-2 btn btn-primary' data-bs-toggle='modal' data-bs-target={'#edit' + genre.name + 'Form'}>Edit</button>
      <div className='edit-genre-form modal fade' id={'edit' + genre.name + 'Form'} tabIndex={-1} aria-labelledby={'edit' + genre.name + 'FormLabel'} aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Genre</h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='name' className='edit-form-label form-label'>Name</label>
                <input type='text' className={`form-control ${nameAlert ? 'is-invalid': ''}`} id='name' name='name' value={name} onChange={e => onChange(e)} />
                <div id={nameAlert ? nameAlert.id : 'chapterInvalid'} className='invalid-feedback'>
                  {nameAlert ? nameAlert.msg : 'Chapter is invalid.'}
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
  alerts: state.alerts
});

export default connect(mapStateToProps)(EditGenreForm);

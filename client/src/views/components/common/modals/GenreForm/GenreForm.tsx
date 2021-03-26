import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';
import { createGenre, updateGenre } from '../../../../../state/ducks/genres/actions';
import store, { RootState } from '../../../../../state/store';
import { GenreFormProps } from '../../types';

import './GenreForm.css';

const GenreForm = ({ alerts, isNew, genre }: GenreFormProps) => {
  const nameAlert = alerts.find(alert => alert.field === 'name');

  useEffect(() => {
    setFormData({ id: genre ? genre._id : '', name: genre ? genre.name : '' });
  }, [genre]);

  const [formData, setFormData] = useState({
    id: genre ? genre._id :  '',
    name: genre ? genre.name : ''
  });

  const { id, name } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isNew) {
      store.dispatch<any>(createGenre(name));
    } else {
      store.dispatch<any>(updateGenre(id, name))
    }
  }

  return (
    <Fragment>
      <div className="genre-form modal fade" id="genreForm" tabIndex={-1} aria-labelledby="genreFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>{isNew ? 'Add New Genre' : 'Edit Genre'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input type='text' className={`text-capitalize form-control ${nameAlert ? 'is-invalid': ''}`} id='name' name='name' value={name} onChange={e => onChange(e)} />
                <div id={nameAlert ? nameAlert.id : 'nameInvalid'} className='invalid-feedback'>
                  {nameAlert ? nameAlert.msg : 'Name is invalid.'}
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

export default connect(mapStateToProps)(GenreForm);

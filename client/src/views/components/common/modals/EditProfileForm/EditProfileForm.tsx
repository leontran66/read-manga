import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';
import { updateUser } from '../../../../../state/ducks/auth/actions';
import store, { RootState } from '../../../../../state/store';
import { AlertProps } from '../../types';

import './EditProfileForm.css';

const EditProfileForm = ({ alerts }: AlertProps) => {
  const currentPWAlert = alerts.find(alert => alert.field === 'currentPW');
  const passwordAlert = alerts.find(alert => alert.field === 'password');
  const confirmPWAlert = alerts.find(alert => alert.field === 'confirmPW');

  const [formData, setFormData] = useState({
    currentPW: '',
    password: '',
    confirmPW: ''
  });

  const { currentPW, password, confirmPW } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(updateUser(currentPW, password, confirmPW));
  }

  return (
    <Fragment>
      <button type="button" className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#editProfileForm">Update Password</button>
      <div className="edit-profile-form modal fade" id="editProfileForm" tabIndex={-1} aria-labelledby="editProfileFormLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className='modal-content'>
            <form action='/profile' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>Update Password</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <div className='mb-3'>
                  <label htmlFor='currentPW' className='form-label'>Current Password</label>
                  <input type='password' className={`form-control ${currentPWAlert ? 'is-invalid': ''}`} id='currentPW' name='currentPW' autoComplete='on' value={currentPW} onChange={e => onChange(e)} />
                  <div id={currentPWAlert ? currentPWAlert.id : 'currentPWInvalid'} className='invalid-feedback'>
                    {currentPWAlert ? currentPWAlert.msg : 'Current password is invalid.'}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input type='password' className={`form-control ${passwordAlert ? 'is-invalid': ''}`} id='password' name='password' autoComplete='on' value={password} onChange={e => onChange(e)} />
                  <div id={passwordAlert ? passwordAlert.id : 'currentPWInvalid'} className='invalid-feedback'>
                    {passwordAlert ? passwordAlert.msg : 'Current password is invalid.'}
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='confirmPW' className='form-label'>Confirm Password</label>
                  <input type='password' className={`form-control ${confirmPWAlert ? 'is-invalid': ''}`} id='confirmPW' name='confirmPW' autoComplete='on' value={confirmPW} onChange={e => onChange(e)} />
                  <div id={confirmPWAlert ? confirmPWAlert.id : 'currentPWInvalid'} className='invalid-feedback'>
                    {confirmPWAlert ? confirmPWAlert.msg : 'Current password is invalid.'}
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input type='submit' className='btn btn-primary' value='Save'></input>
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

export default connect(mapStateToProps)(EditProfileForm);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../state/ducks/alerts/actions';
import { registerUser } from '../../../../state/ducks/auth/actions';
import store, { RootState } from '../../../../state/store';
import { AlertProps } from '../types';

import './RegisterForm.css';

const RegisterForm = ({ alerts }: AlertProps) => {
  const emailAlert = alerts.find(alert => alert.field === 'email');
  const passwordAlert = alerts.find(alert => alert.field === 'password');
  const confirmPWAlert = alerts.find(alert => alert.field === 'confirmPW');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPW: ''
  });

  const { email, password, confirmPW } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(registerUser(email, password, confirmPW));
  }

  return (
    <form action='#!' onSubmit={e => onSubmit(e)}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>Email</label>
          <input type='email' className={`form-control ${emailAlert ? 'is-invalid': ''}`} id='email' name='email' value={email} onChange={e => onChange(e)} />
          <div id={emailAlert ? emailAlert.id : 'emailInvalid'} className='invalid-feedback'>
            {emailAlert ? emailAlert.msg : 'Email is invalid.'}
          </div>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' className={`form-control ${passwordAlert ? 'is-invalid': ''}`} id='password' name='password' autoComplete='on' value={password} onChange={e => onChange(e)} />
        <div id={passwordAlert ? passwordAlert.id : 'passwordInvalid'} className='invalid-feedback'>
          {passwordAlert ? passwordAlert.msg : 'Password is invalid.'}
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='confirmPW' className='form-label'>Confirm Password</label>
        <input type='password' className={`form-control ${confirmPWAlert ? 'is-invalid': ''}`} id='confirmPW' name='confirmPW' autoComplete='on' value={confirmPW} onChange={e => onChange(e)} />
        <div id={confirmPWAlert ? confirmPWAlert.id : 'confirmPWInvalid'} className='invalid-feedback'>
          {confirmPWAlert ? confirmPWAlert.msg : 'Confirm password is invalid.'}
        </div>
      </div>
      <a href='/login'>Already have an account? Login</a>
      <br />
      <button type='submit' className='mt-3 btn btn-primary'>Register</button>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(RegisterForm);

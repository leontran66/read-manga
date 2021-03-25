import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../state/ducks/alerts/actions';
import { loginUser } from '../../../../state/ducks/auth/actions';
import store, { RootState } from '../../../../state/store';
import { AlertProps } from '../types';

import './LoginForm.css';

const LoginForm = ({ alerts }: AlertProps) => {
  const emailAlert = alerts.find(alert => alert.field === 'email');
  const passwordAlert = alerts.find(alert => alert.field === 'password');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(loginUser(email, password));
  }

  return (
    <form action='#!' onSubmit={e => onSubmit(e)}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>Email</label>
        <input type='email' className={`form-control ${emailAlert || passwordAlert ? 'is-invalid': ''}`} id='email' name='email' value={email} onChange={e => onChange(e)} />
        <div id='credentialsInvalid' className='invalid-feedback'>
          Credentials are invalid.
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' className={`form-control ${emailAlert || passwordAlert ? 'is-invalid': ''}`} id='password' name='password' autoComplete='on' value={password} onChange={e => onChange(e)} />
        <div id='credentialsInvalid' className='invalid-feedback'>
          Credentials are invalid.
        </div>
      </div>
      <a href='/register'>Don't have an account? Register</a>
      <br />
      <button type='submit' className='mt-3 btn btn-primary'>Login</button>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(LoginForm);

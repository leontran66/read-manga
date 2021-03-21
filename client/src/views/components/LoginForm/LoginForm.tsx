import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GuestProps } from '../../types/Props';
import store, { RootState } from '../../../state/store';
import { loginUser } from '../../../state/ducks/auth/actions';
import { removeAlert } from '../../../state/ducks/alerts/actions';

import './LoginForm.css';

const LoginForm = ({alerts, auth: { isAuthenticated } }: GuestProps) => {
  const emailAlert = alerts.find(alert => alert.alertField === 'email');
  const passwordAlert = alerts.find(alert => alert.alertField === 'password');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    const alertToRemove = alerts.find(alert => alert.alertField === e.currentTarget.name);
    if (alertToRemove) {
      store.dispatch<any>(removeAlert(alertToRemove.id));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(loginUser(email, password));
  }

  if (isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='container-fluid'>
      <div className='login-form mx-auto'>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts,
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(LoginForm);

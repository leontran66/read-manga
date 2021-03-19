import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Props } from '../../types/Props';
import { RootState } from '../../../state/store';
import { registerUser } from '../../../state/ducks/auth/actions';
import store from '../../../state/store';

import './RegisterForm.css';

const RegisterForm = (props: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPW: ''
  });

  const { email, password, confirmPW } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(registerUser(email, password, confirmPW));
  }

  if (props.isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='container-fluid'>
      <div className='register-form mx-auto'>
        <form action='#!' onSubmit={e => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
              <input type='email' className='form-control' id='email' name='email' value={email} onChange={e => onChange(e)} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' name='password' autoComplete='on' value={password} onChange={e => onChange(e)} />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPW' className='form-label'>Confirm Password</label>
            <input type='password' className='form-control' id='confirmPW' name='confirmPW' autoComplete='on' value={confirmPW} onChange={e => onChange(e)} />
          </div>
          <a href='/login'>Already have an account? Login</a>
          <br />
          <button type='submit' className='mt-3 btn btn-primary'>Register</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(RegisterForm);

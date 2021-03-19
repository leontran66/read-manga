import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Props } from '../../types/Props';
import { RootState } from '../../../state/store';
import { loginUser } from '../../../state/ducks/auth/actions';
import store from '../../../state/store';
import './LoginForm.css';

const LoginForm = (props: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(loginUser(email, password));
  }

  if (props.isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='container-fluid'>
      <div className='login-form mx-auto'>
        <form action='#!' onSubmit={e => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email</label>
              <input type='email' className='form-control' id='email' name='email' value={email} onChange={e => onChange(e)} />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' name='password' autoComplete='on' value={password} onChange={e => onChange(e)} />
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
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { loginUser })(LoginForm);

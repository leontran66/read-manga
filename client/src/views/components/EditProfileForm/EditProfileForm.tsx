import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthProps from '../../types/AuthProps';
import { RootState } from '../../../state/store';

import './EditProfileForm.css';

const EditProfileForm = (props: AuthProps) => {
  if (!props.isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='container-fluid'>
      <div className='edit-profile-form mx-auto'>
        <form method='POST' action='/users'>
          <div className='mb-3'>
            <label htmlFor='currentPW' className='form-label'>Current Password</label>
            <input type='password' className='form-control' id='currentPW' name='currentPW' autoComplete='on' />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' name='password' autoComplete='on' />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPW' className='form-label'>Confirm Password</label>
            <input type='password' className='form-control' id='confirmPW' name='confirmPW' autoComplete='on' />
          </div>
          <button type='submit' className='btn btn-primary me-2'>Save</button>
          <a href='/profile' className='btn btn-secondary'>Cancel</a>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(EditProfileForm);

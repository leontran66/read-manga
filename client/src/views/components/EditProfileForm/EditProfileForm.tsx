import { useState } from 'react';
import { connect } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { Props } from '../../types/Props';
import { RootState } from '../../../state/store';
import store from '../../../state/store';
import { updateUser } from '../../../state/ducks/auth/actions';

import './EditProfileForm.css';

  const EditProfileForm = ({ isLoading}: Props) => {  const [formData, setFormData] = useState({
    currentPW: '',
    password: '',
    confirmPW: ''
  });

  const { currentPW, password, confirmPW } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    store.dispatch<any>(updateUser(currentPW, password, confirmPW));
  }

  return isLoading ? (
    <div className='container-fluid'>
      <div className="position-absolute top-50 start-50 translate-middle">
        <ScaleLoader color='#36D7B7' loading={isLoading} height={70} width={8} radius={4} margin={4} />
      </div>
    </div>
  ) : (
    <div className='container-fluid'>
      <div className='edit-profile-form mx-auto'>
        <form action='/profile' onSubmit={e => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='currentPW' className='form-label'>Current Password</label>
            <input type='password' className='form-control' id='currentPW' name='currentPW' autoComplete='on' value={currentPW} onChange={e => onChange(e)} />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control' id='password' name='password' autoComplete='on' value={password} onChange={e => onChange(e)} />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPW' className='form-label'>Confirm Password</label>
            <input type='password' className='form-control' id='confirmPW' name='confirmPW' autoComplete='on' value={confirmPW} onChange={e => onChange(e)} />
          </div>
          <button type='submit' className='btn btn-primary me-2'>Save</button>
          <a href='/profile' className='btn btn-secondary'>Cancel</a>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(EditProfileForm);

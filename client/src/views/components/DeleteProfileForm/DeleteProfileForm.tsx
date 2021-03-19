import { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../../state/ducks/auth/actions';
import store from '../../../state/store';

import './DeleteProfileForm.css';

const DeleteProfileForm = () => {
  const onClick = () => {
    store.dispatch<any>(deleteUser());
  };
  
  return (
    <Fragment>
      <button type='button' className='btn btn-danger mx-2' data-bs-toggle='modal' data-bs-target='#deleteUser'>Delete Account</button>
      <div className='modal fade' id='deleteUser' tabIndex={-1} aria-labelledby='deleteUserLabel' aria-hidden='true'>
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Confirmation of Account Deletion</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you wish to delete your account? This action is irreversible.</p>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-danger' onClick={() => onClick()} data-bs-dismiss='modal'>Delete Account</button>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { deleteUser })(DeleteProfileForm);

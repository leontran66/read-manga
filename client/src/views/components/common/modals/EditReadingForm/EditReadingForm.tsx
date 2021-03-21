import { Fragment } from 'react';
import { connect } from 'react-redux';

import './EditReadingForm.css';

const EditReadingForm = () => {
  return (
    <Fragment>
      <button type="button" className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#editReadingForm">Edit</button>
      <div className="edit-reading-form modal fade" id="editReadingForm" tabIndex={-1} aria-labelledby="editReadingFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form method='POST' action='/readings'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Reading</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='chapter' className='form-label edit-form-label'>Chapter</label>
                <input type='number' className='form-control' id='chapter' name='chapter' />
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(EditReadingForm);

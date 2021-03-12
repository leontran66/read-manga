import { Fragment } from 'react';

import './CreateReadingForm.css';

const CreateGenreForm = () => {
  return (
    <Fragment>
      <button type="button" className='btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#createReadingForm">Add New Reading</button>
      <div className="create-reading-form modal fade" id="createReadingForm" tabIndex={-1} aria-labelledby="createReadingFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form method='POST' action='/readings'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Reading</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='manga' className='form-label'>Manga</label>
                <select className='form-select mb-2' aria-label='manga'>
                  <option>Select a manga...</option>
                  <option>Berserk</option>
                  <option>Fullmetal Alchemist</option>
                  <option>Monster</option>
                  <option>One Piece</option>
                  <option>Vagabond</option>
                </select>
                <label htmlFor='chapter' className='form-label'>Chapter</label>
                <input type='number' className='form-control' id='chapter' name='chapter' />
              </div>
              <div className='modal-footer'>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type='submit' className='btn btn-primary'>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateGenreForm;
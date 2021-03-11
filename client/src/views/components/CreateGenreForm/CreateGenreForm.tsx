import { Fragment } from 'react';

import './CreateGenreForm.css';

const GenreForm = () => {
  return (
    <Fragment>
      <button type="button" className='btn btn-primary mb-3' data-bs-toggle="modal" data-bs-target="#createGenreForm">Add New Genre</button>
      <div className="createGenreForm modal fade" id="createGenreForm" tabIndex={-1} aria-labelledby="createGenreFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form method='POST' action='/genres'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Genre</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='name' className='form-label'>Name</label>
                <input type='text' className='form-control' id='name' name='name' />
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

export default GenreForm;
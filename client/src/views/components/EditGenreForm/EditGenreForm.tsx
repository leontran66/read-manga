import { Fragment } from 'react';

import './EditGenreForm.css';

const GenreForm = () => {
  return (
    <Fragment>
      <button type="button" className='ms-2 btn btn-warning' data-bs-toggle="modal" data-bs-target="#editGenreForm">Edit</button>
      <div className="editGenreForm modal fade" id="editGenreForm" tabIndex={-1} aria-labelledby="editGenreFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form method='POST' action='/genres'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Genre</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='name' className='form-label edit-form-label'>Name</label>
                <input type='text' className='form-control' id='name' name='name' />
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

export default GenreForm;
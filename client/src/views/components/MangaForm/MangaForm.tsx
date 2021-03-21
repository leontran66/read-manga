import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { EnhancedProps } from '../../types/Props';

import './MangaForm.css';

const MangaForm = ({ auth: { user }}: EnhancedProps) => {
  if (user && user.accessLevel !== 'admin') {
    return <Redirect to='/' />;
  }

  return (
    <div className='container-fluid'>
      <div className='manga-form mx-auto'>
        <form method='POST' action='/manga'>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>Title</label>
              <input type='text' className='form-control' id='title' name='title' />
          </div>
          <div className='mb-3'>
            <label htmlFor='author' className='form-label'>Author</label>
              <input type='text' className='form-control' id='author' name='author' />
          </div>
          <div className='mb-3'>
            <label htmlFor='synopsis' className='form-label'>Synopsis</label>
              <textarea className='form-control' id='synopsis' name='synopsis' rows={10}></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor='author' className='form-label'>Author</label>
              <input type='text' className='form-control' id='author' name='author' />
          </div>
          <div className='mb-3'>
            <label htmlFor='chapters' className='form-label'>Chapters</label>
              <input type='number' className='form-control' id='chapters' name='chapters' />
          </div>
          <button type='submit' className='btn btn-primary me-2'>Save</button>
          <a href='/manga' className='btn btn-secondary'>Cancel</a>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MangaForm);

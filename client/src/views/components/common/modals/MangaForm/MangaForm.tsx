import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../../../../state/ducks/alerts/actions';
import { createManga, updateManga } from '../../../../../state/ducks/manga/actions';
import store, { RootState } from '../../../../../state/store';
import { MangaFormProps } from '../../types';

import './MangaForm.css';

const MangaForm = ({ alerts, genres, isNew, manga }: MangaFormProps) => {
  const titleAlert = alerts.find(alert => alert.field === 'title');
  const authorAlert = alerts.find(alert => alert.field === 'author');
  const chaptersAlert = alerts.find(alert => alert.field === 'chapters');

  useEffect(() => {
    setFormData({
      id:  manga ? manga._id : '',
      title: manga ? manga.title : '',
      author: manga ? manga.author : '',
      synopsis: manga ? manga.synopsis : '',
      chapters: manga ? manga.chapters : 0
    });
  }, [manga]);

  const [formData, setFormData] = useState({
    id: manga ? manga._id : '',
    title: manga ? manga.title : '',
    author: manga ? manga.author: '',
    synopsis: manga ? manga.synopsis : '',
    chapters: manga ? manga.chapters: 0
  });

  const { id, title, author, synopsis, chapters } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    if (alerts.some(alert => alert.field === e.currentTarget.name)) {
      store.dispatch<any>(removeAlert(e.currentTarget.name));
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isNew) {
      store.dispatch<any>(createManga(title, author, synopsis, chapters));
    } else {
      store.dispatch<any>(updateManga(id, title, author, synopsis, chapters));
    }
  }

  return (
    <Fragment>
      <div className="manga-form modal fade" id="mangaForm" tabIndex={-1} aria-labelledby="mangaFormLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className='modal-content'>
            <form action='#!' onSubmit={e => onSubmit(e)}>
              <div className='modal-header'>
                <h5 className='modal-title'>{isNew ? 'Add New Manga' : 'Edit Manga'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='modal-body'>
                <div>
                  <label htmlFor='title' className='form-label'>Title</label>
                  <input type='text' className={`text-capitalize form-control mb-2 ${titleAlert ? 'is-invalid': ''}`} id='title' name='title' value={title} onChange={e => onChange(e)} />
                  <div id={titleAlert ? titleAlert.id : 'titleInvalid'} className='invalid-feedback'>
                    {titleAlert ? titleAlert.msg : 'Title is invalid.'}
                  </div>
                </div>
                <div>
                  <label htmlFor='genres' className='form-label'>Genres</label>
                  <select className='text-capitalize form-select mb-2' aria-label='genres' id='genres' name='genres'>
                    <option key='' value=''>Select a genre...</option>
                    {
                      !genres.isLoading && genres.genres.length > 0 &&
                      genres.genres.map(genre => <option key={genre._id} value={genre._id}>{genre.name}</option>)
                    }
                  </select>
                </div>
                <div>
                  <label htmlFor='author' className='form-label'>Author</label>
                  <input type='text' className={`text-capitalize form-control mb-2 ${authorAlert ? 'is-invalid': ''}`} id='author' name='author' value={author} onChange={e => onChange(e)} />
                  <div id={authorAlert ? authorAlert.id : 'titleInvalid'} className='invalid-feedback'>
                    {authorAlert ? authorAlert.msg : 'Title is invalid.'}
                  </div>
                </div>
                <div>
                  <label htmlFor='chapters' className='form-label'>Chapters</label>
                  <input type='number' className={`text-capitalize form-control mb-2 ${chaptersAlert ? 'is-invalid': ''}`} id='chapters' name='chapters' value={chapters} onChange={e => onChange(e)} />
                  <div id={chaptersAlert ? chaptersAlert.id : 'chaptersInvalid'} className='invalid-feedback'>
                    {chaptersAlert ? chaptersAlert.msg : 'Chapters is invalid.'}
                  </div>
                </div>
                <div>
                  <label htmlFor='synopsis' className='form-label'>Synopsis</label>
                  <textarea className='form-control mb-2' rows={10} id='synopsis' name='synopsis' value={synopsis} onChange={e => onChange(e)}></textarea>
                </div>
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

const mapStateToProps = (state: RootState) => ({
  alerts: state.alerts,
  genres: state.genres
});

export default connect(mapStateToProps)(MangaForm);

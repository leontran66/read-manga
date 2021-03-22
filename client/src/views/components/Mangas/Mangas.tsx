import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAllManga } from '../../../state/ducks/manga/actions';
import { loadReadings } from '../../../state/ducks/readings/actions';
import store, { RootState } from '../../../state/store';
import { AllMangaProps } from '../../types/Props';

import Manga from './MangaResult';

import './Mangas.css';

const Mangas = ({ auth, manga: { isLoading, manga }, readings }: AllMangaProps) => {
  useEffect(() => {
    store.dispatch<any>(loadAllManga());
    store.dispatch<any>(loadReadings());
  }, []);

  return (
    <div className='container-fluid'>
      <div className='mangas'>
        {auth.user && auth.user.accessLevel === 'admin' &&
          <a href='/manga/new' className='btn btn-primary mb-3'>Add New Manga</a>
        }
        {
          !isLoading && manga.length > 0 &&
          manga.map(mangaResult => {
            const hasReading = readings.some(reading => reading.manga === mangaResult._id);
            return <Manga key={mangaResult._id} manga={mangaResult} hasReading={hasReading}/>
          })
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  manga: state.manga,
  readings: state.readings.readings,
});

export default connect(mapStateToProps)(Mangas);

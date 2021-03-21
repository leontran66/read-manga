import { connect } from 'react-redux';
import { RootState } from '../../../state/store';
import { EnhancedProps } from '../../types/Props';

import Manga from './MangaResult';

import './Mangas.css';

const Mangas = ({ auth: { user } }: EnhancedProps) => {
  return (
    <div className='container-fluid'>
      <div className='mangas'>
        {user && user.accessLevel === 'admin' &&
          <a href='/manga/new' className='btn btn-primary mb-3'>Add New Manga</a>
        }
        <Manga />
        <Manga />
        <Manga />
        <Manga />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Mangas);

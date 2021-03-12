import { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContainer from '../components/common/MainContainer';
import Manga from '../components/Manga';

const MangaLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <Manga />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default MangaLayout;
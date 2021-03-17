import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
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

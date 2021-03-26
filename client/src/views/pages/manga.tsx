import { Fragment } from 'react';

import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import MainContainer from '../components/common/MainContainer/MainContainer';
import Manga from '../components/Manga/Manga/Manga';
import MangaWrapper from '../components/Manga/MangaWrapper/MangaWrapper';

const MangasLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <MangaWrapper>
          <Manga />
        </MangaWrapper>
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default MangasLayout;

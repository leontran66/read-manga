import { Fragment } from 'react';

import Footer from '../components/common/Footer';
import Genres from '../components/Genres/Genres';
import GenresWrapper from '../components/Genres/GenresWrapper';
import Header from '../components/common/Header';
import MainContainer from '../components/common/MainContainer';

const GenresLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <GenresWrapper>
          <Genres />
        </GenresWrapper>
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default GenresLayout;

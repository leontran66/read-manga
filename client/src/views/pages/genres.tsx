import { Fragment } from 'react';

import Genres from '../components/Genres';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainContainer from '../components/common/MainContainer';

const GenresLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <Genres />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default GenresLayout;

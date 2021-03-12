import { Fragment } from 'react';

import Genres from '../components/Genres';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
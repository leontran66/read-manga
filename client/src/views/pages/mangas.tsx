import { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContainer from '../components/common/MainContainer';
import Mangas from '../components/Mangas';

const MangasLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <Mangas />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default MangasLayout;
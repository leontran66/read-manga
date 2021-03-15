import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
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
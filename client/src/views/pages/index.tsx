import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Landing from '../components/Landing';
import MainContainer from '../components/common/MainContainer';

const IndexLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <Landing />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default IndexLayout;
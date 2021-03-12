import { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
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
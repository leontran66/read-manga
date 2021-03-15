import { Fragment } from 'react';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MainContainer from '../components/common/MainContainer';
import MangaForm from '../components/MangaForm';

const CreateMangaLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <MangaForm />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default CreateMangaLayout;
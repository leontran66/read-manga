import { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
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
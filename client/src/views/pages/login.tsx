import { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import MainContainer from '../components/common/MainContainer';

const LoginLayout = () => {
  return (
    <Fragment>
      <Header />
      <MainContainer>
        <LoginForm />
      </MainContainer>
      <Footer />
    </Fragment>
  );
};

export default LoginLayout;
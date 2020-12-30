import React from "react";
import { Route } from "react-router-dom";

import { MainPage } from "./pages";
import Modal from './components/Modal';
import { ContractProvider } from './contexts';

import './styles/main.scss';

function App() {

  return (
    <ContractProvider>
      <Route exact path="/"
             render={() => <MainPage />}
      />
      <Modal/>
    </ContractProvider>
  );
}

export default App;

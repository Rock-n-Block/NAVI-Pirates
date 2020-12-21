import React from "react";
import { Route } from "react-router-dom";

import { MainPage } from "./pages";
import { ContractProvider } from './contexts';

import './styles/main.scss';

function App() {

  return (
    <ContractProvider>
      <Route exact path="/"
             render={() => <MainPage />}
      />
    </ContractProvider>
  );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";
import { UserAgentProvider, } from 'react-ua';

import { MainPage } from "./pages";
import Modal from './components/Modal';
import { ContractProvider } from './contexts';

import './styles/main.scss';

function App() {
    return (
    <UserAgentProvider>
        <ContractProvider>
            <Route
            exact path="/"
            render={() => <MainPage />}
            />
            <Modal/>
        </ContractProvider>
    </UserAgentProvider>
    );
}

export default App;

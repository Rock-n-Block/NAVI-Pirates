import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { MainPage } from "./pages";
import BinanceService from './utils/binance';
import { userActions } from './redux/actions';

import './styles/main.scss'

function App() {
  const [binanceService, setBinanceService] = React.useState(null)

  const dispatch = useDispatch();

  React.useEffect(() => {
    let counter = 0;

    const interval = setInterval(() => {
      counter += 10;
      if (window['BinanceChain']) {
        clearInterval(interval)

        const binance = new BinanceService()

        setBinanceService(binance)

        binance.getAccount().then(res => {
          dispatch(userActions.setUserData(res))
          // dispatch(modalActions.toggleModal(false))
        }).catch(err => {
          console.log(err)
          dispatch(userActions.setUserData(err))
          // dispatch(modalActions.toggleModal(true))
        })
      } else if (counter > 3000) {
        console.log('error, binanceChain')
      }
    }, 10)
  }, [])
  return (

    <Route exact path="/" render={() =>
      <MainPage binanceService={binanceService} />}
    />

  );
}

export default App;

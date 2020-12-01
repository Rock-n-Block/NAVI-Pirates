
import './App.css';
import React from "react";
import {MainPage} from "./pages";
import {Route} from "react-router-dom";
import './styles/main.scss'

function App() {
  return (

      <Route exact path="/" render={() =>
          <MainPage />}
      />

  );
}

export default App;

import React from "react";

import { Header, Body, Footer } from '../../components'

const MainPage = ({ binanceService }) => {

    return (
        <div className="container">
            <Header binanceService={binanceService} />
            <Body />
            <Footer />
        </div>
    )
};
export default MainPage
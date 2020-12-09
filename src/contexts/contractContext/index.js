import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { BinanceService, ContractService } from '../../utils';
import { userActions } from '../../redux/actions';

const contractContext = createContext({
    binanceService: null,
    contractService: null,
})


const ContractProvider = ({ children }) => {
    const [binanceService, setBinanceService] = React.useState(null)
    const [contractService, setContractService] = React.useState(null)

    const dispatch = useDispatch();


    React.useEffect(() => {
        let counter = 0;

        const interval = setInterval(() => {
            counter += 10;
            if (window['BinanceChain']) {
                clearInterval(interval)

                const binance = new BinanceService()

                setContractService(new ContractService(binance))

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
        <contractContext.Provider value={{ binanceService, contractService }}>
            {children}
        </contractContext.Provider>
    );
}

export default ContractProvider;

export function useContractContext() {
    return useContext(contractContext)
}
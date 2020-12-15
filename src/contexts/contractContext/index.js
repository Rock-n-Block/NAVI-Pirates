import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { BinanceService, ContractService, MetamaskService } from '../../utils';
import { userActions } from '../../redux/actions';

const contractContext = createContext({
    walletService: null,
    contractService: null,
})


const ContractProvider = ({ children }) => {
    const [walletService, setWalletService] = React.useState(null)
    const [contractService, setContractService] = React.useState(null)

    const dispatch = useDispatch();

    const loginOneOf = async () => {
        try {
            const binance = new BinanceService()
            const accountBinance = await binance.getAccount()
            if (accountBinance) {
                setContractService(new ContractService(binance))
                setWalletService(binance)
                dispatch(userActions.setUserData(accountBinance))
            } else {
                const metamask = new MetamaskService()
                const accountMetamask = await metamask.getAccount()
                if (accountMetamask) {
                    setContractService(new ContractService(metamask))
                    setWalletService(metamask)
                    dispatch(userActions.setUserData(accountMetamask))
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    const loginBinance = async () => {
        try {
            const binance = new BinanceService()
            setContractService(new ContractService(binance))
            setWalletService(binance)
            const account = await binance.getAccount()
            dispatch(userActions.setUserData(account))
        } catch (e) {
            console.error(e);
        }
    }

    const loginMetamask = async () => {
        try {
            const metamask = new MetamaskService()
            await window.ethereum.enable()
            setContractService(new ContractService(metamask))
            setWalletService(metamask)
            const account = await metamask.getAccount()
            dispatch(userActions.setUserData(account))
        } catch (e) {
            console.error(e);
        }
    }

    React.useEffect(() => {
        let counter = 0;
        const interval = setInterval(() => {
            counter += 1000;
            const both = window['BinanceChain'] &&
            ((window.ethereum && window.ethereum.isMetaMask) || window.web3);
            if (both) {
                console.log('Both BinanceChain and MetaMask are installed')
                loginOneOf()
                clearInterval(interval)
            } else if (window['BinanceChain']) {
                console.log('BinanceChain is installed')
                clearInterval(interval)
                loginBinance()
            } else if ((window.ethereum && window.ethereum.isMetaMask) || window.web3) {
                console.log('MetaMask is installed')
                clearInterval(interval)
                loginMetamask()
            } else if (counter > 3000) {
                console.log('Error: no wallet is installed')
                clearInterval(interval)
            }
        }, 1000)
    }, [])

    return (
        <contractContext.Provider value={{ walletService, contractService }}>
            {children}
        </contractContext.Provider>
    );
}

export default ContractProvider;

export function useContractContext() {
    return useContext(contractContext)
}
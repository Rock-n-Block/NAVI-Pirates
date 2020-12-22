import React, { createContext, useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
            if ((window.ethereum && window.ethereum.isMetaMask) || window.web3) {
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
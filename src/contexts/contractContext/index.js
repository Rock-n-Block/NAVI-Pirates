import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";

import { BinanceService, ContractService, MetamaskService } from '../../utils';
import { userActions, modalActions } from '../../redux/actions';

const contractContext = createContext({
    walletService: null,
    contractService: null,
})


const ContractProvider = ({ children }) => {
    const [walletService, setWalletService] = React.useState(null)
    const [contractService, setContractService] = React.useState(null)

    const dispatch = useDispatch();

    const loginMetamask = React.useCallback(async () => {
        try {
            const metamask = new MetamaskService()
            // dispatch(modalActions.toggleModal({isOpen:true,text:'MetamaskService'}))
            await window.ethereum.enable()
            // dispatch(modalActions.toggleModal({isOpen:true,text:'ethereum.enable'}))
            setContractService(new ContractService(metamask))
            setWalletService(metamask)
            // dispatch(modalActions.toggleModal({isOpen:true,text:'ContractService'}))
            const account = await metamask.getAccount()
            dispatch(userActions.setUserData(account))
            isMobile && dispatch(modalActions.toggleModal({isOpen:true,text:'Metamask connected'}))
        } catch (e) {
            console.error(e);
            dispatch(modalActions.toggleModal({isOpen:true,text:e.errorMsg}))
        }
    },[])

    React.useEffect(() => {
        let counter = 0;
        let time = 1000;
        const interval = setInterval(() => {
            counter += time;
            if (window.ethereum) {
                console.log('MetaMask is installed')
                clearInterval(interval)
                loginMetamask()
            } else if (counter > 1000) {
                let countReloads = JSON.parse(localStorage.getItem('countReloads'))
                if (countReloads===null || Number(countReloads)<2) {
                    if (countReloads!==null) {
                        localStorage.setItem('countReloads',countReloads++)
                    } else {
                        localStorage.setItem('countReloads','0')
                    }
                    // dispatch(modalActions.toggleModal({isOpen:true,text:countReloads}))
                    if (isMobile) return window.location.reload()
                }
                localStorage.setItem('countReloads','0')
                clearInterval(interval)
                dispatch(modalActions.toggleModal({
                    isOpen:true,
                    text:
                    <div>
                      <p>
                        Metamask extension is not found.
                      </p>
                      <p>
                        You can install it from {' '}
                        <a href="https://metamask.io" target="_blank">metamask.io</a>
                      </p>
                    </div>
                }))
            }
        }, time)
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
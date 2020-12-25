import React from "react";
import {useContractContext} from "../../../contexts/contractContext";
import {useSelector} from "react-redux";
import sliderCard from '../../../assets/img/slider-card.png'

function TokenCardComponent(props) {
    const {
        index
    } = props;

    const { contractService } = useContractContext()

    // const [cashback, setCashback] = React.useState(0);
    const [tokenId, setTokenId] = React.useState('');

    const userAddress = useSelector(({ user }) => user.address);

    const getToken = React.useCallback(async () => {
        if (!userAddress) return;
        const tokenId = await contractService.tokenOfOwnerByIndex(userAddress, index)
        // console.log('getToken',tokenId)
        setTokenId(tokenId)
        // const cashback = await contractService.cashbackOfToken(tokenId)
        // setCashback(cashback)
    },[contractService, index, userAddress])

    // const getCashback = async () => {
    //     if (!userAddress) return;
    //     await contractService.getCashback(userAddress, tokenId)
    //     await getToken()
    // }

    React.useEffect(() => {
        if (contractService) {
            getToken()
        }
    }, [contractService, getToken])

    return (
    <div className="swiper-slide__data">
      <div className="swiper-slide__card">
        <img src={sliderCard} alt="" />
      </div>
      <div className="swiper-slide__id">
          #{tokenId}
      </div>
    </div>
    );
}

export default TokenCardComponent;

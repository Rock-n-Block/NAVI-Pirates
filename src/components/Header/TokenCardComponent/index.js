import React from "react";
import {useContractContext} from "../../../contexts/contractContext";
import {useSelector} from "react-redux";

function TokenCardComponent(props) {
    const {
        index
    } = props;

    const { contractService } = useContractContext()

    const [cashback, setCashback] = React.useState(0);
    const [tokenId, setTokenId] = React.useState('');

    const userAddress = useSelector(({ user }) => user.address);

    const getToken = React.useCallback(async () => {
        if (!userAddress) return;
        const tokenId = await contractService.tokenOfOwnerByIndex(userAddress, index)
        setTokenId(tokenId)
        const cashback = await contractService.cashbackOfToken(tokenId)
        setCashback(cashback)
    },[contractService, index, userAddress])

    const getCashback = async () => {
        if (!userAddress) return;
        await contractService.getCashback(userAddress, tokenId)
        await getToken()
    }

    React.useEffect(() => {
        if (contractService) {
            getToken()
        }
    }, [contractService, getToken])

    return (
    <div className="swiper-slide-data">
      <div className="swiper-slide-value">
          DIVS {cashback} BNB
      </div>
      <button
      className="swiper-slide-button"
      onClick={getCashback}
      >
          WITHDRAW
      </button>
      <div className="swiper-slide-id">
          #{index}
      </div>
    </div>
    );
}

export default TokenCardComponent;

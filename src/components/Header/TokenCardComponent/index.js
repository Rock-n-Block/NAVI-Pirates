import React from "react";
import {useContractContext} from "../../../contexts/contractContext";
import {useSelector} from "react-redux";

function TokenCardComponent(props) {
    const {
        index
    } = props;

    const { contractService } = useContractContext()

    const [token, setToken] = React.useState(false);

    const userAddress = useSelector(({ user }) => user.address);

    const getToken = async () => {
        if (!userAddress) return;
        const token = await contractService.tokenOfOwnerByIndex(userAddress, index)
        // console.log('getToken',token)
        setToken(token)
    }

    React.useEffect(() => {
        if (contractService) {
            getToken()
        }
    }, [contractService])

    return (
    <div className="swiper-slide-data">
      <div className="swiper-slide-value">
          count 1
      </div>
      <button className="swiper-slide-button">
          WITH DRAW
      </button>
      <div className="swiper-slide-id">
          #{index}
      </div>
    </div>
    );
}

export default TokenCardComponent;

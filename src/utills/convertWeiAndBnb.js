import Web3 from "web3";


export const WeiToETH = (number) => {
    let newVal =  Web3.utils.fromWei(number);
    return newVal;
}

export const ETHToWei = (number) => {
    let newVal = Web3.utils.toWei(number);
    return newVal;
}
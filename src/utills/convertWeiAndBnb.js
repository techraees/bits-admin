import { ethers } from "ethers";


export const WeiToETH = (number) => {
    let newVal = ethers.formatEther(number);
    return newVal;
}

export const ETHToWei = (number) => {
    let newVal = ethers.parseEther(number);
    return newVal;
}
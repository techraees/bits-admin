import Web3 from "web3";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ActionTypes from "../contants/ActionTypes";
import ethContractAbi from "../../abis/ethContractAbi.json";
import ethMintingContractAbi from "../../abis/ethMintingContractAbi.json";
import polygonContractAbi from "../../abis/polygonContractAbi.json";
import polygonMintingContractAbi from "../../abis/polygonMintingContractAbi.json";
import { extractNFTImage } from "../../utills/extractNftImage";
import { numToHex } from "../../utills/numberToHex";

export const loadBlockchainAction = (chain) => async (dispatch) => {
  // try {
  //   await Web3.givenProvider.enable();
  //   const web3 = new Web3(Web3.givenProvider);
  //   await web3.currentProvider.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{ chainId: "0x13881" }],
  //   });
    
  //   let account = await web3.eth.getAccounts();
  //   account = account[0];
  //   let chainId = await web3.eth.getChainId();

  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    let account = accounts[0];
    const signer = await provider.getSigner();
    const { chainId } = await provider.getNetwork();
    if(chain == chainId){
      const web3 = provider;
      const data = {
        account,
        web3,
        chainId,
        signer
      };
      dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
    }else{
      await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId:  numToHex(chain)}],
        });
        const web3 = provider;
        const data = {
          account,
          web3,
          chainId,
          signer
        };
        dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
    }

  } catch (err) {
    console.log("errr", err);
  }
};

export const loadWalletConnectAction = () => async (dispatch) => {
  try {
    const provider = new WalletConnectProvider({
      rpc: {
        5: "https://goerli.infura.io/v3/db1427c3f86f4a95a2dfde7849404077",
      },
      rpcUrl: "https://goerli.infura.io/v3/db1427c3f86f4a95a2dfde7849404077",
      chainId: 5,
    });
    if (provider) {
      await provider.enable();

      const web3 = new Web3(provider);
      console.log(web3);
      let account = await web3.eth.getAccounts();
      account = account[0];
      let chainId = await web3.eth.getChainId();
      const data = {
        web3,
        account,
        chainId,
      };
      dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
    }
  } catch (err) {
    console.log("errr", err);
  }
};



export const logoutWallet = () => async (dispatch) => {
  try {
    let account = null;
    account = null;
    let web3 = null;
    let chainId = null;
    const data = {
      web3,
      account,
      chainId,
    };
    dispatch({ type: ActionTypes.WEB3DISCONNECT, payload: data });
  } catch (err) {
    console.log("errr", err);
  }
};


export const updateAccount = (account) => async (
  dispatch,
) => {
  try {
    const data = {
      account,
    };
    dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
  } catch (err) {
    console.error('Failed to update account', err);
    throw err;
  }
};


//loading the contract instances
// export const loadEthContractIns = () => async (dispatch) => {
//   const ethInfuraIns = "https://goerli.infura.io/v3/e556d22112e34e3baab9760f1864493a";
//   const polygonInfuraIns = "https://polygon-mumbai.infura.io/v3/e556d22112e34e3baab9760f1864493a";
//   try {
//     let web3;
//     if(ethInfuraIns){
//       web3 = new Web3(new Web3.providers.HttpProvider(ethInfuraIns));
//     }else if(polygonInfuraIns){
//       web3 = new Web3(new Web3.providers.HttpProvider(polygonInfuraIns));
//     }
//     //ethereum
//     const ethMarketPlaceContract = "0xf16c5d540AC5A485404a26363b2138E6a79c04E5";
//     const ethMintingConract = "0x6E44f2d0249514e88b34242fc8Ff5C80697df495";
//     const ethContractIns = new web3.eth.Contract(ethContractAbi, ethMarketPlaceContract);
//     const ethMintingContractIns = new web3.eth.Contract(ethMintingContractAbi, ethMintingConract);

//     //polygon
//     const polygonMarketPlaceContract = "0x96d02fcCaC1aa96432347824D42754b5266B4D6c";
//     const polygonMintingConract = "0x630656827C8Ceaff3580823a8fD757E298cBfAAf";
//     const polygonContractIns = new web3.eth.Contract(polygonContractAbi, polygonMarketPlaceContract);
//     const polygonMintingContractIns = new web3.eth.Contract(polygonMintingContractAbi,polygonMintingConract);


//     // const imguri = extractNFTImage(ethMintingContract, 0)
//     // console.log(imguri);
//     // const auctions = await contract.methods.auctions(0).call();
//     dispatch({ type: ActionTypes.LOAD_CONTRACT, payload: {ethContractIns, ethMintingContractIns,polygonContractIns, polygonMintingContractIns} });
//     dispatch({
//       type: "MATIC_CHAIN",
//       contractData: {
//         marketContract:polygonContractIns,
//         mintContract:polygonMintingContractIns,
//       },
//     })
//   } catch (err) {
//     console.log("errr", err);
//   }
// };


export const loadEthContractIns = () => async (dispatch) => {
  const ethInfuraIns = "https://goerli.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  const polygonInfuraIns = "https://polygon-mumbai.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  try {

    //ethereum
    const ethProvider = new ethers.providers.JsonRpcProvider(ethInfuraIns);
    const ethMarketPlaceContract = "0xf16c5d540AC5A485404a26363b2138E6a79c04E5";
    const ethMintingConract = "0x6E44f2d0249514e88b34242fc8Ff5C80697df495";
    const ethContractIns = new ethers.Contract(ethMarketPlaceContract, ethContractAbi, ethProvider);
    const ethMintingContractIns = new ethers.Contract(ethMintingConract, ethMintingContractAbi, ethProvider);

    //polygon
    const polygonProvider = new ethers.providers.JsonRpcProvider(polygonInfuraIns);
    const polygonMarketPlaceContract = "0x96d02fcCaC1aa96432347824D42754b5266B4D6c";
    const polygonMintingConract = "0x3E2C2662b5b640DfDE71d47ed10106F19271309b";
    const polygonContractIns = new ethers.Contract(polygonMarketPlaceContract, polygonContractAbi,polygonProvider);
    const polygonMintingContractIns = new ethers.Contract(polygonMintingConract, polygonMintingContractAbi, polygonProvider);


    // const imguri = extractNFTImage(ethMintingContract, 0)
    // console.log(imguri);
    // const auctions = await contract.methods.auctions(0).call();
    dispatch({ type: ActionTypes.LOAD_CONTRACT, payload: {ethContractIns, ethMintingContractIns,polygonContractIns, polygonMintingContractIns} });
    dispatch({
      type: "MATIC_CHAIN",
      contractData: {
        marketContract:polygonContractIns,
        mintContract:polygonMintingContractIns,
        chain: 80001
      },
    })
  } catch (err) {
    console.log("errr", err);
  }
};


const getEmoteItems = ()=>{
  const combined = {};

    const length = 6;
    let tokenID = "tokenId";

    for (let i = 0; i < length; i++) {
      const obj = array[i];
      const id = obj[tokenID];

      if (combined[id]) {
        combined[id].owners.push({
          owner: obj.owner,
          copies: obj.copies
        });
      } else {
        combined[id] = {
          id: id,
          owners: [{ owner: obj.owner, copies: obj.copies }]
        };
      }
    }

    return Object.values(combined);
}
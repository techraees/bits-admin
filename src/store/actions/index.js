import Web3 from "web3";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ActionTypes from "../contants/ActionTypes";
import ethMarketContractAbi from "../../abis/ethMarketContractAbi.json";
import ethMintingContractAbi from "../../abis/ethMintingContractAbi.json";
import polygonMarketContractAbi from "../../abis/polygonMarketContractAbi.json";
import polygonMintingContractAbi from "../../abis/polygonMintingContractAbi.json";
import { extractNFTImage } from "../../utills/extractNftImage";
import { numToHex } from "../../utills/numberToHex";
import { WeiToETH } from "../../utills/convertWeiAndBnb";

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


export const loadContractIns = () => async (dispatch) => {
  const ethInfuraIns = "https://goerli.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  const polygonInfuraIns = "https://polygon-mumbai.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  try {

    //ethereum
    const ethProvider = new ethers.providers.JsonRpcProvider(ethInfuraIns);
    const ethMarketPlaceContract = "0xf16c5d540AC5A485404a26363b2138E6a79c04E5";
    const ethMintingConract = "0x6E44f2d0249514e88b34242fc8Ff5C80697df495";
    const ethMarketContractIns = new ethers.Contract(ethMarketPlaceContract, ethMarketContractAbi, ethProvider);
    const ethMintingContractIns = new ethers.Contract(ethMintingConract, ethMintingContractAbi, ethProvider);

    //polygon
    const polygonProvider = new ethers.providers.JsonRpcProvider(polygonInfuraIns);
    const polygonMarketPlaceContract = "0xfB90db0b920E56913a3a9E31E4Bce000DCA52249";
    const polygonMintingConract = "0x3E2C2662b5b640DfDE71d47ed10106F19271309b";
    const polygonMarketContractIns = new ethers.Contract(polygonMarketPlaceContract, polygonMarketContractAbi,polygonProvider);
    const polygonMintingContractIns = new ethers.Contract(polygonMintingConract, polygonMintingContractAbi, polygonProvider);


    // const imguri = extractNFTImage(ethMintingContract, 0)
    // console.log(imguri);
    // const auctions = await contract.methods.auctions(0).call();
  

    dispatch({ type: ActionTypes.LOAD_CONTRACT, payload: {ethMarketContractIns, ethMintingContractIns,polygonMarketContractIns, polygonMintingContractIns} });
    dispatch({
      type: "MATIC_CHAIN",
      contractData: {
        marketContract:polygonMarketContractIns,
        mintContract:polygonMintingContractIns,
        chain: 80001
      },
    })

  getEmoteItems(ethMarketContractIns, polygonMarketContractIns).then((result)=>{
      const {maticList, ethList} = result;
      
      dispatch({ type: "LOAD_FIXED_ITEMS", payload: {maticList, ethList} });
      dispatch({
        type: "MATIC_CHAIN_FIXED",
        fixedItemData: maticList,
      });
   });

   getAuctions(ethMarketContractIns, polygonMarketContractIns).then((result)=>{
      const {maticAuctionsList, ethAuctionsList} = result;
      dispatch({
        type: "MATIC_CHAIN_AUCTION",
        auctionItemData: maticAuctionsList,
      });
   })


  } catch (err) {
    console.log("errr", err);
  }
};


// getting fixed prices
const getEmoteItems = async (ethMarketContractIns, polygonMarketContractIns) => {
  const maticcombined = {};
  const ethcombined = {};

  const maticArray = Number(await polygonMarketContractIns.getAllFixedPrices());
  let tokenID = "tokenid";

  //polygon
  for (let i = 0; i < maticArray; i++) {
    const obj = await polygonMarketContractIns.Fixedprices(i);
    const id = Number(obj[tokenID]);

    if (maticcombined[id]) {
      maticcombined[id].owners.push({
        owner: obj.owner,
        copies: Number(obj.totalcopies),
        newOwner: obj.newowner,
        price: WeiToETH(obj.price),
        fixedid: Number(obj.fixedid),
      });
    } else {
      maticcombined[id] = {
        tokenid: id,
        owners: [
          {
            owner: obj.owner,
            copies: Number(obj.totalcopies),
            newOwner: obj.newowner,
            price: WeiToETH(obj.price),
            fixedid: Number(obj.fixedid),
          }
        ]
      };
    }
  }

  const maticList = Object.values(maticcombined);

  //ethereum

  const ethArray = Number(await polygonMarketContractIns.getAllFixedPrices());;

  for (let i = 0; i < ethArray; i++) {
    const ethobj = await polygonMarketContractIns.Fixedprices(i);
    const ethid = Number(ethobj[tokenID]);

    if (ethcombined[ethid]) {
      ethcombined[ethid].owners.push({
        owner: ethobj.owner,
        copies: Number(ethobj.totalcopies),
        newOwner: ethobj.newowner,
        price: WeiToETH(ethobj.price),
        fixedid: Number(ethobj.fixedid),
      });
    } else {
      ethcombined[ethid] = {
        tokenid: ethid,
        owners: [
          {
            owner: ethobj.owner,
            copies: Number(ethobj.totalcopies),
            newOwner: ethobj.newowner,
            price: WeiToETH(ethobj.price),
            fixedid: Number(ethobj.fixedid),
          }
        ]
      };
    }
  }

  const ethList = Object.values(ethcombined);

  return { maticList, ethList };
};

//getting auctions
const getAuctions = async (ethMarketContractIns, polygonMarketContractIns) => {
  const maticAuctionsList = [];
  const maticArray = Number(await polygonMarketContractIns.getAllAuctions());

  for (let i = 0; i < maticArray; i++) {
    const obj = await polygonMarketContractIns.auctions(i);
    maticAuctionsList.push(obj);
  }


  const ethAuctionsList = [];
  const ethArray = Number(await polygonMarketContractIns.getAllAuctions());

  for (let i = 0; i < ethArray; i++) {
    const obj = await polygonMarketContractIns.auctions(i);
    ethAuctionsList.push(obj);
  }

  return {maticAuctionsList, ethAuctionsList};
};

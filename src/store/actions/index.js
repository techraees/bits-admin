import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ActionTypes from "../contants/ActionTypes";

export const loadBlockchainAction = () => async (dispatch) => {
  try {
    await Web3.givenProvider.enable();
    const web3 = new Web3(Web3.givenProvider);
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
    let account = await web3.eth.getAccounts();
    account = account[0];
    let chainId = await web3.eth.getChainId();
    const data = {
      web3,
      account,
      chainId,
    };
    dispatch({ type: ActionTypes.WEB3CONNECT, payload: data });
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

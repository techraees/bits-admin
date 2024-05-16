import { ethers } from "ethers";
import ethMarketContractAbi from "../../abis/ethMarketContractAbi.json";
import ethMintingContractAbi from "../../abis/ethMintingContractAbi.json";
import polygonMarketContractAbi from "../../abis/polygonMarketContractAbi.json";
import polygonMintingContractAbi from "../../abis/polygonMintingContractAbi.json";

import { timestampToDate } from "../../utills/timeToTimestamp";
import { WeiToETH } from "../../utills/convertWeiAndBnb";
import { ETHTOUSD, MATICTOUSD } from "../../utills/currencyConverter";

export const loadAdminDetailsAction = (args) => async (dispatch) => {
  try {
    console.log("argsargs", args);
    const data = {
      id: args?.id,
      name: args?.name,
      email: args?.email,
      superUser: args?.super_user,
      routeAccess: args?.routes_access,
      viewOnly: args?.view_only,
    };
    console.log("data", data);

    dispatch({ type: "LOAD_ADMIN_DATA", payload: data });
  } catch (err) {
    console.log("errr", err);
  }
};

//loading all contracts data
export const loadContractIns = () => async (dispatch) => {
  const ethInfuraIns =
    "https://mainnet.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  const polygonInfuraIns =
    "https://polygon-mainnet.infura.io/v3/e556d22112e34e3baab9760f1864493a";
  try {
    //ethereum
    const ethProvider = new ethers.JsonRpcProvider(ethInfuraIns);
    const ethMarketPlaceContract = "0x3E12F9b507F51DccDc448B38d67eBfE2194b6e72";
    const ethMintingConract = "0x00Ee6dA7De5635cA6c2742682168621351e6b5B1";
    const ethMarketContractIns = new ethers.Contract(
      ethMarketPlaceContract,
      ethMarketContractAbi,
      ethProvider
    );
    const ethMintingContractIns = new ethers.Contract(
      ethMintingConract,
      ethMintingContractAbi,
      ethProvider
    );

    //polygon
    const polygonProvider = new ethers.JsonRpcProvider(polygonInfuraIns);
    const polygonMarketPlaceContract =
      "0x381c730F1646f00e4Ae9Dfe9589b1E0BDE107a1e";
    const polygonMintingContract = "0x00Ee6dA7De5635cA6c2742682168621351e6b5B1";
    const polygonMarketContractIns = new ethers.Contract(
      polygonMarketPlaceContract,
      polygonMarketContractAbi,
      polygonProvider
    );
    const polygonMintingContractIns = new ethers.Contract(
      polygonMintingContract,
      polygonMintingContractAbi,
      polygonProvider
    );

    dispatch({
      type: "LOAD_CONTRACT",
      payload: {
        ethMarketContractIns,
        ethMintingContractIns,
        polygonMarketContractIns,
        polygonMintingContractIns,
      },
    });

    const { topUsersByBought, topUsersBySold } = await getTopUsers(
      polygonMarketContractIns,
      ethMarketContractIns,
      ethProvider,
      polygonProvider
    );

    dispatch({
      type: "TOP_USERS",
      topUsersData: {
        topByBought: topUsersByBought,
        topBySold: topUsersBySold,
      },
    });

    console.log("Top_Users", topUsersByBought, topUsersBySold);

    const { totalTxs, totalFixedEvents } = await getTotalTrans(
      polygonProvider,
      polygonMarketPlaceContract,
      polygonMintingContract,
      ethProvider,
      ethMarketPlaceContract,
      ethMintingConract,
      polygonMarketContractIns,
      ethMarketContractIns
    );

    dispatch({
      type: "LOAD_TX",
      transactionData: {
        totalTrans: totalTxs,
        fixedprices: totalFixedEvents,
      },
    });

    const totalArr = await getAllTransactions(
      polygonProvider,
      polygonMarketPlaceContract,
      polygonMintingContract,
      ethProvider,
      ethMarketPlaceContract,
      ethMintingConract
    );

    dispatch({ type: "LOAD_TRANS", payload: totalArr });

    console.log("Total Arr List", totalArr);
  } catch (err) {
    console.log("errr", err);
  }
};

//total transactions
const getTotalTrans = async (
  polygonProvider,
  polygonMarketPlaceContract,
  polygonMintingContract,
  ethProvider,
  ethMarketPlaceContract,
  ethMintingConract,
  polygonMarketContractIns,
  ethMarketContractIns
) => {
  const { polyMarketTxs, polyMintTxs, ethMarketTxs, ethMintTxs } =
    await getAllLogs(
      polygonProvider,
      polygonMarketPlaceContract,
      polygonMintingContract,
      ethProvider,
      ethMarketPlaceContract,
      ethMintingConract
    );

  const data = await polygonProvider.getTransactionReceipt(
    "0xc6f8764d0fd285fcfc565f3f3a9d61368e8af5218b874aac2485aea65e67ae1a"
  );

  console.log("The Trans", data);

  const totalTxs =
    polyMarketTxs.length +
    polyMintTxs.length +
    ethMarketTxs.length +
    ethMintTxs.length;

  const polygonfilter = polygonMarketContractIns.filters.buyFixedprice();
  const ethfilter = ethMarketContractIns.filters.buyFixedprice();

  const polygonEvents = await polygonMarketContractIns.queryFilter(
    polygonfilter,
    0,
    "latest"
  );
  const ethEvents = await ethMarketContractIns.queryFilter(
    ethfilter,
    0,
    "latest"
  );

  console.log("polygon events", polygonEvents);

  const totalFixedEvents = polygonEvents.length + ethEvents.length;

  return { totalTxs, totalFixedEvents };
};

//All transactions
const getAllTransactions = async (
  polygonProvider,
  polygonMarketPlaceContract,
  polygonMintingContract,
  ethProvider,
  ethMarketPlaceContract,
  ethMintingConract
) => {
  const { polyMarketTxs, polyMintTxs, ethMarketTxs, ethMintTxs } =
    await getAllLogs(
      polygonProvider,
      polygonMarketPlaceContract,
      polygonMintingContract,
      ethProvider,
      ethMarketPlaceContract,
      ethMintingConract
    );

  const polyMarketArr = await getTranArray(polyMarketTxs, polygonProvider);
  const polyMintArr = await getTranArray(polyMintTxs, polygonProvider);
  const ethMarketArr = await getTranArray(ethMarketTxs, ethProvider);
  const ethMintArr = await getTranArray(ethMintTxs, ethProvider);

  const totalArr = Array.from(
    new Map(
      [...polyMarketArr, ...polyMintArr, ...ethMarketArr, ...ethMintArr].map(
        (obj) => [obj.transaction_hash, obj]
      )
    ).values()
  ).map((obj, index) => ({ ...obj, id: index + 1 }));
  return totalArr;
};

//retrive transaction array
const getTranArray = async (txs, provider) => {
  const arr = await Promise.all(
    txs.map(async (item, e) => {
      const tx = await provider.getTransaction(item.transactionHash);
      const block = await provider.getBlock(item.blockHash);
      const date = timestampToDate(block.timestamp * 1000);
      const txrecp = await provider.getTransactionReceipt(item.transactionHash);
      const obj = {
        id: e,
        transaction_hash: tx.hash,
        from: tx.from,
        is_success: txrecp.status === 1,
        date: date,
        // price: WeiToETH(Number(tx.value)),
        price: Number(WeiToETH(tx.value)).toFixed(4),
        chain: Number(tx.chainId),
      };
      return obj;
    })
  );

  return arr;
};

const getAllLogs = async (
  polygonProvider,
  polygonMarketPlaceContract,
  polygonMintingContract,
  ethProvider,
  ethMarketPlaceContract,
  ethMintingConract
) => {
  // Transactions logs
  //polygon
  const polyMarketTxs = await polygonProvider.getLogs({
    address: polygonMarketPlaceContract,
    fromBlock: 0, // Start block number
    toBlock: "latest", // End block (latest block)
  });

  const polyMintTxs = await polygonProvider.getLogs({
    address: polygonMintingContract,
    fromBlock: 0, // Start block number
    toBlock: "latest", // End block (latest block)
  });

  //ethereum
  const ethMarketTxs = await ethProvider.getLogs({
    address: ethMarketPlaceContract,
    fromBlock: 0, // Start block number
    toBlock: "latest", // End block (latest block)
  });

  const ethMintTxs = await ethProvider.getLogs({
    address: ethMintingConract,
    fromBlock: 0, // Start block number
    toBlock: "latest", // End block (latest block)
  });

  return { polyMarketTxs, polyMintTxs, ethMarketTxs, ethMintTxs };
};

//get top users

const getTopUsers = async (
  polygonMarketContractIns,
  ethMarketContractIns,
  ethProvider,
  polygonProvider
) => {
  const polygonfixedfilter = polygonMarketContractIns.filters.buyFixedprice();
  // const polygonclaimfilter = polygonMarketContractIns.filters.claimnft();

  const ethfixedfilter = ethMarketContractIns.filters.buyFixedprice();
  // const ethclaimfilter = ethMarketContractIns.filters.claimnft();

  //events
  const polygonFixedEvents = await polygonMarketContractIns.queryFilter(
    polygonfixedfilter,
    0,
    "latest"
  );
  // const polygonClaimEvents = await polygonMarketContractIns.queryFilter(
  //   polygonclaimfilter,
  //   0,
  //   "latest"
  // );

  const ethFixedEvents = await ethMarketContractIns.queryFilter(
    ethfixedfilter,
    0,
    "latest"
  );
  // const ethClaimEvents = await ethMarketContractIns.queryFilter(
  //   ethclaimfilter,
  //   0,
  //   "latest"
  // );

  //array
  const polyFixedArr = await getTopArray(polygonFixedEvents, polygonProvider);
  // const polyClaimArr = await getTopArray(polygonClaimEvents, polygonProvider);

  const ethFixedArr = await getTopArray(ethFixedEvents, ethProvider);
  // const ethClaimArr = await getTopArray(ethClaimEvents, ethProvider);

  const combinedArray = [
    ...polyFixedArr,
    // ...polyClaimArr,
    ...ethFixedArr,
    // ...ethClaimArr,
  ];

  const topUsersByBought = topByAdress(combinedArray, "buyer");
  const topUsersBySold = topByAdress(combinedArray, "seller");

  console.log("tobybought", combinedArray);

  return { topUsersByBought, topUsersBySold };
};

const getTopArray = async (events, provider) => {
  const arr = await Promise.all(
    events.map(async (item, e) => {
      const tx = await provider.getTransaction(item.transactionHash);
      const amount = WeiToETH(tx.value);
      const obj = {
        buyer: item.args.buyer,
        seller: item.args.seller,
        price: Number(await getPrice(amount, Number(tx.chainId))),
      };
      return obj;
    })
  );

  return arr;
};

const topByAdress = (combinedArray, account) => {
  const combinedValues = {};

  combinedArray.forEach((item) => {
    const address = account == "buyer" ? item.buyer : item.seller;
    if (combinedValues[address]) {
      combinedValues[address].price += item.price;
    } else {
      combinedValues[address] = { ...item };
    }
  });

  // Sort the combined values object by values in descending order
  const sortedCombinedValues = Object.values(combinedValues).sort(
    (a, b) => b.value - a.value
  );

  // Limit the result to a maximum of 10 items
  const limitedResult = sortedCombinedValues.slice(0, 10);

  return limitedResult;
};

const getPrice = async (amount, chain) => {
  let value;
  const eth2usdprice = await ETHTOUSD(1);
  const matic2usdprice = await MATICTOUSD(1);
  if (chain == 80001) {
    value = Number(amount * matic2usdprice).toFixed(4);
  } else {
    value = Number(amount * eth2usdprice).toFixed(4);
  }
  return value;
};

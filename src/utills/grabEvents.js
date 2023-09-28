import { ethers } from "ethers";
import ethMarketContractAbi from "../abis/ethMarketContractAbi.json";
import ethMintingContractAbi from "../abis/ethMintingContractAbi.json";
import polygonMarketContractAbi from "../abis/polygonMarketContractAbi.json";
import polygonMintingContractAbi from "../abis/polygonMintingContractAbi.json";

import { trimWallet } from "./trimWalletAddr";

export const grabEvents = async (setContractEvents) => {
  const polyAlchemyUrl =
    "wss://polygon-mumbai.g.alchemy.com/v2/M-CdefLEbTU2Mp8DWZ2NbtsegnGa1dl4";
  const ethAlchemyUrl =
    "wss://eth-goerli.g.alchemy.com/v2/BwHa-dw_5hX9r-Zf4PQtOJaVEAYtx03B";
  try {
    //ethereum
    const ethProvider = new ethers.WebSocketProvider(ethAlchemyUrl);
    const ethMarketPlaceContract = "0x1E15394A6D3b642d9e06a4238D1EC70baC4ae1d5";
    const ethMintingConract = "0x8A59905976bD8D8C9A7D273909A93281a51A4842";
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
    const polygonProvider = new ethers.WebSocketProvider(polyAlchemyUrl);
    const polygonMarketPlaceContract =
      "0x7Af5243b7F331217e2D37b19FE773B2C0A5D4301";
    const polygonMintingContract = "0x97C49dFeB7ff0bD5006B02fD59912Ab63f5D4216";
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
    polygonMarketContractIns.on(
      "buyFixedprice",
      async (
        tokenid,
        amount,
        buyer,
        seller,
        platformfee,
        amountPaytoSeller,
        _royaltyfee
      ) => {
        setContractEvents((prev) => [
          ...prev,
          { address: trimWallet(buyer, 42), message: "bought NFT" },
        ]);
      }
    );
    ethMarketContractIns.on(
      "buyFixedprice",
      async (
        tokenid,
        amount,
        buyer,
        seller,
        platformfee,
        amountPaytoSeller,
        _royaltyfee
      ) => {
        setContractEvents((prev) => [
          ...prev,
          { address: trimWallet(buyer, 42), message: "bought NFT" },
        ]);
      }
    );

    polygonMarketContractIns.on(
      "claimnft",
      async (auctionid, tokenId, seller, platformfee, winner) => {
        setContractEvents((prev) => [
          ...prev,
          { address: trimWallet(winner, 42), message: "claimd NFT" },
        ]);
      }
    );

    ethMarketContractIns.on(
      "claimnft",
      async (auctionid, tokenId, seller, platformfee, winner) => {
        setContractEvents((prev) => [
          ...prev,
          { address: trimWallet(winner, 42), message: "claimd NFT" },
        ]);
      }
    );

    polygonMarketContractIns.on("HighestBidIcrease", async (bidder, amount) => {
      setContractEvents((prev) => [
        ...prev,
        { address: trimWallet(bidder, 42), message: "bid a auction" },
      ]);
    });

    ethMarketContractIns.on("HighestBidIcrease", async (bidder, amount) => {
      setContractEvents((prev) => [
        ...prev,
        { address: trimWallet(bidder, 42), message: "bid a auction" },
      ]);
    });

    polygonMarketContractIns.on(
      "listitemforfixeprice",
      async (tokenid, amount, price, _listingid) => {
        setContractEvents((prev) => [
          ...prev,
          { address: `NFT #${tokenid}`, message: "listed for fixed price" },
        ]);
      }
    );

    ethMarketContractIns.on(
      "listitemforfixeprice",
      async (tokenid, amount, price, _listingid) => {
        setContractEvents((prev) => [
          ...prev,
          { address: `NFT #${tokenid}`, message: "listed for fixed price" },
        ]);
      }
    );

    polygonMarketContractIns.on(
      "listitemforauction",
      async (
        tokenid,
        amount,
        initialprice,
        auctionStartTime,
        auctionEndTime,
        _listingid
      ) => {
        setContractEvents((prev) => [
          ...prev,
          { address: `NFT #${tokenid}`, message: "listed for an auction" },
        ]);
      }
    );

    ethMarketContractIns.on(
      "listitemforauction",
      async (
        tokenid,
        amount,
        initialprice,
        auctionStartTime,
        auctionEndTime,
        _listingid
      ) => {
        setContractEvents((prev) => [
          ...prev,
          { address: `NFT #${tokenid}`, message: "listed for an auction" },
        ]);
      }
    );

    //need change here
    polygonMintingContractIns.on(
      "TransferSingle",
      async (operator, from, to, id, value) => {
        setContractEvents((prev) => [
          ...prev,
          { address: trimWallet(to, 42), message: "minted a NFT" },
        ]);
      }
    );

    ethMintingContractIns.on(
      "TransferSingle",
      async (operator, from, to, id, value) => {
        setContractEvents((prev) => [
          ...prev,
          { address: trimWallet(to, 42), message: "minted a NFT" },
        ]);
      }
    );
  } catch (err) {
    console.log("errr", err);
  }
};

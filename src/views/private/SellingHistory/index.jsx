import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { profile2 } from "../../../assets";
import { Transactions } from "../../../components";
import { Dropdown, Button, Space, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./css/index.css";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_ALL_NFTS_WITHOUT_ADDRESS } from "../../../gql/queries";
import { timestampToDate } from "../../../utills/timeToTimestamp";
import { WeiToETH } from "../../../utills/convertWeiAndBnb";

const SellingHistory = () => {
  const { error, data } = useQuery(GET_ALL_NFTS_WITHOUT_ADDRESS);

  const [nfts, setNfts] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("Last Week");
  const { contractData } = useSelector((state) => state.chain.contractData);
  const { userData } = useSelector((state) => state.address.userData);
  const [sellingHistory, setSellingHistory] = useState([]);

  useEffect(() => {
    if (data) {
      setNfts(data?.getAllNftsWithoutAddress);
    }
  }, [data]);

  useEffect(() => {
    async function getPastEvents() {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          contractData.chain == 1
            ? "https://mainnet.infura.io/v3/e556d22112e34e3baab9760f1864493a"
            : "https://polygon-mainnet.infura.io/v3/e556d22112e34e3baab9760f1864493a",
        );
        // Get past events
        const filter = contractData.marketContract.filters.buyFixedprice(); // Define the event filter
        const events = await contractData.marketContract.queryFilter(
          filter,
          0,
          "latest",
        );

        // Process events
        events.forEach(async (event) => {
          const block = await provider.getBlock(event.blockHash);

          const date = timestampToDate(block.timestamp * 1000);

          const value = WeiToETH(
            `${
              Number(event.args.amountPaytoSeller) +
              Number(event.args.platformfee) +
              Number(event.args._royaltyfee)
            }`,
          );

          nfts &&
            nfts?.map((e) => {
              if (
                Number(event.args.tokenid) == e.token_id &&
                userData.address == e.wallet_address
              ) {
                const obj = {
                  image: profile2,
                  name: e.name,
                  buyerName: event.args.buyer,
                  date: date,
                  price: value,
                };

                setSellingHistory((prev) => {
                  return [...prev, obj];
                });
              } else {
                console.log(error);
              }
            });
        });
      } catch (err) {
        console.error("Error fetching past events:", err);
      }
    }

    const fetchData = async () => {
      await getPastEvents();
    };
    fetchData();
  }, [contractData, userData]);

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme,
  );
  const menu = (
    <Menu
      onClick={(e) => setDropdownValue(e.key)}
      items={[
        {
          label: "Last Week",
          key: "Last Week",
        },
        {
          label: "Last Month",
          key: "Last Month",
        },
        {
          label: "Last Year",
          key: "Last Year",
        },
      ]}
    />
  );
  return (
    <div className={`${backgroundTheme}`} style={{ minHeight: "100vh" }}>
      <div className="container">
        <div
          className="d-flex justify-content-between py-5 transactionFirstView"
          style={{ alignItems: "center" }}
        >
          <div className="d-flex" style={{ alignItems: "center" }}>
            {/* <img src={profile_large} style={{ width: 70, height: 70 }} /> */}
            <h4 className="white ms-4 semi-bold red-gradient-color">
              {userData?.full_name}
            </h4>
          </div>
          <Dropdown overlay={menu} className="dropdownView mobMargin">
            <Button>
              <Space>
                {dropdownValue}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div style={{ border: "1px solid #D54343" }}></div>
        <Transactions checkIcon data={sellingHistory} />
      </div>
    </div>
  );
};

export default SellingHistory;

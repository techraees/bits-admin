import React, { useEffect, useState } from "react";
import "./css/index.css";
import { NavbarComponent, CardCompnent } from "../../components";
import { Input, Select } from "antd";
import { search, AZ, grid, profile } from "../../assets";
import { useSelector } from "react-redux";
import { BsFilterLeft } from "react-icons/bs";
import { GET_ALL_NFTS_WITHOUT_ADDRESS } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import environment from "../../environment";

const VideoGallery = () => {
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_NFTS_WITHOUT_ADDRESS
  );

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );

  const [tokenData, setTokenData] = useState({});

  const { contractData } = useSelector((state) => state.chain.contractData);
  const { fixedItemData } = useSelector(
    (state) => state.fixedItemDatas.fixedItemData
  );

  const textColor = useSelector((state) => state.app.theme.textColor);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  const { userData } = useSelector((state) => state.address.userData);
  const userProfile = userData?.full_name;
  const imgPaths = environment.BACKEND_BASE_URL + "/";

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  console.log("data", data);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div
      className={`${backgroundTheme} pb-2`}
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"3"}
        headerText={"Emote Video Gallery"}
      />
      <div className="container">
        <div
          style={{ width: "100%" }}
          className={`d-flex searchStyle ${bgColor} my-4`}
        >
          <Input
            placeholder="Search Here..."
            className={`searchStyle ${bgColor}`}
          />
          <img className="me-3 cursor" style={{ width: 15 }} src={search} />
        </div>
        <div
          style={{ borderBottom: "0.5px solid #c23737", marginTop: "2.5rem" }}
        ></div>
        <div className="d-flex justify-content-between mt-5">
          <div className="d-flex gap-5 ">
            <div className={`filter-wrapper ${bgColor}`}>
              <BsFilterLeft style={{ color: "#C93B3B", fontSize: "2rem" }} />
            </div>
            <div className="marketplace-select-field d-flex gap-2">
              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Category"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Category",
                      label: "Category",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Price"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Price",
                      label: "Price",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Quantity"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  className={textColor == "black" && "light"}
                  options={[
                    {
                      value: "Quantity",
                      label: "Quantity",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Auction"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Auction",
                      label: "Auction",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Ranking"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Ranking",
                      label: "Ranking",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className={`grid-wrapper ${bgColor}`}>
            <img src={AZ} className="me-2" style={{ width: 20, height: 20 }} />
            <span
              className="me-2"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <img src={grid} style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div
          style={{ borderBottom: "0.5px solid #c23737", marginTop: "3.5rem" }}
        ></div>
        <div className="row my-3">
          {fixedItemData?.map((item) => {
            return data?.getAllNftsWithoutAddress?.map((e, i) => {
              if (
                !e.is_blocked &&
                item.tokenid == e.token_id &&
                contractData.chain == e.chainId &&
                item.isSold == false
              ) {
                return (
                  <CardCompnent
                    key={i}
                    image={imgPaths + e?.user_id?.profileImg}
                    status={e.status}
                    name={e.name}
                    videoLink={e.video}
                    topName
                    collectionBtn
                    detailBtn
                    userProfile={userProfile ? true : false}
                    userId={e?.user_id?.id}
                    owners={item.owners}
                    fixtokenId={item.tokenid}
                    fixOwner={e.wallet_address}
                    fixRoyalty={e.royalty}
                    fixCopies={e.supply}
                    id={e._id}
                  />
                );
              }
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;

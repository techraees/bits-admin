import React, { useEffect } from "react";
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
        <div style={{ border: "1px solid #5e2a2a" }}></div>
        <div style={{ width: "100%" }} className="d-flex justify-content-end">
          <div
            className={`d-flex py-2 px-3 my-4 ${bgColor}`}
            style={{ borderRadius: 20 }}
          >
            <img src={AZ} className="me-2" style={{ width: 20, height: 20 }} />
            <span
              className="me-2"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <img src={grid} style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div style={{ border: "1px solid #5e2a2a" }}></div>
        <div className="row my-3">
          {data?.getAllNftsWithoutAddress?.map((e, i) => {
            if (!e.is_blocked) {
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
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;

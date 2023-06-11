import React, { useState } from "react";
import "./css/index.css";
import { NavbarComponent, VideoCard } from "../../components";
import { plus2, profile_small, thumbnail, upload, video } from "../../assets";
import { Pagination } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_NFTS_FOR_ADMIN } from "../../gql/queries";
import { UPDATE_NFT_STATUS } from "../../gql/mutations";
import Loading from "../../components/loaders/loading";

const DataSection = () => {
  const [value, setValue] = useState(1);
  console.log("value", value);

  const { loading, error, data, refetch } = useQuery(GET_ALL_NFTS_FOR_ADMIN);

  const [updateNftStatus, { loading: statusLoading }] =
    useMutation(UPDATE_NFT_STATUS);

  let start = (value - 1) * 10;
  let end = value * 10;

  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"Data Section"} selectedKey={"3"} />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        {statusLoading && <Loading />}
        <div className="row my-4 sectionMobView">
          <div className="col-lg-6">
            <div className="d-flex center light-grey-border-bottom pb-3">
              <img src={video} />
              <h5 className="m-0 ms-2">Videos</h5>
            </div>
            {data?.getAllNftsWithoutAddress?.slice(start, end).map((e, i) => {
              return (
                <VideoCard
                  key={i}
                  id={e?._id}
                  videoThumbnail={e.videoThumbnail}
                  name={e?.name}
                  title={e?.artist_name1}
                  image={e.image}
                  description={e?.description}
                  updateNftStatus={updateNftStatus}
                  isBlocked={e.is_blocked}
                  refetch={refetch}
                />
              );
            })}
          </div>
          <div className="col-lg-6 mb-4">
            <div className="d-flex center mb-4 light-grey-border-bottom pb-3">
              <img src={plus2} />
              <h5 className="m-0 ms-2">Add Videos</h5>
            </div>
            <div
              className="bg-white2 radius1 d-flex justify-content-center center"
              style={{ height: "100vh" }}
            >
              <div
                className="uploadBtn cursor d-flex center justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <img src={upload} />
                <h5 className="m-0 mt-2">Upload Video</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Pagination
            defaultCurrent={1}
            total={data?.getAllNftsWithoutAddress?.length}
            onChange={(e) => setValue(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default DataSection;

import React, { useEffect, useState } from "react";
import "./css/index.css";
import { NavbarComponent, VideoCard } from "../../components";
import {
  plus2,
  profile_small,
  search,
  thumbnail,
  upload,
  video,
} from "../../assets";
import { Input } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_NFTS_FOR_ADMIN } from "../../gql/queries";
import { UPDATE_NFT_STATUS } from "../../gql/mutations";
import Loading from "../../components/loaders/loading";
import { useSelector } from "react-redux";
import TopNftVideoCard from "../../components/topNftVideoCard";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

const DataSection = () => {
  const { viewOnly } = useSelector((state) => state.adminDetails.adminDetails);

  const [value, setValue] = useState(1);
  const [allVideosData, setAllVideosData] = useState([]);
  const [searchByName, setSearchByName] = useState(null);
  const [searchByArtist, setSearchByArtist] = useState(null);
  const [topVideosData, setTopVideosData] = useState([]);

  console.log("value", value);

  const { loading, error, data, refetch } = useQuery(GET_ALL_NFTS_FOR_ADMIN);

  const [updateNftStatus, { loading: statusLoading }] =
    useMutation(UPDATE_NFT_STATUS);

  let start = (value - 1) * 8;
  let end = value * 8;
  useEffect(() => {
    if (data?.getAllNftsWithoutAddress) {
      let temp = data?.getAllNftsWithoutAddress;

      if (searchByName) {
        temp = temp.filter((x) =>
          x?.name?.toLowerCase()?.startsWith(searchByName?.toLowerCase())
        );
      }
      setAllVideosData(temp);
    }
  }, [searchByName, data?.getAllNftsWithoutAddress]);

  console.log(allVideosData);

  useEffect(() => {
    if (data?.getAllNftsWithoutAddress) {
      let temp = data?.getAllNftsWithoutAddress;

      if (searchByArtist) {
        temp = temp.filter((x) =>
          x?.artist_name1
            ?.toLowerCase()
            ?.startsWith(searchByArtist?.toLowerCase())
        );
      }
      setAllVideosData(temp);
    }
  }, [searchByArtist, data?.getAllNftsWithoutAddress]);

  const SortableList = ({ items, start, end, setItems }) => {
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
      const nextState = swap(items, sourceIndex, targetIndex);
      console.log(nextState);
      setItems(nextState);
    }
    return (
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={3}
          rowHeight={350}
          style={{ height: "1200px" }}
        >
          {items?.slice(start, end).map((e, i) => {
            return (
              <GridItem key={i}>
                <TopNftVideoCard
                  key={e?._id}
                  index={i}
                  id={e?._id}
                  videoThumbnail={e.videoThumbnail}
                  name={e?.name}
                  title={e?.artist_name1}
                  video={e.video}
                  description={e?.description}
                  updateNftStatus={updateNftStatus}
                  isBlocked={e.is_blocked}
                  refetch={refetch}
                  viewOnly={viewOnly}
                  allVideosData={allVideosData}
                  setAllVideosData={setAllVideosData}
                  setTopVideosData={setTopVideosData}
                  topVideosData={topVideosData}
                />
                {/* <div className='bg-secondary' style={{height:'100%',width:"100%"}}>{e._id}</div> */}
              </GridItem>
            );
          })}
        </GridDropZone>
      </GridContextProvider>
    );
  };

  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"Data Section"} selectedKey={"3"} />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{ width: "400px" }}
            className="d-flex searchStyle headerStyle bg-dark-blue3"
          >
            <img
              className="cursor"
              style={{ width: 15 }}
              src={search}
              alt="cursor"
            />
            <Input
              value={searchByName}
              onChange={(e) => {
                setSearchByName(e.target.value);
              }}
              placeholder="Search by nft name "
              className={`searchStyle bg-dark-blue3`}
            />
          </div>

          <br />
          <div
            style={{ width: "400px" }}
            className="d-flex searchStyle headerStyle bg-dark-blue3"
          >
            <img
              className="cursor"
              style={{ width: 15 }}
              src={search}
              alt="cursor"
            />
            <Input
              value={searchByArtist}
              onChange={(e) => {
                setSearchByArtist(e.target.value);
              }}
              placeholder="Search by Artist name "
              className={`searchStyle bg-dark-blue3`}
            />
          </div>
        </div>
        {statusLoading && <Loading />}
        <div className="row mt-4 mb-2 sectionMobView">
          <div className="col-lg-6">
            <div className="d-flex center  pb-3">
              <img src={video} alt="video" />
              <h5 className="m-0 ms-2">Videos</h5>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex justify-between " style={{ width: "100%" }}>
              <div
                className="d-flex justify-center align-items-center"
                style={{ width: "50%" }}
              >
                <img src={plus2} alt="add_icon" />
                {/* <h5 className="m-0 ms-2">Add Videos</h5> */}
                <h5 className="m-0 ms-2">Top NFTs</h5>
              </div>
              <div className="d-flex" style={{ width: "50%" }}>
                <button
                  className="videoCardBtns radius1 mb-2 white mx-2"
                  style={{ backgroundColor: "#2C84D6" }}
                >
                  Save Changes
                </button>
                <button
                  className="videoCardBtns radius1 mb-2 white mx-2"
                  style={{
                    backgroundColor: "#6542F2",
                  }}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="light-grey-border-bottom"></div>
        <div className=" row my-4 sectionMobView">
          <div className="col-lg-5">
            <div className="mt-3">
              <h6>
                Add, Block or Remove up to 8 Videos to the Top NFT&apos;s page.
              </h6>
            </div>
            {allVideosData?.slice(start, end).map((e, i) => {
              return (
                <div className="row">
                  <VideoCard
                    key={i}
                    id={e?._id}
                    videoThumbnail={e.videoThumbnail}
                    name={e?.name}
                    title={e?.artist_name1}
                    video={e.video}
                    description={e?.description}
                    updateNftStatus={updateNftStatus}
                    isBlocked={e.is_blocked}
                    refetch={refetch}
                    viewOnly={viewOnly}
                    setAllVideosData={setAllVideosData}
                    allVideosData={allVideosData}
                    setTopVideosData={setTopVideosData}
                    topVideosData={topVideosData}
                  />
                </div>
              );
            })}
          </div>
          <div className="col-lg-1"></div>

          <div
            className="col-lg-6 mb-4"
            style={{
              background: "#f3f3f3",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <div className="radius1">
              <div className="row">
                <SortableList
                  items={topVideosData}
                  start={start}
                  end={end}
                  setItems={setTopVideosData}
                />
              </div>
            </div>

            {/* <div
              className="bg-white2 radius1 d-flex justify-content-center center"
              style={{ height: "100vh" }}
            >
              <div
                className="cursor d-flex center justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <img src={upload} /> 
                 <h5 className="m-0 mt-2">Upload Video</h5>
                
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSection;

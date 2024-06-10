import React, { useEffect, useState, useMemo } from "react";
import "./css/index.css";
import {
  NavbarComponent,
  VideoCard,
  TopNftVideoCardWithLabel,
} from "../../components";

import {
  plus2,
  profile_small,
  search,
  thumbnail,
  upload,
  video,
  polygon,
  redPolygon,
} from "../../assets";
import { Input } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_NFTS_FOR_ADMIN, GET_TOP_NFTS } from "../../gql/queries";
import { CREATE_TOP_NFT } from "../../gql/mutations";
import { UPDATE_NFT_STATUS } from "../../gql/mutations";
import Loading from "../../components/loaders/loading";
import { FaEthereum } from "react-icons/fa";
import { useSelector } from "react-redux";
import TopNftVideoCard from "../../components/topNftVideoCard";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import ToastMessage from "../../components/toastMessage";
const DataSection = () => {
  const { viewOnly } = useSelector((state) => state.adminDetails.adminDetails);

  const [value, setValue] = useState(1);
  const [allVideosData, setAllVideosData] = useState([]);
  const [searchByName, setSearchByName] = useState(null);
  const [searchByArtist, setSearchByArtist] = useState(null);
  const [topVideosData, setTopVideosData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  console.log("PPPPPPPPPPPPPPPPPPPPPPPP", topVideosData);

  const { loading, error, data, refetch } = useQuery(GET_ALL_NFTS_FOR_ADMIN);

  const [CreateTopNft, { createdata, createloading, createerror }] =
    useMutation(CREATE_TOP_NFT);

  const { data: topNfts, refetch: toprefetch } = useQuery(GET_TOP_NFTS);
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

  console.log(topNfts, "PPPPPPPPPPPPPPPPPPPPPPPAAAAAAAAAA", fetchedData);

  // useEffect(() => {
  //   if (topNfts?.GetTopNfts.length > 0) {
  //     const temp = topNfts?.GetTopNfts;
  //     const filteredItem = allVideosData.filter((item) =>
  //       temp.some(
  //         (otherItem) => otherItem.nft_id === item._id && !item.is_Published
  //       )
  //     );
  //     setTopVideosData(filteredItem);
  //   }
  // }, [topNfts?.GetTopNfts, data?.getAllNftsWithoutAddress]);

  useEffect(() => {
    if (!fetchedData.length && allVideosData.length > 0) {
      setFetchedData(allVideosData);
    }
  }, [allVideosData, fetchedData]);

  useEffect(() => {
    if (topNfts?.GetTopNfts.length > 0 && fetchedData.length > 0) {
      const temp = topNfts?.GetTopNfts;
      const filteredItem = fetchedData.filter((item) =>
        temp.some(
          (otherItem) => otherItem.nft_id === item._id && item.is_Published
        )
      );
      console.log("filtered items", filteredItem);
      setTopVideosData(filteredItem);
    }
  }, [topNfts?.GetTopNfts, fetchedData]);

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
      console.log("nextState", nextState);
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
                <TopNftVideoCardWithLabel
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
                  is_Published={e.is_Published}
                />
                {/* <TopNftVideoCard
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
                /> */}
                {/* <div className='bg-secondary' style={{height:'100%',width:"100%"}}>{e._id}</div> */}
              </GridItem>
            );
          })}
        </GridDropZone>
      </GridContextProvider>
    );
  };

  const handleSaveNFTS = async () => {
    topVideosData.map((item) => {
      const variables = {
        duration: Math.round(new Date().getTime() / 1000),
        nft_id: item._id,
        nft_link: item.video,
        is_Published: false,
      };

      CreateTopNft({
        variables: variables,
      });
    });
  };

  const handlePublishNFTS = async () => {
    topVideosData.map((item) => {
      const variables = {
        duration: Math.round(new Date().getTime() / 1000),
        nft_id: item._id,
        nft_link: item.video,
        is_Published: true,
      };

      CreateTopNft({
        variables: variables,
      });
    });
  };

  console.log("topNfts", topNfts?.GetTopNfts);

  useEffect(() => {
    toprefetch();
  }, []);

  useEffect(() => {
    if (createdata) {
      ToastMessage("NFTS saved/published successfully", " ", "success");
    }
  }, []);

  // Setting the top nfts
  useEffect(() => {
    const data = topNfts?.GetTopNfts;
    const newTopNfts = [];
    if (topNfts?.GetTopNfts) {
      data.forEach((element) => {
        if (element.nft_id) {
          const obj = {
            ...element.nft_id,
            is_Published: element.is_Published ? true : false,
          };
          newTopNfts.push(obj);
        }
      });
    }
    console.log(newTopNfts, "OOOOOOOOOOOOOOOOOOOOOOOOO");
    setTopVideosData(newTopNfts);
  }, [topNfts?.GetTopNfts, fetchedData]);

  const [showRedImage, setShowRedImage] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);
  const toggleIconColor = () => {
    setIconClicked(true);
    setShowRedImage(true);
  };
  const toggleImage = () => {
    setShowRedImage(false);
    setIconClicked(false);
  };

  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"Data Section"} selectedKey={"3"} />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <div className="chains">
          <div className="chainDiv">
            <div className="leftChainDiv">Chains</div>
            <div className="rightChainDiv">
              {/* <FaEthereum cursor="pointer"  onClick={handleChain}/>
                <img className="ethIcon" src={polygon} /> */}
              <FaEthereum
                cursor="pointer"
                onClick={toggleIconColor}
                className={iconClicked ? "red" : ""}
              />
              <img
                className={`ethIcon ${showRedImage ? "" : "hidden"}`}
                src={polygon}
                alt="Polygon"
                onClick={toggleImage}
                width={15}
                height={15}
              />
              <img
                className={`ethIcon red ${showRedImage ? "hidden" : ""}`}
                src={redPolygon}
                alt="Red Polygon"
                onClick={toggleImage}
                width={15}
                height={15}
              />
            </div>
          </div>
        </div>

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
                  onClick={handleSaveNFTS}
                >
                  Save Changes
                </button>
                <button
                  className="videoCardBtns radius1 mb-2 white mx-2"
                  style={{
                    backgroundColor: "#6542F2",
                  }}
                  onClick={handlePublishNFTS}
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

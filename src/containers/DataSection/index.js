import React, { useEffect, useState, useMemo } from "react";
import "./css/index.css";
import {
  NavbarComponent,
  VideoCard,
  TopNftVideoCard,
  Pagination,
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
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_NFTS_FOR_ADMIN,
  GET_TOP_NFTS,
  GET_TOP_NFTS_FOR_ONE_CHAIN,
} from "../../gql/queries";
import {
  CREATE_TOP_NFT,
  SAVED_TOP_NFTS_OR_PUBLISHED_NFTS_BATCH,
} from "../../gql/mutations";
import { UPDATE_NFT_STATUS } from "../../gql/mutations";
import Loading from "../../components/loaders/loading";
import { FaEthereum } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import ToastMessage from "../../components/toastMessage";
import TopNftsSkeletal from "./Skeletal/TopNftsSkeletal";
const DataSection = () => {
  const { viewOnly } = useSelector((state) => state.adminDetails.adminDetails);
  const tokenIds = useSelector((state) => state.allIds);

  const [value, setValue] = useState(1);
  const [allVideosData, setAllVideosData] = useState([]);
  const [searchByName, setSearchByName] = useState(null);
  const [searchByArtist, setSearchByArtist] = useState(null);
  const [topVideosData, setTopVideosData] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [chainId, setChainId] = useState(137);
  const [currentItems, setCurrentItems] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_ALL_NFTS_FOR_ADMIN);
  const {
    loading: getTopNftsForOneChainLoading,
    error: getTopNftsForOneChainError,
    data: getTopNftsForOneChain,
    refetch: refetchTopNFT,
  } = useQuery(GET_TOP_NFTS_FOR_ONE_CHAIN, {
    variables: { chainId: chainId.toString() },
  });

  const [CreateTopNft, { createdata, createloading, createerror }] =
    useMutation(CREATE_TOP_NFT);
  const [
    SavedTopNftsOrPublishedNftsBatch,
    { createSaveddata, createSavedloading, createSavederror },
  ] = useMutation(SAVED_TOP_NFTS_OR_PUBLISHED_NFTS_BATCH);

  const { data: topNfts, refetch: toprefetch } = useQuery(GET_TOP_NFTS);
  const [updateNftStatus, { loading: statusLoading }] =
    useMutation(UPDATE_NFT_STATUS);

  let start = (value - 1) * 8;
  let end = value * 8;
  useEffect(() => {
    if (data?.getAllNftsWithoutAddress) {
      let temp = data?.getAllNftsWithoutAddress;
      temp = temp
        .map((item) => {
          if (tokenIds.includes(Number(item.token_id))) {
            return { ...item, is_Added: true };
          } else {
            return { ...item, is_Added: false };
          }
        })


      if (searchByName) {
        temp = temp.filter((x) =>
          x?.name?.toLowerCase()?.startsWith(searchByName?.toLowerCase())
        );
      }

      setAllVideosData(temp);
    }
  }, [searchByName, data?.getAllNftsWithoutAddress, tokenIds]);

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

  // Add data to useState of gettopnftForoneChain
  const [topVideosDataForOneChain, setTopVideosDataForOneChain] =
    useState(null);
  useEffect(() => {
    if (getTopNftsForOneChain?.GetTopNftsForOneChain.length > 0) {
      const temp = getTopNftsForOneChain?.GetTopNftsForOneChain;
      console.log(temp, "Chianing Data For the app");
      setTopVideosDataForOneChain(temp);
    } else {
      setTopVideosDataForOneChain([]);
    }
  }, [getTopNftsForOneChain?.GetTopNftsForOneChain, topNfts]);

  useEffect(() => {
    if (!fetchedData.length && allVideosData.length > 0) {
      setFetchedData(allVideosData);
    }
  }, [allVideosData, fetchedData]);

  console.log("All nfts", allVideosData);

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
    const handleSettingHeightForSortedLists = (items) => {
      switch (true) {
        case items.length >= 1 && items.length <= 3:
          return { height: "350px", position: "relative" };
        case items.length >= 4 && items.length <= 6:
          return { height: "700px", position: "relative" };
        case items.length >= 7 && items.length <= 8:
          return { height: "1200px", position: "relative" };
        default:
          return { height: "1200px", position: "relative" }; // Default style if needed
      }
    };
    return (
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={3}
          rowHeight={350}
          // style={{ height: "1200px" }}
          style={handleSettingHeightForSortedLists(items)}
        >
          {items?.slice(start, end).map((e, i) => {
            return (
              <GridItem key={i}>
                <TopNftVideoCard
                  key={e?.nft_id?._id}
                  index={i}
                  id={e?.nft_id?._id}
                  videoThumbnail={e?.nft_id?.videoThumbnail}
                  name={e?.nft_id?.name}
                  title={e?.nft_id?.artist_name1}
                  video={e?.nft_id?.video}
                  description={e?.nft_id?.description}
                  updateNftStatus={updateNftStatus}
                  isBlocked={e?.nft_id?.is_blocked}
                  refetch={refetch}
                  viewOnly={viewOnly}
                  allVideosData={allVideosData}
                  setAllVideosData={setAllVideosData}
                  setTopVideosData={setTopVideosDataForOneChain}
                  topVideosData={topVideosDataForOneChain}
                  is_Published={e.is_Published}
                />

                {/* <div className='bg-secondary' style={{height:'100%',width:"100%"}}>{e._id}</div> */}
              </GridItem>
            );
          })}
        </GridDropZone>
      </GridContextProvider>
    );
  };

  const handleSaveNFTS = async () => {
    const nftInputs = topVideosDataForOneChain.map((item) => ({
      nft_id: item.nft_id._id,
      top_nft_id: item.id,
      duration: Math.round(new Date().getTime() / 1000),
      nft_link: item.nft_id.video,
      is_Published: item.is_Published || false,
      is_Saved: true,
      chain_id: chainId,
    }));
    setSavedLoading(true);
    const { data } = await SavedTopNftsOrPublishedNftsBatch({
      variables: { nfts_for_top_nfts: nftInputs, chain_id: chainId },
    });
    if (data?.SavedTopNftsOrPublishedNftsBatch) {
      setTopVideosDataForOneChain(data?.SavedTopNftsOrPublishedNftsBatch);
    }
    setSavedLoading(false);
    refetchTopNFT();
  };
  const handlePublishNFTS = async () => {
    const nftInputs = topVideosDataForOneChain.map((item) => ({
      nft_id: item.nft_id._id,
      top_nft_id: item.id,
      duration: Math.round(new Date().getTime() / 1000),
      nft_link: item.nft_id.video,
      is_Published: true,
      is_Saved: true,
      chain_id: chainId,
    }));
    setSavedLoading(true);

    const { data } = await SavedTopNftsOrPublishedNftsBatch({
      variables: { nfts_for_top_nfts: nftInputs, chain_id: chainId },
    });
    if (data?.SavedTopNftsOrPublishedNftsBatch) {
      setTopVideosDataForOneChain(data?.SavedTopNftsOrPublishedNftsBatch);
    }
    setSavedLoading(false);
    refetchTopNFT();
  };

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

  useEffect(() => {
    setAllVideosData(allVideosData);
    setTopVideosData(topVideosData);
  }, [chainId]);

  const [showRedImage, setShowRedImage] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);
  const toggleIconColor = () => {
    setChainId(1);
    setIconClicked(true);
    setShowRedImage(true);
  };
  const toggleImage = () => {
    setChainId(137);
    setShowRedImage(false);
    setIconClicked(false);
  };

  const handlePositionForPagination = (items, savedLoading) => {
    if (savedLoading) {
      return "18px";
    } else {
      switch (true) {
        case items.length >= 1 && items.length <= 3:
          return "12px";
        case items.length >= 4 && items.length <= 6:
          return "-5px";
        case items.length >= 7:
          return "140px";
        default:
          return "50px"; // Default style if needed
      }
    }
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
            {currentItems?.slice(start, end).map((e, i) => {
              if (e.chainId == chainId) {
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
                      is_Added={e.is_Added}
                      allVideosData={allVideosData}
                      setTopVideosData={setTopVideosDataForOneChain}
                      topVideosData={topVideosDataForOneChain}
                      singleItem={e}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="col-lg-1"></div>

          <div
            className="col-lg-6 mb-4"
            style={{
              background: "#f3f3f3",
              padding: "1rem",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <div className="radius1">
              <div className="row">
                {savedLoading ? (
                  <TopNftsSkeletal />
                ) : (
                  topVideosDataForOneChain &&
                  topVideosDataForOneChain.length > 0 && (
                    <SortableList
                      items={topVideosDataForOneChain}
                      start={start}
                      end={end}
                      setItems={setTopVideosDataForOneChain}
                    />
                  )
                )}
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: handlePositionForPagination(
                  topVideosData,
                  savedLoading
                ),
                display: `${currentItems && currentItems.length > 0 ? "block" : "none"
                  }`,
                right: "20px",
              }}
            >
              <Pagination
                currentItems={currentItems}
                setCurrentItems={setCurrentItems}
                items={allVideosData}
              />
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

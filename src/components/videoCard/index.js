import React from "react";
import { thumbnail, profile_small } from "../../assets";
import "./css/index.css";
import { Button, Popconfirm, Popover } from "antd";
import ToastMessage from "../toastMessage";

const VideoCard = ({
  id,
  videoThumbnail,
  name,
  title,
  video,
  description,
  updateNftStatus,
  isBlocked,
  refetch,
  viewOnly,
  setAllVideosData,
  is_Added,
  singleItem,
  allVideosData,
  setTopVideosData,
  topVideosData,
}) => {

  const isValidId = (id) => typeof id === "string" && id.trim() !== "";
  const handleClick = async () => {
    if (!isValidId(id)) {
      ToastMessage("Error", "Invalid video ID", "error");
      return;
    }

    await updateNftStatus({
      variables: {
        id: id,
      },
    });
    await refetch();
  };

  console.log("top videos", topVideosData);

  const handleAdd = async (id) => {
    if (!is_Added) {
      return
    }
    if (!isValidId(id)) {
      ToastMessage("Error", "Invalid video ID", "error");
      return;
    }

    if (isBlocked) {
      ToastMessage("Error", "Blocked nft cannot be added", "error");
      return;
    }

    if (topVideosData.length < 8) {
      // Check If it is already there 
      const checkAlreadyThere = topVideosData.find((top_nft) => {
        return top_nft.nft_id._id == id
      })
      if (checkAlreadyThere) {
        ToastMessage("Error", "You have already added this one", "error");
        return
      }
      const videoIndex = allVideosData.findIndex((v) => v._id === id);

      if (videoIndex !== -1) {


        const updatedVideos = [
          allVideosData[videoIndex],
          ...allVideosData.slice(0, videoIndex),
          ...allVideosData.slice(videoIndex + 1),
        ];


        setTopVideosData((prev) => [...prev, { nft_id: allVideosData[videoIndex] }]);
        setAllVideosData(allVideosData.filter((item) => item._id != id));
      }
    } else {
      ToastMessage("Error", "You cannot add more than 8", "error");
    }
  };
  console.log(allVideosData);

  const handleConfirmRemove = async () => {
    if (!isValidId(id)) {
      ToastMessage("Error", "Invalid video ID", "error");
      return;
    }

    const videoIndex = allVideosData.findIndex((v) => v._id === id);

    if (videoIndex !== -1) {
      const updatedVideos = [
        ...allVideosData.slice(0, videoIndex),
        ...allVideosData.slice(videoIndex + 1),
      ];

      setAllVideosData(updatedVideos);
    }
  };

  return (
    <div className="light-grey-border-bottom d-flex justify-between py-4 videoCardMobView">
      <div className="col-lg-3">
        <video src={video} height={150} width={150} className="video" />
      </div>
      <div className="col-lg-6">
        <div>
          <h5 className="m-0 videoCardMobAlignment">{title}</h5>
          <div className="d-flex center videoCardMobAlignment">
            {/* <img src={image} /> */}
            <h5 className="m-0 red2">{name}</h5>
          </div>
          <span className="light-grey videoCardMobAlignment">
            {description}
          </span>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="d-block ms-3 videoCardMobAlignment">
          <Button
            className={`${is_Added ? "videoCardBtns bg-green radius1 mb-2 white" : "videoCardBtns bg-gray radius1 mb-2 black"}`}
            onClick={() => handleAdd(id)}
            disabled={!is_Added}
          >
            Add
          </Button>
          <Button
            disabled={viewOnly}
            className="videoCardBtns bg-black radius1 mb-2 white"
            onClick={() => handleClick()}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
          <Popconfirm
            title="Are you sure you want to remove this video?"
            onConfirm={handleConfirmRemove}
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={viewOnly}
              className="videoCardBtns bg-red radius1 mb-2 white"
            >
              Remove
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

import React from "react";
import { thumbnail, profile_small } from "../../assets";
import "./css/index.css";
import { Button, Popconfirm, Popover } from "antd";

const TopNftVideoCard = ({
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
  allVideosData,
  index,
  setTopVideosData,
  topVideosData,
  onDrag,
  onDrop,
  onDragOver,
  is_Published,
}) => {
  //   return (
  //     <Draggable draggableId={id.toString()} index={index}>
  //       {(provided, snapshot) => (
  //         <div
  //           ref={provided.innerRef}
  //           {...provided.draggableProps}
  //           {...provided.dragHandleProps}
  //           className="col-lg-4 p-4"
  //         >
  //           <video src={video} height={150} width={150} className="video-top" />
  //           <div>
  //             <h5 className="m-0 videoCardMobAlignment">{title}</h5>
  //             <div className="d-flex center videoCardMobAlignment">
  //               <h5 className="m-0 red2">{name}</h5>
  //             </div>
  //             <span className="light-grey videoCardMobAlignment">
  //               {description}
  //             </span>
  //           </div>
  //         </div>
  //       )}
  //     </Draggable>
  //   );
  const handleRemove = (id) => {
    const videoToadd = topVideosData.find((item) => item._id == id);
    if (videoToadd) {
      setTopVideosData(topVideosData.filter((item, i) => item._id != id));
      setAllVideosData([...allVideosData, videoToadd]);
    }
  };
  return (
    <div
      style={{
        width: "200px",
        height: "350px",
      }}
      id={id}
      className="topnftdparentdiv"
    >
      <span className="published_span">
        {is_Published ? (
          <span className="published">PUBLISHED</span>
        ) : (
          <span className="notpublished">NON-PUBLISHED</span>
        )}
      </span>

      <div className="top">
        <video
          src={video}
          height={350}
          width={350}
          className="video-top"
          style={{ width: "100%", height: "11rem" }}
        />
      </div>
      <div className="title d-flex justify-content-between">
        <h4 className="m-0 videoCardMobAlignment truncate-text ">{title}</h4>
        <Button
          className="bg-red radius1 mb-2 white"
          style={{ width: "5rem" }}
          onClick={(e) => handleRemove(id)}
        >
          Remove
        </Button>
      </div>
      <div className="chaneel-name">
        <h5 className="m-0 red2">{name}</h5>
      </div>
      <p className="description">{description} </p>
    </div>
  );
};

export default TopNftVideoCard;

import React from 'react';
import { thumbnail, profile_small } from '../../assets';
import './css/index.css';
import { Button, Popconfirm, Popover } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

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
    index
}) => {
    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="col-lg-4 p-4"
                >
                    <video src={video} height={150} width={150} className="video-top" />
                    <div>
                        <h5 className="m-0 videoCardMobAlignment">{title}</h5>
                        <div className="d-flex center videoCardMobAlignment">
                            <h5 className="m-0 red2">{name}</h5>
                        </div>
                        <span className="light-grey videoCardMobAlignment">
                            {description}
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TopNftVideoCard;

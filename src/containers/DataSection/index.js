import React, { useEffect, useState } from 'react';
import './css/index.css';
import { NavbarComponent, VideoCard } from '../../components';
import {
    plus2,
    profile_small,
    search,
    thumbnail,
    upload,
    video,
} from '../../assets';
import { Input, Pagination } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NFTS_FOR_ADMIN } from '../../gql/queries';
import { UPDATE_NFT_STATUS } from '../../gql/mutations';
import Loading from '../../components/loaders/loading';
import { useSelector } from 'react-redux';
import TopNftVideoCard from '../../components/topNftVideoCard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DataSection = () => {
    const { viewOnly } = useSelector(
        (state) => state.adminDetails.adminDetails
    );

    const [value, setValue] = useState(1);
    const [allVideosData, setAllVideosData] = useState([]);
    const [searchByName, setSearchByName] = useState(null);
    const [searchByArtist, setSearchByArtist] = useState(null);
    const [topVideosData, setTopVideosData] = useState([]);

    console.log('value', value);

    const { loading, error, data, refetch } = useQuery(GET_ALL_NFTS_FOR_ADMIN);

    const [updateNftStatus, { loading: statusLoading }] =
        useMutation(UPDATE_NFT_STATUS);

    let start = (value - 1) * 10;
    let end = value * 10;
    useEffect(() => {
        if (data?.getAllNftsWithoutAddress) {
            let temp = data?.getAllNftsWithoutAddress;

            if (searchByName) {
                temp = temp.filter((x) =>
                    x?.name
                        ?.toLowerCase()
                        ?.startsWith(searchByName?.toLowerCase())
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

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const updatedVideos = [...topVideosData];
        const [reorderedVideo] = updatedVideos.splice(result.source.index, 1);
        updatedVideos.splice(result.destination.index, 0, reorderedVideo);

        setTopVideosData(updatedVideos);
    };

    return (
        <div className="bg-white2">
            <NavbarComponent
                lightNav
                headerTxt={'Data Section'}
                selectedKey={'3'}
            />
            <div
                className="container radius1 bg-white p-4"
                style={{ marginTop: 65 }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{ width: '400px' }}
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
                        style={{ width: '400px' }}
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
                <div className="row my-4 sectionMobView">
                    <div className="col-lg-6">
                        <div className="d-flex center light-grey-border-bottom pb-3">
                            <img src={video} alt="video" />
                            <h5 className="m-0 ms-2">Videos</h5>
                        </div>
                        <div className="mt-3">
                            <h6>
                                Add, Block or Remove up to 8 Videos to the Top
                                NFT&apos;s page.
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
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="d-flex center mb-4 light-grey-border-bottom pb-3">
                            <img src={plus2} alt="add_icon" />
                            {/* <h5 className="m-0 ms-2">Add Videos</h5> */}
                            <h5 className="m-0 ms-2">Top NFTs</h5>
                        </div>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div
                                        className="bg-white2 radius1"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="row">
                                            {topVideosData
                                                ?.slice(start, end)
                                                .map((e, i) => {
                                                    return (
                                                        <TopNftVideoCard
                                                            key={e?._id}
                                                            index={i}
                                                            id={e?._id}
                                                            videoThumbnail={
                                                                e.videoThumbnail
                                                            }
                                                            name={e?.name}
                                                            title={
                                                                e?.artist_name1
                                                            }
                                                            video={e.video}
                                                            description={
                                                                e?.description
                                                            }
                                                            updateNftStatus={
                                                                updateNftStatus
                                                            }
                                                            isBlocked={
                                                                e.is_blocked
                                                            }
                                                            refetch={refetch}
                                                            viewOnly={viewOnly}
                                                            allVideosData={
                                                                allVideosData
                                                            }
                                                        />
                                                    );
                                                })}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

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

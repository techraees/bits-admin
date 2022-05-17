import React from "react";
import "./css/index.css";
import { NavbarComponent, VideoCard } from "../../components";
import { plus2, profile_small, thumbnail, upload, video } from "../../assets";
import { Pagination } from "antd";

const DataSection = () => {
  let cardsData = [
    {
      videoThumbnail: thumbnail,
      image: profile_small,
      title: "Speedy Walkover",
      name: "Snap Boogie",
      description:
        "Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum .",
    },
    {
      videoThumbnail: thumbnail,
      image: profile_small,
      title: "Speedy Walkover",
      name: "Snap Boogie",
      description:
        "Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum .",
    },
    {
      videoThumbnail: thumbnail,
      image: profile_small,
      title: "Speedy Walkover",
      name: "Snap Boogie",
      description:
        "Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum .",
    },
    {
      videoThumbnail: thumbnail,
      image: profile_small,
      title: "Speedy Walkover",
      name: "Snap Boogie",
      description:
        "Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum Loreum Ipsum .",
    },
  ];
  return (
    <div className="bg-white2">
      <NavbarComponent lightNav headerTxt={"Data Section"} selectedKey={"3"} />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        {/* <div className="bg-white p-4"> */}
          <div className="row">
            <div className="d-flex center col-lg-6">
              <img src={video} />
              <h5 className="m-0 ms-2">Videos</h5>
            </div>
            <div className="d-flex center col-lg-6">
              <img src={plus2} />
              <h5 className="m-0 ms-2">Add Videos</h5>
            </div>
          </div>
          <div className="light-grey-border-bottom my-3"></div>
          <div className="row my-4">
            <div className="col-lg-6" >
              {cardsData.map((e, i) => {
                return (
                  <VideoCard
                    key={i}
                    videoThumbnail={e.videoThumbnail}
                    name={e.name}
                    title={e.title}
                    image={e.image}
                    description={e.description}
                  />
                );
              })}
            </div>
            <div className="col-lg-6" >
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
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default DataSection;

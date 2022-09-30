import React from "react";
import "./css/index.css";
import { Card } from "antd";
import { check, cross, thumb } from "../../assets";
import { Button } from "antd";
import ButtonComponent from "../button";
import ReactPlayer from "react-player";

const CardCompnent = ({
  image,
  status,
  name,
  videoLink,
  topName,
  collectionBtn,
}) => {
  return (
    <div className="my-4 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
      <Card
        hoverable
        className="cardContainer"
        cover={
          <ReactPlayer
            controls={true}
            width="260px"
            height="190px"
            url="https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)"
          />
        }
      >
        {topName ? (
          <div className="d-flex mb-3" style={{ alignItems: "center" }}>
            <img src={image} style={{ width: 25 }} />
            <div className="ms-3">
              <span className="light-grey2 mt-2 fs-5">{name}</span>
              <div style={{ border: "1px solid #5e2a2a" }}></div>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex">
              <img src={image} alt="" />
              <span className="ms-2 light-grey2" style={{ fontSize: 10 }}>
                {status}
              </span>
            </div>
            <h5 className="light-grey2 mt-2">{name}</h5>
          </>
        )}
        <div>
          <img src={cross} style={{ width: 15 }} />
          <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
            No copyright Transfer
          </span>
        </div>
        <div className="my-1">
          <img src={check} style={{ width: 15 }} />
          <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
            First Gen Emote
          </span>
        </div>
        <div className="mt-4 mb-1 d-flex">
          <ButtonComponent height={40} text={"Buy NFT"} />
          <div className="red-gradient ms-3 d-flex justify-content-center thumbView">
            <img style={{ width: 25 }} className="mb-1" src={thumb} />
          </div>
        </div>
        {collectionBtn && (
          <Button className="mt-2 collectionBtn">Go to Collection</Button>
        )}
      </Card>
    </div>
  );
};

export default CardCompnent;

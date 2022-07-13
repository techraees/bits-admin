import React from "react";
import "./css/index.css";
import { NavbarComponent, CardCompnent } from "../../components";
import { Button } from "antd";
import Iframe from "react-iframe";
import {
  discord_grey,
  left_arrow_red,
  line,
  meta,
  profile,
  telegram_grey,
  twitter_grey,
} from "../../assets";

const Dashboard = () => {
  let cardsData = [
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Speedy Walkovers",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
  ];
  return (
    <div className="black-background">
      <NavbarComponent login dashboardNav center />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mt-5 flex-wrap">
          <div className="dashboardTitle">
            <h1 className="white">
              Welcome to <span className="red">BITS</span>{" "}
            </h1>
            <span style={{ color: "#E8E8E8" }}>
              At BITS we will take your most iconic performances and immortalize
              them on the blockchain. First, you can provide us with a signature
              move/moment that you're proud of, then we will turn it into a
              potential in-game emote so that your fans can use it to express
              themselves. We'll mint it as an NFT so you can sell it or give it
              to your most valued supporters.
            </span>
            <div className="mt-3">
              <Button
                className="red dashboardBtns px-5"
                style={{ backgroundColor: "transparent" }}
              >
                Explore
              </Button>
              <Button className="red-background white dashboardBtns px-5 ms-4">
                Create NFT
              </Button>
            </div>
          </div>
          <Iframe
            url="https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)"
            // url="http://www.youtube.com/embed/xDMP3i36naA"
            width="450px"
            height="400px"
            className="coverIframe"
            display="initial"
            position="relative"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 className="red m-0">
            Top <span className="white">NFTs</span>
          </h3>
          <div
            style={{ border: "1px solid #D54343", width: "80%" }}
            className="breakline"
          ></div>
          <img src={left_arrow_red} alt="" />
        </div>
        <div>
          <div className="row">
            {cardsData.map((e, i) => {
              return (
                <CardCompnent
                  key={i}
                  image={e.image}
                  status={e.status}
                  name={e.name}
                  videoLink={e.videoLink}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="dark-grey-bg d-flex justify-content-center">
        <div className="py-2" style={{ border: "1px dashed purple" }}>
          <img src={discord_grey} className="mx-2" />
          <img src={telegram_grey} className="mx-2" />
          <img src={twitter_grey} className="mx-2" />
        </div>
      </div>
      <div className="red-background">
        <div className="container d-flex justify-content-between py-2 align-items-center">
          <p className="m-0 white">BITS C 2022 All Rights reserved </p>
          <img src={meta} className="mx-2" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

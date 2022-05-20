import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { Button } from "antd";
import Iframe from "react-iframe";

const Dashboard = () => {
  let cards = [
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      text: "Speedy Walkovers",
      videoUrl: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
  ];
  return (
    <div className="black-background">
      <div className="dashboardCover" style={{ height: "auto" }}>
        <NavbarComponent opacity login />
        <div className="container pt-4">
          <div
            style={{ height: "100vh", flexDirection: "column" }}
            className="d-flex justify-content-center headingView"
          >
            <h1 className="white m-0 mb-2">Welcome to the</h1>
            <h1 className="red m-0 mb-3">BITS</h1>
            <span className="white">
              Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum
              Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum Loreum ipsum
              Loreum ipsum Loreum ipsum .
            </span>
            <div className="mt-4">
              <Button
                className="red dashboardBtns px-5"
                style={{ backgroundColor: "transparent" }}
              >
                Explore
              </Button>
              <Button className="red-background white dashboardBtns px-5 ms-4">
                Buy NFT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: -130 }}>
        <div className="row" style={{ width: "100%" }}>
          {cards.map((e, i) => {
            return (
              <div
                key={i}
                className="my-4 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"
                style={{ flexDirection: "column", alignItems: "center" }}
              >
                <div className="dashboardCards">
                  <Iframe
                    url="https://emb.d.tube/#!//('files':('ipfs':('vid':('240':'QmV6cWbKUq73XiztLUJqTL1ADiuT9gRMGEmpWoF4LjesXP','480':'QmRrMqmQBTGC8cR1EWDMBJqgv7qCr1hZMqp25DWkvruU29','src':'QmahJ1G9mHEE8863mhEh5qmoyQMTHVLgoVazUREjeGrffn'),'img':('spr':'QmPiAJTG1SEKqu7RrTSGchcm59LREQeyDBKN2HLp47m3fJ'),'gw':'https:!!player.d.tube')),'dur':'108','thumbnailUrlExternal':'https:!!i.imgur.com!123uE1D.jpg','thumbnailUrl':'https:!!i.imgur.com!123uE1D.jpg','nsfw':0,'oc':0)"
                    width="260px"
                    height="190px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                  />
                </div>
                <h5 className="m-0 red mt-2">{e.text}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import "./css/index.css";
import { NavbarComponent, CardCompnent } from "../../components";
import { Button, Row, Col } from "antd";
import {
  discord_grey,
  left_arrow_red,
  meta,
  profile,
  telegram_grey,
  twitter_grey,
} from "../../assets";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UploadVideoModal } from "../../components";
import { WeiToETH } from "../../utills/convertWeiAndBnb";

const Dashboard = () => {
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  let navigate = useNavigate();

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

  const [showChat, setShowChat] = useState(false);
  const { userData } = useSelector((state) => state.address.userData);

  const {contractData} = useSelector((state) => state.chain.contractData);

  console.log(contractData.mintContract);

  // const checkContract = async()=>{
  //   // console.log(contractIns);
  //   const auctions = await contractIns.methods.auctions(0).call();
  //   console.log(auctions);
  // }

  // checkContract();


  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const textColor2 = useSelector((state) => state.app.theme.textColor2);
  const textColor3 = useSelector((state) => state.app.theme.textColor3);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  const isLogged = userData?.isLogged;

  const userProfile = userData?.full_name;

  const handleCreateNFT = () => {
    if (isLogged) {
      setUploadVideoModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={backgroundTheme}>
      <UploadVideoModal
        visible={uploadVideoModal}
        onClose={() => setUploadVideoModal(false)}
      />
      {/* <ZendeskComp showChat={showChat} /> */}
      <NavbarComponent
        login
        dashboardNav
        center
        selectedKey={"1"}
        toggleBtn={textColor === "white" ? true : false}
      />
      <div className="container">
        <Row
          className="my-5 d-flex align-items-center"
          gutter={{ xs: 8, sm: 16, md: 20, lg: 32 }}
        >
          <Col lg={12} md={12} sm={24} xs={24} className="my-2">
            <div>
              <h1 className={textColor}>
                Welcome to <span className="red">BITS</span>{" "}
              </h1>
              <span className={textColor}>
                At BITS we will take your most iconic performances and
                immortalize them on the blockchain. First, you can provide us
                with a signature move/moment that you're proud of, then we will
                turn it into a potential in-game emote so that your fans can use
                it to express themselves. We'll mint it as an NFT so you can
                sell it or give it to your most valued supporters.
              </span>
              <div className="mt-3 ">
                <Link to="video-gallery">
                  <Button
                    className="red dashboardBtns px-5"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Explore
                  </Button>
                </Link>
                <Button
                  className="red-background white dashboardBtns px-5 ms-2"
                  onClick={() => handleCreateNFT()}
                >
                  Create NFT
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="my-2">
            <ReactPlayer
              controls={true}
              width="100%"
              height="300px"
              url="https://www.youtube.com/watch?v=FexlThIaGww"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 className="red m-0">
            Top <span className={textColor}>NFTs</span>
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
                  userProfile={userProfile ? true : false}
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
          <p className="m-0 white">
            BITS C {new Date().getFullYear()} All Rights reserved{" "}
          </p>
          <img
            src={meta}
            className="mx-2"
            onClick={() => {
              setShowChat(!showChat);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import "./css/index.css";
import { Card, Tooltip } from "antd";
import { check, cross, marketcardimg, profile, thumb } from "../../assets";
import { Button } from "antd";
import ButtonComponent from "../button";
import ReactPlayer from "react-player";
import { StepperModal } from "../index";
import { Modal } from "antd";
import React, { useState } from "react";
import Timercomp from "../timerComp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileimg from "../../assets/images/profile1.png";
import OfferModal from "../offerModal";

const CardCompnent = ({
  image,
  status,
  name,
  videoLink,
  topName,
  collectionBtn,
  detailBtn,
  marketplacecard,
  sellnft,
  artistName,
  userProfile,
  navigateTo,
  userId,
  isOwner,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showOfferModal = () => {
    setIsOfferModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOfferModalOpen(false);
  };
  console.log("userProfile", userProfile, image);
  const location = useLocation();
  console.log("userId", userId, location.pathname);

  return (
    <div className="my-4 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
        width={829}
        closable={false}
        className="stepperModal"
      >
        <StepperModal handleCancel={handleCancel} />
      </Modal>

      <Modal
        open={isOfferModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        width={829}
      >
        <OfferModal handleCancel={handleCancel} />
      </Modal>
      <Card
        hoverable
        className="cardContainer"
        cover={
          <ReactPlayer
            controls={true}
            width="260px"
            height="190px"
            url={videoLink}
          />
        }
      >
        {marketplacecard ? (
          <>
            <div className="price-wrapper d-flex justify-content-between">
              <h5>Price</h5>
              <p>
                <span>$</span>19.3
              </p>
            </div>

            {!userProfile ? (
              <>
                <Tooltip title="To Purchase NFT's Please Login">
                  <span>
                    <ButtonComponent
                      height={40}
                      text={"Sign in"}
                      onClick={() => {
                        navigate("/login");
                      }}
                    />
                  </span>
                </Tooltip>
              </>
            ) : (
              <button className="buybtn" onClick={showOfferModal}>
                {location.pathname === "/marketplace" ? "Bid Now" : "Buy Now"}
              </button>
            )}

            <button
              className="buybtn"
              onClick={() => window.open("https://polygonscan.com/")}
            >
              Nft Detail
            </button>

            <div>
              <img src={profile} style={{ width: 15 }} />
              <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                Speedy walkover
              </span>
            </div>

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
            <div className="my-1">
              <img src={marketcardimg} style={{ width: 15 }} />
              <span className="light-grey2 ms-2" style={{ fontSize: 12 }}>
                Supply : <span style={{ color: "#AD2B2B" }}>102</span>
              </span>
            </div>
            <Timercomp />
          </>
        ) : (
          <>
            {topName ? (
              <>
                <div className="d-flex justify-content-between align-items-center pb-2">
                  <div>
                    <div
                      className="d-flex gap-2"
                      style={{ alignItems: "center", marginTop: "-1rem" }}
                    >
                      <img
                        src={image ? image : profileimg}
                        style={{ width: 25 }}
                        onError={(e) => {
                          e.target.src = profileimg;
                        }}
                      />
                      <span className="light-grey2 mt-2 fs-5">
                        {artistName}
                      </span>
                    </div>
                  </div>

                  <div>
                    {detailBtn && (
                      <button
                        className="detail-btn"
                        onClick={() => window.open("https://polygonscan.com/")}
                      >
                        Nft Detail
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <span className="light-grey2  fs-5">{name}</span>
                  {/* <div style={{ border: "1px solid #5e2a2a" }}></div> */}
                </div>
              </>
            ) : (
              <>
                <div className="d-flex">
                  <img
                    src={image ? image : profileimg}
                    alt=""
                    onError={(e) => {
                      e.target.src = profileimg;
                    }}
                  />

                  <span className="ms-2 light-grey2" style={{ fontSize: 10 }}>
                    {status}
                  </span>
                </div>
                <h5 className="light-grey2 mt-2">{name}</h5>
              </>
            )}
            {/* <div>
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
            </div> */}
            {sellnft ? (
              <>
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
                </div>{" "}
                <div className="mt-4 mb-1 d-flex">
                  <ButtonComponent
                    height={40}
                    text={"Sell NFT"}
                    onClick={() => {
                      if (
                        location.pathname.includes("/collections") &&
                        isOwner
                      ) {
                        navigateTo();
                      }
                    }}
                  />
                  <div className="red-gradient ms-3 d-flex justify-content-center thumbView">
                    <img style={{ width: 25 }} className="mb-1" src={thumb} />
                  </div>
                </div>
                {collectionBtn && (
                  <Button
                    className="mt-2 collectionBtn"
                    onClick={() => navigate(`/collections/${userId}`)}
                  >
                    Go to Collection
                  </Button>
                )}
              </>
            ) : (
              <>
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
                  {!userProfile ? (
                    <>
                      <Tooltip title="To Purchase NFT's Please Login">
                        <span>
                          <ButtonComponent
                            height={40}
                            text={"Sign in"}
                            onClick={() => {
                              navigate("/login");
                            }}
                          />
                        </span>
                      </Tooltip>
                    </>
                  ) : (
                    <ButtonComponent
                      height={40}
                      text={
                        location.pathname.includes("/collections") && isOwner
                          ? "Sell NFT"
                          : "Buy NFT"
                      }
                      onClick={() => {
                        if (
                          location.pathname.includes("/collections") &&
                          isOwner
                        ) {
                          navigateTo();
                        } else if (location.pathname.includes("/")) {
                          console.log("handle ok");
                          showModal();
                        }
                      }}
                    />
                  )}

                  <div className="red-gradient ms-3 d-flex justify-content-center thumbView">
                    <img style={{ width: 25 }} className="mb-1" src={thumb} />
                  </div>
                </div>
                {collectionBtn && (
                  <Button
                    className="mt-2 collectionBtn"
                    onClick={() => navigate(`/collections/${userId}`)}
                  >
                    Go to Collection
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CardCompnent;

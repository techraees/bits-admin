import { Card, Col, Radio, Row, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { NavbarComponent } from "../../components";
import { IoLogoUsd } from "react-icons/io";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { Input } from "antd";
import { DatePicker, Space } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./css/index.css";
import { test } from "../../assets";
import { useParams } from "react-router-dom";

const ListNft = () => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dateFormat = "MMM DD, YYYY HH:mm:ss A";
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("fixed Price");
  const { hash } = useParams();

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const textColor = useSelector((state) => state.app.theme.textColor);
  const border = useSelector((state) => state.app.theme.border);
  const bgColor = useSelector((state) => state.app.theme.bgColor);

  console.log("border", textColor == "black");

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const selectAfter = (
    <Select defaultValue="Usd">
      <Option value="Usd">USD</Option>
      <Option value="Eth">ETH</Option>
      <Option value="Bin">BIN</Option>
    </Select>
  );

  const calenderRef = useRef();

  useEffect(() => {
    window.addEventListener("click", clickOutside);
  }, []);

  const clickOutside = (e) => {
    console.log("eddd", calenderRef?.current.contains(e.target));
    if (calenderRef?.current.contains(e.target)) {
      setOpen(true);
    } else if (!calenderRef?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`${backgroundTheme}`}
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        // selectedKey={"5"}
        headerText={"List NFT"}
      />
      <div className="container py-3">
        <Row style={{ width: "100%" }} className={`d-flex  my-4 p-5`}>
          <Col lg={24} sm={24} xs={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 30, lg: 50 }}>
              <Col lg={6} sm={24} md={12} xs={24}>
                <div className="cardContainer" style={{ width: "100%" }}>
                  <ReactPlayer
                    controls={true}
                    width="260px"
                    height="250px"
                    url={`https://infura-ipfs.io/ipfs/${hash}`}
                  />
                  <div className="d-flex justify-content-between mt-1 px-2">
                    <p className="name">Snap Boogie</p>
                    <span className="value">Price</span>
                  </div>
                  <div className="d-flex justify-content-between px-2 pb-3">
                    <p className="name2">Speedy Walkover</p>
                    <span className="value2">4 ETH</span>
                  </div>
                </div>
              </Col>
              <Col lg={18} md={12} xs={24}>
                <div className="my-3">
                  <p className="title">List NFT</p>
                  <span className={`ctext ${textColor}`}>
                    Choose a type of sale
                  </span>
                </div>
                <div className="radio-group">
                  <Radio.Group
                    defaultValue="fixed Price"
                    buttonStyle="solid"
                    className={textColor == "black" && "radio-light"}
                    onChange={handleRadioChange}
                  >
                    <Radio.Button value="fixed Price">
                      <span>
                        <IoLogoUsd />
                      </span>
                      <br />
                      Fixed Price
                    </Radio.Button>
                    <Radio.Button value="auction price">
                      <span>
                        <BiTimeFive />
                      </span>
                      <br />
                      Timed Auction
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {selectedOption === "fixed Price" && (
          <>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Price <AiOutlineInfoCircle />
              </h5>
              {/* <div className="d-flex text">
                <h4 className={`${textColor}`}>
                  Sort by: &nbsp; &nbsp;
                  <Select
                    defaultValue="US Dollar"
                    style={{
                      width: 120,
                    }}
                    className={textColor == "black" && "ant-light"}
                    onChange={handleChange}
                    options={[
                      {
                        value: "US Dollar",
                        label: "US Dollar",
                      },
                      {
                        value: "Etherum",
                        label: "Etherum",
                      },
                      {
                        value: "Binanace",
                        label: "Binanace",
                      },
                    ]}
                  />
                </h4>
                <div className="cursor" style={{ marginTop: ".4rem" }}>
                  <span
                    className="red-gradient-color"
                    style={{ borderBottom: "1px solid  #CD3C3C" }}
                  >
                    View All
                  </span>
                </div>
              </div> */}
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Input
                className={textColor == "black" && "ant-light"}
                // addonBefore={selectBefore}
                addonAfter={selectAfter}
                defaultValue="Amount"
              />
            </div>
            {/* <div className="auction-length">
              <h5 className={`${textColor}`}>Auction Length</h5>
            </div>
            <div
              className={
                textColor == "black" ? "auction-light" : "auction-length-field"
              }
            >
              <div ref={calenderRef}>
                <BsCalendarDate
                  className={`${textColor}`}
                  style={{
                    fontSize: "2rem",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div> */}
            <div
              className="option-wrapper d-flex justify-content-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h5>More Options</h5>
              <span>
                <RiArrowDropDownLine
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "2.5rem",
                    marginTop: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            {isOpen && (
              <h5 style={{ color: "white" }}>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    disabled
                    style={{
                      cursor: "not-allowed",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <span className={`${textColor}`}>Coming soon</span>
                  </button>
                </div>
              </h5>
            )}
            <div className="summary-wrapper d-flex justify-content-between mt-3">
              <h5 className={`${textColor}`}>Summary</h5>
              <span>
                <AiOutlineInfoCircle
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Listing Price</h5>
              <p>ETH</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Service Fee</h5>
              <p>2.5%</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Creator Fee</h5>
              <p>10%</p>
            </div>
            <div
              style={{
                borderBottom: "1px solid #F7F8F8",
                opacity: "0.4",
                marginTop: "2rem",
              }}
            ></div>
            <div className="footer-text d-flex justify-content-between mt-5">
              <h5>Total Potential Earning</h5>
              <p className={`${textColor}`}> --- USD</p>
            </div>
            <div className="btn-wrapper red-gradient">
              <button>COMPLETE LISTING</button>
            </div>
          </>
        )}
        {selectedOption === "auction price" && (
          <>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Choose a method <AiOutlineInfoCircle />
              </h5>
              {/* <div className="d-flex text">
                <h4 className={`${textColor}`}>
                  Sort by: &nbsp; &nbsp;
                  <Select
                    defaultValue="US Dollar"
                    style={{
                      width: 120,
                    }}
                    className={textColor == "black" && "ant-light"}
                    onChange={handleChange}
                    options={[
                      {
                        value: "US Dollar",
                        label: "US Dollar",
                      },
                      {
                        value: "Etherum",
                        label: "Etherum",
                      },
                      {
                        value: "Binanace",
                        label: "Binanace",
                      },
                    ]}
                  />
                </h4>
                <div className="cursor" style={{ marginTop: ".4rem" }}>
                  <span
                    className="red-gradient-color"
                    style={{ borderBottom: "1px solid  #CD3C3C" }}
                  >
                    View All
                  </span>
                </div>
              </div> */}
            </div>
            <div
              className={textColor == "black" ? "ant-light-select" : "select"}
            >
              <Select
                defaultValue="lucy"
                style={{
                  width: "100%",
                }}
                className={textColor == "black" && "ant-light"}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Sell To Highest Bidder",
                  },
                  // {
                  //   value: "lucy",
                  //   label: "Lucy",
                  // },
                  // {
                  //   value: "Yiminghe",
                  //   label: "yiminghe",
                  // },
                ]}
              />
            </div>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Starting Price <AiOutlineInfoCircle />
              </h5>
              {/* <div className="d-flex text">
                <h4 className={`${textColor}`}>
                  Sort by: &nbsp; &nbsp;
                  <Select
                    defaultValue="US Dollar"
                    style={{
                      width: 120,
                    }}
                    className={textColor == "black" && "ant-light"}
                    onChange={handleChange}
                    options={[
                      {
                        value: "US Dollar",
                        label: "US Dollar",
                      },
                      {
                        value: "Etherum",
                        label: "Etherum",
                      },
                      {
                        value: "Binanace",
                        label: "Binanace",
                      },
                    ]}
                  />
                </h4>
                <div
                  className="cursor"
                  style={{ textDecoration: "underline", marginTop: ".4rem" }}
                >
                  <span className="red-gradient-color">View All</span>
                </div>
              </div> */}
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Input addonAfter={selectAfter} defaultValue="Amount" />
            </div>
            {/* <div className="auction-length">
              <h5 className={`${textColor}`}>Auction Length</h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "auction-light" : "auction-length-field"
              }
            >
              <div ref={calenderRef}>
                <BsCalendarDate
                  className={`${textColor}`}
                  style={{
                    fontSize: "2rem",
                 
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(!open)}
                />

              </div>
            </div> */}
            <div
              className="option-wrapper d-flex justify-content-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h5>More Options</h5>
              <span>
                <RiArrowDropDownLine
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "2.5rem",
                    marginTop: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            {isOpen && (
              <h5 style={{ color: "white" }}>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    disabled
                    style={{
                      cursor: "not-allowed",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <span className={`${textColor}`}>Coming soon</span>
                  </button>
                </div>
              </h5>
            )}

            <div className="summary-wrapper d-flex justify-content-between mt-3">
              <h5 className={`${textColor}`}>Summary</h5>
              <span>
                <AiOutlineInfoCircle
                  className={`${textColor}`}
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Listing Price</h5>
              <p>ETH</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Service Fee</h5>
              <p>2.5%</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Creator Fee</h5>
              <p>10%</p>
            </div>
            <div
              style={{
                borderBottom: "1px solid #F7F8F8",
                opacity: "0.4",
                marginTop: "2rem",
              }}
            ></div>
            <div className="footer-text d-flex justify-content-between mt-5">
              <h5>Total Potential Earning</h5>
              <p className={`${textColor}`}> --- USD</p>
            </div>
            <div className="btn-wrapper red-gradient">
              <button>COMPLETE LISTING</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListNft;

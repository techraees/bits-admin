import { Card, Col, Radio, Row, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
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
import { useParams, useLocation } from "react-router-dom";
import ConnectModal from "../../components/connectModal";
import { ETHToWei } from "../../utills/convertWeiAndBnb";
import { Form } from "react-bootstrap";
import {timeToTimeStamp} from "../../utills/timeToTimestamp";
import { loadContractIns } from "../../store/actions";

const ListNft = () => {
  const { Option } = Select;

  const dateFormat = "MMM DD, YYYY HH:mm:ss A";
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("fixed Price");
  const [fixedPrice, setFixedPrice] = useState(0);
  const [fixedPriceCopies, setFixedPriceCopies] = useState(0);
  const [auctionStartPrice, setAuctionStartPrice] = useState(0);
  const [auctionCopies, setAuctionCopies] = useState(0);
  const { hash } = useParams();
  const [currency, setCurrency] = useState("USD");
  const [potentialEarning, setPotentialEarning] = useState(0);
  const [connectModal, setConnectModal] = useState(false);
  const [startTimeStamp, setStartTimeStamp] = useState(0);
  const [endTimeStamp, setEndTimeStamp] = useState(0);

  const {state}= useLocation();
  const dispatch = useDispatch();

  const { web3, account, signer } = useSelector((state) => state.web3.walletData);
  const {contractData} = useSelector((state) => state.chain.contractData);


  const {name, royalty, artistName, tokenId} = state;

  console.log(name, royalty, artistName);

  // const onChange = (value, dateString) => {
  //   console.log("Selected Time: ", value[0]);
  //   console.log("Formatted Selected Time: ", dateString);
  //   timeToTimeStamp(dateString);
  // };

  const handleStartTimeStamp = (value, dateString)=>{
    const time = timeToTimeStamp(dateString);
    setStartTimeStamp(time);
  }

  const handleEndTimeStamp = (value, dateString)=>{
    const time = timeToTimeStamp(dateString);
    setEndTimeStamp(time);
  }

  // const onChange = (value, dateString) => {
  //   console.log("Selected Time: ", value);
  //   console.log("Formatted Selected Time: ", dateString);
  // };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setPotentialEarning(0);
    setCurrency("USD");
    setFixedPrice(0);
    setAuctionStartPrice(0);
  };

  const handlePriceChange = (e)=>{
    const value = e.target.value;
    if(selectedOption === "fixed Price"){
      setFixedPrice(value);
      setPotentialEarning(calculateEarning(value, 2.5, royalty));
    }else if(selectedOption === "auction price"){
      setAuctionStartPrice(value);
      setPotentialEarning(calculateEarning(value, 2.5, royalty));
    }
  }

  const handleCopyChange = (e)=>{
    const value = e.target.value;
    if(selectedOption === "fixed Price"){
      setFixedPriceCopies(value);
    }else if(selectedOption === "auction price"){
      setAuctionCopies(value);
    }
  }

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

  console.log(contractData.marketContract.address);

  const handleListing= async()=>{
    connectWalletHandle();

    const marketContractWithsigner = contractData.marketContract.connect(signer);
    const mintContractWithsigner = contractData.mintContract.connect(signer);

    if(selectedOption === "fixed Price"){
      const price = ETHToWei(fixedPrice);
      const isApproved = await mintContractWithsigner.isApprovedForAll(account, contractData.marketContract.address);
      if(!isApproved){
        const approveTx = await mintContractWithsigner.setApprovalForAll(contractData.marketContract.address, true);
        const resp = await approveTx.wait();
        if(resp){
          try {
            const tx = await marketContractWithsigner.listItemForFixedPrice(tokenId, fixedPriceCopies, price, contractData.mintContract.address);
            const res = await tx.wait();
            if(res){
              console.log("Listing Successful");
              dispatch(loadContractIns());
            }
          } catch (error) {
            console.log(error);
          }
        }else{
          console.log("error");
        }
      }else{
        try {
          const tx = await marketContractWithsigner.listItemForFixedPrice(tokenId, fixedPriceCopies, price, contractData.mintContract.address);
          const res = await tx.wait();
          if(res){
            console.log("Listing Successful");
            dispatch(loadContractIns());
          }
        } catch (error) {
          console.log(error);
        }
      }

    // Auction listing
    }else if(selectedOption === "auction price"){
      const price = ETHToWei(auctionStartPrice);
      const isApproved = await mintContractWithsigner.isApprovedForAll(account, contractData.marketContract.address);

      if(!isApproved){
        const approveTx = await mintContractWithsigner.setApprovalForAll(contractData.marketContract.address, true);
        const resp = await approveTx.wait();
        if(resp){
          try {
            const tx = await marketContractWithsigner.listItemForAuction(price,startTimeStamp, endTimeStamp, tokenId, auctionCopies, contractData.mintContract.address);
            const res = await tx.wait();
            if(res){
              console.log("Aunction Listing Successful");
              // dispatch(loadContractIns());
            }
          } catch (error) {
            console.log(error);
          }
        }else{
          console.log("error");
        }
      }else{
        try {
          const tx = await marketContractWithsigner.listItemForAuction(price,startTimeStamp, endTimeStamp, tokenId, auctionCopies, contractData.mintContract.address);
          const res = await tx.wait();
          if(res){
            console.log("Aunction Listing Successful");
            // dispatch(loadContractIns());
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleCurrency = (value)=>{
    setCurrency(value);
  }

  const calculateEarning =(amount, fee, royalty)=>{
    const totalFee = (Number(fee) + Number(royalty))/100
    const totalFeeAmount = amount * totalFee;
    const earning = amount- totalFeeAmount;
    return earning;
  }

  const selectAfter = (
    <Select defaultValue="USD" onChange={handleCurrency}>
      <Option value="USD">USD</Option>
      { contractData.chain == 5 ?
      <Option value="ETH">ETH</Option> :
      <Option value="MATIC">MATIC</Option>}
    </Select>
  );

  // const calenderRef = useRef();

  // useEffect(() => {
  //   window.addEventListener("click", clickOutside);
  // }, []);

  // const clickOutside = (e) => {
  //   console.log("eddd", calenderRef?.current.contains(e.target));
  //   if (calenderRef?.current.contains(e.target)) {
  //     setOpen(true);
  //   } else if (!calenderRef?.current?.contains(e.target)) {
  //     setOpen(false);
  //   }
  // };

  
  const closeConnectModel = () => {
    setConnectModal(false);
  };
  const connectWalletHandle = () => {
    if (!web3) {
      setConnectModal(true);
    }
  };

  useEffect(() => {
    if (web3) {
      setConnectModal(false);
    }
  }, [web3]);



  return (
    
    <div
      className={`${backgroundTheme}`}
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      <ConnectModal visible={connectModal} onClose={closeConnectModel} />
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
                    <p className="name">{name}</p>
                    {/* <span className="value">Price</span> */}
                  </div>
                  <div className="d-flex justify-content-between px-2 pb-3">
                    <p className="name2">{artistName}</p>
                    {/* <span className="value2">4 ETH</span> */}
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
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Input
                className={textColor == "black" && "ant-light"}
                onChange={handlePriceChange}
                // addonBefore={selectBefore}
                addonAfter={selectAfter}
                defaultValue="Amount"
              />
            </div>

            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>Number Copies To Sell</h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Form.Control
                type="number"
                id="number"
                aria-describedby="number"
                placeholder="0000"
                min="0"
                onChange={handleCopyChange}
              />
            </div>

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
              <p>{fixedPrice} {currency}</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Service Fee</h5>
              <p>2.5%</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Creator Fee</h5>
              <p>{royalty}%</p>
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
              <p className={`${textColor}`}> {potentialEarning} {currency}</p>
            </div>
            <div className="btn-wrapper red-gradient">
              <button onClick={handleListing}>COMPLETE LISTING</button>
            </div>
          </>
        )}
        {selectedOption === "auction price" && (
          <>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Choose a method <AiOutlineInfoCircle />
              </h5>
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
                ]}
              />
            </div>
            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>
                Starting Price <AiOutlineInfoCircle />
              </h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Input addonAfter={selectAfter} defaultValue="Amount" onChange={handlePriceChange} />
            </div>

            <Row gutter={{ xs: 8, sm: 16, md: 30, lg: 50 }}>
              <Col lg={12} md={12} xs={24}>
                <div className="PriceWrapper  d-flex justify-content-between">
                  <h5 className={`${textColor}`}>Auction Start Time</h5>
                </div>
                <div
                  style={{ width: "100%", marginTop: "1rem" }}
                  className={
                    textColor == "black"
                      ? "ant-light-input"
                      : "priceinput-field"
                  }
                >
                  <DatePicker showTime onChange={handleStartTimeStamp} />
                </div>
              </Col>
              <Col lg={12} md={12} xs={24}>
                <div className="PriceWrapper  d-flex justify-content-between">
                  <h5 className={`${textColor}`}>Auction End Time</h5>
                </div>
                <div
                  style={{ width: "100%", marginTop: "1rem" }}
                  className={
                    textColor == "black"
                      ? "ant-light-input"
                      : "priceinput-field"
                  }
                >
                  <DatePicker showTime onChange={handleEndTimeStamp} />
                </div>
              </Col>
            </Row>

            <div className="PriceWrapper  d-flex justify-content-between">
              <h5 className={`${textColor}`}>Number Copies To Sell</h5>
            </div>
            <div
              style={{ width: "100%", marginTop: "1rem" }}
              className={
                textColor == "black" ? "ant-light-input" : "priceinput-field"
              }
            >
              <Form.Control
                type="number"
                id="number"
                aria-describedby="number"
                placeholder="0000"
                min="0"
                onChange={handleCopyChange}
              />
            </div>

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
              <p>{auctionStartPrice} {currency}</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Service Fee</h5>
              <p>2.5%</p>
            </div>
            <div className="list-wrapper d-flex justify-content-between ">
              <h5>Creator Fee</h5>
              <p>{royalty}%</p>
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
              <p className={`${textColor}`}> {potentialEarning} {currency}</p>
            </div>
            <div className="btn-wrapper red-gradient">
              <button onClick={handleListing}>COMPLETE LISTING</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListNft;

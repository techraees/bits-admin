import React from "react";
import { CardCompnent, NavbarComponent } from "../../components";
import { useSelector } from "react-redux";
import { Input, Select } from "antd";
import { AZ, grid, profile, search } from "../../assets";
import { BsFilterLeft } from "react-icons/bs";
import "./css/index.css";

const Marketplace = () => {
  let cardsData = [
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
    {
      image: profile,
      name: "Snap Boogie",
      status: "First Gen Emote",
      videoLink: "https://www.youtube.com/watch?v=9xwazD5SyVg",
    },
  ];
  const textColor = useSelector((state) => state.app.theme.textColor);
  const bgColor = useSelector((state) => state.app.theme.bgColor);
  const { userData } = useSelector((state) => state.address.userData);
  const userProfile = userData?.full_name;
  const backgroundTheme = useSelector(
    (state) => state.app.theme.backgroundTheme
  );
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div
      className={`${backgroundTheme} main`}
      style={{
        minHeight: "100vh",
      }}
    >
      <NavbarComponent
        toggleBtn={textColor === "white" ? true : false}
        selectedKey={"4"}
        headerText={"Marketplace"}
      />
      <div className="container py-3">
        <div className="search-wrapper">
          <div
            style={{ width: "100%" }}
            className={`d-flex  searchStyle ${bgColor} `}
          >
            <img className=" cursor" style={{ width: 15 }} src={search} />
            <Input
              placeholder="Search Here..."
              className={`searchStyle ${bgColor}`}
            />
          </div>
          <button className="search-btn">Search</button>
        </div>
        <div
          style={{ borderBottom: "0.5px solid #c23737", marginTop: "2.5rem" }}
        ></div>
        <div className="d-flex justify-content-between mt-5">
          <div className="d-flex gap-5 ">
            <div className={`filter-wrapper ${bgColor}`}>
              <BsFilterLeft style={{ color: "#C93B3B", fontSize: "2rem" }} />
            </div>
            <div className="marketplace-select-field d-flex gap-2">
              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Category"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Category",
                      label: "Category",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Price"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Price",
                      label: "Price",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Quantity"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  className={textColor == "black" && "light"}
                  options={[
                    {
                      value: "Quantity",
                      label: "Quantity",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Auction"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Auction",
                      label: "Auction",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className={`marketplace-selct-div ${bgColor}`}>
                <Select
                  defaultValue="Ranking"
                  style={{
                    width: 120,
                  }}
                  className={textColor == "black" && "light"}
                  onChange={handleChange}
                  options={[
                    {
                      value: "Ranking",
                      label: "Ranking",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className={`grid-wrapper ${bgColor}`}>
            <img src={AZ} className="me-2" style={{ width: 20, height: 20 }} />
            <span
              className="me-2"
              style={{ border: "1px solid #D54343" }}
            ></span>
            <img src={grid} style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div
          style={{ borderBottom: "0.5px solid #c23737", marginTop: "3.5rem" }}
        ></div>
        <div className="row my-3">
          {cardsData.map((e, i) => {
            return (
              <CardCompnent
                key={i}
                image={e.image}
                status={e.status}
                name={e.name}
                videoLink={e.videoLink}
                marketplacecard
                collectionBtn
                userProfile={userProfile ? true : false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

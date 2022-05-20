import React from "react";
import "./css/index.css";
import { NavbarComponent } from "../../components";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { delete_icon, plus4, profile } from "../../assets";

const PreviousNotes = () => {
  const menu = (
    <Menu
      onClick={(e) => console.log(e)}
      items={[
        {
          label: "1st menu item",
          key: "1",
        },
        {
          label: "2nd menu item",
          key: "2",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );
  let notesData = [
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
    {
      image: profile,
      name: "Snap",
      description: "Loreum ipsum Loreum ipsumLoreum ipsumLoreum ipsum.",
    },
  ];
  return (
    <div className="bg-white2">
      <NavbarComponent
        lightNav
        headerTxt={"Previous Notes"}
        selectedKey={"6"}
      />
      <div className="container radius1 bg-white p-4" style={{ marginTop: 65 }}>
        <div className="d-flex justify-content-between">
          <h5>All Previous Notes</h5>
          <Dropdown overlay={menu}>
            <Button className="dropdownStyle">
              <Space>
                Button
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div className="light-grey-border-bottom my-3"></div>
        {notesData.map((e, i) => {
          return (
            <div
              key={i}
              className="bg-white2 radius1 p-3 my-1 d-flex center notesView"
            >
              <div className="d-flex center">
                <img src={e.image} style={{ width: 80 }} />
                <div className="ms-2">
                  <h5 className="m-0">{e.name}</h5>
                  <p className="light-grey mb-1">{e.description}</p>
                  <Button className="readBtn px-4">Read</Button>
                </div>
              </div>
              <div className="d-flex center addNotes">
                <Button className="notesBtn px-4 d-flex center">
                  <img src={plus4} />
                  <span className="ms-2">Add New Note</span>
                </Button>
                <img className="ms-4 me-1 cursor" src={delete_icon} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousNotes;

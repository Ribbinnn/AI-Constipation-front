import React, { useState, useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Menu, Modal } from "antd";
import { useHistory } from "react-router-dom";
import {
  ControlOutlined,
  EditOutlined,
  ClockCircleOutlined,
  BookOutlined,
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { logout } from "../api/logout";
import Contexts from "../utils/Contexts";

export default function NavBar() {
  const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
  const [tab, setTab] = useState();
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    let key = getTabKey();
    setTab(key);
    setCurrentActivity({ ...currentActivity, enablePageChange: true });
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      let key = getTabKey(location.pathname);
      setTab(key);
      setCurrentActivity({ menu: key, enablePageChange: true }); 
    })
  }, [history]);

  function getTabKey(path) {
    path = (path ?? window.location.pathname).slice(1).split("/");
    switch (path[0]) {
      case "":
        return "home";
      default:
        return path[0];
    }
  }

  function selectMenu(path) {
    if (!currentActivity.enablePageChange) {
      let contentText = "";
      switch (currentActivity.menu) {
        case "diagnosis":
          contentText = "Your action has not completed and it will not be saved.";
          break;
        default:
          contentText = "Changes will not be saved.";
      }
      return Modal.confirm({
        title: "Are you sure you want to navigate away from this page?",
        content: contentText + " Press Yes to continue or No to stay on the current page.",
        okText: "Yes",
        onOk: () => {
          setTab(
            path === "" ? "home" : getTabKey(path)
          );
          setCurrentActivity({ menu: getTabKey(path), enablePageChange: true });
          history.push(path);
        },
        cancelText: "No",
      });
    }
    setTab(
      path === "" ? "home" : getTabKey(path)
    );
    setCurrentActivity({ menu: getTabKey(path), enablePageChange: true });
    history.push(path);
  }

  return (
    <div className="navbar">
      <div>
        <div style={{ textAlign: "center", color: "black", fontSize: "large", fontWeight: "bold", marginBottom: "40px" }}>
          AI Constipation
        </div>
        <div style={{ textAlign: "center", color: "black", fontSize: "small", marginBottom: "35px" }}>
          Logged in as <b>{user.username}</b>
        </div>
        <hr />
      </div>
      <Menu
        selectedKeys={[tab]}
        mode="inline"
      >
        <Menu.Item
          key="home"
          className="menuitem"
          icon={<HomeOutlined />}
          onClick={() => selectMenu("/")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="diagnosis"
          className="menuitem"
          icon={<EditOutlined />}
          onClick={() => selectMenu("/diagnosis")}
          >
            Enter Data
          </Menu.Item>
        <Menu.Item
          key="viewresults"
          className="menuitem"
          icon={<ClockCircleOutlined />}
          onClick={() => selectMenu("/viewresults")}
        >
          View Results
        </Menu.Item>
        <Menu.Item
          key="resources"
          className="menuitem"
          icon={<BookOutlined />}
        >
          <a
            href="https://cu-gimotility.in.th/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "large" }}
          >
            Resources
          </a>
        </Menu.Item>
        <Menu.Item
          key="aboutus"
          className="menuitem"
          icon={<TeamOutlined />}
          onClick={() => selectMenu("/aboutus")}
        >
          About Us
        </Menu.Item>
        <Menu.Item
          key="logout"
          className="menuitem"
          icon={<LogoutOutlined />}
          style={{ color: "#f32424" }}
          onClick={() => {
            logout()
              .then((respond) => {
                window.location.reload();
              })
              .catch((e) => {
                console.log(e);
                window.location.reload();
              });
          }}
        >
          Log out
        </Menu.Item>
        {JSON.parse(sessionStorage.getItem("user")).role === "admin" && (
          <Menu.Item
            key="admin"
            className="menuitem"
            icon={<ControlOutlined />}
            style={{ marginTop: 60 }}
            onClick={() => selectMenu("/admin")}
          >
            Admin
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}

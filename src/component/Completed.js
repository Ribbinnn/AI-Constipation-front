import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import {
  CheckCircleOutlined
} from "@ant-design/icons";

export default function Completed(props) {
    const btnList = props.btnList;
    const title = props.title
  
    return (
      <div className="btn-column">
        <CheckCircleOutlined style={{ fontSize: '150px', color: "#9772fb" }}/>
        <span style={{ fontSize: '25px', color: "#9772fb", marginTop: 20, marginBottom: 10 }}> {title} </span>
        {btnList.map((btn) => (
          <a href={btn.destination} key={btn.title}>
            <Button className="primary-btn" >{btn.title}</Button>
          </a>
        ))}
      </div>
    );
  }
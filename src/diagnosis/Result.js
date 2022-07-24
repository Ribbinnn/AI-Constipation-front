import React, { useEffect } from "react";
import { Button, Spin, Modal } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { getReport } from "../api/reports";

const LoadingIcon = (
  <LoadingOutlined
    style={{ fontSize: '150px', color: "#9772fb", marginBottom: "10px" }}
  />
);

export default function Result(props) {
  const history = useHistory();
  // const role = JSON.parse(sessionStorage.getItem("user")).role;
  const btnList = props.btnList;
  const title = props.title;
  const time = {questionnaire: 1000, image: 10000, integrate: 7000};

  useEffect(() => {
    const interval = setInterval(() => {
      getReport(props.reportId)
      .then((res) => {
          // console.log(res.data);
          if (res.data.status === "annotated") {
            history.push(`/viewresults/view/${props.reportId}`);
          }
          if (res.data.status === "canceled") {
            history.push("/viewresults");
          }
      })
      .catch((err) => {
          console.log(err.response);
          return Modal.error({ content: err.response.data.message, onOk: () => history.push("/viewresults")});
      });
    }, time[props.model]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="btn-column">
      <Spin indicator={LoadingIcon} />
      <div style={{ fontSize: '25px', fontWeight: 500, color: "#9772fb", marginTop: 20 }}>
        Diagnosis is processing
      </div>
      <div style={{ fontSize: '20px', fontWeight: 500, color: "#45c01a", marginBottom: 10 }}>
        All data is saved
      </div>
      {btnList.map((btn) => (
        <a href={btn.destination} key={btn.title}>
          <Button className="primary-btn" >{btn.title}</Button>
        </a>
      ))}
    </div>
  );
}
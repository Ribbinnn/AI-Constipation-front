import React from "react";
import { Modal, Image, Row, Col } from "antd";
import PreviewQuestionnaire from "../component/PreviewQuestionnaire";

export default function BeginDiagnosis(props) {

  return (
    <div>
      <label style={{ marginBottom: "25px", fontWeight: "bold" }}>Please review your answers</label>
      <Row>
        <Col span={props.image ? 17 : 24} style={{ paddingLeft: "15px" }}>
          <PreviewQuestionnaire question={props.question} />
        </Col>
      </Row>
      {/* <Image
          preview={false}
          height={300}
          src={props.image}
      /> */}
      {/* <img src={props.image} alt="Cropped" style={{ maxWidth: "80%", maxHeight: "80%" }} /> */}
    </div>
  );
}

import React from "react";
import { Image, Row, Col } from "antd";
import PreviewQuestionnaire from "../component/PreviewQuestionnaire";

export default function BeginDiagnosis(props) {
  const hasQuestion = Object.keys(props.question).length !== 0;

  return (
    <div>
      <label style={{ marginBottom: "25px", fontWeight: "bold" }}>Please review your answers</label>
      <Row>
        {hasQuestion && <Col span={props.image ? 16 : 24} style={{ paddingLeft: "15px" }}>
          <PreviewQuestionnaire question={props.question} />
        </Col>}
        {props.image && <Col span={hasQuestion ? 8 : 24} style={{ paddingLeft: "15px", paddingTop: "10px" }}>
          <Image
            preview={false}
            height={380}
            src={props.image.croppedImage}
          />
        </Col>}
      </Row>
    </div>
  );
}

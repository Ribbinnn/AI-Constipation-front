import React, { useState, useContext } from "react";
import { Card, Row, Col, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
// import UploadImageModal from "./UploadImageModal";
import FillQuestionnaireModal from "./FillQuestionnaireModal";
// import Contexts from '../utils/Contexts';

function InsertInput(props) {
    // const [uploadImageVisible, setUploadImageVisible] = useState(false);
    const [fillQuestionVisible, setFillQuestionVisible] = useState(false);

    const hasQuestion = Object.keys(props.question).length !== 0;

    return(
        <div>
            {(props.model === "questionnaire" || props.model === "integrated") && <Row style={{ marginBottom: "25px" }}>
                    <Col span={11}>
                        <Button
                            type="link"
                            className="label-btn"
                            style={{ width: "100%" }}
                            onClick={() => setFillQuestionVisible(true)}
                        >
                            <Card
                                hoverable={true}
                                className={hasQuestion ? "selected-card" : ""}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {hasQuestion && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                    <label className="clickable-label" style={{ color: hasQuestion ? "#45c01a" : "black", fontWeight: hasQuestion ? 500 : 400 }}>
                                        Fill in symptom questionnaire
                                    </label>
                                </div>
                            </Card>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>OR</label>
                    </Col>
                    <Col span={11}>
                        <Card
                            hoverable={true}
                            className={hasQuestion ? "selected-card" : ""}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {hasQuestion && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                <label className="clickable-label" style={{ color: hasQuestion ? "#45c01a" : "black", fontWeight: hasQuestion ? 500 : 400 }}>
                                    Import file .csv
                                </label>
                            </div>
                        </Card>
                    </Col>
                </Row>}
            {(props.model === "image" || props.model === "integrated") &&
                <Button
                    type="link"
                    className="label-btn"
                    style={{ width: "100%" }}
                    onClick={() => props.setUploadImageVisible(true)}
                >
                    <Card
                        // style={{ marginBottom: "25px" }}
                        hoverable={true}
                        className={props.image ? "selected-card" : ""}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {props.image && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                            <label className="clickable-label" style={{ color: props.image ? "#45c01a" : "black", fontWeight: props.image ? 500 : 400 }}>
                                Upload X-ray image
                            </label>
                        </div>
                    </Card>
                </Button>}
            {/* <UploadImageModal
                visible={uploadImageVisible}
                setVisible={setUploadImageVisible}
                image={props.image}
                setImage={props.setImage}
            /> */}
            <FillQuestionnaireModal
                visible={fillQuestionVisible}
                setVisible={setFillQuestionVisible}
                question={props.question}
                setQuestion={props.setQuestion}
            />
        </div>
    );
}

export default InsertInput;
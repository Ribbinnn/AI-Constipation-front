import React, { useState, useContext } from "react";
import { Card, Row, Col, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import FillQuestionnaireModal from "./FillQuestionnaireModal";
// import UploadQuestionnaireModal from "./UploadQuestionnaireModal";
// import UploadImageModal from "./UploadImageModal";
// import Contexts from '../utils/Contexts';

function InsertInput(props) {
    const [fillQuestionVisible, setFillQuestionVisible] = useState(false);
    // const [uploadQuestionVisible, setUploadQuestionVisible] = useState(false);
    // const [uploadImageVisible, setUploadImageVisible] = useState(false);

    return(
        <div>
            {(props.model === "questionnaire" || props.model === "integrate") && <Row style={{ marginBottom: "25px" }}>
                    <Col span={11}>
                        <Button
                            type="link"
                            className="label-btn"
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => setFillQuestionVisible(true)}
                        >
                            <Card
                                hoverable={true}
                                className={props.question ? "selected-card" : ""}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {props.question && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                    <label className="clickable-label" style={{ color: props.question ? "#45c01a" : "black", fontWeight: props.question ? 500 : 400 }}>
                                        Fill in Symptom Questionnaire
                                    </label>
                                </div>
                            </Card>
                        </Button>
                    </Col>
                    <Col span={2}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>OR</label>
                    </Col>
                    <Col span={11}>
                        <Button
                            type="link"
                            className="label-btn"
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => props.setUploadQuestionVisible(true)}
                        >
                            <Card
                                hoverable={true}
                                className={props.question ? "selected-card" : ""}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {props.question && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                    <label className="clickable-label" style={{ color: props.question ? "#45c01a" : "black", fontWeight: props.question ? 500 : 400 }}>
                                        Import File (.xlsx/.csv)
                                    </label>
                                </div>
                            </Card>
                        </Button>
                    </Col>
                </Row>}
            {(props.model === "image" || props.model === "integrate") &&
                <Button
                    type="link"
                    className="label-btn"
                    style={{ width: "100%", height: "100%" }}
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
                                Upload X-Ray Image
                            </label>
                        </div>
                    </Card>
                </Button>}
            <FillQuestionnaireModal
                visible={fillQuestionVisible}
                setVisible={setFillQuestionVisible}
                question={props.question}
                setQuestion={props.setQuestion}
            />
            {/* <UploadQuestionnaireModal
                visible={uploadQuestionVisible}
                setVisible={setUploadQuestionVisible}
                question={props.question}
                setQuestion={props.setQuestion}
            /> */}
            {/* <UploadImageModal
                visible={uploadImageVisible}
                setVisible={setUploadImageVisible}
                image={props.image}
                setImage={props.setImage}
            /> */}
        </div>
    );
}

export default InsertInput;
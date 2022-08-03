import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import FillQuestionnaireModal from "./FillQuestionnaireModal";
// import UploadQuestionnaireModal from "./UploadQuestionnaireModal";
// import UploadImageModal from "./UploadImageModal";

function InsertInput(props) {
    const [fillQuestionVisible, setFillQuestionVisible] = useState(false);
    // const [uploadQuestionVisible, setUploadQuestionVisible] = useState(false);
    // const [uploadImageVisible, setUploadImageVisible] = useState(false);

    const isQuestionComplete = (props.question && props.questionReview);
    const isImageComplete = props.image;

    return(
        <div>
            {(props.model === "questionnaire" || props.model === "integrate") &&
                <Row style={{ marginBottom: "25px" }}>
                    <Col xs={24} sm={24} lg={11}>
                        <Card
                            hoverable={true}
                            className={isQuestionComplete ? "selected-card" : ""}
                            onClick={() => setFillQuestionVisible(true)}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {isQuestionComplete &&
                                    <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                <label
                                    className="clickable-label"
                                    style={{
                                        color: isQuestionComplete ? "#45c01a" : "black",
                                        fontWeight: isQuestionComplete ? 500 : 400
                                    }}
                                >
                                    Fill in Symptom Questionnaire
                                </label>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} lg={2} style={{ margin: "5px 0" }}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                            OR
                        </label>
                    </Col>
                    <Col xs={24} sm={24} lg={11}>
                        <Card
                            hoverable={true}
                            className={isQuestionComplete ? "selected-card" : ""}
                            onClick={() => props.setUploadQuestionVisible(true)}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {isQuestionComplete &&
                                    <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                <label
                                    className="clickable-label"
                                    style={{
                                        color: isQuestionComplete ? "#45c01a" : "black",
                                        fontWeight: isQuestionComplete ? 500 : 400
                                    }}
                                >
                                    Import File (.xlsx/.csv)
                                </label>
                            </div>
                        </Card>
                    </Col>
                </Row>}
            {(props.model === "image" || props.model === "integrate") &&
                <Card
                    hoverable={true}
                    className={isImageComplete ? "selected-card" : ""}
                    style={{ marginBottom: "25px" }}
                    onClick={() => props.setUploadImageVisible(true)}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {isImageComplete &&
                            <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                        <label
                            className="clickable-label"
                            style={{
                                color: isImageComplete ? "#45c01a" : "black",
                                fontWeight: isImageComplete ? 500 : 400
                            }}
                        >
                            Upload X-Ray Image
                        </label>
                    </div>
                </Card>
                }
                {(props.model === "questionnaire" || props.model === "integrate") && <Row>
                    <dl style={{ fontSize: "medium", padding: "10px 10px" }}>
                        <dt style={{ color: "#9772fb", fontWeight: "500" }}>การให้คะแนนความรุนแรงของอาการ (<span style={{ fontWeight: "600", textDecoration: "underline" }}>เฉลี่ยในช่วงระยะเวลา 3 เดือนที่ผ่านมา</span>) โดยใช้เกณฑ์ดังนี้</dt>
                        <dt style={{ marginBottom: "2px" }}>- <span style={{ fontWeight: "600" }}>มีอาการเล็กน้อย</span> &nbsp;&nbsp;= มีอาการแต่อาการไม่รบกวนการดำเนินชีวิตประจำวัน</dt>
                        <dt style={{ marginBottom: "2px" }}>- <span style={{ fontWeight: "600" }}>มีอาการปานกลาง</span> = มีอาการรบกวน แต่ไม่ต้องเปลี่ยนแปลงการดำเนินกิจวัตรประจำวันนั้นๆ</dt>
                        <dt style={{ marginBottom: "2px" }}>- <span style={{ fontWeight: "600" }}>มีอาการรุนแรง</span> &emsp;&nbsp;= มีอาการและอาการมีผลกับกิจวัตรประจำวันมากจนต้องเปลี่ยนแปลงการดำเนินชีวิตประจำวัน</dt>
                    </dl>
                </Row>}
            <FillQuestionnaireModal
                visible={fillQuestionVisible}
                setVisible={setFillQuestionVisible}
                question={props.question}
                setQuestion={props.setQuestion}
                questionReview={props.questionReview}
                setQuestionReview={props.setQuestionReview}
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
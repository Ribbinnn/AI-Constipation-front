import React, { useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import FillQuestionnaireModal from "./FillQuestionnaireModal";
// import UploadQuestionnaireModal from "./UploadQuestionnaireModal";
// import UploadImageModal from "./UploadImageModal";

function InsertInput(props) {
    const [fillQuestionVisible, setFillQuestionVisible] = useState(false);
    // const [uploadQuestionVisible, setUploadQuestionVisible] = useState(false);
    // const [uploadImageVisible, setUploadImageVisible] = useState(false);

    return(
        <div>
            {(props.model === "questionnaire" || props.model === "integrate") && <Row style={{ marginBottom: "25px" }}>
                    <Col xs={24} sm={24} lg={11}>
                        <Button
                            type="link"
                            className="label-btn"
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => setFillQuestionVisible(true)}
                        >
                            <Card
                                hoverable={true}
                                className={props.question && props.questionReview ? "selected-card" : ""}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {props.question && props.questionReview && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                    <label
                                        className="clickable-label"
                                        style={{ color: props.question && props.questionReview ? "#45c01a" : "black", fontWeight: props.question && props.questionReview ? 500 : 400 }}>
                                        Fill in Symptom Questionnaire
                                    </label>
                                </div>
                            </Card>
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} lg={2}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>OR</label>
                    </Col>
                    <Col xs={24} sm={24} lg={11}>
                        <Button
                            type="link"
                            className="label-btn"
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => props.setUploadQuestionVisible(true)}
                        >
                            <Card
                                hoverable={true}
                                className={props.question && props.questionReview ? "selected-card" : ""}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {props.question && props.questionReview && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                                    <label
                                        className="clickable-label"
                                        style={{ color: props.question && props.questionReview ? "#45c01a" : "black", fontWeight: props.question && props.questionReview ? 500 : 400 }}>
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
                    style={{ width: "100%", height: "100%", marginBottom: "25px" }}
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
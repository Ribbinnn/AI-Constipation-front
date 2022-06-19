import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
// import { getPatientData } from "../api/pacs"
import UploadImageModal from "./UploadImageModal";
// import * as moment from "moment";
// import Contexts from '../utils/Contexts';

function InsertInput(props) {
    const [uploadImageVisible, setUploadImageVisible] = useState(false);

    return(
        <div>
            {(props.model.name === "questionaire" || props.model.name === "integrated") && <Row style={{ marginBottom: "25px" }}>
                    <Col span={11}>
                        <Card
                            hoverable={true}
                            // className={props.model ? (props.model.name === item.name ? "selected-card" : "") : ""}
                            // onClick={() => {
                            //     props.setModel(item);
                            // }}
                        >
                            <label>
                                Fill in symptom questionnaire
                            </label>
                        </Card>
                    </Col>
                    <Col span={2}>
                        <label style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>OR</label>
                    </Col>
                    <Col span={11}>
                        <Card
                            hoverable={true}
                            // className={props.model ? (props.model.name === item.name ? "selected-card" : "") : ""}
                            // onClick={() => {
                            //     props.setModel(item);
                            // }}
                        >
                            <label>
                                Import file .csv
                            </label>
                        </Card>
                    </Col>
                </Row>}
            {(props.model.name === "image" || props.model.name === "integrated") &&
                <Button
                    type="link"
                    className="label-btn"
                    style={{ width: "100%" }}
                    onClick={() => setUploadImageVisible(true)}
                >
                    <Card
                        style={{ marginBottom: "25px" }}
                        hoverable={true}
                        // className={props.model ? (props.model.name === item.name ? "selected-card" : "") : ""}
                        // onClick={() => {
                        //     document.getElementById("upload-image-button").click();
                        // }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {props.image && <CheckCircleOutlined style={{ color: "#45c01a", fontWeight: 500, marginRight: "8px" }} />}
                            <label style={{ color: props.image ? "#45c01a" : "black", fontWeight: props.image ? 500 : 400 }}>
                                Upload X-ray image
                            </label>
                        </div>
                    </Card>
                </Button>}
            <UploadImageModal
                visible={uploadImageVisible}
                setVisible={setUploadImageVisible}
                setImage={props.setImage}
            />
        </div>
    );
}

export default InsertInput;
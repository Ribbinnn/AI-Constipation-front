import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import { getPatientData } from "../api/pacs"
// import ImageModal from "../component/ImageModal";
// import * as moment from "moment";
// import Contexts from '../utils/Contexts';

function InsertInput(props) {

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
                        <label style={{ color: "black", fontSize: "medium" }}>
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
                        <label style={{ color: "black", fontSize: "medium" }}>
                            Import file .csv
                        </label>
                    </Card>
                </Col>
            </Row>}
            {(props.model.name === "image" || props.model.name === "integrated") && <Card
                style={{ marginBottom: "25px" }}
                hoverable={true}
                // className={props.model ? (props.model.name === item.name ? "selected-card" : "") : ""}
                // onClick={() => {
                //     props.setModel(item);
                // }}
            >
                <label style={{ color: "black", fontSize: "medium" }}>
                    Upload X-ray image
                </label>
            </Card>}
        </div>
    );
}

export default InsertInput;
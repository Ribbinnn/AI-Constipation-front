import React, { useState, useEffect, useContext } from "react";
import { Card } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import { getPatientData } from "../api/pacs"
// import ImageModal from "../component/ImageModal";
// import * as moment from "moment";
// import Contexts from '../utils/Contexts';

function SelectModel(props) {
    const modelList = [
        {name: "questionaire", desc: "Symptom Questionnaire"},
        {name: "image", desc: "X-Ray Image"},
        {name: "integrated", desc: "Symptom Questionnaire + X-Ray Image"},
    ]

    return(
        <div>
            {modelList.map((item, i) => (
                <Card
                    style={{ marginBottom: "25px" }}
                    hoverable={true}
                    className={props.model ? (props.model.name === item.name ? "selected-card" : "") : ""}
                    onClick={() => {
                        props.setModel(item);
                    }}
                >
                    <label style={{ color: "black", fontSize: "medium" }}>
                        {item.desc}
                    </label>
                </Card>
            ))}
        </div>
    );
}

export default SelectModel;
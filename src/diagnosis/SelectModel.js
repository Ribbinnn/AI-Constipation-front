import React, { useContext } from "react";
import { Card } from "antd";
// import Contexts from '../utils/Contexts';

function SelectModel(props) {
    const modelList = [
        {name: "questionnaire", desc: "Symptom Questionnaire"},
        {name: "image", desc: "X-Ray Image"},
        {name: "integrated", desc: "Symptom Questionnaire + X-Ray Image"},
    ]

    return(
        <div>
            {modelList.map((item, i) => (
                <Card
                    key={i}
                    style={{ marginBottom: "25px" }}
                    hoverable={true}
                    className={props.model ? (props.model === item.name ? "selected-card" : "") : ""}
                    onClick={() => {
                        props.setModel(item.name);
                    }}
                >
                    <div style={{ width: "100%", cursor: "pointer" }}>
                        <label className="clickable-label" style={{ color: "#9772fb", fontWeight: 500, marginRight: "5px" }}>Model {i+1}:</label>
                        <label className="clickable-label">{item.desc}</label>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default SelectModel;
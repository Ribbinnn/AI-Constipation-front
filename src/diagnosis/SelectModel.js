import React from "react";
import { Card } from "antd";

function SelectModel(props) {
    const modelList = [
        {name: "questionnaire", desc: "Symptom Questionnaire"},
        {name: "image", desc: "X-Ray Image"},
        {name: "integrate", desc: "Symptom Questionnaire + X-Ray Image"},
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
                        if (item.name === "questionnaire") {
                            props.setImage(null);
                        } else if (item.name === "image") {
                            props.setQuestion(null);
                        }
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
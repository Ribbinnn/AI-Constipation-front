import React from "react";
import { Card, Button } from "antd";

function SelectModel(props) {
    const modelList = [
        {name: "questionnaire", desc: "Symptom Questionnaire"},
        {name: "image", desc: "X-Ray Image"},
        {name: "integrate", desc: "Symptom Questionnaire + X-Ray Image"},
    ]

    return(
        <div>
            {modelList.map((item, i) => (
                <Button
                    type="link"
                    className="label-btn"
                    style={{ width: "100%", height: "100%", marginBottom: "25px" }}
                    disabled={props.rid ? true : false}
                    onClick={() => {
                        props.setModel(item.name);
                        if (item.name === "questionnaire") {
                            props.setImage(null);
                        } else if (item.name === "image") {
                            props.setQuestion(null);
                        }
                    }}
                >
                    <Card
                        key={i}
                        hoverable={true}
                        className={props.model ? (props.model === item.name ? "selected-card" : "") : ""}
                    >
                        <div style={{ width: "100%", cursor: "pointer" }}>
                            <label className="clickable-label" style={{ color: "#9772fb", fontWeight: 500, marginRight: "5px" }}>Model {i+1}:</label>
                            &nbsp;<label className="clickable-label">{item.desc}</label>
                        </div>
                    </Card>
                </Button>
            ))}
        </div>
    );
}

export default SelectModel;
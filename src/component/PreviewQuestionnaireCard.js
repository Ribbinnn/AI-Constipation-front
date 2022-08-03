import React, { useState } from "react";
import { Modal, Card } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import PreviewQuestionnaire from "./PreviewQuestionnaire";

function PreviewQuestionnaireCard(props) {
    const [visible, setVisible] = useState(false);

    return(
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
                hoverable={true}
                className="preview-card"
                style={{ margin: props.margin }}
                onClick={() => setVisible(true)}
            >
                <div>
                    <label className="clickable-label" style={{ marginBottom: "10px" }}>
                        Symptom <br /> Questionnaire
                    </label>
                    <br />
                    <SnippetsOutlined />
                </div>
            </Card>
            <Modal
                centered
                destroyOnClose
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width="800px"
                className={`preview-question-modal ${props.noChildren ? "no-children" : ""}`}
                // style={{ top: 15 }}
            >
                <div style={{ height: "100%", overflow: "scroll" }}>
                    <PreviewQuestionnaire question={props.question} />
                </div>
            </Modal>
        </div>
    );
}

export default PreviewQuestionnaireCard;
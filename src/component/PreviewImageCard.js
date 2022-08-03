import React, { useState } from "react";
import { Card } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import PreviewImageModal from "./PreviewImageModal";

function PreviewImageCard(props) {
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
                        X-Ray Image
                    </label>
                    <br />
                    <PictureOutlined />
                </div>
            </Card>
            <PreviewImageModal
                image={props.image}
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    );
}

export default PreviewImageCard;
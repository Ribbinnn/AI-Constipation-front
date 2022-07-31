import React, { useState } from "react";
import { Card, Button } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import PreviewImageModal from "./PreviewImageModal";

function PreviewImageCard(props) {
    const [visible, setVisible] = useState(false);

    return(
        <div style={{ height: "180px" }}>
            <Button
                type="link"
                className="label-btn"
                onClick={() => setVisible(true)}
            >
                <Card
                    hoverable={true}
                    className="preview-card"
                >
                    <div>
                        <label className="clickable-label" style={{ marginBottom: "10px" }}>
                            X-Ray Image
                        </label>
                        <br />
                        <PictureOutlined />
                    </div>
                </Card>
            </Button>
            <PreviewImageModal
                image={props.image}
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    );
}

export default PreviewImageCard;
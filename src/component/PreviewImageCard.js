import React, { useState } from "react";
import { Modal, Card, Button, Image } from "antd";
import { PictureOutlined } from "@ant-design/icons";

function PreviewImageCard(props) {
    const [visible, setVisible] = useState(false);

    return(
        <div style={{ height: "200px" }}>
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
                        <label className="clickable-label" style={{ marginBottom: "15px" }}>
                            X-Ray Image
                        </label>
                        <br />
                        <PictureOutlined />
                    </div>
                </Card>
            </Button>
            <Modal
                // centered
                destroyOnClose
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width="750px"
                bodyStyle={{ textAlign: "center" }}
                style={{ top: 20 }}
            >
                <Image
                    preview={false}
                    height={700}
                    src={props.image}
                />
            </Modal>
        </div>
    );
}

export default PreviewImageCard;
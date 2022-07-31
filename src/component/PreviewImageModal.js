import React from "react";
import { Modal } from "antd";

function PreviewImageModal(props) {

    return(
        <Modal
            // centered
            destroyOnClose
            visible={props.visible}
            onCancel={() => props.setVisible(false)}
            footer={null}
            width="700px"
            bodyStyle={{ textAlign: "center" }}
            style={{ top: 20 }}
        >
            <img
                src={props.image}
                width={580}
                style={{ padding: "5px 20px" }}
            />
        </Modal>
    );
}

export default PreviewImageModal;
import React from "react";
import { Modal, Image } from "antd";

function PreviewImageModal(props) {

    return(
        <Modal
            // centered
            destroyOnClose
            visible={props.visible}
            onCancel={() => props.setVisible(false)}
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
    );
}

export default PreviewImageModal;
import React, { useState, useRef } from 'react';
import { Button, Modal } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";

/*
* code reference: https://github.com/Sristi27/React-webcam
*/

const width = 480;
const height = 600;

const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user"
};

export const WebcamCapture = (props) => {
    const [image,setImage] = useState('');
    const webcamRef = useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    });

    // const onCancel = () => {
    //     return Modal.confirm({
    //         icon: <ExclamationCircleOutlined />,
    //         content: "Image will not be saved.",
    //         onOk: () => {
    //             props.setVisible(false);
    //             setImage('');
    //         },
    //         zIndex: 3000,
    //     });
    // };

    return(
        <Modal
            destroyOnClose
            maskClosable={false}
            keyboard={false}
            visible={props.visible}
            onCancel={() => {
                props.setVisible(false);
                setImage('');
            }}
            footer={null}
            width="550px"
            className="webcam-modal"
            style={{ top: 10 }}
            zIndex={2000}
        >
            <div>
                <div>
                    {image == '' ?
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/png"
                            videoConstraints={videoConstraints}
                            width={width}
                            // height={height}
                            style={{ maxWidth: "100%", padding: "0 20px" }}
                        /> :
                        <img
                            src={image}
                            width={width}
                            // height={height}
                            style={{ padding: "0 20px" }}
                        />}
                </div>
                <div>
                    {image != '' ? <div style={{ marginTop: "20px" }}>
                        <Button
                            className="primary-btn smaller"
                            onClick={() => setImage('')}
                        >
                            Retake Image
                        </Button>
                        <Button
                            className="primary-btn smaller"
                            style={{ marginLeft: "15px" }}
                            onClick={() => {
                                props.setImage(image);
                                document.getElementById("input-file").value = "";
                                props.setImageName(null);
                                props.setActivity("take photo");
                                props.setVisible(false);
                                setImage('');
                            }}
                        >
                            OK
                        </Button>
                    </div> :
                    <Button
                        className="primary-btn smaller"
                        style={{ marginTop: "12px" }}
                        onClick={() => capture()}
                    >
                        Capture
                    </Button>}
                </div>
            </div>
        </Modal>
    );
};
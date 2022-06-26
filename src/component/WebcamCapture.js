import React, { useState, useRef } from 'react';
import { Button, Modal } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";

/*
* code reference: https://github.com/Sristi27/React-webcam
*/

const width = 440;
const height = 550;

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
                    {image == '' ? <Webcam
                        audio={false}
                        height={height}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={width}
                        videoConstraints={videoConstraints}
                    /> : <img src={image} />}
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
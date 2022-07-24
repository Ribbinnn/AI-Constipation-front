import React, { useState, useEffect, useCallback } from "react";
import { Modal, Row, Col, Button, Image, Slider, InputNumber } from "antd";
import { CameraOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from '../utils/cropUtils'
import { WebcamCapture } from "../component/WebcamCapture";

function UploadImageModal(props) {
    const [imageName, setImageName] = useState(null);
    const [webcamVisible, setWebcamVisible] = useState(false);
    const [activity, setActivity] = useState(null);

    const onOK = () => {
        props.setVisible(false);
        setImageSrc(null);
        setImageName(null);
    }

    const onCancel = () => {
        // console.log(activity);
        if (imageSrc && activity) {
            return Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                content: "Image modification will not be saved.",
                onOk: onOK,
                zIndex: 3000,
            });
        } else {
            props.setVisible(false);
        }
    };

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    // const [croppedImage, setCroppedImage] = useState(null);

    const ORIENTATION_TO_ANGLE = {
        '3': 180,
        '6': 90,
        '8': -90,
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
        // setActivity("cropped");
    }, []);

    // const showCroppedImage = useCallback(async () => {
    //     try {
    //         const croppedImage = await getCroppedImg(
    //             imageSrc,
    //             croppedAreaPixels,
    //             rotation
    //         )
    //         console.log('donee', { croppedImage })
    //         setCroppedImage(croppedImage)
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }, [imageSrc, croppedAreaPixels, rotation])

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setImageName(file.name);
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }

            setImageSrc(imageDataUrl)
            setActivity("file change");
        }
    }

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    useEffect(() => {
        setActivity(null);
        if (props.image) {
            // console.log(props.image);
            setImageSrc(props.image.originalImage);
            setImageName(props.image.originalImageName);
        } else if (document.getElementById("input-file")) {
            document.getElementById("input-file").value = "";
        }
    }, [props.visible]);

    return(
        <div>
            <Modal
                // centered
                // destroyOnClose
                maskClosable={false}
                keyboard={false}
                visible={props.visible}
                onCancel={onCancel}
                title={
                    <label style={{ color: "#9772fb", fontSize: "25px" }}>
                        Upload X-Ray Image
                    </label>
                }
                footer={null}
                width="1000px"
                className="upload-image-modal"
                style={{ top: 30 }}
            >
                <div>
                    <Row>
                        <Col span={7}>
                            <label>
                                กรุณากำหนดภาพดังนี้
                                <ul style={{ paddingLeft: "1rem", margin: "12px 0 22px 0" }}>
                                    <li><label style={{ color: "#9772fb", fontWeight: 2000 }}>จุดกลางภาพ:</label> the level of the <br /> iliac crest</li>
                                    <li><label style={{ color: "#9772fb", fontWeight: 2000 }}>ขอบด้านบน:</label> superior to the <br /> upper kidney pole</li>
                                    <li><label style={{ color: "#9772fb", fontWeight: 2000 }}>ขอบด้านล่าง:</label> inferior to the <br /> inferior pubic rami</li>
                                    <li><label style={{ color: "#9772fb", fontWeight: 2000 }}>ขอบด้านข้าง:</label> laterally to the <br /> lateral abdominal wall</li>
                                </ul>
                            </label>
                            <Image
                                preview={false}
                                height={300}
                                src="/pics/crop_overlay.png"
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={16} style={{ paddingLeft: "7px" }}>
                            <label>Select Image:</label>
                            <Button
                                type="primary"
                                className="primary-btn smaller"
                                icon={<CameraOutlined />}
                                style={{ marginLeft: "15px" }}
                                onClick={() => {
                                    setWebcamVisible(true);
                                }}
                            />
                            <Button 
                                type="primary" 
                                className="primary-btn smaller" 
                                style={{ marginLeft: "15px" }}
                                onClick={() => {
                                    document.getElementById("input-file").click();
                                }}
                            >
                                    Browse
                                    <input 
                                        type="file"
                                        id="input-file"
                                        // accept="image/png, image/jpeg"
                                        accept="image/*"
                                        hidden 
                                        onChange={onFileChange}
                                    />
                            </Button>
                            <label style={{ marginLeft: "20px" }}>{imageName ? imageName : ""}</label>
                            {imageSrc && <div>
                                <Row style={{ margin: "27px 0 5px 0" }}>
                                    <Col span={24}>
                                        <div className="crop-container">
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                rotation={rotation}
                                                zoom={zoom}
                                                maxZoom={2}
                                                aspect={4 / 5}
                                                onCropChange={setCrop}
                                                onRotationChange={setRotation}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={(zoom) => {
                                                    setZoom(zoom);
                                                    setActivity("zoom");
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    {/* <Col span={12}>
                                        <div style={{ textAlign: "center" }}>
                                            <Button
                                                onClick={showCroppedImage}
                                                className="primary-btn"
                                            >
                                                Show Result
                                            </Button>
                                            {croppedImage && <img src={croppedImage} alt="Cropped" style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                                        </div>
                                    </Col> */}
                                </Row>
                                <div className="controls">
                                    <Row style={{ alignItems: "center" }}>
                                        <Col span={2}>
                                            <label>Zoom</label>
                                        </Col>
                                        <Col span={18} style={{ paddingLeft: "7px", paddingRight: "15px" }}>
                                            <Slider
                                                value={typeof zoom === "number" ? zoom : 0}
                                                min={1}
                                                max={2}
                                                step={0.01}
                                                onChange={(zoom) => {
                                                    setZoom(zoom);
                                                    setActivity("zoom");
                                                }}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <InputNumber
                                                // className="input-text"
                                                value={zoom.toFixed(2)}
                                                min={1}
                                                max={2}
                                                step={0.01}
                                                onChange={(zoom) => {
                                                    setZoom(zoom);
                                                    setActivity("zoom");
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ alignItems: "center", marginTop: "10px" }}>
                                        <Col span={3}>
                                            <label>Rotation</label>
                                        </Col>
                                        <Col span={17} style={{ paddingLeft: "1px", paddingRight: "15px" }}>
                                            <Slider
                                                value={typeof rotation === "number" ? rotation : 0}
                                                min={0}
                                                max={360}
                                                step={1}
                                                onChange={(rotation) => {
                                                    setRotation(rotation);
                                                    setActivity("rotation");
                                                }}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <InputNumber
                                                // className="input-text"
                                                value={rotation}
                                                min={0}
                                                max={360}
                                                step={1}
                                                onChange={(rotation) => {
                                                    setRotation(rotation);
                                                    setActivity("rotation");
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>}
                        </Col>
                    </Row>
                    <Row justify="end" /*style={{ marginTop: "10px" }}*/>
                        <Button
                            className="primary-btn smaller cancel"
                            style={{ marginRight: "15px" }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="primary-btn smaller"
                            onClick={async () => {
                                // showCroppedImage();
                                if (imageSrc) {
                                    const croppedImageURL = await getCroppedImg(
                                        imageSrc,
                                        croppedAreaPixels,
                                        rotation
                                    )
                                    props.setImage({
                                        originalImage: imageSrc,
                                        originalImageName: imageName,
                                        croppedImage: croppedImageURL,
                                    });
                                    onOK();
                                } else {
                                    return Modal.warning({ content: "No image to save." });
                                }
                            }}
                        >
                            Process
                        </Button>
                    </Row>
                </div>
            </Modal>
            <WebcamCapture
                visible={webcamVisible}
                setVisible={setWebcamVisible}
                setImage={setImageSrc}
                setImageName={setImageName}
                setActivity={setActivity}
            />
        </div>
    );
}

export default UploadImageModal;
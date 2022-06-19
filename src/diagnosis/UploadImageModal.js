import React, { useState, useCallback } from "react";
import { Modal, Row, Col, Button, Image, Slider } from "antd";
import { CameraOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'
import { getCroppedImg, getRotatedImage } from '../utils/cropUtils'
import { WebcamCapture } from "../component/WebcamCapture";

function UploadImageModal(props) {
    const [imageName, setImageName] = useState(null);
    const [webcamVisible, setWebcamVisible] = useState(false);

    const onCancel = () => {
        return Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: "Image will not be saved.",
            onOk: () => {
                props.setVisible(false);
                setImageSrc(null);
            },
            zIndex: 3000,
        });
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
        }
    }

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    return(
        <div>
            <Modal
                centered
                destroyOnClose
                maskClosable={false}
                keyboard={false}
                visible={props.visible}
                onCancel={onCancel}
                title={<label style={{ color: "#9772fb", fontSize: "25px" }}>Upload X-ray image</label>}
                footer={null}
                width="1300px"
                className="upload-image-modal"
            >
                <div>
                    <Row>
                        <Col span={6}>
                            <label style={{ display: "block", marginBottom: "20px" }}>
                                กรุณากำหนดขอบ Pelvic inlet โดยใช้ <br /> ขอบในของกระดูก iIium (ดังตัวอย่าง)
                            </label>
                            <label style={{ display: "block" }}>ภาพก่อน crop</label>
                            <Image
                                preview={false}
                                height={300}
                                src="/pics/image before crop.png"
                            />
                            <label style={{ display: "block", marginTop: "10px" }}>ภาพหลัง crop</label>
                            <Image
                                preview={false}
                                height={180}
                                src="/pics/image after crop.png"
                            />
                        </Col>
                        <Col span={18}>
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
                                        // accept=".png, .jpeg, .jpg"
                                        accept="image/*"
                                        hidden 
                                        onChange={onFileChange}
                                    />
                            </Button>
                            <label style={{ marginLeft: "20px" }}>{imageName ? imageName : ""}</label>
                            {imageSrc && <div>
                                <Row style={{ margin: "35px 0 10px 0" }}>
                                    <Col span={24}>
                                        <div className="crop-container">
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                rotation={rotation}
                                                zoom={zoom}
                                                aspect={4 / 3}
                                                onCropChange={setCrop}
                                                onRotationChange={setRotation}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
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
                                    <div>
                                        <label>Zoom</label>
                                        <Slider
                                            value={zoom}
                                            min={1}
                                            max={3}
                                            step={0.01}
                                            onChange={(zoom) => setZoom(zoom)}
                                        />
                                    </div>
                                    <div>
                                        <label>Rotation</label>
                                        <Slider
                                            value={rotation}
                                            min={0}
                                            max={360}
                                            step={1}
                                            onChange={(rotation) => setRotation(rotation)}
                                        />
                                    </div>
                                </div>
                            </div>}
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Button
                            className="primary-btn smaller cancel"
                            style={{ marginRight: "15px" }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="primary-btn smaller"
                            style={{ marginRight: "15px" }}
                            onClick={() => {
                                // showCroppedImage();
                                const croppedImage = getCroppedImg(
                                    imageSrc,
                                    croppedAreaPixels,
                                    rotation
                                );
                                props.setImage(croppedImage);
                                props.setVisible(false);
                                setImageSrc(null);
                            }}
                        >
                            OK
                        </Button>
                    </Row>
                </div>
            </Modal>
            <WebcamCapture
                visible={webcamVisible}
                setVisible={setWebcamVisible}
                setImage={setImageSrc}
                setImageName={setImageName}
            />
        </div>
    );
}

export default UploadImageModal;
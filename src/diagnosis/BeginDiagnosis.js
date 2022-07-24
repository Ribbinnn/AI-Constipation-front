import React, { useState, useEffect } from "react";
import { Image, Row, Col } from "antd";
import PreviewQuestionnaire from "../component/PreviewQuestionnaire";
import PreviewImageModal from "../component/PreviewImageModal";

export default function BeginDiagnosis(props) {
  const [image, setImage] = useState(null);
  const [previewImageVisible, setPreviewImageVisible] = useState(false);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  useEffect(() => {
    if (props.image) {
      readFile(props.image.croppedImage)
      .then(imageURL => setImage(imageURL))
    }
  }, []);

  return (
    <div>
      <label style={{ marginBottom: "25px", fontWeight: "bold" }}>Please review your Questionnaire and/or X-Ray Image</label>
      <Row>
        {props.question && <Col span={props.image ? 16 : 24} style={{ paddingLeft: "15px" }}>
          <PreviewQuestionnaire question={props.question} />
        </Col>}
        {props.image && <Col span={props.question ? 8 : 24} style={{ paddingLeft: "15px", paddingTop: "10px" }}>
          <Image
            preview={false}
            height={380}
            src={image}
            style={{ cursor: "pointer" }}
            onClick={() => setPreviewImageVisible(true)}
          />
        </Col>}
      </Row>
      <PreviewImageModal
        image={image}
        visible={previewImageVisible}
        setVisible={setPreviewImageVisible}
      />
    </div>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spin, Modal, Row, Col, Badge, Tag, Rate, Space, Card, Button } from "antd";
import { LoadingOutlined, SnippetsOutlined } from "@ant-design/icons";
import PreviewQuestionnaire from "../component/PreviewQuestionnaire";
import { getReport } from "../api/reports";
// import Contexts from "../utils/Contexts";

const LoadingIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

export default function Report(props) {
//   const { currentActivity } = useContext(Contexts).active;
    const { mode, rid } = useParams();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [info, setInfo] = useState();
    const [gradCam, setGradCam] = useState();

    const ratingDesc = [
        "ไม่มั่นใจ", "มั่นใจเล็กน้อย", "มั่นใจปานกลาง", "ค่อนข้างมั่นใจ", "มั่นใจมาก"
    ];
    const ratingScore = [0, 25, 50, 75, 100];

    const [previewQuestionVisible, setPreviewQuestionVisible] = useState(false);

    useEffect(() => {
        getReport(rid)
        .then((res) => {
            console.log(res.data);
            setInfo(res.data);
            setLoaded(true);
        })
        .catch((err) => {
            return Modal.error({ content: "Report not Found.", onOk: () => history.push("/viewresults")});
        });
    }, []);

//   const updateTimestamp = (updatedAt, updated_by) => {
//     setInfo({
//       ...info,
//       result: { ...info.result, status: info.result.status === "annotated" ? "reviewed" : info.result.status, updatedAt: updatedAt, updated_by: updated_by },
//     });
//   };

    return (
        <div className="content">
            {!loaded && (
                <div style={{ textAlign: "center", marginTop: "20%" }}>
                <Spin indicator={LoadingIcon} />
                <br />
                <br />
                <span style={{ fontSize: "medium", color: "#9772fb" }}>
                    Loading ...
                </span>
                </div>
            )}
            {loaded && (
                <Row>
                    <Col span={info.task === "questionnaire" ? 24 : 12}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                            <label style={{ color: "#9772fb", fontSize: "28px", fontWeight: 500 }}>
                                Report
                            </label>
                            <Badge count={`No. ${info.index}`} className="rno-badge"/>
                            <Tag
                                color={info.status === "annotated" ? "warning" : "success"}
                                style={{ fontSize: "small", marginLeft: "10px" }}
                            >
                                {info.status === "annotated" ? "2 AI-Annotated" : "3 Expert-Annotated"}
                            </Tag>
                        </div>
                        <Row style={{ marginBottom: "30px" }}>
                            <label style={{ color: "#a3a3a3", textAlign: "left" }}>
                                <i>
                                    Created Date: {new Date(info.createdAt).toLocaleString()}
                                    <br />
                                    Created By:{" "}
                                    {`${info.created_by.first_name} ${info.created_by.last_name}`}
                                </i>
                            </label>
                            {info.status !== "annotated" &&
                                <label style={{ color: "#a3a3a3", textAlign: "left" }}>
                                    <i>
                                        Last Updated: {new Date(info.updatedAt).toLocaleString()}
                                        <br />
                                        Updated By:{" "}
                                        {`${info.updated_by.first_name} ${info.updated_by.last_name}`}
                                    </i>
                                </label>}
                        </Row>
                    </Col>
                    {/* <Col span={12}>
                        {gradCam}
                    </Col> */}
                </Row>
            )}
            {loaded && (
                <Row>
                    <Col span={12}>
                        <Space direction="vertical" size={10} style={{ width: "100%" }}>
                            <Row style={{ alignItems: "baseline" }}>
                                <Col span={12}>
                                    <label>Hospital:</label>
                                </Col>
                                <Col span={12}>
                                    <label>{info.personal_info_id.hospital}</label>
                                </Col>
                            </Row>
                            <Row style={{ alignItems: "baseline" }}>
                                <Col span={12}>
                                    <label>HN:</label>
                                </Col>
                                <Col span={12}>
                                    <label>{info.personal_info_id.hn}</label>
                                </Col>
                            </Row>
                            <Row style={{ alignItems: "baseline" }}>
                                <Col span={12}>
                                    <label>Name:</label>
                                </Col>
                                <Col span={12}>
                                    <label>{info.personal_info_id.name}</label>
                                </Col>
                            </Row>
                            <Row style={{ alignItems: "baseline" }}>
                                <Col span={12}>
                                    <label>Gender:</label>
                                </Col>
                                <Col span={12}>
                                    <label>{info.personal_info_id.gender === "F" ? "Female" : "Male"}</label>
                                </Col>
                            </Row>
                            <Row style={{ alignItems: "baseline" }}>
                                <Col span={12}>
                                    <label>Age:</label>
                                </Col>
                                <Col span={12}>
                                    <label>{info.personal_info_id.age}</label>
                                </Col>
                            </Row>
                            <Row style={{ alignItems: "baseline" }}>
                                <Col span={12}>
                                    <label>ความมั่นใจในการวินิจฉัย <br /> Dyssynergic defecation (DD):</label>
                                </Col>
                                <Col span={12}>
                                    <Rate
                                        className="rating smaller"
                                        disabled
                                        tooltips={ratingDesc}
                                        defaultValue={ratingScore.indexOf(info.personal_info_id.DD_confidence) + 1}
                                    />
                                </Col>
                            </Row>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Row style={{ height: "100%" }}>
                            <Col span={12} style={{ padding: "20px" }}>
                                {(info.task === "questionnaire" || info.task === "integrated") &&
                                    <Button
                                        type="link"
                                        className="label-btn"
                                        style={{ width: "100%" }}
                                        onClick={() => setPreviewQuestionVisible(true)}
                                    >
                                        <Card
                                            hoverable={true}
                                            className="preview-card"
                                            bodyStyle={{ textAlign: "center" }}
                                        >
                                            <div>
                                                <label className="clickable-label" style={{ marginBottom: "20px" }}>
                                                    Symptom Questionnaire
                                                </label>
                                                <br />
                                                <SnippetsOutlined style={{ fontSize: "60px", color: "#999", marginBottom: "10px" }} />
                                            </div>
                                        </Card>
                                    </Button>}
                            </Col>
                            <Col span={12} style={{ padding: "20px" }}>
                                {(info.task === "image" || info.task === "integrated") &&
                                    <label>image card</label>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
            <Modal
                centered
                destroyOnClose
                visible={previewQuestionVisible}
                onCancel={() => setPreviewQuestionVisible(false)}
                footer={null}
                width="800px"
                className="preview-question-modal"
                // style={{ top: 10 }}
            >
                <div style={{ height: "100%", overflow: "scroll" }}>
                    <PreviewQuestionnaire question={info ? info.question_id : null} />
                </div>
            </Modal>
        </div>
    );
}

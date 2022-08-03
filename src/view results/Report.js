import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Spin, Modal, Row, Col, Badge, Tag, Rate, Space, Card, Button } from "antd";
import { LoadingOutlined, SnippetsOutlined, PictureOutlined, EditOutlined, CloudDownloadOutlined } from "@ant-design/icons";
// import PreviewQuestionnaire from "../component/PreviewQuestionnaire";
import PreviewQuestionnaireCard from "../component/PreviewQuestionnaireCard";
import PreviewImageCard from "../component/PreviewImageCard";
import ResultsPanel from "./ResultsPanel";
import { getReport, getImage, getQuestionnaireFile } from "../api/reports";

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

export default function Report(props) {
    const { mode, rid } = useParams();
    const history = useHistory();
    function useQuery() {
        const { search } = useLocation();
        return new URLSearchParams(search);
    }
    const queryString = useQuery();
    const [loaded, setLoaded] = useState(false);
    const [info, setInfo] = useState();
    const [originalImage, setOriginalImage] = useState(null);
    const [questionFile, setQuestionFile] = useState(null);

    const ratingDesc = [
        "ไม่มั่นใจ", "มั่นใจเล็กน้อย", "มั่นใจปานกลาง", "ค่อนข้างมั่นใจ", "มั่นใจมาก"
    ];
    const ratingScore = [0, 25, 50, 75, 100];

    // const [previewQuestionVisible, setPreviewQuestionVisible] = useState(false);
    // const [previewImageVisible, setPreviewImageVisible] = useState(false);

    const printResult = (field, value) => {
        return (
            <Row style={{ alignItems: "baseline" }}>
                <Col xs={24} sm={10} lg={12}>
                    <label>{field}</label>
                </Col>
                <Col xs={24} sm={14} lg={12}>
                    <label>{value}</label>
                </Col>
            </Row>
        );
    }

    useEffect(() => {
        getReport(rid)
        .then((res) => {
            // console.log(res.data);
            setInfo(res.data);
            if (res.data.task === "questionnaire" || res.data.task === "integrate") {
                getQuestionnaireFile(rid)
                .then((res) => {
                    let url = URL.createObjectURL(res);
                    setQuestionFile(url);
                    // setLoaded(true);
                })
            }
            if (res.data.task === "image" || res.data.task === "integrate") {
                getImage(rid, "original")
                .then((res) => {
                    let url = URL.createObjectURL(res);
                    setOriginalImage(url);
                    // setLoaded(true);
                })
            }
            setLoaded(true);
        })
        .catch((err) => {
            console.log(err.response);
            return Modal.error({ content: err.response.data.message, onOk: () => history.push("/viewresults") });
        });
    }, []);

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
                <div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                        <label style={{ color: "#9772fb", fontSize: "28px", fontWeight: 500 }}>
                            Final Diagnosis
                        </label>
                        {/* <Badge count={`No. ${info.index}`} className="rno-badge" /> */}
                        <Tag
                            color={info.status === "annotated" ? "warning" : "success"}
                            style={{ fontSize: "small", marginLeft: "15px" }}
                        >
                            {info.status === "annotated" ? "AI-Annotated" : "Expert-Annotated"}
                        </Tag>
                    </div>
                    <label style={{ color: "#a3a3a3", textAlign: "left", marginBottom: "30px" }}>
                        <i>
                            Created Date: {new Date(info.createdAt).toLocaleString()}
                            <br />
                            Created By:{" "}
                            {`${info.created_by.first_name} ${info.created_by.last_name} (${info.created_by.hospital})`}
                        </i>
                        {info.status !== "annotated" &&
                            <i>
                                <br />
                                Last Updated: {new Date(info.updatedAt).toLocaleString()}
                                <br />
                                Updated By:{" "}
                                {`${info.updated_by.first_name} ${info.updated_by.last_name} (${info.updated_by.hospital})`}
                            </i>}
                    </label>
                </div>
            )}
            {loaded && (
                <Row /*style={{ marginBottom: "35px" }}*/>
                    <Col xs={24} sm={24} lg={12} style={{ marginBottom: "35px" }}>
                        <Space direction="vertical" size={10} style={{ width: "100%" }}>
                            {printResult("Hospital:", info.personal_info_id.hospital)}
                            {printResult("HN:", info.personal_info_id.hn)}
                            {printResult("Name:", info.personal_info_id.name)}
                            {printResult("Gender:", info.personal_info_id.gender === "F" ? "Female" : "Male")}
                            {printResult("Age:", info.personal_info_id.age)}
                            <Row style={{ alignItems: "baseline" }}>
                                <Col xs={24} sm={10} lg={12}>
                                    <label>ความน่าจะเป็นในการเป็น <br /> Dyssynergic defecation <br /> ของผู้ป่วยรายนี้ (DD probability):</label>
                                </Col>
                                <Col xs={24} sm={14} lg={12}>
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
                    <Col xs={24} sm={24} lg={12} style={{ marginBottom: "35px" }}>
                        <Row justify="center" style={{ marginTop: "5px" }}>
                            {(info.task === "questionnaire" || info.task === "integrate") &&
                                // <Button
                                //     type="link"
                                //     className="label-btn"
                                //     style={{ marginRight: "20px" }}
                                //     onClick={() => setPreviewQuestionVisible(true)}
                                // >
                                //     <Card
                                //         hoverable={true}
                                //         className="preview-card"
                                //     >
                                //         <div>
                                //             <label className="clickable-label" style={{ marginBottom: "15px" }}>
                                //                 Symptom <br /> Questionnaire
                                //             </label>
                                //             <br />
                                //             <SnippetsOutlined />
                                //         </div>
                                //     </Card>
                                // </Button>
                                <PreviewQuestionnaireCard
                                    question={info.question_id}
                                    margin="0 0 18px"
                                    noChildren={
                                        info.question_id.DistFreq === 0 && info.question_id.BloatFreq === 0
                                    }
                                />
                            }
                            <Col xs={0} sm={1} />
                            {(info.task === "image" || info.task === "integrate") &&
                                // <Button
                                //     type="link"
                                //     className="label-btn"
                                //     onClick={() => setPreviewImageVisible(true)}
                                // >
                                //     <Card
                                //         hoverable={true}
                                //         className="preview-card"
                                //     >
                                //         <div>
                                //             <label className="clickable-label" style={{ marginBottom: "15px" }}>
                                //                 X-Ray Image
                                //             </label>
                                //             <br />
                                //             <PictureOutlined />
                                //         </div>
                                //     </Card>
                                // </Button>
                                <PreviewImageCard
                                    margin="0 0 18px"
                                    image={originalImage}
                                />
                            }
                        </Row>
                        {info.status !== "reviewed" && <Row justify="center">
                            <a
                                href={`/diagnosis/${rid}`}
                                className="a-with-icon"
                                style={{ color: "#9772fb", fontWeight: "bold" }}
                            >
                                <EditOutlined style={{ marginRight: "8px" }} />
                                Edit {info.task === "integrate" ?
                                    "Questionnaire / Image" :
                                    info.task.charAt(0).toUpperCase() + info.task.slice(1)}
                            </a>
                        </Row>}
                        <Row justify="center">
                            {(info.task === "questionnaire" || info.task === "integrate") && <a
                                href={questionFile}
                                download="questionnaire.xlsx"
                                className="a-with-icon"
                                style={{ color: "#9772fb", fontWeight: "bold" }}
                            >
                                <CloudDownloadOutlined style={{ marginRight: "8px" }} />
                                Download Questionnaire
                            </a>}
                            {(info.task === "image" || info.task === "integrate") && <a
                                href={originalImage}
                                download="image.png"
                                className="a-with-icon"
                                style={{
                                    color: "#9772fb",
                                    fontWeight: "bold",
                                    marginLeft: info.task === "integrate" ? "15px" : 0
                                }}
                            >
                                <CloudDownloadOutlined style={{ marginRight: "8px" }} />
                                Download Image
                            </a>}
                        </Row>
                    </Col>
                </Row>
            )}
            {loaded &&
                <ResultsPanel
                    rid={rid}
                    mode={mode}
                    history={history}
                    queryString={queryString}
                    loaded={loaded}
                    info={info}
                />}
            {/* {loaded && <Modal
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
                    <PreviewQuestionnaire question={info.question_id} />
                </div>
            </Modal>} */}
            {/* {loaded && <Modal
                // centered
                destroyOnClose
                visible={previewImageVisible}
                onCancel={() => setPreviewImageVisible(false)}
                footer={null}
                width="750px"
                bodyStyle={{ textAlign: "center" }}
                style={{ top: 20 }}
            >
                <Image
                    preview={false}
                    height={700}
                    src={originalImage}
                />
            </Modal>} */}
        </div>
    );
}

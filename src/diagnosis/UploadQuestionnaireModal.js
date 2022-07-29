import React, { useState, useEffect } from "react";
import { Modal, Row, Button } from "antd";
import { CloudDownloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import XLSX from "xlsx";
import PreviewQuestionnaire from "../component/PreviewQuestionnaire";
import { getTemplate, getTemplateDesc } from "../api/infer";

var _ = require('lodash');

function UploadQuestionnaireModal(props) {
    const fields = [
        "DistFreq", "DistSev", "DistDur", "FreqStool", "Incomplete", "Strain",
        "Hard", "Block", "Digit", "BloatFreq", "BloatSev", "BloatDur", "SevScale"
    ];
    const [template, setTemplate] = useState(null);
    const [templateDesc, setTemplateDesc] = useState(null);

    const [question, setQuestion] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    const [hasError, setHasError] = useState(false);

    const onOK = () => {
        props.setVisible(false);
        setHasError(false);
        setQuestion(null);
        setUploadedFileName(null);
    }

    const onCancel = () => {
        if (question && question.DistFreq !== null && question.BloatFreq !== null) {
            if (question.DistFreq === 0) {
                question.DistSev = 0;
                question.DistDur = 0.0;
            }
            if (question.BloatFreq === 0) {
                question.BloatSev = 0;
                question.BloatDur = 0.0;
            }
            question.DistSevFreq = question.DistFreq * question.DistSev;
            question.BloatSevFreq = question.BloatFreq * question.BloatSev;
        }
        if ((!props.question && !question) || (!props.questionReview && !question) || (props.question && _.isEqual(props.question, question))) {
            props.setVisible(false);
        } else {
            return Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                content: "Changes will not be saved.",
                onOk: onOK,
                zIndex: 3000,
            });
        }
    };

    async function handleUploadedFile(event) {
        try {
            // read file
            const data = await event.target.files[0].arrayBuffer();
            const workbook = XLSX.read(data);
            const target_workbook = workbook.Sheets[workbook.SheetNames[0]];
            // convert file to json
            const data_json = XLSX.utils.sheet_to_json(target_workbook);
            // check fields
            const uploaded_fields = data_json.map(d => d.name);
            if (data_json.length !== 13 || !_.isEqual(uploaded_fields, fields)) {
                Modal.warning({
                    title: "Some fields are missing, or fields are more than 13",
                    content: "Please upload new file with all required fields (listed in template file).",
                });
                setUploadedFileName(null);
                document.getElementById("input-file-q").value = "";
            } else {
                const question = {};
                for (const i in data_json) {
                    let key = data_json[i].name;
                    let val = data_json[i].value;
                    question[key] = val;
                }
                setUploadedFileName(event.target.files[0].name);
                setQuestion(question);
                setHasError(false);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        getTemplate()
        .then((res) => {
            const template = window.URL.createObjectURL(res)
            setTemplate(template);
        }).catch((e) => {
            console.log(e);
        });

        getTemplateDesc()
        .then((res) => {
            const templateDesc = window.URL.createObjectURL(res)
            setTemplateDesc(templateDesc);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        if (props.question && props.uploadedFileName) {
            setQuestion(props.question);
            setUploadedFileName(props.uploadedFileName);
        } else if (document.getElementById("input-file-q")) {
            document.getElementById("input-file-q").value = "";
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
                        Import File (.xlsx/.csv)
                    </label>
                }
                footer={null}
                width="850px"
                className="upload-question-modal"
                style={{ top: 15 }}
            >
                <div style={{ height: "100%" }}>
                    <div style={{ height: "91%", overflow: "scroll" }}>
                        <a
                            href={template}
                            download="template.xlsx"
                            className="a-with-icon"
                            style={{ color: "#9772fb", fontWeight: 500 }}
                        >
                            <CloudDownloadOutlined style={{ marginRight: "8px" }} />
                            Download Template
                        </a>
                        <a
                            href={templateDesc}
                            download="template_desc.xlsx"
                            className="a-with-icon"
                            style={{ color: "#9772fb", fontWeight: 500, marginBottom: "20px" }}
                        >
                            <CloudDownloadOutlined style={{ marginRight: "8px" }} />
                            Download Template Description
                        </a>
                        <div style={{ marginBottom: "30px" }}>
                            <Button 
                                type="primary" 
                                className="primary-btn smaller" 
                                onClick={() => {
                                    document.getElementById("input-file-q").click();
                                }}
                            >
                                    Upload
                                    <input 
                                        type="file" 
                                        id="input-file-q" 
                                        accept=".xlsx, .csv"
                                        hidden 
                                        onChange={(event) => {
                                            handleUploadedFile(event);
                                        }}
                                    />
                            </Button>
                            <label style={{marginLeft: "20px"}}>
                                {question ? uploadedFileName : null}
                            </label>
                        </div>
                        <div style={{ paddingLeft: "13px" }}>
                            {question && <PreviewQuestionnaire question={question} setHasError={setHasError} />}
                        </div>
                    </div>
                    <Row justify="end" style={{ marginTop: "18px" }}>
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
                                if (!hasError) {
                                    if (question.DistFreq !== 0 && (question.DistSev === 0 || question.DistDur === 0)) {
                                        Modal.warning({content: "Question 1.1 and/or 1.2 cannot be 0.", zIndex: 3000});
                                    } else if (question.BloatFreq !== 0 && (question.BloatSev === 0 || question.BloatDur === 0)) {
                                        Modal.warning({content: "Question 8.1 and/or 8.2 cannot be 0", zIndex: 3000});
                                    } else {
                                        if (question.DistFreq === 0) {
                                            question.DistSev = 0;
                                            question.DistDur = 0.0;
                                        }
                                        if (question.BloatFreq === 0) {
                                            question.BloatSev = 0;
                                            question.BloatDur = 0.0;
                                        }
                                        question.DistSevFreq = question.DistFreq * question.DistSev;
                                        question.BloatSevFreq = question.BloatFreq * question.BloatSev;
                                        props.setQuestion(question);
                                        props.setUploadedFileName(uploadedFileName);
                                        onOK();
                                        if (!props.questionReview) {
                                            props.setQuestionReview(true);
                                        }
                                    }
                                } else {
                                    Modal.error({content: "Value of some fields are out of range.", zIndex: 3000});
                                }
                            }}
                        >
                            OK
                        </Button>
                    </Row>
                </div>
            </Modal>
        </div>
    );
}

export default UploadQuestionnaireModal;
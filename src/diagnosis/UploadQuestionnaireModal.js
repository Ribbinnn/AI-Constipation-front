import React, { useState, } from "react";
import { Modal, Row, Button } from "antd";
import { CloudDownloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import XLSX from "xlsx";
import PreviewQuestionnaire from "../component/PreviewQuestionnaire";
import { downloadTemplate } from "../api/infer";
import Contexts from "../utils/Contexts";

var _ = require('lodash');

function UploadQuestionnaireModal(props) {
    // const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
    const fields = [
        "DistFreq", "DistSev", "DistDur", "FreqStool", "Incomplete", "Strain",
        "Hard", "Block", "Digit", "BloatFreq", "BloatSev", "BloatDur", "SevScale"
    ];

    const [question, setQuestion] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    const [hasError, setHasError] = useState(false);

    const onOK = () => {
        props.setVisible(false);
        setHasError(false);
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
        if ((!props.question && !question) || (props.question && _.isEqual(props.question, question))) {
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
        // read file
        const data = await event.target.files[0].arrayBuffer();
        const workbook = XLSX.read(data);
        const target_workbook = workbook.Sheets[workbook.SheetNames[0]];
        // convert file to json
        const data_json = XLSX.utils.sheet_to_json(target_workbook);
        // console.log(data_json);
        // check fields
        const uploaded_fields = data_json.map(d => d.name);
        if (data_json.length !== 13 || !_.isEqual(uploaded_fields, fields)) {
            Modal.warning({
                title: "Some fields are missing, or fields are more than 13",
                content: "Please upload new file with all required fields (listed in template file).",
            });
            setUploadedFileName(null);
            document.getElementById("input-file-q").value = "";
            // if (!currentActivity.enablePageChange){
            //     setCurrentActivity({ ...currentActivity, enablePageChange: true });
            //   }
        } else {
            const question = {};
            for (const i in data_json) {
                let key = data_json[i].name;
                let val = data_json[i].value;
                question[key] = val;
            }
            // console.log(question);
            setUploadedFileName(event.target.files[0].name);
            setQuestion(question);
            setHasError(false);
            // if (currentActivity.enablePageChange){
            //     setCurrentActivity({ ...currentActivity, enablePageChange: false });
            //   }
        }
    }

    return(
        <div>
            <Modal
                // centered
                destroyOnClose
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
                        <label 
                            style={{display: "flex", alignItems: "center", marginBottom: "15px", color: "#9772fb", fontWeight: 500}}
                            className="clickable-label"
                            onClick={() => {
                                downloadTemplate()
                                .then((res) => {
                                    const url = window.URL.createObjectURL(res)
                                    const link = document.createElement('a');

                                    link.href = url;
                                    link.setAttribute('download', `template.xlsx`);
                                    
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }).catch((e) => {
                                    console.log(e)
                                })
                            }}
                        >
                                Download Template
                                <CloudDownloadOutlined style={{marginLeft: "8px"}} />
                        </label>
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
                            style={{ cursor: hasError ? "not-allowed" : "pointer" }}
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
                                        onOK();
                                    }
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
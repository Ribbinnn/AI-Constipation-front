import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Modal, Row, Col, Space, Form, Radio, Checkbox } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { updateReport } from "../api/reports";
import Contexts from "../utils/Contexts";

const { TextArea } = Input;
// const GradCamStyle = { fontSize: "x-large" };

export default function ResultsPanel(props) {
    // const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
    const [form] = Form.useForm();

    const threshold = 0.5; // default
    const final_diag_option = [
        {key: "symptoms", label: "symptoms", value: "symptoms"},
        {key: "manometry", label: "manometry", value: "manometry"},
        {key: "BET", label: "BET", value: "BET"},
        {key: "defecography", label: "defecography", value: "defecography"},
        {key: "CTT", label: "CTT", value: "CTT"},
    ]
    const question = [
        "1. Final diagnosis of DD from", "2. CTT results", "3. Anorectal Structural Abnormality",
        "4. IBS", "5. Cormorbidity", "6. Surgical History", "7. Comments"
    ];

    const [surgicalHistory, setSurgicalHistory] = useState(false);
    const [gradCam, setGradCam] = useState();

    const onBack = () => {
        const checker = form.getFieldsValue(true);
        if (Object.keys(checker).length !== 0) {
            return Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                content: "Changes will not be saved.",
                onOk: () => window.history.back(),
                zIndex: 3000,
            });
        } else {
            window.history.back();
        }
    };

//   const [reportState, setReportState] = useState({
//     rating: props.rate,
//     note: props.note,
//     btnGroup: "back",
//   });

//   useEffect(() => {
//     if (reportState.btnGroup === "back" && !currentActivity.enablePageChange) {
//       setCurrentActivity({ ...currentActivity, enablePageChange: true });
//     }
//     if (reportState.btnGroup === "save" && currentActivity.enablePageChange) {
//       setCurrentActivity({ ...currentActivity, enablePageChange: false });
//     }
//   }, [reportState]);

//   const onSaveReport = () => {
//     /* save report api */
//     const key = "updatable";
//     message.loading({ content: "Loading...", key, duration: 0 });
//     let selected_class = data.reduce((current, item) => {
//       if (selectedRowKeys.includes(item.key)) return [...current, item.class];
//       return current;
//     }, []);
//     updateReport(
//       props.rid,
//       reportState.note,
//       JSON.parse(sessionStorage.getItem("user")).id,
//       { finding: selected_class },
//       reportState.rating
//     )
//       .then((res) => {
//         // console.log(res);
//         if (res.success) {
//           setDefaultData({
//             rating: reportState.rating,
//             rowKeys: selectedRowKeys,
//             note: reportState.note,
//           });
//           props.updateTimestamp(res.data.updatedAt, res.data.updated_by);
//           setReportState({ ...reportState, btnGroup: "back" });
//           message.success({ content: res.message, key, duration: 5 });
//         } else message.error({ content: res.message, key, duration: 5 });
//       })
//       .catch((err) => console.log(err.response));
//   };

    const printResult = (field, value) => {
        return(
            <Row style={{ alignItems: "baseline" }}>
                <Col span={12}>
                    <label /*style={{ color: "#9772fb", fontWeight: 500 }}*/>{field}</label>
                </Col>
                <Col span={12}>
                    <label /*style={{ color: "#9772fb", fontWeight: 500 }}*/>{value}</label>
                </Col>
            </Row>
        );
    }

    const printAnswer = (q, ans) => {
        return(
            <div>
                <label>{q}</label><br />
                {ans === "-" ?
                    <label style={{ marginLeft: "16px" }}>{ans}</label> :
                    (typeof ans === "object" ?
                        ans.map((a) => 
                            <label style={{ marginLeft: "17px", color: "#9772fb", fontWeight: 500 }}>{a}</label>
                        ) :
                        <label
                            style={{ marginLeft: "17px", color: "#9772fb", fontWeight: 500 }}
                        >
                            {ans}
                        </label>)}
            </div>
        );
    };

    return (
        <div>
            <Row>
                <Col span={12}>
                    {/* <Space
                        direction="vertical"
                        size={10}
                        style={{ width: "100%", marginBottom: "35px", background: "#f5f5f5", padding: "15px 20px" }}
                    >
                        <label style={{ color: "#9772fb", fontWeight: "bold", marginBottom: "10px" }}>AI Diagnosis</label>
                        {printResult("DD Probability:", props.info.DD_probability.toFixed(2))}
                        {printResult("Threshold:", threshold.toFixed(2))}
                        {printResult(props.info.DD_probability > threshold ? "Likely DD" : "Unlikely DD", null)}
                    </Space> */}
                    <Space
                        direction="vertical"
                        size={10}
                        style={{ width: "100%", marginBottom: "25px", background: "#f5f5f5", padding: "15px 20px" }}
                    >
                        <label style={{ fontWeight: "bold", marginBottom: "10px" }}>Expert Final Diagnosis</label>
                        {props.mode === "view" && props.info.status === "annotated" && // 1 time finalized
                            <label>-</label>}
                        {props.mode === "edit" && props.info.status === "annotated" && <Form
                            form={form}
                            layout="vertical"
                        >
                            <Space direction="vertical" size={3}>
                                <Form.Item
                                    name="label"
                                    key="label"
                                    label="Label"
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Radio.Group style={{ padding: "0 10px" }}>
                                            <Radio key="DD" value="DD">DD</Radio>
                                            <Radio key="non-DD" value="non-DD">non-DD</Radio>
                                        </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="final_diag"
                                    key="final_diag"
                                    label={question[0]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Checkbox.Group options={final_diag_option} style={{ padding: "0 10px" }} />
                                </Form.Item>
                                <Form.Item
                                    name="ctt_result"
                                    key="ctt_result"
                                    label={question[1]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Radio.Group style={{ padding: "0 10px" }}>
                                            <Radio key="delayed" value="delayed">delayed</Radio>
                                            <Radio key="normal" value="normal">normal</Radio>
                                            <Radio key="not done" value="not done">not done</Radio>
                                        </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="anorectal_structural_abnormality"
                                    key="anorectal_structural_abnormality"
                                    label={question[2]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Radio.Group style={{ padding: "0 10px" }}>
                                            <Radio key="no" value="no">no</Radio>
                                            <Radio key="rectocele" value="rectocele">rectocele</Radio>
                                            <Radio key="intussusception" value="intussusception">intussusception</Radio>
                                            <Radio key="not assess" value="not assess">not assess</Radio>
                                        </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="IBS"
                                    key="IBS"
                                    label={question[3]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                        <Radio.Group style={{ padding: "0 10px" }}>
                                            <Radio key="yes" value={true}>yes</Radio>
                                            <Radio key="no" value={false}>no</Radio>
                                        </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="cormorbidity"
                                    key="cormorbidity"
                                    label={question[4]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                        <TextArea
                                            className="input-text"
                                            style={{ marginLeft: "10px", width: "95%", height: "45px" }}
                                            autoSize={{ maxRows: 2 }}
                                            maxLength={100}
                                        />
                                </Form.Item>
                                <div>
                                    <Form.Item // if yes change margin bottom
                                        name="surgical_history"
                                        key="surgical_history"
                                        label={question[5]}
                                        style={{ marginBottom:  surgicalHistory ? "14px" : "24px" }}
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}>
                                            <Radio.Group
                                                style={{ padding: "0 10px" }}
                                                onChange={(e) => setSurgicalHistory(e.target.value)}
                                            >
                                                <Radio key="yes" value={true}>yes</Radio>
                                                <Radio key="no" value={false}>no</Radio>
                                            </Radio.Group>
                                    </Form.Item>
                                    {surgicalHistory && <Form.Item
                                        name="surgical_history_note"
                                        key="surgical_history_note"
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                            <TextArea
                                                className="input-text"
                                                style={{ marginLeft: "10px", width: "95%" }}
                                                autoSize={{ minRows: 1, maxRows: 1 }}
                                                maxLength={50}
                                            />
                                    </Form.Item>}
                                </div>
                                <Form.Item
                                    name="comments"
                                    key="comments"
                                    label={question[6]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                        <TextArea
                                            className="input-text"
                                            style={{ marginLeft: "10px", width: "95%" }}
                                            autoSize={{ minRows: 1, maxRows: 2 }}
                                            maxLength={100}
                                        />
                                </Form.Item>
                            </Space>
                        </Form>}
                        {props.info.status === "reviewed" &&
                            <Space direction="vertical" size={10} style={{ marginBottom: "2px" }}>
                                <label style={{ color: "#9772fb", fontWeight: "bold", marginBottom: "10px" }}>{props.info.label}</label>
                                    {printAnswer(question[0], props.info.final_diag)}
                                    {printAnswer(question[1], props.info.ctt_result)}
                                    {printAnswer(question[2], props.info.anorectal_structural_abnormality)}
                                    {printAnswer(question[3], props.info.IBS ? "yes" : "no")}
                                    {printAnswer(question[4], props.info.cormorbidity === "" ? "-" : props.info.cormorbidity) /* edit */}
                                    {printAnswer(question[5], props.info.surgical_history ? `yes (${props.info.surgical_history_note})` : "no")}
                                    {printAnswer(question[6], props.info.comments === "" ? "-" : props.info.comments) /* edit */}
                            </Space>}
                    </Space>
                </Col>
                <Col span={1} />
                <Col span={11}>
                    <Space
                        direction="vertical"
                        size={10}
                        style={{ width: "100%", background: "#f5f5f5", padding: "15px 20px", marginBottom: "40px" /* edit margin soon */ }}
                    >
                        <label style={{ /*color: "#9772fb",*/ fontWeight: "bold", marginBottom: "10px" }}>AI Diagnosis</label>
                        {printResult("DD Probability:", props.info.DD_probability.toFixed(2))}
                        {printResult("Threshold:", threshold.toFixed(2))}
                        <label style={{ color: "#9772fb", fontWeight: "bold", marginTop: "10px" }}>
                            {props.info.DD_probability > threshold ? "Likely DD" : "Unlikely DD"}
                        </label>
                    </Space>
                    {/* {gradCam} */}
                </Col>
            </Row>
            <Row justify="end">
                <Button
                    className={
                        props.mode === "view" || props.info.status === "reviewed" ?
                        "primary-btn smaller" : "primary-btn smaller cancel"}
                    onClick={onBack}
                >
                    Back
                </Button>
                {(props.mode === "edit" && props.info.status !== "reviewed") && <Button
                    className="primary-btn smaller"
                    style={{ marginLeft: "15px" }}
                    onClick={async () => {
                        try {
                            const data = await form.validateFields();
                            if (data.cormorbidity === undefined) {
                                data.cormorbidity = ""; // required ?
                            }
                            if (!data.surgical_history) {
                                data.surgical_history_note = "empty";
                            }
                            if (data.comments === undefined) {
                                data.comments = ""; // required ?
                            }
                            // console.log(data);
                            updateReport(
                                props.info._id, data.label, data.final_diag, data.ctt_result, data.anorectal_structural_abnormality,
                                data.IBS, data.cormorbidity, data.surgical_history, data.surgical_history_note, data.comments
                            ).then((res) => {
                                console.log(res);
                                window.location.reload();
                            }).catch((err) => {
                                console.log(err.response);
                                Modal.error({ content: err.response.data.message });
                            });
                        } catch (errInfo) {
                            console.log('Validate Failed:', errInfo);
                        }
                    }}
                >
                    Save
                </Button>}
            </Row>
        </div>
    );
}
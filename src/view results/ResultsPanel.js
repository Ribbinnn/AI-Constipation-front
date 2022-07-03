import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Modal, Row, Col, Space, Form, Radio, Checkbox, Image } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { updateReport, getImage } from "../api/reports";
import Contexts from "../utils/Contexts";

const { TextArea } = Input;

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
        "4. IBS", "5. Neurological co-morbidity", "6. Abdominal/anorectal surgery", "7. Comments"
    ];

    const [anorectal, setAnorectal] = useState(null);
    const [comorbidity, setComorbidity] = useState(null);
    const [surgery, setSurgery] = useState(false);

    const [gradCam, setGradCam] = useState();

    const onBack = () => {
        const checker = form.getFieldsValue(true);
        if (Object.keys(checker).length !== 0) {
            return Modal.confirm({
                icon: <ExclamationCircleOutlined />,
                content: "Changes will not be saved.",
                onOk: () => {
                    // window.history.back()
                    props.history.push(`/viewresults/?${props.queryString}`);
                },
                zIndex: 3000,
            });
        } else {
            // window.history.back();
            props.history.push(`/viewresults/?${props.queryString}`);
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

    useEffect(() => {
        if (props.info.task === "image" || props.info.task === "integrate") {
            getImage(props.rid, "gradcam")
            .then((res) => {
                // console.log(res);
                let url = URL.createObjectURL(res);
                setGradCam(url);
            }).catch((err) => {
                console.log(err.response);
                return Modal.error({ content: err.response.data.message, onOk: () => props.history.push("/viewresults")});
            });
        }
    }, [props.loaded]);

    const printResult = (field, value) => {
        return(
            <Row style={{ alignItems: "baseline" }}>
                <Col span={17}>
                    <label /*style={{ color: "#9772fb", fontWeight: 500 }}*/>{field}</label>
                </Col>
                <Col span={7}>
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
            <Row style={{ marginBottom: "35px" }}>
                <Col span={6}>
                    <Space
                        direction="vertical"
                        size={10}
                        style={{ width: "100%", background: "#f5f5f5", padding: "15px 20px", marginBottom: "35px" }}
                    >
                        <label style={{ /*color: "#9772fb",*/ fontWeight: "bold", marginBottom: "10px" }}>AI Diagnosis</label>
                        {printResult("DD Probability:", props.info.DD_probability.toFixed(2))}
                        {printResult("Threshold:", threshold.toFixed(2))}
                        <label style={{ color: "#9772fb", fontWeight: "bold", marginTop: "10px" }}>
                            {props.info.DD_probability > threshold ? "Likely DD" : "Unlikely DD"}
                        </label>
                    </Space>
                    {(props.info.task === "image" || props.info.task === "integrate") &&
                        <div style={{ textAlign: "center" }}>
                            <Image
                                // preview={false}
                                height={320}
                                src={gradCam}
                            />
                        </div>}
                </Col>
                <Col span={1} />
                <Col span={17}>
                    <Space
                        direction="vertical"
                        size={10}
                        style={{ width: "100%", background: "#f5f5f5", padding: "15px 20px" }}
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
                                            message: "please answer this question",
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
                                            message: "please answer this question",
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
                                            message: "please answer this question",
                                        },
                                    ]}>
                                        <Radio.Group style={{ padding: "0 10px" }}>
                                            <Radio key="delayed" value="delayed">delayed</Radio>
                                            <Radio key="normal" value="normal">normal</Radio>
                                            <Radio key="not done" value="not done">not done</Radio>
                                        </Radio.Group>
                                </Form.Item>
                                <div>
                                    <Form.Item
                                        name="anorectal_structural_abnormality"
                                        key="anorectal_structural_abnormality"
                                        label={question[2]}
                                        style={{ marginBottom: anorectal === "other" ? "14px" : "24px" }}
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                                message: "please answer this question",
                                            },
                                        ]}>
                                            <Radio.Group
                                                style={{ padding: "0 10px" }}
                                                onChange={(e) => setAnorectal(e.target.value)}
                                            >
                                                <Radio key="no" value="no">no</Radio>
                                                <Radio key="rectocele" value="rectocele">rectocele</Radio>
                                                <Radio key="intussusception" value="intussusception">intussusception</Radio>
                                                <Radio key="not assess" value="not assess">not assess</Radio>
                                                <Radio key="other" value="other">other</Radio>
                                            </Radio.Group>
                                    </Form.Item>
                                    {anorectal === "other" && <Form.Item
                                        name="anorectal_structural_abnormality_note"
                                        key="anorectal_structural_abnormality_note"
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                                message: "please answer this question",
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
                                    name="IBS"
                                    key="IBS"
                                    label={question[3]}
                                    // initialValue={props.details ? props.details.name : null}
                                    rules={[
                                        {
                                            required: true,
                                            message: "please answer this question",
                                        },
                                    ]}>
                                        <Radio.Group style={{ padding: "0 10px" }}>
                                            <Radio key="yes" value={true}>yes</Radio>
                                            <Radio key="no" value={false}>no</Radio>
                                        </Radio.Group>
                                </Form.Item>
                                <div>
                                    <Form.Item
                                        name="comorbidity"
                                        key="comorbidity"
                                        label={question[4]}
                                        style={{ marginBottom: comorbidity === "other" ? "14px" : "24px" }}
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                                message: "please answer this question",
                                            },
                                        ]}
                                    >
                                            {/* <TextArea
                                                className="input-text"
                                                style={{ marginLeft: "10px", width: "95%", height: "45px" }}
                                                autoSize={{ maxRows: 2 }}
                                                maxLength={100}
                                            /> */}
                                            <Radio.Group
                                                style={{ padding: "0 10px" }}
                                                onChange={(e) => setComorbidity(e.target.value)}
                                            >
                                                <Radio key="stroke" value="stroke">stroke</Radio>
                                                <Radio key="parkinson" value="parkinson">parkinson</Radio>
                                                <Radio key="CIPO" value="CIPO">CIPO</Radio>
                                                <Radio key="other" value="other">other</Radio>
                                            </Radio.Group>
                                    </Form.Item>
                                    {comorbidity === "other" && <Form.Item
                                        name="comorbidity_note"
                                        key="comorbidity_note"
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                                message: "please answer this question",
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
                                <div>
                                    <Form.Item
                                        name="surgery"
                                        key="surgery"
                                        label={question[5]}
                                        style={{ marginBottom: surgery ? "14px" : "24px" }}
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                                message: "please answer this question",
                                            },
                                        ]}>
                                            <Radio.Group
                                                style={{ padding: "0 10px" }}
                                                onChange={(e) => setSurgery(e.target.value)}
                                            >
                                                <Radio key="yes" value={true}>yes</Radio>
                                                <Radio key="no" value={false}>no</Radio>
                                            </Radio.Group>
                                    </Form.Item>
                                    {surgery && <Form.Item
                                        name="surgery_note"
                                        key="surgery_note"
                                        // initialValue={props.details ? props.details.name : null}
                                        rules={[
                                            {
                                                required: true,
                                                message: "please answer this question",
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
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: "please answer this question",
                                    //     },
                                    // ]}
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
                            <Space direction="vertical" size={10} style={{ marginBottom: "3px" }}>
                                <label style={{ color: "#9772fb", fontWeight: "bold", marginBottom: "10px" }}>{props.info.label}</label>
                                    {printAnswer(question[0], props.info.final_diag)}
                                    {printAnswer(question[1], props.info.ctt_result)}
                                    {printAnswer(question[2], props.info.anorectal_structural_abnormality === "other" ?
                                        `${props.info.anorectal_structural_abnormality} (${props.info.anorectal_structural_abnormality_note})` :
                                        props.info.anorectal_structural_abnormality)}
                                    {printAnswer(question[3], props.info.IBS ? "yes" : "no")}
                                    {printAnswer(question[4], props.info.comorbidity === "other" ?
                                        `${props.info.comorbidity} (${props.info.comorbidity_note})` : props.info.comorbidity)}
                                    {printAnswer(question[5], props.info.surgery ? `yes (${props.info.surgery_note})` : "no")}
                                    {printAnswer(question[6], props.info.comments ? props.info.comments : "-")}
                            </Space>}
                    </Space>
                </Col>
            </Row>
            <Row justify={props.mode === "edit" && props.info.status !== "reviewed" ? "space-between" : "end"}>
                <Button
                    className={
                        props.mode === "view" || props.info.status === "reviewed" ?
                        "primary-btn smaller" : "primary-btn smaller cancel"}
                    onClick={onBack}
                >
                    Back
                </Button>
                {props.mode === "edit" && props.info.status !== "reviewed" && <Button
                    className="primary-btn smaller"
                    onClick={async () => {
                        try {
                            const data = await form.validateFields();
                            if (data.anorectal_structural_abnormality !== "other") {
                                data.anorectal_structural_abnormality_note = undefined;
                            }
                            if (data.comorbidity !== "other") {
                                data.comorbidity_note = "empty";
                            }
                            if (!data.surgery) {
                                data.surgery_note = "empty";
                            }
                            if (data.comments === "") {
                                data.comments = undefined;
                            }
                            // console.log(data);
                            updateReport(
                                props.info._id, data.label, data.final_diag, data.ctt_result, data.anorectal_structural_abnormality,
                                data.anorectal_structural_abnormality_note, data.IBS, data.comorbidity, data.comorbidity_note,
                                data.surgery, data.surgery_note, data.comments
                            ).then((res) => {
                                console.log(res);
                                window.location.reload();
                            }).catch((err) => {
                                console.log(err.response);
                                Modal.error({ content: err.response.data.message });
                            });
                        } catch (errInfo) {
                            console.log('Validate Failed:', errInfo);
                            Modal.error({content: "Some field(s) are missing."});
                        }
                    }}
                >
                    Save
                </Button>}
            </Row>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { Modal, Row, Button, Slider, InputNumber, Form, Radio, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

var _ = require('lodash');

function FillQuestionnaireModal(props) {
    const [form] = Form.useForm();
    const questions = [
        "1. ท่านมี “อาการอึดอัดแน่นท้อง” หรือไม่", "1.1 ระดับความรุนแรงของอาการมากน้อยเพียงไร", "1.2 ท่านสังเกตว่าท่านมีอาการอึดอัดแน่นท้องติดต่อกันมาเป็นเวลา",
        "2. ท่านถ่ายอุจจาระ", "3. ท่านรู้สึกถ่ายไม่สุดมากกว่า 25% ของจำนวนครั้งของการถ่ายอุจจาระหรือไม่", "4. ท่านมีอาการต้องเบ่งถ่ายมากกว่าปกติ มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่",
        "5. ท่านมีอาการอุจจาระแข็งมากกว่าปกติ มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่", "6. ท่านรู้สึกว่ามีอะไรอุดตันหรืออุดกั้นที่ทวารหนักเวลาถ่าย มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่",
        "7. ท่านต้องใช้นิ้วมือช่วยในการถ่ายอุจจาระ มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่", "8. ท่านมีอาการ “อืดแน่นท้องหรือมีลมมากในท้อง” หรือไม่",
        "8.1 ระดับความรุนแรงของอาการมากน้อยเพียงไร", "8.2 ระยะเวลาที่เป็น", "9. ความรุนแรงของอาการทางเดินอาหารทั้งหมดโดยรวมอยู่ในระดับใด (0-10)"
    ]
    const two_choice = ["ไม่มี", "มี"];
    const three_choice = ["เล็กน้อย", "ปานกลาง", "รุนแรง"];
    const seven_choice = [
        "ไม่มี", "มีอาการน้อยกว่า 1 วัน/เดือน", "มีอาการ 1 วัน/เดือน", "มีอาการ 2-3 วัน/เดือน",
        "มีอาการ 1 วัน/สัปดาห์", "มีอาการมากกว่า 1 วัน/สัปดาห์", "มีอาการทุกวัน"
    ];

    const renderTwoChoice = () => (
        <Radio.Group style={{ padding: "0 10px" }}>
            {two_choice.map((choice, i) => <Radio key={i} value={i}>{choice}</Radio>)}
        </Radio.Group>
    );

    const renderThreeChoice = () => (
        <Radio.Group style={{ padding: "0 10px" }}>
            {three_choice.map((choice, i) => <Radio key={i+1} value={i+1}>{choice}</Radio>)}
        </Radio.Group>
    );

    const renderSevenChoice = (variable) => {
        const onChange = (e) => {
            if (variable === "DistFreq") {
                if (e.target.value === 0) {
                    form.setFieldsValue({DistSev: null, DistDur: null});
                }
                setDistFreq(e.target.value);
            } else {
                if (e.target.value === 0) {
                    form.setFieldsValue({BloatSev: null, BloatDur: null});
                }
                setBloatFreq(e.target.value);
            }
        }

        return(
            <Radio.Group onChange={onChange} style={{ padding: "0 10px" }}>
                <Radio key={0} value={0}>{seven_choice[0]}</Radio><br />
                {seven_choice.slice(1,4).map((choice, i) => <Radio key={i+1} value={i+1}>{choice}</Radio>)}<br/>
                {seven_choice.slice(-3).map((choice, i) => <Radio key={i+4} value={i+4}>{choice}</Radio>)}
            </Radio.Group>
        );
    };

    const renderMonthInput = () => (
        <InputNumber // month
            min={0}
            max={240} // 20 years
            step={0.1}
            style={{ margin: "0 10px" }}
        />
    );

    const [DistFreq, setDistFreq] = useState(0);
    const [BloatFreq, setBloatFreq] = useState(0);

    useEffect(() => {
        if (props.question) {
            setDistFreq(props.question.DistFreq);
            setBloatFreq(props.question.BloatFreq);
        }
    }, [props.visible]);

    const onOK = () => {
        props.setVisible(false);
        setDistFreq(0);
        setBloatFreq(0);
        form.resetFields();
    }

    const onCancel = () => {
        const checker = form.getFieldsValue(true);
        // console.log(props.question, checker);
        if (checker.DistFreq !== null && checker.BloatFreq !== null) {
            if (checker.DistFreq === 0) {
                checker.DistSev = 0;
                checker.DistDur = 0.0;
            }
            if (checker.BloatFreq === 0) {
                checker.BloatSev = 0;
                checker.BloatDur = 0.0;
            }
            checker.DistSevFreq = checker.DistFreq * checker.DistSev;
            checker.BloatSevFreq = checker.BloatFreq * checker.BloatSev;
        }
        if ((!props.question && Object.values(checker).every(val => val === null)) || (props.question && _.isEqual(props.question, checker))) {
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
                    <label className="modal-title">
                        Fill in Symptom Questionnaire
                    </label>
                }
                footer={null}
                width="1000px"
                className="fill-question-modal"
                style={{ top: 15 }}
            >
                <div style={{ height: "100%" }}>
                    <Form
                        form={form}
                        layout="vertical"
                        className="questionnaire-form"
                        style={{ height: "91%", overflow: "scroll"/*, padding: "5px 10px 5px 18px"*/ }}
                    >
                        {/* <Space direction="vertical" size={3} className="questionnaire-space" style={{ width: "100%" }}> */}
                            <Form.Item
                                name="DistFreq"
                                key="DistFreq"
                                label={questions[0]}
                                initialValue={props.question ? props.question.DistFreq : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderSevenChoice("DistFreq")}
                            </Form.Item>
                            {DistFreq !== 0 && <Form.Item
                                name="DistSev"
                                key="DistSev"
                                label={questions[1]}
                                initialValue={props.question ? props.question.DistSev : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                                style={{ background: "#f0f0f0", paddingLeft: "50px" }}
                            >
                                    {renderThreeChoice()}
                            </Form.Item>}
                            {DistFreq !== 0 && <Form.Item label={questions[2]} className="form-item-force-inline">
                                <Form.Item
                                    name="DistDur"
                                    key="DistDur"
                                    initialValue={props.question ? props.question.DistDur : null}
                                    rules={[
                                        {
                                            required: true,
                                            message: "please answer this question",
                                        },
                                    ]}
                                    noStyle
                                    style={{ paddingLeft: "50px", paddingRight: 0 }}
                                >
                                        {renderMonthInput()}
                                </Form.Item>
                                <label>เดือน</label>
                            </Form.Item>}
                            <Form.Item label={questions[3]} className="form-item-force-inline">
                                <Form.Item
                                    name="FreqStool"
                                    key="FreqStool"
                                    initialValue={props.question ? props.question.FreqStool : null}
                                    rules={[
                                        {
                                            required: true,
                                            message: "please answer this question",
                                        },
                                    ]}
                                    noStyle
                                    style={{ background: "white", paddingRight: 0 }}
                                >
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            step={1}
                                            style={{ margin: "0 10px" }}
                                        />
                                </Form.Item>
                                <label>ครั้ง/สัปดาห์</label>
                            </Form.Item>
                            <Form.Item
                                name="Incomplete"
                                key="Incomplete"
                                label={questions[4]}
                                initialValue={props.question ? props.question.Incomplete : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderTwoChoice()}
                            </Form.Item>
                            <Form.Item
                                name="Strain"
                                key="Strain"
                                label={questions[5]}
                                initialValue={props.question ? props.question.Strain : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderTwoChoice()}
                            </Form.Item>
                            <Form.Item
                                name="Hard"
                                key="Hard"
                                label={questions[6]}
                                initialValue={props.question ? props.question.Hard : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderTwoChoice()}
                            </Form.Item>
                            <Form.Item
                                name="Block"
                                key="Block"
                                label={questions[7]}
                                initialValue={props.question ? props.question.Block : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderTwoChoice()}
                            </Form.Item>
                            <Form.Item
                                name="Digit"
                                key="Digit"
                                label={questions[8]}
                                initialValue={props.question ? props.question.Digit : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderTwoChoice()}
                            </Form.Item>
                            <Form.Item
                                name="BloatFreq"
                                key="BloatFreq"
                                label={questions[9]}
                                initialValue={props.question ? props.question.BloatFreq : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    {renderSevenChoice("BloatFreq")}
                            </Form.Item>
                            {BloatFreq !== 0 && <Form.Item
                                name="BloatSev"
                                key="BloatSev"
                                label={questions[10]}
                                initialValue={props.question ? props.question.BloatSev : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                                style={{ paddingLeft: "50px", background: "white" }}
                            >
                                    {renderThreeChoice()}
                            </Form.Item>}
                            {BloatFreq !== 0 && <Form.Item label={questions[11]} className="form-item-force-inline">
                                <Form.Item
                                    name="BloatDur"
                                    key="BloatDur"
                                    initialValue={props.question ? props.question.BloatDur : null}
                                    rules={[
                                        {
                                            required: true,
                                            message: "please answer this question",
                                        },
                                    ]}
                                    noStyle
                                    style={{ paddingLeft: "50px", background: "white", paddingRight: 0 }}
                                >
                                        {renderMonthInput()}
                                </Form.Item>
                                <label>เดือน</label>
                            </Form.Item>}
                            <Form.Item
                                name="SevScale"
                                key="SevScale"
                                label={questions[12]}
                                initialValue={props.question ? props.question.SevScale : null}
                                rules={[
                                    {
                                        required: true,
                                        message: "please answer this question",
                                    },
                                ]}
                            >
                                    <Slider
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        // tooltipVisible={false}
                                        marks={{
                                            0: {
                                                style: { fontSize: "medium", color: "black" },
                                                label: "0",
                                            },
                                            10: {
                                                style: { fontSize: "medium", color: "black" },
                                                label: "10",
                                            },
                                        }}
                                        style={{ marginLeft: "17px", marginRight: "37px", marginTop: "12px" }}
                                    />
                            </Form.Item>
                        {/* </Space> */}
                    </Form>
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
                                try {
                                    const data = await form.validateFields();
                                    // console.log(data);
                                    if (data.DistFreq !== 0 && (data.DistSev === 0 || data.DistDur === 0)) {
                                        Modal.warning({content: "Question 1.1 and/or 1.2 cannot be 0.", zIndex: 3000});
                                    } else if (data.BloatFreq !== 0 && (data.BloatSev === 0 || data.BloatDur === 0)) {
                                        Modal.warning({content: "Question 8.1 and/or 8.2 cannot be 0", zIndex: 3000});
                                    } else {
                                        if (data.DistFreq === 0) {
                                            data.DistSev = 0;
                                            data.DistDur = 0.0;
                                        }
                                        if (data.BloatFreq === 0) {
                                            data.BloatSev = 0;
                                            data.BloatDur = 0.0;
                                        }
                                        data.DistSevFreq = data.DistFreq * data.DistSev;
                                        data.BloatSevFreq = data.BloatFreq * data.BloatSev;
                                        props.setQuestion(data);
                                        onOK();
                                        if (!props.questionReview) {
                                            props.setQuestionReview(true);
                                        }
                                    }
                                } catch (errInfo) {
                                    console.log('Validate Failed:', errInfo);
                                    Modal.error({content: "Some field(s) are missing.", zIndex: 3000});
                                }
                            }}
                        >
                            {props.questionReview ? "OK" : "Confirm"}
                        </Button>
                    </Row>
                </div>
            </Modal>
        </div>
    );
}

export default FillQuestionnaireModal;
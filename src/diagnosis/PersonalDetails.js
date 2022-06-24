import React, { useContext, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Select, Row, Col, Radio, InputNumber, Rate } from "antd";
// import Contexts from '../utils/Contexts';

const { Option } = Select;

const PersonalDetails = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const hospitals = [
        "Chulalongkorn University", "Prince of Songkla University", "Thammasat University"
    ];
    const ratingDesc = [
        "ไม่มั่นใจ", "มั่นใจเล็กน้อย", "มั่นใจปานกลาง", "ค่อนข้างมั่นใจ", "มั่นใจมาก"
    ];
    const ratingScore = [0, 25, 50, 75, 100];

    useImperativeHandle(ref, () => ({
        setPersonalDetails: async () => {
            try {
                const data = await form.validateFields();
                data.DD_confidence = ratingScore[data.DD_confidence - 1];
                // console.log(data);
                props.setDetails(data);
                await props.setCurrent(1);
            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        },
    }));

    return(
        <div>
            <Form form={form} layout="vertical" requiredMark={false}>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>Hospital:</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="hospital"
                            key="hospital"
                            initialValue={props.details ? props.details.hospital : null}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Select>
                                    {hospitals.map((hospital, i) => (
                                        <Option key={i} value={hospital}>
                                            {hospital}
                                        </Option>
                                    ))}
                                </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>HN:</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="hn"
                            key="hn"
                            initialValue={props.details ? props.details.hn : null}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Input className="input-text fixed-size" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>Name:</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="name"
                            key="name"
                            initialValue={props.details ? props.details.name : null}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Input className="input-text fixed-size" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>Gender:</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="gender"
                            key="gender"
                            initialValue={props.details ? props.details.gender : null}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Radio.Group>
                                    <Radio key="female" value="F">Female</Radio>
                                    <Radio key="male" value="M">Male</Radio>
                                </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>Age:</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="age"
                            key="age"
                            initialValue={props.details ? props.details.age : null}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <InputNumber
                                    className="bigger"
                                    min={0}
                                    max={130}
                                    step={1}
                                />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>ความมั่นใจในการวินิจฉัย <br /> Dyssynergic defecation (DD):</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="DD_confidence"
                            key="DD_confidence"
                            initialValue={props.details ? ratingScore.indexOf(props.details.DD_confidence) + 1 : null}
                            rules={[
                                {
                                    required: true,
                                }
                            ]}>
                                <Rate
                                    className="rating"
                                    tooltips={ratingDesc}
                                />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
});

export default PersonalDetails;
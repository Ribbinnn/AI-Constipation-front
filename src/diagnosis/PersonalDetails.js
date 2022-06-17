import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Select, Row, Col, Radio } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import { getPatientData } from "../api/pacs"
// import ImageModal from "../component/ImageModal";
// import * as moment from "moment";
// import Contexts from '../utils/Contexts';

const { Option } = Select;

function PersonalDetails(props) {
    const [form] = Form.useForm();
    const hospitalMockUp = ["Hospital1", "Hospital2", "Hospital3"];
    const [gender, setGender] = useState(null);

    return(
        <div>
            <Form layout="vertical" requiredMark={false}>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>Hospital:</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="hospital"
                            key="hospital"
                            // initialValue={}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Select
                                    // onChange={(value) => {
                                    //     value === "all" ? queryString.delete("findings") : queryString.set("findings", value);
                                    // }}
                                >
                                        {hospitalMockUp.map((hospital, i) => (
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
                            // initialValue={}
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
                            // initialValue={}
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
                            // initialValue={}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Radio.Group
                                    // onChange={onChange}
                                    value={gender}
                                >
                                    <Radio value="female" style={{ color: "#58595b" }}>Female</Radio>
                                    <Radio value="male" style={{ color: "#58595b" }}>Male</Radio>
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
                            // initialValue={}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                                <Input
                                    type="number"
                                    className="input-text fixed-size" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ alignItems: "baseline" }}>
                    <Col span={7}>
                        <label>ความมั่นใจในการวินิจฉัย <br /> Dyssynergic defecation (DD):</label>
                    </Col>
                    <Col span={17}>
                        <Form.Item
                            name="confident"
                            key="confident"
                            // initialValue={}
                            rules={[
                                {
                                    required: true, // + check range 0-100
                                }
                            ]}>
                                <Input
                                    type="number"
                                    className="input-text fixed-size" />
                                <label style={{ marginLeft: "10px", color: "#58595b" }}>%</label>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default PersonalDetails;
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Spin, Image } from 'antd';
// import { Table, Tooltip, Spin, Form, DatePicker, Button, Input } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import { getPatientData } from "../api/pacs"
// import ImageModal from "../component/ImageModal";
// import * as moment from "moment";
// import Contexts from '../utils/Contexts';

function AboutUs(props) {

    return (
        <div className="content">
            <Row>
                <Col span={16}>
                    <div style={{ fontSize: "30px", marginBottom: "17px" }}>
                        {`About Us`}
                    </div>
                </Col>
                <Col span={8}>
                    <Row justify="end" style={{ marginBottom: "5px" }}>
                        <Image
                            preview={false}
                            height={54}
                            src="/logos/MedCU_Logo.png"
                        />
                        <Image
                            preview={false}
                            height={61}
                            src="/logos/CUNM_Logo.png"
                        />
                    </Row><Row justify="end" style={{ marginRight: "10px" }}>
                        <Image
                            preview={false}
                            height={37}
                            src="/logos/EngCU_Logo.jpg"
                        />
                    </Row>
                </Col>
                <hr style={{ width: "100%" }} />
            </Row>

            <Row>
                <Image
                    preview={false}
                    height={65}
                    src="/logos/MedCU_Logo.png"
                />
                <Image
                    preview={false}
                    height={85}
                    src="/logos/CUNM_Logo.png"
                />
            </Row>
            <Row style={{ color: "#9772fb", fontSize: "16px" }}>
                <Col span={12}>
                    ศูนย์เชี่ยวชาญเฉพาะทางด้านระบบประสาทและการเคลื่อนไหวของระบบทางเดินอาหาร <br />ภาควิชาอายุรศาสตร์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                </Col>
            </Row>
            <Row style={{ fontSize: "14px", marginBottom: "15px" }}>
                <Col span={8}>
                    10th floor, Bhumisirimangalanusorn Building, <br />King Chulalongkorn Memorial Hospital, Pathumwan, Pathumwan, Bangkok, 10330, Thailand
                </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: "35px" }}>
                <Col>
                    <Row justify="center">
                        <Image
                            preview={false}
                            height={240}
                            src="/people/อ-สุเทพ-2-2-64.jpg"
                        />
                    </Row>
                    <Row justify="center" style={{ fontSize: "16px" }}>
                        <label>ศ.นพ.สุเทพ กลชาญวิทย์</label>
                    </Row>
                </Col>
                <Col>
                    <Row justify="center">
                        <Image
                            preview={false}
                            height={240}
                            src="/people/พ.ฐนิสา.jpg"
                        />
                    </Row>
                    <Row justify="center">
                        <label>ผศ.(พิเศษ)พญ.ฐนิสา พัชรตระกูล</label>
                    </Row>
                </Col>
                <Col>
                    <Row justify="center">
                        <Image
                            preview={false}
                            height={240}
                            src="/people/พ.ภัคพล.jpg"
                        />
                    </Row>
                    <Row justify="center" style={{ fontSize: "16px" }}>
                        <label>อ.นพ.ภัคพล รัตนชัยสิทธิ์</label>
                    </Row>
                </Col>
                <Col span={6} />
            </Row>
            <Row>
                <Image
                    preview={false}
                    height={45}
                    src="/logos/EngCU_Logo.jpg"
                />
            </Row>
            <Row style={{ color: "#9772fb", fontSize: "16px" }}>
                <Col span={12}>
                    ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                </Col>
            </Row>
            <Row style={{ fontSize: "14px", marginBottom: "10px" }}>
                <Col span={8}>
                    17th floor, Engineering 4 Building (Charoenvidsavakham), Phayathai Road, Wang Mai, Pathumwan, Bangkok, 10330, Thailand
                </Col>
            </Row>
        </div>
    );
}

export default AboutUs;
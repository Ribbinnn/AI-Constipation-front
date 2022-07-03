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
                <Col span={13} style={{ paddingRight: "25px" }}>
                    <Row align="middle" style={{ marginBottom: "8px", minHeight: "90px" }}>
                        <Image
                            preview={false}
                            height={70}
                            src="/logos/MedCU_Logo.png"
                        />
                        <Image
                            preview={false}
                            height={90}
                            src="/logos/CUNM_Logo.png"
                        />
                    </Row>
                    <Row style={{ color: "#9772fb", marginBottom: "5px", fontSize: "16px", minHeight: "51px" }}>
                        <Col span={24}>
                            ศูนย์เชี่ยวชาญเฉพาะทางด้านระบบประสาทและการเคลื่อนไหวของระบบทางเดินอาหาร <br />ภาควิชาอายุรศาสตร์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                        </Col>
                    </Row>
                    <Row style={{ fontSize: "14px", marginBottom: "18px", minHeight: "67px" }}>
                        <Col span={16}>
                            10th floor, Bhumisirimangalanusorn Building, <br />King Chulalongkorn Memorial Hospital, Rama 4 Road, Pathumwan, Pathumwan, Bangkok, 10330, Thailand
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ marginBottom: "35px" }}>
                        <Col span={7}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/อ-สุเทพ-2-2-64.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                ศ.นพ.สุเทพ กลชาญวิทย์
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/พ.ฐนิสา.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                ผศ.(พิเศษ)พญ.ฐนิสา พัชรตระกูล
                            </Row>
                        </Col>
                        <Col span={7}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/พ.ภัคพล.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                อ.นพ.ภัคพล รัตนชัยสิทธิ์
                            </Row>
                        </Col>
                        <Col span={2} />
                    </Row>
                </Col>
                <Col span={11} style={{ paddingLeft: "25px" }}>
                    <Row align="middle" style={{ marginBottom: "8px", minHeight: "90px" }}>
                        <Image
                            preview={false}
                            height={55}
                            src="/logos/EngCU_Logo.jpg"
                        />
                    </Row>
                    <Row style={{ color: "#9772fb", marginBottom: "5px", fontSize: "16px", minHeight: "51px" }}>
                        <Col span={24}>
                            ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                        </Col>
                    </Row>
                    <Row style={{ fontSize: "14px", marginBottom: "18px", minHeight: "67px" }}>
                        <Col span={20}>
                            17th floor, Engineering 4 Building (Charoenvidsavakham), Phayathai Road, Wang Mai, Pathumwan, Bangkok, 10330, Thailand
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ marginBottom: "35px" }}>
                        <Col span={8}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/รศ.ดร.พีรพล.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                รศ. ดร.พีรพล เวทีกูล
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/sornsiri.jpeg"
                                />
                            </Row>
                            <Row justify="center">
                                สรณ์สิริ พู่วงศาโรจน์
                            </Row>
                        </Col>
                        <Col span={8} />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AboutUs;
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Spin, Image, Space, Modal, Card } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import Contexts from './utils/Contexts'
import { getUserById } from "./api/admin";

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

function Home() {
    const [loaded, setLoaded] = useState(false);
    const [questionVisible, setQuestionVisible] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [userData, setUserData] = useState({});

    // const modelInfoMockUp = [{key: 1, version: "x.x", accuracy: "xx%"}, {key: 2, version: "x.x", accuracy: "xx%"}, {key: 3, version: "x.x", accuracy: "xx%"}]

    useEffect(() => {
        getUserById(user.id)
            .then((res) => {
                setUserData(res);
                setLoaded(true);
            }).catch((err) => console.log(err.response));
    }, [])

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
            {loaded &&
                <div>
                    <Row>
                        <Col span={16}>
                            <div style={{ fontSize: "25px", marginBottom: "17px" }}>
                                {`Welcome, ${userData.username}.`}
                            </div>
                            <label style={{ marginBottom: "22px" }}>
                                {`${userData.first_name} ${userData.last_name} (${userData.role.substring(0, 1).toUpperCase()}${userData.role.substring(1,)}), ${userData.hospital}`}
                            </label>
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
                        <Col span={16}>
                            <Space direction="vertical" size={25}>
                                <Row style={{ marginBottom: "10px" }}>
                                    <label>
                                        &emsp;&emsp;ระบบปัญญาประดิษฐ์เพื่อวินิจฉัยภาวะกล้ามเนื้อควบคุมการถ่ายอุจจาระทำงานไม่ประสานกัน โดยใช้ข้อมูลจากภาพเอกซเรย์ช่องท้องและแบบสอบถามอาการระบบทางเดินอาหาร (Artificial intelligence imaging and gastrointestinal symptoms analysis for diagnosis of dyssynergic defecation)
                                    </label>
                                    <label>
                                        &emsp;&emsp;พัฒนาระบบโดยศูนย์เชี่ยวชาญเฉพาะทางด้านระบบประสาทและการเคลื่อนไหวของระบบทางเดินอาหาร <br />ภาควิชาอายุรศาสตร์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย และภาควิชาวิศวกรรมคอมพิวเตอร์ <br />คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                                    </label>
                                </Row>
                                <Row>
                                    <dl style={{ fontSize: "medium" }}>
                                        <dt style={{ color: "#9772fb", fontWeight: "500" }}>วิธีใช้งานระบบ</dt>
                                        <dt style={{ marginBottom: "2px" }}>1. กรอกข้อมูลผู้ป่วย</dt>
                                        <dt>2. เลือกรูปแบบการวิเคราะห์ (Model)</dt>
                                        <dt>&emsp;&emsp;- Model 1 แบบสอบถาม </dt>
                                        <dt>&emsp;&emsp;- Model 2 ภาพเอกซเรย์ช่องท้อง </dt>
                                        <dt style={{ marginBottom: "2px" }}>&emsp;&emsp;- Model 3 แบบสอบถามและภาพเอกซเรย์ช่องท้อง </dt>
                                        <dt style={{ marginBottom: "2px" }}>3. ใส่ข้อมูล<span style={{ color: "#9772fb" }}>แบบสอบถาม</span> และ/หรือ<span style={{ color: "#9772fb" }}>อัปโหลดรูปภาพ</span></dt>
                                        <dt style={{ marginBottom: "2px" }}>4. กดวินิจฉัย (diagnosis)</dt>
                                        <dt style={{ marginBottom: "2px" }}>5. ระบบแสดงร้อยละความเชื่อมั่นในการวินิจฉัยภาวะกล้ามเนื้อควบคุมการถ่ายอุจจาระทำงานไม่ประสานกัน</dt>
                                    </dl>
                                </Row>
                                <Row>
                                    <dl style={{ fontSize: "medium" }}>
                                        <dt style={{ color: "#9772fb", fontWeight: "500" }}>การให้คะแนนความรุนแรงของอาการ (<span style={{ fontWeight: "600", textDecoration: "underline" }}>เฉลี่ยในช่วงระยะเวลา 3 เดือนที่ผ่านมา</span>) โดยใช้เกณฑ์ดังนี้</dt>
                                        <dt style={{ marginBottom: "2px" }}>- <span style={{ fontWeight: "600" }}>มีอาการเล็กน้อย</span> &nbsp;&nbsp;= มีอาการแต่อาการไม่รบกวนการดำเนินชีวิตประจำวัน</dt>
                                        <dt style={{ marginBottom: "2px" }}>- <span style={{ fontWeight: "600" }}>มีอาการปานกลาง</span> = มีอาการรบกวน แต่ไม่ต้องเปลี่ยนแปลงการดำเนินกิจวัตรประจำวันนั้นๆ</dt>
                                        <dt style={{ marginBottom: "2px" }}>- <span style={{ fontWeight: "600" }}>มีอาการรุนแรง</span> &emsp;&nbsp;= มีอาการและอาการมีผลกับกิจวัตรประจำวันมากจนต้องเปลี่ยนแปลงการดำเนินชีวิตประจำวัน</dt>
                                    </dl>
                                </Row>
                                <Row>
                                    <dl style={{ fontSize: "medium" }}>
                                        <dt style={{ color: "#9772fb", fontWeight: "600" }}>Model Accuracy</dt>
                                        <dt style={{ marginBottom: "2px" }}>1. Model 1 Version x.x &emsp;Accuracy: 56.36%</dt>
                                        <dt style={{ marginBottom: "2px" }}>2. Model 2 Version x.x &emsp;Accuracy: 54.90%</dt>
                                        <dt style={{ marginBottom: "2px" }}>3. Model 3 Version x.x &emsp;Accuracy: 67.32%</dt>
                                    </dl>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}

export default Home;
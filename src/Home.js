import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Spin, Image, Space } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import Contexts from './utils/Contexts'

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

function Home() {
    const [loaded, setLoaded] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    // const modelInfoMockUp = [{key: 1, version: "x.x", accuracy: "xx%"}, {key: 2, version: "x.x", accuracy: "xx%"}, {key: 3, version: "x.x", accuracy: "xx%"}]

    useEffect(() => {
        setLoaded(true);
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
                                {`Welcome, ${user.username}.`}
                            </div>
                            <label style={{ marginBottom: "22px" }}>
                                {`${user.role.substring(0, 1).toUpperCase()}${user.role.substring(1,)}, ${user.first_name}`}
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
                                        <dt style={{ color: "#9772fb", fontWeight: "600" }}>Model Accuracy</dt>
                                        <dt style={{ marginBottom: "2px" }}>1. Model 1 Version x.x &emsp;Accuracy: 56.36%</dt>
                                        <dt style={{ marginBottom: "2px" }}>2. Model 2 Version x.x &emsp;Accuracy: 54.90%</dt>
                                        <dt style={{ marginBottom: "2px" }}>3. Model 3 Version x.x &emsp;Accuracy: 67.32%</dt>
                                    </dl>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col span={12}>
                        <div style={{ fontSize: "25px", marginBottom: "17px" }}>
                            {`Welcome, ${user.username}.`}
                        </div>
                        <label style={{ marginBottom: "15px" }}>
                            {"User information ----------------"}
                        </label>
                        </Col>
                        <Col span={12}>
                            <div style={{ float: "right" }}>
                                {"TH | EN"}
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    {modelInfoMockUp.map((i) => 
                        <div style={{ marginBottom: "5px" }}>
                            <i>
                                <label>{`Model ${i.key} Version ${i.version}`}</label>
                                <label style={{ marginLeft: "30px" }}>{`Accuracy ${i.accuracy}`}</label>
                            </i>
                        </div>)}
                    <div style={{ color: "#9772fb", fontSize: "20px", margin: "25px 0 20px 0" }}>
                        HOW TO USE DIAGNOSE DYSSYNERGIC DEFECATION
                    </div> */}
                    {/* <div style={{ display: "grid", gridAutoFlow: "row", gridRowGap: "5px" }}>
                        <div>
                            Step 1: Go to Diagnosis
                        </div>
                        <div>
                            Step 2: Fill in patient’s personal details
                        </div>
                        <div>
                            <label>Step 3: Fill in</label>&nbsp;
                            <label style={{ color: "#9772fb" }}>symptom questionnaire</label>&nbsp;
                            <label>or upload an</label>&nbsp;
                            <label style={{ color: "#9772fb" }}>X-ray image</label>&nbsp;
                            <label>(or both)</label>
                        </div>
                        <div>
                            Step 4: Wait for diagnosis result
                        </div>
                        <div>
                            Step 5: Export the result
                        </div>
                    </div> */}
                </div>
            }
        </div>
    );
}

export default Home;
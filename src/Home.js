import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Spin, Image, Space } from 'antd';
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import PreviewQuestionnaireCard from "./component/PreviewQuestionnaireCard";
import PreviewImageCard from "./component/PreviewImageCard";
import { getUserById } from "./api/admin";
import Contexts from './utils/Contexts'

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

function Home() {
    const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
    const [loaded, setLoaded] = useState(false);
    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [userData, setUserData] = useState({});

    const question = {
        DistFreq: 3, DistSev: 2, DistDur: 3, FreqStool: 5, Incomplete: 0, Strain: 1, Hard: 1,
        Block: 1, Digit: 0, BloatFreq: 5, BloatSev: 3, BloatDur: 1, SevScale: 8.5
    }

    const modelList = [
        {desc: "แบบสอบถาม", acc: "56.36"},
        {desc: "ภาพเอกซเรย์ช่องท้อง", acc: "60.50"},
        {desc: "แบบสอบถามและภาพเอกซเรย์ช่องท้อง", acc: "64.98"},
    ]

    useEffect(() => {
        getUserById(user.id)
            .then((res) => {
                // console.log(res);
                setUserData(res);
                setLoaded(true);
                setCurrentActivity({ ...currentActivity, enablePageChange: true });
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
                    <Row style={{ marginBottom: "10px" }}>
                        <Col xs={24} sm={10}>
                            <div style={{ fontSize: "25px", marginBottom: "20px" }}>
                                {`Welcome, ${userData.username}.`}
                            </div>
                            <label style={{ marginBottom: "18px" }}>
                                {`${userData.first_name} ${userData.last_name} (${userData.role.substring(0, 1).toUpperCase()}${userData.role.substring(1,)}), ${userData.hospital}`}
                            </label>
                        </Col>
                        <Col xs={24} sm={14}>
                            <Row justify="end" style={{ alignItems: "center" }}>
                                <Image
                                    className="MedLogo"
                                    preview={false}
                                    height={70}
                                    src="/logos/MedCU_Logo.png"
                                />
                                <Image
                                    className="CUNMLogo"
                                    preview={false}
                                    height={90}
                                    style={{ marginLeft: "15px" }}
                                    src="/logos/CUNM_Logo.png"
                                />
                                <Image
                                    className="EngLogo"
                                    preview={false}
                                    height={55}
                                    src="/logos/EngCU_Logo.jpg"
                                />
                            </Row>
                            {/* <Row justify="end" style={{ marginRight: "10px" }}>
                                <Image
                                    preview={false}
                                    height={37}
                                    src="/logos/EngCU_Logo.jpg"
                                />
                            </Row> */}
                        </Col>
                        <hr style={{ width: "100%" }} />
                    </Row>
                    <Row justify="center" style={{ textAlign: "center", marginBottom: "30px" }}>
                        <label style={{ marginBottom: "5px", color: "#9772fb", fontWeight: "bold" }}>
                            ระบบปัญญาประดิษฐ์เพื่อวินิจฉัยภาวะกล้ามเนื้อควบคุมการถ่ายอุจจาระทำงานไม่ประสานกัน โดยใช้ข้อมูลจากภาพเอกซเรย์ช่องท้องและแบบสอบถามอาการระบบทางเดินอาหาร <br /> (Artificial intelligence imaging and gastrointestinal symptoms analysis for diagnosis of dyssynergic defecation)
                        </label>
                    </Row>
                    <Row>
                        <Col md={16} lg={18}>
                            <Space direction="vertical" size={15}>
                                <Row style={{ marginBottom: "1em" }}>
                                    {/* <label style={{ marginBottom: "5px", color: "#9772fb", fontWeight: "500" }}>
                                        &emsp;&emsp;ระบบปัญญาประดิษฐ์เพื่อวินิจฉัยภาวะกล้ามเนื้อควบคุมการถ่ายอุจจาระทำงานไม่ประสานกัน โดยใช้ข้อมูลจากภาพเอกซเรย์ช่องท้องและแบบสอบถามอาการระบบทางเดินอาหาร (Artificial intelligence imaging and gastrointestinal symptoms analysis for diagnosis of dyssynergic defecation)
                                    </label> */}
                                    <label>
                                        &emsp;&emsp;พัฒนาระบบโดยศูนย์เชี่ยวชาญเฉพาะทางด้านระบบประสาทและการเคลื่อนไหวของระบบทางเดินอาหาร ภาควิชาอายุรศาสตร์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย และภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                                    </label>
                                </Row>
                                <Row>
                                    <dl style={{ fontSize: "medium" }}>
                                        <dt style={{ color: "#9772fb", fontWeight: "500" }}>วิธีใช้งานระบบ</dt>
                                        <dt style={{ marginBottom: "2px", display: "flex", alignItems: "center" }}>
                                            1. กรอกข้อมูลผู้ป่วย
                                            <EditOutlined
                                                style={{ color: "#9772fb", fontWeight: "500", marginLeft: "5px" }}
                                                onClick={() => history.push("/diagnosis")}
                                            />
                                        </dt>
                                        <dt>2. เลือกรูปแบบการวิเคราะห์ (Model)</dt>
                                        <dt>&emsp;&emsp;- Model 1 &nbsp;แบบสอบถาม </dt>
                                        <dt>&emsp;&emsp;- Model 2 &nbsp;ภาพเอกซเรย์ช่องท้อง </dt>
                                        <dt style={{ marginBottom: "2px" }}>&emsp;&emsp;- Model 3 &nbsp;แบบสอบถามและภาพเอกซเรย์ช่องท้อง </dt>
                                        <dt style={{ marginBottom: "2px" }}>3. ใส่ข้อมูล <span style={{ color: "#9772fb" }}>แบบสอบถาม</span> และ/หรือ <span style={{ color: "#9772fb" }}>อัปโหลดรูปภาพ</span></dt>
                                        <dt style={{ marginBottom: "2px" }}>4. กดวินิจฉัย</dt>
                                        <dt style={{ marginBottom: "2px" }}>5. ระบบแสดงร้อยละความเชื่อมั่นในการวินิจฉัยภาวะกล้ามเนื้อควบคุมการถ่ายอุจจาระทำงานไม่ประสานกัน</dt>
                                    </dl>
                                </Row>
                                <div style={{ marginBottom: "2em" }}>
                                    <label style={{ color: "#9772fb", fontWeight: "600" }}>Model Accuracy</label>
                                    {modelList.map((item, i) => (
                                        <Row style={{ marginBottom: "2px" }}>
                                            <Col xs={24} sm={11} xl={10} xxl={9}>
                                                <dl style={{ fontSize: "medium", marginBottom: 0 }}>
                                                    <dt>Model {i+1} &nbsp;{item.desc}</dt>
                                                </dl>
                                            </Col>
                                            <Col xs={24} sm={5}>
                                                <dl style={{ fontSize: "medium", marginBottom: 0 }}>
                                                    <dt>&nbsp; Accuracy &nbsp;{item.acc}%</dt>
                                                </dl>
                                            </Col>
                                            <Col xs={24} sm={8} xl={9} xxl={10}>
                                                <dl style={{ fontSize: "medium", marginBottom: 0, color: "#a3a3a3" }}>
                                                    <dt>&nbsp; <i>(updated July, 2022)</i></dt>
                                                </dl>
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
                            </Space>
                        </Col>
                        <Col xs={22} md={8} lg={6}>
                            <div style={{ textAlign: "center" }}>
                                <label style={{ margin: "15px 0 25px 0", color: "#9772fb", fontWeight: 500 }}>Example of input</label>
                                <PreviewQuestionnaireCard question={question} margin="0 0 20px 0" />
                                <PreviewImageCard image="/pics/xray_cropped.png" />
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}

export default Home;
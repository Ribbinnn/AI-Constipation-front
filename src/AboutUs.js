import React from "react";
import { Row, Col, Image } from 'antd';

function AboutUs() {
    return (
        <div className="content">
            <Row style={{ marginBottom: "5px" }}>
                {/* <Col xs={24} sm={10}>
                    <div style={{ fontSize: "30px", marginBottom: "17px" }}>
                        {`About Us`}
                    </div>
                </Col>
                <Col xs={24} sm={14}>
                    <Row justify="end" style={{ alignItems: "center", marginBottom: "13px" }}>
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
                    </Row> */}
                    {/* <Row justify="end" style={{ marginRight: "10px" }}>
                        <Image
                            preview={false}
                            height={37}
                            src="/logos/EngCU_Logo.jpg"
                        />
                    </Row> */}
                {/* </Col>
                <hr style={{ width: "100%" }} /> */}
            </Row>
            <Row>
                <Col xl={12} style={{ paddingRight: "10px" }}>
                    <Row align="middle" style={{ marginBottom: "8px", minHeight: "90px" }}>
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
                            src="/logos/CUNM_Logo.png"
                        />
                    </Row>
                    <Row style={{ color: "#9772fb", marginBottom: "8px", fontSize: "16px", minHeight: "51px" }}>
                        <Col span={24}>
                            ศูนย์เชี่ยวชาญเฉพาะทางด้านระบบประสาทและการเคลื่อนไหวของระบบทางเดินอาหาร <br />ภาควิชาอายุรศาสตร์ คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                        </Col>
                    </Row>
                    <Row style={{ fontSize: "14px", marginBottom: "30px", minHeight: "67px" }}>
                        <Col span={16}>
                            10th floor, Bhumisirimangalanusorn Building, <br />King Chulalongkorn Memorial Hospital, Rama 4 Road, Pathumwan, Pathumwan, Bangkok, 10330, Thailand
                        </Col>
                    </Row>
                    {/* <Row justify="space-around" style={{ marginBottom: "35px" }}>
                        <Col md={7} style={{ marginBottom: "20px" }}>
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
                        <Col md={8} style={{ marginBottom: "20px" }}>
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
                        <Col md={7} style={{ marginBottom: "20px" }}>
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
                        <Col xs={0} sm={0} md={2} />
                    </Row> */}
                    <Row justify="space-around">
                        <Col sm={12} md={8} style={{ marginBottom: "20px" }}>
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
                        <Col sm={12} md={8} style={{ marginBottom: "20px" }}>
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
                        <Col xs={0} sm={0} md={8} />
                    </Row>
                    <Row justify="space-around" /*style={{ marginBottom: "35px" }}*/>
                        <Col sm={12} md={16} style={{ marginBottom: "20px" }}>
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
                        <Col xs={0} sm={0} md={8} />
                    </Row>
                </Col>
                <Col xl={1} />
                <Col xl={11} style={{ paddingRight: "10px" }}>
                    <Row align="middle" style={{ marginBottom: "8px", minHeight: "90px" }}>
                        <Image
                            className="EngLogo"
                            preview={false}
                            height={55}
                            src="/logos/EngCU_Logo.jpg"
                        />
                    </Row>
                    <Row style={{ color: "#9772fb", marginBottom: "8px", fontSize: "16px", minHeight: "51px" }}>
                        <Col span={24}>
                            ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                        </Col>
                    </Row>
                    <Row style={{ fontSize: "14px", marginBottom: "30px", minHeight: "67px" }}>
                        <Col span={20}>
                            17th floor, Engineering 4 Building (Charoenvidsavakham), Phayathai Road, Wang Mai, Pathumwan, Bangkok, 10330, Thailand
                        </Col>
                    </Row>
                    <Row justify="space-around">
                        <Col sm={12} md={8} style={{ marginBottom: "20px" }}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/รศ.ดร.พีรพล.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                รศ.ดร.พีรพล เวทีกูล
                            </Row>
                        </Col>
                        <Col sm={12} md={8} style={{ marginBottom: "20px" }}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/sornsiri.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                สรณ์สิริ พู่วงศาโรจน์
                            </Row>
                        </Col>
                        <Col xs={0} sm={0} md={8} />
                    </Row>
                    <Row justify="space-around" /*style={{ marginBottom: "35px" }}*/>
                        <Col sm={12} md={8} style={{ marginBottom: "20px" }}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/supichaya.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                สุพิชญา อมรสิริวัฑฒ์
                            </Row>
                        </Col>
                        <Col sm={12} md={8} style={{ marginBottom: "20px" }}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/kanta.jpg"
                                />
                            </Row>
                            <Row justify="center">
                                กันตา มาลานิยม
                            </Row>
                        </Col>
                        <Col xs={0} sm={0} md={8} />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AboutUs;
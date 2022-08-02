import React from "react";
import { Row, Col, Image } from 'antd';

function AboutUs() {
    return (
        <div className="content aboutus">
            {/* <Row style={{ marginBottom: "5px" }}>
                <Col xs={24} sm={10}>
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
                    </Row>
                </Col>
                <hr style={{ width: "100%" }} />
            </Row> */}
            <Row>
                <Col xl={13} style={{ paddingRight: "10px" }}>
                    <Row align="middle" style={{ marginBottom: "5px", minHeight: "90px" }}>
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
                    <Row justify="space-around" style={{ marginBottom: "3px" }}>
                        <Col md={7} style={{ marginBottom: "20px" }}>
                            <Row justify="center">
                                <Image
                                    preview={false}
                                    height={190}
                                    src="/people/อ.สุเทพ.jpg"
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
                            <Row justify="center" style={{ wordBreak: "break-all" }}>
                                [ <a
                                    className="email-a"
                                    href="mailto:tanisa.p@chula.ac.th"
                                >
                                    tanisa.p@chula.ac.th
                                </a> ]
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
                            <Row justify="center" style={{ wordBreak: "break-all" }}>
                                [ <a
                                    className="email-a"
                                    href="mailto:pakkapon.r@gmail.com"
                                >
                                    pakkapon.r@gmail.com
                                </a> ]
                            </Row>
                        </Col>
                        <Col xs={0} sm={0} md={2} />
                    </Row>
                </Col>
                <Col xl={11} style={{ paddingRight: "10px" }}>
                    <Row align="middle" style={{ marginBottom: "5px", minHeight: "90px" }}>
                        <Image
                            className="EngLogo"
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
                    <Row justify="space-around" style={{ marginBottom: "3px" }}>
                        <Col sm={12} md={9} style={{ marginBottom: "20px" }}>
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
                            <Row justify="center" style={{ wordBreak: "break-all" }}>
                                [ <a
                                    className="email-a"
                                    href="mailto:peerapon.v@chula.ac.th"
                                >
                                    peerapon.v@chula.ac.th
                                </a> ]
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
                        <Col xs={0} sm={0} md={7} />
                    </Row>
                </Col>
            </Row>
            <Row style={{ color: "#9772fb", marginBottom: "18px", fontSize: "16px" }}>
                <Col span={24}>
                    ทีมนักพัฒนาจากภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                </Col>
            </Row>
            <Row justify="space-around">
                <Col sm={12} md={8} xl={4} style={{ marginBottom: "20px" }}>
                    <Row justify="center">
                        <Image
                            preview={false}
                            height={190}
                            src="/people/phattharat.jpg"
                        />
                    </Row>
                    <Row justify="center">
                        ภัทรรัตน์ สงทุ่ง
                    </Row>
                </Col>
                <Col sm={12} md={8} xl={4} style={{ marginBottom: "20px" }}>
                    <Row justify="center">
                        <Image
                            preview={false}
                            height={190}
                            src="/people/manassakan.jpg"
                        />
                    </Row>
                    <Row justify="center">
                        มนัสกานต์ เสน่หา
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={8} xl={0} />
                <Col sm={12} md={8} xl={4} style={{ marginBottom: "20px" }}>
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
                <Col sm={12} md={8} xl={4} style={{ marginBottom: "20px" }}>
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
                <Col xs={0} sm={0} md={8} xl={8} />
            </Row>
        </div>
    );
}

export default AboutUs;
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Spin } from 'antd';
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
                    <label>Home</label>
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
import React from "react";
 import { Button } from "antd";

 export default function PageNotFound () {
     return (
     <div className="content center-div" style={{ height: "100%" }}>
        <div style={{ textAlign: "center", paddingBottom: "100px" }}>
            <div style={{fontSize: "100px", fontWeight: "bold"}}>404</div>
            <div style={{fontSize: "40px", fontWeight: "bold"}}>Sorry, Page Not Found</div>
            <div style={{fontSize: "medium"}}>The page you are looking for does not exist.</div><br/>
            <a href="/"><Button className="primary-btn">Go to Home Page</Button></a>
        </div>
     </div>
     )
 }
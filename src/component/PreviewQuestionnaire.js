import React from "react";
import { Space } from "antd";

export default function PreviewQuestionnaire(props) {
    const questions = [
        "1. ท่านมี “อาการอึดอัดแน่นท้อง” หรือไม่", "1.1 ระดับความรุนแรงของอาการมากน้อยเพียงไร", "1.2 ท่านสังเกตว่าท่านมีอาการปวดท้องหรืออึดอัดแน่นท้องติดต่อกันมาเป็นเวลา",
        "2. ท่านถ่ายอุจจาระ", "3. ท่านรู้สึกถ่ายไม่สุดมากกว่า 25% ของจำนวนครั้งของการถ่ายอุจจาระหรือไม่", "4. ท่านมีอาการต้องเบ่งถ่ายมากกว่าปกติ มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่",
        "5. ท่านมีอาการอุจจาระแข็งมากกว่าปกติ มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่", "6. ท่านรู้สึกว่ามีอะไรอุดตันหรืออุดกั้นที่ทวารหนักเวลาถ่าย มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่",
        "7. ท่านต้องใช้นิ้วมือช่วยในการถ่ายอุจจาระ มากกว่า 25% ของจำนวนครั้งของการถ่ายหรือไม่", "8. ท่านมีอาการ “อืดแน่นท้องหรือมีลมมากในท้อง” หรือไม่",
        "8.1 ระดับความรุนแรงของอาการมากน้อยเพียงไร", "8.2 ระยะเวลาที่เป็น", "9. ความรุนแรงของอาการทางเดินอาหารทั้งหมดโดยรวมอยู่ในระดับใด (0-10)"
    ]
    const two_choice = ["ไม่มี", "มี"];
    const three_choice = ["เล็กน้อย", "ปานกลาง", "รุนแรง"];
    const seven_choice = [
        "ไม่มี", "มีอาการน้อยกว่า 1 วัน/เดือน", "มีอาการ 1 วัน/เดือน", "มีอาการ 2-3 วัน/เดือน",
        "มีอาการ 1 วัน/สัปดาห์", "มีอาการมากกว่า 1 วัน/สัปดาห์", "มีอาการทุกวัน"
    ];
    
    const printAnswer = (ans) => {
        if (ans === "-") {
            return(
                <label style={{ marginLeft: "14px" }}>{ans}</label>
            );
        } else {
            return(
                <li style={{ marginLeft: "15px" }}>
                    <label style={{ color: "#9772fb", fontWeight: 500 }}>{ans}</label>
                </li>
            );
        }
    };

    return(
        <Space direction="vertical" size={8}>
            <div>
                <label>{questions[0]}</label><br/>
                {printAnswer(seven_choice[props.question.DistFreq])}
            </div>
            <div style={{ marginLeft: "35px" }}>
                <label>{questions[1]}</label><br/>
                {printAnswer(props.question.DistSev === 0 ? "-" : three_choice[props.question.DistSev + 1])}
            </div>
            <div style={{ marginLeft: "35px" }}>
                <label>{questions[2]}</label><br/>
                {printAnswer(props.question.DistDur === 0 ? "-" : `${props.question.DistDur} เดือน`)}
            </div>
            <div>
                <label>{questions[3]}</label><br/>
                {printAnswer(`${props.question.FreqStool} ครั้ง`)}
            </div>
            {Object.keys(props.question).slice(4,9).map((q, i) => (
                <div>
                    <label>{questions[i+4]}</label><br/>
                    {printAnswer(two_choice[props.question[q]])}
                </div>
            ))}
            <div>
                <label>{questions[9]}</label><br/>
                {printAnswer(seven_choice[props.question.BloatFreq])}
            </div>
            <div style={{ marginLeft: "35px" }}>
                <label>{questions[10]}</label><br/>
                {printAnswer(props.question.BloatSev === 0 ? "-" : three_choice[props.question.BloatSev - 1])}
            </div>
            <div style={{ marginLeft: "35px" }}>
                <label>{questions[11]}</label><br/>
                {printAnswer(props.question.BloatDur === 0 ? "-" : `${props.question.BloatDur} เดือน`)}
            </div>
            <div>
                <label>{questions[12]}</label><br/>
                {printAnswer(props.question.SevScale)}
            </div>
        </Space>
    );
}
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
    
    const printAnswer = (q, ans, children) => {
        return(
            <div style={{ marginLeft: children ? "35px" : 0 }}>
                <label>{q}</label><br />
                {ans === "-" ?
                    <label style={{ marginLeft: "16px" }}>{ans}</label> :
                    <label style={{ marginLeft: "17px", color: "#9772fb", fontWeight: 500 }}>{ans}</label>}
            </div>
        );
    };

    return(
        <Space direction="vertical" size={10}>
            {printAnswer(questions[0], seven_choice[props.question.DistFreq], false)}
            {printAnswer(questions[1], props.question.DistSev === 0 ? "-" : three_choice[props.question.DistSev - 1], true)}
            {printAnswer(questions[2], props.question.DistDur === 0 ? "-" : `${props.question.DistDur} เดือน`, true)}
            {printAnswer(questions[3], `${props.question.FreqStool} ครั้ง`, false)}
            {printAnswer(questions[4], two_choice[props.question.Incomplete], false)}
            {printAnswer(questions[5], two_choice[props.question.Strain], false)}
            {printAnswer(questions[6], two_choice[props.question.Hard], false)}
            {printAnswer(questions[7], two_choice[props.question.Block], false)}
            {printAnswer(questions[8], two_choice[props.question.Digit], false)}
            {printAnswer(questions[9], seven_choice[props.question.BloatFreq], false)}
            {printAnswer(questions[10], props.question.BloatSev === 0 ? "-" : three_choice[props.question.BloatSev - 1], true)}
            {printAnswer(questions[11], props.question.BloatDur === 0 ? "-" : `${props.question.BloatDur} เดือน`, true)}
            {printAnswer(questions[12], props.question.SevScale, false)}
        </Space>
    );
}
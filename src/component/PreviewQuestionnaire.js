import React from "react";
import { Space } from "antd";

export default function PreviewQuestionnaire(props) {
    const questions = [
        "1. ท่านมี “อาการอึดอัดแน่นท้อง” หรือไม่", "1.1 ระดับความรุนแรงของอาการมากน้อยเพียงไร", "1.2 ท่านสังเกตว่าท่านมีอาการอึดอัดแน่นท้องติดต่อกันมาเป็นเวลา",
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

    const data_range = {
        DistFreq: {min: 0, max: 6}, DistSev: {min: 0, max: 3}, DistDur: {min: 0, max: 240}, FreqStool: {min: 0, max: 100},
        Incomplete: {min: 0, max: 1}, Strain: {min: 0, max: 1}, Hard: {min: 0, max: 1}, Block: {min: 0, max: 1}, Digit: {min: 0, max: 1},
        BloatFreq: {min: 0, max: 6}, BloatSev: {min: 0, max: 3}, BloatDur: {min: 0, max: 240}, SevScale: {min: 0, max: 10}
    }
    
    const printAnswer = (field, q, ans, children) => {
        if (ans === undefined || ans === null || typeof ans !== "number"
            || ans < data_range[field].min || ans > data_range.max) {
                ans = null;
        }
        if (ans !== null) {
            switch (field) {
                case "DistFreq":
                    ans = seven_choice[ans];
                    break;
                case "DistSev":
                    ans = three_choice[ans - 1];
                    break;
                case "DistDur":
                    ans = `${ans} เดือน`;
                    break;
                case "FreqStool":
                    ans = `${ans} ครั้ง/สัปดาห์`;
                    break;
                case "BloatFreq":
                    ans = seven_choice[ans];
                    break;
                case "BloatSev":
                    ans = three_choice[ans - 1];
                    break;
                case "BloatDur":
                    ans = `${ans} เดือน`;
                    break;
                case "SevScale":
                    ans = ans;
                    break;
                default:
                    ans = two_choice[ans];
            }
        } else {
            props.setHasError(true);
        }
        return(
            <div style={{ marginLeft: children ? "35px" : 0 }}>
                <label>{q}</label><br />
                {/* {ans === "-" ?
                    <label style={{ marginLeft: "16px" }}>{ans}</label> :
                    <label style={{ marginLeft: "17px", color: "#9772fb", fontWeight: 500 }}>{ans}</label>} */}
                {ans ?
                    <label style={{ marginLeft: "17px", color: "#9772fb", fontWeight: 500 }}>{ans}</label> :
                    <label style={{ marginLeft: "17px", color: "#f32424" }}>
                        <label style={{ color: "#f32424", textDecoration: "underline" }}>Error</label>
                        {`: value must be in range ${data_range[field].min}-${data_range[field].max}`}
                    </label>}
            </div>
        );
    };

    return(
        <Space direction="vertical" size={10}>
            {printAnswer("DistFreq", questions[0], props.question.DistFreq, false)}
            {props.question.DistFreq !== 0 &&
                printAnswer("DistSev", questions[1], props.question.DistSev, true)}
            {props.question.DistFreq !== 0 &&
                printAnswer("DistDur", questions[2], props.question.DistDur, true)}
            {printAnswer("FreqStool", questions[3], props.question.FreqStool, false)}
            {printAnswer("Incomplete", questions[4], props.question.Incomplete, false)}
            {printAnswer("Strain", questions[5], props.question.Strain, false)}
            {printAnswer("Hard", questions[6], props.question.Hard, false)}
            {printAnswer("Block", questions[7], props.question.Block, false)}
            {printAnswer("Digit", questions[8], props.question.Digit, false)}
            {printAnswer("BloatFreq", questions[9], props.question.BloatFreq, false)}
            {props.question.BloatFreq !== 0 &&
                printAnswer("BloatSev",questions[10], props.question.BloatSev, true)}
            {props.question.BloatFreq !== 0 &&
                printAnswer("BloatDur", questions[11], props.question.BloatDur, true)}
            {printAnswer("SevScale", questions[12], props.question.SevScale, false)}
        </Space>
    );
}
import React, { useState, useRef, useContext } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Steps, Button, Modal } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined } from "@ant-design/icons";
import PersonalDetails from "./PersonalDetails";
import SelectModel from "./SelectModel";
import InsertInput from "./InsertInput";
import UploadQuestionnaireModal from "./UploadQuestionnaireModal";
import UploadImageModal from "./UploadImageModal";
import Result from "./Result";
import BeginDiagnosis from "./BeginDiagnosis";
import { questionnaireInfer, imageInfer, integrateInfer } from "../api/infer";
import Contexts from "../utils/Contexts";

const { Step } = Steps;

export default function Diagnosis() {
  const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
  // const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const personalDetailsRef = useRef();
  const [uploadQuestionVisible, setUploadQuestionVisible] = useState(false);
  const [uploadImageVisible, setUploadImageVisible] = useState(false);

  const [details, setDetails] = useState(null);
  const [model, setModel] = useState(null);
  const [question, setQuestion] = useState(null);
  const [image, setImage] = useState(null);
  const [reportId, setReportId] = useState(null);

  const stepsTitle = [
    "Personal Details",
    "Select Model",
    "Insert Input",
    "Begin Diagnosis",
    "Result",
  ];

  const btnList = [
    {
      title: "Go to View Results",
      destination: "/viewresults",
    },
    {
      title: "Create New Diagnosis",
      destination: "/diagnosis",
    },
    {
      title: "Back to Home",
      destination: "/",
    },
  ];

  const next = () => {
    /** add condition for each step to go next step here */
    if (current === 0) {
      personalDetailsRef.current.setPersonalDetails();
    } else if (current === 3) {
      // setLoading(true);
      if (model === "questionnaire") {
        questionnaireInfer(question, details)
        .then((res) => {
          console.log(res);
          setReportId(res.data.report_id);
          setCurrent(current + 1);
          // setLoading(false);
        }).catch((err) => {
          console.log(err.response);
          Modal.error({ content: err.response.data.message });
          // setLoading(false);
        });
      } else if (model === "image") {
        // fetch(image.croppedImage)
        // .then(r => r.blob())
        // .then(b => b.arrayBuffer())
        // .then(croppedImage => {
          imageInfer(image.croppedImage, JSON.stringify(details))
          .then((res) => {
            console.log(res);
            setReportId(res.data.report_id);
            setCurrent(current + 1);
            // setLoading(false);
          }).catch((err) => {
            console.log(err.response);
            Modal.error({ content: err.response.data.message });
            // setLoading(false);
          });
        // });
      } else {
        integrateInfer(JSON.stringify(question), image.croppedImage, JSON.stringify(details))
        .then((res) => {
          console.log(res);
          setReportId(res.data.report_id);
          setCurrent(current + 1);
          // setLoading(false);
        }).catch((err) => {
          console.log(err.response);
          Modal.error({ content: err.response.data.message });
          // setLoading(false);
        });
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // useHotkeys(
  //   "enter",
  //   () => {
  //     if (document.getElementById("diagnosis-next-btn") && !document.getElementsByClassName("ant-modal").length) {
  //       next();
  //     }
  //   },
  //   {
  //     filter: () => true,
  //   },
  //   []
  // );

  // useHotkeys(
  //   "shift+b",
  //   () => {
  //     if (document.getElementById("diagnosis-back-btn") && !document.getElementsByClassName("ant-modal").length) {
  //       prev();
  //     }
  //   },
  //   {
  //     filter: () => true,
  //   },
  //   []
  // );

  return (
    <div className={/*loading ? "content diagnosis loading" :*/ "content diagnosis"}>
      <Steps progressDot current={current}>
        {stepsTitle.map((item) => (
          <Step key={item} title={item} />
        ))}
      </Steps>
      {/* ----- add content below -------- */}
      <div className={current === 3 && question ? "steps-content-diagnosis preview" : "steps-content-diagnosis"}>
        {current === 0 && (
          <PersonalDetails
            ref={personalDetailsRef}
            details={details}
            setDetails={setDetails}
            setCurrent={setCurrent}
          />
        )}
        {current === 1 && (
          <SelectModel
            model={model}
            setModel={setModel}
            setQuestion={setQuestion}
            setImage={setImage}
          />
        )}
        {current === 2 && (
          <InsertInput
            model={model}
            question={question}
            setQuestion={setQuestion}
            image={image}
            setImage={setImage}
            setUploadQuestionVisible={setUploadQuestionVisible}
            setUploadImageVisible={setUploadImageVisible}
          />
        )}
        {current === 3 && (
          <BeginDiagnosis
            question={question}
            image={image}
          />
        )}
        {current === stepsTitle.length - 1 && ( // edit soon
          <Result
            btnList={btnList}
            title="Diagnosis is processing"
            model={model}
            reportId={reportId}
          />
        )}
      </div>
      <UploadQuestionnaireModal
        visible={uploadQuestionVisible}
        setVisible={setUploadQuestionVisible}
        question={question}
        setQuestion={setQuestion}
      />
      <UploadImageModal
        visible={uploadImageVisible}
        setVisible={setUploadImageVisible}
        image={image}
        setImage={setImage}
      />
      {/* ----- add content above -------- */}
      <div className={`steps-action${current === 0 ? " steps-action-1" : ""}`}>
        {current > 0 && current < stepsTitle.length - 1 && (
          <Button
            className="primary-btn"
            id="diagnosis-back-btn"
            style={current > 0 ? null : { visibility: "hidden" }}
            onClick={() => prev()}
          >
            Back
          </Button>
        )}
        {(current === 0
          ||current === 1 && model
          || current === 2 && (
            model === "questionnaire" && question
            || model === "image" && image
            || model === "integrate" && question && image)
          || current === 3)
          && (<Button className="primary-btn" id="diagnosis-next-btn" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
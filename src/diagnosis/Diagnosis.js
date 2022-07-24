import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
// import { useHotkeys } from "react-hotkeys-hook";
import { Steps, Button, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import PersonalDetails from "./PersonalDetails";
import SelectModel from "./SelectModel";
import InsertInput from "./InsertInput";
import UploadQuestionnaireModal from "./UploadQuestionnaireModal";
import UploadImageModal from "./UploadImageModal";
import Result from "./Result";
import BeginDiagnosis from "./BeginDiagnosis";
import { questionnaireInfer, imageInfer, integrateInfer } from "../api/infer";
import { getReport, deleteReport, getImage } from "../api/reports";
import Contexts from "../utils/Contexts";

const LoadingIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

const { Step } = Steps;

export default function Diagnosis() {
  const { mode, rid } = useParams();
  const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const personalDetailsRef = useRef();
  const [uploadQuestionVisible, setUploadQuestionVisible] = useState(false);
  const [uploadImageVisible, setUploadImageVisible] = useState(false);

  const [details, setDetails] = useState(null);
  const [model, setModel] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionReview, setQuestionReview] = useState(true);
  const [uploadedQuestionName, setUploadedQuestionName] = useState(null);
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

  useEffect(() => {
    if (rid) {
      getReport(rid)
      .then((res) => {
        // console.log(res.data);
        if (res.data.question_id) {
          res.data.question_id._id = undefined;
          setQuestion(res.data.question_id);
          if (mode === "image") {
            setQuestionReview(true);
          } else {
            setQuestionReview(false);
          }
        }
        if (mode === "questionnaire" && res.data.task === "integrate") {
          getImage(rid, "original")
          .then((res) => {
              // console.log(res);
              let image = new File([res], "croppedImage.png", { type: "image/png" });
              setImage({croppedImage: image});
          })
        }
        res.data.personal_info_id._id = undefined;
        setDetails(res.data.personal_info_id);
        setModel(res.data.task);
        setCurrent(2);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.response);
        return Modal.error({ content: err.response.data.message });
      });
    } else {
      setLoaded(true);
    }
  }, [])

  const resultLoading = (res) => {
    console.log(res);
    setReportId(res.data.report_id);
    setCurrent(current + 1);
    setCurrentActivity({ ...currentActivity, enablePageChange: false });
    if (rid) {
      deleteReport(rid)
      .then((res) => {
          // console.log(res);
      }).catch((err) => {
          console.log(err.response);
      })
    }
  }

  const next = () => {
    /** add condition for each step to go next step here */
    if (current === 0) {
      personalDetailsRef.current.setPersonalDetails();
    } else if (current === 3) {
      setProcessing(true);
      if (model === "questionnaire") {
        questionnaireInfer(question, details)
        .then((res) => {
          resultLoading(res);
        }).catch((err) => {
          console.log(err.response);
          Modal.error({ content: err.response.data.message });
        });
      } else if (model === "image") {
        // fetch(image.croppedImage)
        // .then(r => r.blob())
        // .then(b => b.arrayBuffer())
        // .then(croppedImage => {
          imageInfer(image.croppedImage, JSON.stringify(details))
          .then((res) => {
            resultLoading(res);
          }).catch((err) => {
            console.log(err.response);
            Modal.error({ content: err.response.data.message });
          });
        // });
      } else {
        integrateInfer(JSON.stringify(question), image.croppedImage, JSON.stringify(details))
        .then((res) => {
          resultLoading(res);
        }).catch((err) => {
          console.log(err.response);
          Modal.error({ content: err.response.data.message });
        });
      }
    } else {
      setCurrent(current + 1);
      setCurrentActivity({ ...currentActivity, enablePageChange: false });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    setCurrentActivity({ ...currentActivity, enablePageChange: false });
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
  //   }, []);

  // useHotkeys(
  //   "shift+b",
  //   () => {
  //     if (document.getElementById("diagnosis-back-btn") && !document.getElementsByClassName("ant-modal").length) {
  //       prev();
  //     }
  //   },
  //   {
  //     filter: () => true,
  //   }, []);

  return (
    <div className={processing ? "content diagnosis processing" : "content diagnosis"}>
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
      {loaded && <div style={{ height: "100%" }}>
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
              mode={mode}
              model={model}
              question={question}
              setQuestion={setQuestion}
              questionReview={questionReview}
              setQuestionReview={setQuestionReview}
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
          {current === stepsTitle.length - 1 && (
            <Result
              btnList={btnList}
              // title="Diagnosis is processing"
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
          questionReview={questionReview}
          setQuestionReview={setQuestionReview}
          uploadedFileName={uploadedQuestionName}
          setUploadedFileName={setUploadedQuestionName}
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
            || current === 2 && (rid ? rid && questionReview : true) && (
              model === "questionnaire" && question
              || model === "image" && image
              || model === "integrate" && question && image)
            || current === 3)
            && (<Button className="primary-btn" id="diagnosis-next-btn" onClick={() => next()}>
              Next
            </Button>
          )}
        </div>
      </div>}
    </div>
  );
}
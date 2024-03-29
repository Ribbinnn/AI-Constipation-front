import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";

export default function ConfirmDelete(props) {
  const [cfmMessage, setCfmMessage] = useState("");
  const handleOnChangeCfmMessage = (e) => {
    setCfmMessage(e.target.value);
  };
  const deleteAPI = () => {
    cfmMessage === props.cfmMessage ? 
      props.deleteAPI() : 
      Modal.warning({content: "Confirm message does not match."});
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item onChange={handleOnChangeCfmMessage}>
          <p
            style={{ marginBottom: "8px" }}
          >
            confirmation (type <i>{props.cfmMessage}</i> to confirm)
          </p>
          <div>
            <Input
              className="input-text"
              style={{ width: "550px", marginBottom: 0 }}
            />
            <Button
              className="primary-btn smaller"
              style={{ backgroundColor: "#C4C4C4", marginLeft: 8 }}
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="primary-btn smaller"
              onClick={deleteAPI}
              style={{ marginLeft: 8 }}
            >
              Delete
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

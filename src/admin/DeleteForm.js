import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  Spin,
  Col,
  Row,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllUsers, deleteUserById } from "../api/admin";

const LoadingIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);
const { Option } = Select;

export default function DeleteForm(props) {
  const [keyword, setKeyword] = useState();
  const [options, setOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [cfmMessage, setCfmMessage] = useState("");

  useEffect(() => {
    initializePage();
  }, [props.mode]);

  function initializePage() {
    setKeyword();
    setLoaded(false);
    getAllUsers()
      .then((res) => {
        setOptions(res);
        setLoaded(true);
      })
      .catch((err) => console.log(err.response));
  }

  const deleteAPI = () => {
    if (cfmMessage === keyword.children) {
      const key = "updatable";
      message.loading({ content: "Loading...", key });
      deleteUserById(keyword.value)
        .then((res) => {
          console.log(res);
          res.success
            ? message.success({ content: res.message, key, duration: 5 })
            : message.error({ content: res.message, key, duration: 5 });
          initializePage();
        })
        .catch((err) => message.error(err.response));
    } else Modal.warning({ content: "Confirm message does not match." });
  };

  const handleOnChangeCfmMessage = (e) => {
    setCfmMessage(e.target.value);
  };

  return (
    <Col>
      <Row>
        <label style={{ fontWeight: "bold", fontSize: "large", color: "#f32424" }}>
          Delete User
        </label>
      </Row>
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
      <Row style={{ marginTop: "30px" }}>
        {loaded && (
          <div>
            <div>
              <div>
                <label>
                  Username
                </label>
              </div>
              <Select
                className="search-component"
                showSearch
                optionFilterProp="children"
                onChange={(i, j) => {
                  setKeyword(j);
                }}
                style={{ margin: "8px 20px 0 0" }}
              >
                {options.map((item, i) => (
                    <Option key={i} value={item._id}>
                      {item.username}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
        )}
      </Row>
      {keyword && (
        <Form layout="vertical" style={{ marginTop: "30px" }}>
          <Form.Item onChange={handleOnChangeCfmMessage}>
            <p
              style={{ marginBottom: "8px" }}
            >
              confirmation (type <i>{keyword.children}</i> to confirm)
            </p>
            <div>
              <Input
                className="input-text"
                style={{ width: "550px", marginBottom: 0 }}
              />
              <Button
                className="primary-btn smaller"
                style={{ marginLeft: 8 }}
                onClick={deleteAPI}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </Col>
  );
}

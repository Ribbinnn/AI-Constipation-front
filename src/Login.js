import React from "react";
import { Form, Input, Button, Modal, Card, Checkbox } from "antd";
import { login } from "./api/login";

function Login() {
  const [form] = Form.useForm();
  
  return (
    <div style={{ width: "100%", height: "100%", background: "#888" }}>
      <div className="center-div" style={{ height: "100%" }}>
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="title"
            className="login-title"
          >
            AI Constipation
          </Form.Item>
          <Card
            className="login-card"
            hoverable={false}
            bordered={false}
          >
              <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                    },
                ]}
              >
                <Input
                  className="input-text login-input"
                  placeholder="Username"
                  style={{ width: "300px" }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                    },
                ]}
              >
                <Input
                  className="input-text login-input"
                  type="password"
                  placeholder="Password"
                  style={{ width: "300px" }}
                />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox className="login-checkbox">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="primary-btn"
                  style={{ width: "100%" }}
                  onClick={async () => {
                    /* call sign in api */
                    const data = await form.validateFields();
                    login(data.username, data.password, data.remember)
                      .then((respond) => {
                        window.location.reload();
                      })
                      .catch((e) => {
                        if (e.response !== undefined) {
                          Modal.error({content: e.response.data.message});
                          console.log(e.response);
                        } else {
                          Modal.error({content: "Cannot connect to the server."});
                        }
                      });
                  }}
                >
                  Sign in
                </Button>
              </Form.Item>
          </Card>
        </Form>
      </div>
    </div>
  );
}

export default Login;

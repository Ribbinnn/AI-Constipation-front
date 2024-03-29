import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Select, Button, Modal, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { createUser, updateUser, getAllUsers, getUserById } from "../api/admin";
import Contexts from "../utils/Contexts";

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);
const { Option } = Select;

function UserForm() {
    const { currentActivity, setCurrentActivity } = useContext(Contexts).active;
    const { mode } = useParams();
    const [loaded, setLoaded] = useState(false);
    const roles = ["general", "clinician", "admin"];
    const hospitals = [
        "Chulalongkorn University", "Prince of Songkla University", "Thammasat University"
    ];
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();
    const [submit, setSubmit] = useState(false);
    const [inputVisible, setInputVisible] = useState(true);
    useEffect(() => {
        setLoaded(false);
        setSubmit(false);
        form.resetFields();
        if (mode === "edituser") {
            getAllUsers()
            .then((res) => {
                setUsers(res);
                setInputVisible(false);
                setLoaded(true);
            }).catch((err) => console.log(err.response));
        } else {
            setInputVisible(true);
            setLoaded(true);
        }
    }, [mode]);
    return(
        <div>
            <label style={{ fontWeight: "bold", fontSize: "large" }}>
                {mode === "createuser" ? "Create New User" : "Edit User"}
            </label>
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
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    className="admin-form"
                    style={{ marginTop: "30px" }}
                    onFieldsChange={() => setCurrentActivity({ ...currentActivity, enablePageChange: false })}
                >
                    <div>
                        <Form.Item
                            name="username"
                            key="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginRight: "30px" }}
                        >
                            {mode === "createuser" ? 
                                <Input className="input-text fixed-size smaller" disabled={submit ? true : false} /> :
                                <Select
                                    className="search-component"
                                    showSearch
                                    optionFilterProp="children"
                                    onChange={(id) => {
                                        // setLoaded(false);
                                        getUserById(id)
                                        .then((res) => {
                                            form.setFieldsValue({...res, username: id, password: "", confirm: ""});
                                            setSubmit(false);
                                            setInputVisible(true);
                                            // setLoaded(true);
                                        }).catch((err) => console.log(err.response));
                                    }}
                                >
                                    {users.map((user, i) => (
                                        <Option key={i} value={user["_id"]}>
                                            {user.username}
                                        </Option>
                                    ))}
                                </Select>}
                        </Form.Item>
                        {inputVisible && <Form.Item
                            name="email"
                            key="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    type: "email"
                                },
                            ]}
                        >
                            <Input className="input-text fixed-size smaller" disabled={submit ? true : false} />
                        </Form.Item>}
                    </div>
                    {inputVisible && <div>
                        <Form.Item
                            name="password"
                            key="password"
                            label="Password"
                            rules={[
                                {
                                    required: mode === "createuser" ? true : false,
                                },
                                {
                                    min: 8,
                                    max: 32,
                                    message: "'password' length must be 8-32"
                                }
                            ]}
                            style={{ marginRight: "30px" }}
                        >
                            <Input className="input-text fixed-size smaller" type="password" disabled={submit ? true : false} />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            key="confirm"
                            label="Confirm Password"
                            rules={[
                                {
                                    required: mode === "createuser" ? true : false,
                                    message: "'confirm password' is required",
                                },
                            ]}
                        >
                            <Input className="input-text fixed-size smaller" type="password" disabled={submit ? true : false} />
                        </Form.Item>
                    </div>}
                    {inputVisible && <div>
                        <Form.Item
                            name="first_name"
                            key="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: "'first name' is required",
                                },
                            ]}
                            style={{ marginRight: "30px" }}
                        >
                            <Input className="input-text fixed-size smaller" disabled={submit ? true : false} />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            key="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: "'last name' is required",
                                },
                            ]}
                        >
                            <Input className="input-text fixed-size smaller" disabled={submit ? true : false} />
                        </Form.Item>
                    </div>}
                    {inputVisible && <div>
                        <Form.Item
                            name="role"
                            key="role"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ marginRight: "30px" }}
                        >
                            <Select className="search-component" disabled={submit ? true : false}>
                                {roles.map((role, i) => (
                                    <Option key={i} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="hospital"
                            key="hospital"
                            label="Hospital"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select className="search-component" disabled={submit ? true : false}>
                                {hospitals.map((hospital, i) => (
                                    <Option key={i} value={hospital}>
                                        {hospital}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>}
                    {inputVisible && <Form.Item
                        style={{ marginTop: "25px" }}
                    >
                        {submit ? 
                            <Button
                                className="primary-btn"
                                onClick={() => window.location.reload()}
                            >
                                {mode === "createuser" ? "Create new user" : "Edit other users"}
                            </Button> :
                            <Button
                                className="primary-btn"
                                onClick={async () => {
                                    try {
                                        let checkPassword = true;
                                        const data = await form.validateFields();
                                        if (data.password === undefined || data.password === "") {
                                            data["password"] = "";
                                        } else if (data.password !== data.confirm) {
                                            Modal.warning({content: "Confirm Password does not match."});
                                            checkPassword = false;
                                        }
                                        if (checkPassword) {
                                            if (mode === "createuser") {
                                                createUser(
                                                    data.username, data.password, data.first_name, data.last_name,
                                                    data.role, data.email, data.hospital)
                                                .then((res) => {
                                                    // console.log(res);
                                                    Modal.success({content: "Create user successfully."});
                                                    setSubmit(true);
                                                }).catch((err) => {
                                                    console.log(err.response);
                                                    Modal.error({ content: err.response.data.message });
                                                });
                                            } else {
                                                updateUser(data.username, data.password, data.first_name, data.last_name,
                                                    data.role, data.email, data.hospital)
                                                .then((res) => {
                                                    // console.log(res);
                                                    Modal.success({content: "Update user successfully."});
                                                    setSubmit(true);
                                                }).catch((err) => {
                                                    console.log(err.response);
                                                    Modal.error({ content: err.response.data.message });
                                                });
                                            }
                                        }
                                    } catch (errInfo) {
                                        console.log('Validate Failed:', errInfo);
                                    }
                                }}
                            >
                                Submit
                            </Button>}
                    </Form.Item>}
                </Form>}
        </div>
    );
}

export default UserForm;
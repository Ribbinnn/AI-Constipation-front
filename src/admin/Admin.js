import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Menu } from "antd";
import { PlusSquareOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UserForm from "./UserForm";
import DeleteForm from "./DeleteForm";

function Admin() {
    const history = useHistory();
    const { mode } = useParams();
    const [current, setCurrent] = useState(mode ? mode : "");
    const renderComponent = () => {
        switch(mode) {
            case "createuser":
                return <UserForm />;
            case "edituser":
                return <UserForm />;
            case "deleteuser":
                return <DeleteForm />;
            default:
                return null;
        }
    }
    return(
        <div className="content">
            <Menu
                onClick={(e) => setCurrent(e.key)}
                selectedKeys={[mode ? current : ""]}
                mode="horizontal"
            >
                <Menu.Item
                    key="createuser"
                    icon={<PlusSquareOutlined />}
                    onClick={() => history.push("/admin/createuser")}
                >
                    Create User
                </Menu.Item>
                <Menu.Item
                    key="edituser"
                    icon={<EditOutlined />}
                    onClick={() => history.push("/admin/edituser")}
                >
                    Edit User
                </Menu.Item>
                <Menu.Item 
                    className="delete-menu"
                    key="deleteuser" 
                    icon={<DeleteOutlined />}
                    style={{ color: "#f32424" }} 
                    onClick={() => history.push("/admin/deleteuser")}
                >
                    Delete User
                </Menu.Item>
            </Menu>
            <div style={{ padding: mode === "createproject" ? "40px 0 0 20px" : "40px 20px" }}>
                {renderComponent()}
            </div>
        </div>
    );
}

export default Admin;
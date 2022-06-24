import React, { useEffect, useState, useContext } from "react";
import { Table, Tooltip, Form, Input, Button, Select, DatePicker, Tag, Spin, Popconfirm, Popover, Row, Col } from "antd";
import {
    EyeOutlined, DeleteOutlined, ReloadOutlined, LoadingOutlined,
    InfoCircleOutlined, CheckOutlined, CloseOutlined, MinusOutlined
} from '@ant-design/icons';
import { viewResults, deleteReport } from "../api/reports";
import { useHistory, useLocation } from "react-router-dom";
import * as moment from "moment";
import Contexts from "../utils/Contexts";

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

const { Option } = Select;

export default function ViewResults(props) {
    const [loaded, setLoaded] = useState(false);

    function useQuery() {
        const { search } = useLocation();
        return new URLSearchParams(search);
    }

    const history = useHistory();
    const queryString = useQuery();
    const role = JSON.parse(sessionStorage.getItem("user")).role;

    const [uploadedItem, setUploadedItem] = useState([])
    const [status, setStatus] = useState([]);
    const shownStatus = {
        "all": {shown: "All", color: ""},
        "canceled": {shown: "Canceled", color: "default", desc: "Diagnosis has been canceled because of server errors."},
        "waiting": {shown: "0 Waiting", color: "processing", desc: "Diagnosis is waiting in queue before being in progress"},
        "in progress": {shown: "1 Not Labeled", color: "error", desc: "Diagnosis is still in progress."},
        "annotated": {shown: "2 AI-Annotated", color: "warning", desc: "Diagnosis succeeds with the result annotated by AI."},
        "reviewed": {shown: "3 Expert-Annotated", color: "success", desc: "The result is finalized by experts."},
    }
    const [hospitals, setHospitals] = useState([]);
    const [reload, setReload] = useState("");
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

    const columns = [
        {
            title: "No.",
            dataIndex: "index",
            key: "index",
            align: "center",
            // ellipsis: {
            //     showTitle: false
            // },
            sorter: {
                compare: (a, b) => a.index.localeCompare(b.index)
            },
            showSorterTooltip: false,
            // render: (no) => (
            //     <Tooltip placement="topLeft" title={no}>
            //         {no}
            //     </Tooltip>
            // ),
        },
        {
            title: 
                <span>
                    Status
                    <Popover
                        placement="right"
                        content={
                            <span onClick={(e) => e.stopPropagation()}>
                                {Object.keys(shownStatus).splice(Object.keys(shownStatus).indexOf("canceled"), 6).map((key) => (
                                    <Row style={{marginTop: key === "canceled" ? 0 : "10px"}}>
                                        <Col span={9}>
                                            <Tag color={shownStatus[key].color} style={{marginTop: "2px", fontSize: "small"}}>
                                                {shownStatus[key].shown}
                                            </Tag>
                                        </Col>
                                        <Col span={15}>
                                            <span>{shownStatus[key].desc}</span>
                                        </Col>
                                    </Row>
                                ))}
                            </span>
                        }
                        trigger="hover"
                    >
                        <Button type="link" icon={<InfoCircleOutlined />} style={{color: "black"}} />
                    </Popover>
                </span>,
            dataIndex: "status",
            key: "status",
            align: "center",
            sorter: {
                compare: (a, b) => shownStatus[a.status].shown.localeCompare(shownStatus[b.status].shown)
            },
            showSorterTooltip: false,
            render: (status) => {
                return(
                    <Tag color={shownStatus[status].color}  style={{width: "100%", fontSize: "small"}}>
                        {shownStatus[status].shown}
                    </Tag>
                );
            }
        },
        {
            title: "HN",
            dataIndex: "HN",
            key: "HN",
            align: "center",
            sorter: {
                compare: (a, b) => {
                    // if (a.HN == null) {
                    //     a.HN = "";
                    // } if (b.HN == null) {
                    //     b.HN = "";
                    // }
                    return a.HN.toString().localeCompare(b.HN.toString());
                }
            },
            showSorterTooltip: false,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
            sorter: {
                compare: (a, b) => {
                    // if (a.name == null) {
                    //     a.name = "";
                    // } if (b.name == null) {
                    //     b.name = "";
                    // }
                    return a.name.localeCompare(b.name);
                }
            },
            showSorterTooltip: false,
        },
        {
            title: "Label",
            dataIndex: "label",
            key: "label",
            align: "center",
            // sorter: {
            //     compare: (a, b) => a.finding.localeCompare(b.finding)
            // },
            showSorterTooltip: false,
        },
        {
            title: "Prediction",
            dataIndex: "prediction",
            key: "prediction",
            align: "center",
            sorter: {
                compare: (a, b) => a.prediction.localeCompare(b.prediction)
            },
            showSorterTooltip: false,
        },
        {
            title: "Evaluation",
            dataIndex: "evaluation",
            key: "evaluation",
            align: "center",
            // sorter: {
            //     compare: (a, b) => a.finding.localeCompare(b.finding)
            // },
            showSorterTooltip: false,
            render: (e) => {
                switch (e) {
                    case true:
                        return <CheckOutlined />;
                    case false:
                        return <CloseOutlined />;
                    default:
                        return <MinusOutlined />;
                }
            },
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
            sorter: {
                compare: (a, b) => new Date(a.date) - new Date(b.date)
            },
            showSorterTooltip: false,
            width: 150,
        },
        {
            title: "Clinician",
            dataIndex: "clinician",
            key: "clinician",
            align: "center",
            sorter: {
                compare: (a, b) => a.clinician.localeCompare(b.clinician)
            },
            showSorterTooltip: false,
        },
        {
            // title: "Action",
            key: "action",
            dataIndex: "action",
            render: (_, report) => {
                return(
                    report.status === "waiting" || report.status === "in progress" ? null :
                    <div className="center-div">
                        {report.status === "canceled" ?
                            null : 
                            <EyeOutlined
                                className="clickable-icon"
                                onClick={() => {
                                    history.push(`/viewresults/${role === "clinician" ? "edit" : "view"}/${report._id}/?${queryString}`);
                                }}
                            />}
                        {role === "clinician" && <Popconfirm
                            title="Delete this result?"
                            onConfirm={() => {
                                setLoaded(false);
                                deleteReport(report._id)
                                .then((res) => {
                                    // window.location.reload();
                                    reload === "" ? setReload("reload") : setReload("")
                                    setLoaded(false);
                                }).catch((err) => {
                                    console.log(err.response);
                                })
                            }}
                            placement="topRight"
                            okButtonProps={{ className: "primary-btn popconfirm" }}
                            cancelButtonProps={{ style: { display: "none" } }}
                        >
                            <DeleteOutlined
                                className="clickable-icon"
                                style={{ marginLeft: report.status === "canceled" ? 0 : "8px" }}
                            />
                        </Popconfirm>}
                    </div>
                );
            },
            align: "center",
        },
    ];

    useEffect(() => {
        setLoaded(false);
        viewResults()
        .then((response) => {
            console.log(response);
            // add status, hospitals list
            const status = ["all"];
            const hospitals = ["All"];
            for (const i in response.data) {
                if (!status.includes(response.data[i]["status"])) {
                    status.push(response.data[i]["status"]);
                }
                if (!hospitals.includes(response.data[i]["hospital"])) {
                    hospitals.push(response.data[i]["hospital"]);
                }
            }
            // filter data by search query params
            let filter_data = response.data.filter(
                (item, i) =>
                (queryString.get("patient_HN") === null
                    ? true
                    : (item.HN !== null) && (item.HN.includes(queryString.get("patient_HN")))) &&
                (queryString.get("status") === null
                    ? true
                    : item.status === queryString.get("status")) &&
                (queryString.get("hospital") === null
                    ? true
                    : item.hospital === queryString.get("hospital")) &&
                (queryString.get("clinician") === null
                    ? true
                    : item.clinician.toLowerCase().includes(queryString.get("clinician").toLowerCase())) &&
                (queryString.get("no") === null
                    ? true
                    : item.index.toLowerCase().includes(queryString.get("no").toLowerCase())) &&
                (queryString.get("from") === null
                    ? true
                    : new Date(item.date) >=
                    new Date(queryString.get("from"))) &&
                (queryString.get("to") === null
                    ? true
                    : new Date(item.date) <= new Date(queryString.get("to")))
            );
            // default sort
            filter_data.sort((a, b) =>
                ((a.status === "waiting" || b.status === "waiting" || a.status === "in progress" || b.status === "in progress")
                && shownStatus[a.status].shown.localeCompare(shownStatus[b.status].shown)) // change to expert annotated ?
                || new Date(b.date) - new Date(a.date) // created at -> update at ?
            );
            // add key & adjust data
            for (const i in filter_data) {
                filter_data[i].key = (parseInt(i) + 1).toString();
                if (filter_data[i].label === null) {
                    filter_data[i].label = "-";
                    filter_data[i].evaluation = null;
                }
                filter_data[i].date = new Date(
                    filter_data[i].date
                ).toLocaleString("sv-SE");
            }
            setUploadedItem(filter_data);
            setStatus(status);
            setHospitals(hospitals);
            setLoaded(true);
        }).catch((err) => console.log(err.response));
    }, [reload, props])

    return (
        <div className="content">
            <Form layout="inline">
                <Form.Item
                    name="patient_HN"
                    key="patient_HN"
                    label="Patient's HN"
                    initialValue={queryString.get("patient_HN")}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >
                    <Input
                        className="input-text"
                        onChange={(item) => {
                            item.target.value === "" ? queryString.delete("patient_HN") : queryString.set("patient_HN", item.target.value);
                        }}
                        style={{width:"200px"}} />
                </Form.Item>
                <Form.Item
                    name="status"
                    key="status"
                    label="Status"
                    initialValue={queryString.get("status") === null ? "All" : queryString.get("status")}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >                
                    <Select
                        className="search-component"
                        onChange={(value) => {
                            value === "all" ? queryString.delete("status") : queryString.set("status", value);
                        }}>
                            {status.map((status, i) => (
                                <Option key={i} value={status}>
                                    {shownStatus[status].shown}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="hospital"
                    key="hospital"
                    label="Hospital"
                    initialValue={queryString.get("hospital") === null ? "All" : queryString.get("hospital")}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >                
                    <Select
                        className="search-component"
                        onChange={(value) => {
                            value === "All" ? queryString.delete("hospital") : queryString.set("hospital", value);
                        }}>
                            {hospitals.map((hospital, i) => (
                                <Option key={i} value={hospital}>
                                    {hospital}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="clinician"
                    key="clinician"
                    label="Clinician"
                    initialValue={queryString.get("clinician")}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >
                    <Input
                        className="input-text"
                        onChange={(item) => {
                            item.target.value === "" ? queryString.delete("clinician") : queryString.set("clinician", item.target.value);
                        }}
                        style={{width:"200px"}} />
                </Form.Item>
            </Form>
            <Form layout="inline">
                <Form.Item
                    name="no"
                    key="no"
                    label="No."
                    initialValue={queryString.get("no")}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >
                    <Input
                        className="input-text"
                        onChange={(item) => {
                            item.target.value === "" ? queryString.delete("no") : queryString.set("no", item.target.value);
                        }}
                        style={{width:"200px"}} />
                </Form.Item>
                <Form.Item
                    name="from"
                    key="from"
                    label="From"
                    initialValue={queryString.get("from") === null ? null : moment(new Date(queryString.get("from")))}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >   
                    <DatePicker
                        onChange={(date) => {
                            date === null ? queryString.delete("from") : queryString.set("from", date.startOf('day').toDate().toLocaleString("sv-SE"));
                        }}
                        style={{width:"200px"}} />
                </Form.Item>
                <Form.Item
                    name="to"
                    key="to"
                    label="To"
                    initialValue={queryString.get("to") === null ? null : moment(new Date(queryString.get("to")))}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >
                    <DatePicker
                        onChange={(date) => {
                            date === null ? queryString.delete("to") : queryString.set("to", date.startOf('day').toDate().toLocaleString("sv-SE"));
                        }}
                        style={{width:"200px"}} />
                </Form.Item>
                <Form.Item style={{marginLeft:"20px"}}>
                    <Button
                        className="primary-btn smaller"
                        style={{marginTop:"32px"}}
                        onClick={() => {
                            history.push(`/viewresults/?${queryString}`);
                            // window.location.reload();
                            reload === "" ? setReload("reload") : setReload("");
                            setLoaded(false);
                        }}>
                            Search
                    </Button>
                </Form.Item>
            </Form>
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
                <Row style={{margin: "40px 0 8px 0"}}>
                    <Col span={12}>
                            <label
                                className="clickable-label"
                                style={{color: "#9772fb", fontWeight: 500, display: "flex", alignItems: "center"}}
                                onClick={() => {
                                    // window.location.reload();
                                    reload === "" ? setReload("reload") : setReload("")
                                    setLoaded(false);
                                }}>
                                    <ReloadOutlined style={{marginRight: "5px"}} />
                                    Reload
                            </label>
                    </Col>
                    <Col span={12}>
                        <div style={{float: "right", marginRight: "5px"}}>
                            <label style={{ fontWeight: 500 }}>
                                {`${uploadedItem.length} report(s)`}
                            </label>
                        </div>
                    </Col>
                </Row>}
            {loaded &&
                <Table 
                    columns={columns} 
                    dataSource={uploadedItem} 
                    size="small"
                    className="view-results-table"
                    pagination={
                        uploadedItem.length > 20 && {
                            size: "small",
                            hideOnSinglePage: uploadedItem.length <= 20,
                            onChange(page, pageSize) {
                            setPagination({ page: page, pageSize: pageSize });
                            },
                            showQuickJumper: uploadedItem.length / pagination.pageSize > 12,
                            showSizeChanger: uploadedItem.length > 20,
                            pageSizeOptions: ["10", "20", "50", "100"].reduce(
                            (current, item) => {
                                return current.slice(-1) > uploadedItem.length
                                ? current
                                : [...current, item];
                            },
                            []
                            ),
                            position: ["bottomRight"],
                        }
                        }
                />}
        </div>
    )
}
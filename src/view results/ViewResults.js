import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, Select, DatePicker, Tag, Spin, Popconfirm, Popover, Row, Col } from "antd";
import {
    EyeOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, LoadingOutlined,
    InfoCircleOutlined, CheckOutlined, CloseOutlined
} from '@ant-design/icons';
import { viewResults, deleteReport } from "../api/reports";
import { useHistory, useLocation } from "react-router-dom";
import * as moment from "moment";

const LoadingIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: "#9772fb" }} spin />
);

const CheckIcon = (
    <CheckOutlined style={{ color: "#45c01a", fontWeight: 2000 }} />
);

const CloseIcon = (
    <CloseOutlined style={{ color: "#f32424", fontWeight: 500 }} />
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
    const status = [
        "all", "canceled", "in progress", "annotated", "reviewed"
    ];
    const shownStatus = {
        "all": {shown: "All", color: ""},
        "canceled": {shown: "Canceled", color: "default", desc: "Diagnosis has been canceled because of server errors."},
        // "waiting": {shown: "Waiting", color: "processing", desc: "Diagnosis is waiting in queue before being processed"},
        "in progress": {shown: "Not Labeled", color: "error", desc: "Diagnosis is still processing."},
        "annotated": {shown: "AI-Annotated", color: "warning", desc: "Diagnosis succeeds with a result annotated by AI."},
        "reviewed": {shown: "Expert-Annotated", color: "success", desc: "The result has been reviewed by experts."},
    }
    const hospitals = [
        "All", "Chulalongkorn University", "Prince of Songkla University", "Thammasat University"
    ];
    const model = [
        {name: "all", shown: "All"},
        {name: "questionnaire", shown: "Questionnaire"},
        {name: "image", shown: "X-Ray Image"},
        {name: "integrate", shown: "Questionnaire + Image"},
    ];
    const [reload, setReload] = useState("");
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

    const columns = [
        // {
        //     title: "No.",
        //     dataIndex: "index",
        //     key: "index",
        //     align: "center",
        //     sorter: {
        //         compare: (a, b) => a.index.localeCompare(b.index)
        //     },
        //     showSorterTooltip: false,
        // },
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
            width: 150,
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
            width: 120,
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
            width: 120,
        },
        {
            title: "Final Diagnosis",
            dataIndex: "label",
            key: "label",
            align: "center",
            showSorterTooltip: false,
            render: (label) => {
                switch (label) {
                    case "non-DD":
                        return <label style={{ color: "#45c01a", fontWeight: 500 }}>{label}</label>
                    case "DD":
                        return <label style={{ color: "#f32424", fontWeight: 500 }}>{label}</label>
                    default:
                        return "?";
                }
            },
        },
        {
            title: "AI Prediction",
            dataIndex: "prediction",
            key: "prediction",
            align: "center",
            sorter: {
                compare: (a, b) => a.prediction.localeCompare(b.prediction)
            },
            showSorterTooltip: false,
            render: (p) => {
                switch (p) {
                    case "non-DD":
                        return <label style={{ color: "#45c01a", fontWeight: 500 }}>{p}</label>
                    case "DD":
                        return <label style={{ color: "#f32424", fontWeight: 500 }}>{p}</label>
                }
            },
        },
        {
            title: 
                <span>
                    Eval
                    <Popover
                        placement="right"
                        content={
                            <span onClick={(e) => e.stopPropagation()}>
                                Comparison between <br /> Final Diagnosis and AI Prediction
                                <Row style={{marginTop: "10px"}}>
                                    <Col span={1} />
                                    <Col span={5}>
                                        {CheckIcon}
                                    </Col>
                                    <Col span={18}>
                                        <span>Same result</span>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "10px"}}>
                                    <Col span={1} />
                                    <Col span={5}>
                                        {CloseIcon}
                                    </Col>
                                    <Col span={18}>
                                        <span>Different result</span>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "10px"}}>
                                    <Col span={1} />
                                    <Col span={5}>
                                        <span style={{paddingLeft: "3px"}}>?</span>
                                    </Col>
                                    <Col span={18}>
                                        <span>Unknown</span>
                                    </Col>
                                </Row>
                            </span>
                        }
                        trigger="hover"
                    >
                        <Button type="link" icon={<InfoCircleOutlined />} style={{color: "black"}} />
                    </Popover>
                </span>,
            dataIndex: "evaluation",
            key: "evaluation",
            align: "center",
            showSorterTooltip: false,
            width: 85,
            render: (e) => {
                switch (e) {
                    case true:
                        return CheckIcon;
                    case false:
                        return CloseIcon;
                    default:
                        // return <MinusOutlined />;
                        return "?";
                }
            },
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
            sorter: {
                compare: (a, b) => new Date(a.date) - new Date(b.date),
                // multiple: 1,
            },
            showSorterTooltip: false,
            width: 145,
        },
        {
            title: "Clinician",
            dataIndex: "clinician",
            key: "clinician",
            align: "center",
            sorter: {
                compare: (a, b) => a.clinician.localeCompare(b.clinician),
                // multiple: 2,
            },
            showSorterTooltip: false,
            width: 100,
        },
        {
            title: "Hospital",
            dataIndex: "hospital",
            key: "hospital",
            align: "center",
            sorter: {
                compare: (a, b) => a.hospital.localeCompare(b.hospital)
            },
            showSorterTooltip: false,
            width: 160,
        },
        {
            // title: "Action",
            key: "action",
            dataIndex: "action",
            render: (_, report) => {
                return(
                    report.status === "waiting" || report.status === "in progress" ? null :
                    <div className="center-div">
                        {report.status !== "canceled" &&
                            <EyeOutlined
                                className="clickable-icon"
                                onClick={() => {
                                    history.push(`/viewresults/view/${report._id}/?${queryString}`);
                                }}
                            />}
                        {report.status !== "canceled" && role === "clinician" &&
                            <EditOutlined
                                className="clickable-icon"
                                style={{ marginLeft: "8px" }}
                                onClick={() => {
                                    history.push(`/viewresults/edit/${report._id}/?${queryString}`);
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
            width: 50,
        },
    ];

    useEffect(() => {
        setLoaded(false);
        viewResults()
        .then((response) => {
            // console.log(response);
            // filter data by search query params
            let toDate = null;
            if (queryString.get("to")) {
                toDate = new Date(queryString.get("to"));
                toDate.setHours(23, 59, 59);
            }
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
                // (queryString.get("no") === null
                //     ? true
                //     : item.index.toLowerCase().includes(queryString.get("no").toLowerCase())) &&
                (queryString.get("from") === null
                    ? true
                    : new Date(item.date) >= new Date(queryString.get("from"))) &&
                (queryString.get("to") === null
                    ? true
                    : new Date(item.date) <= toDate) &&
                (queryString.get("model") === null
                    ? true
                    : item.model === queryString.get("model"))
            );
            // default sort
            filter_data.sort((a, b) => new Date(b.date) - new Date(a.date));
            // add key & adjust data
            for (const i in filter_data) {
                filter_data[i].key = (parseInt(i) + 1).toString();
                if (filter_data[i].label === null) {
                    // filter_data[i].label = "?";
                    filter_data[i].evaluation = null;
                } else if (filter_data[i].label === filter_data[i].prediction) {
                    filter_data[i].evaluation = true;
                } else {
                    filter_data[i].evaluation = false;
                }
                filter_data[i].date = new Date(
                    filter_data[i].date
                ).toLocaleString("sv-SE");
            }
            setUploadedItem(filter_data);
            setLoaded(true);
        }).catch((err) => console.log(err.response));
    }, [reload, props])

    return (
        <div className="content">
            <Form layout="inline" className="view-results-form" style={{ maxWidth: "90%" }}>
                <Form.Item
                    name="patient_HN"
                    key="patient_HN"
                    label="Patient's HN"
                    initialValue={queryString.get("patient_HN")}
                >
                    <Input
                        allowClear
                        className="input-text fixed-size smaller"
                        onChange={(item) => {
                            item.target.value === "" ? queryString.delete("patient_HN") : queryString.set("patient_HN", item.target.value);
                        }}
                     />
                </Form.Item>
                <Form.Item
                    name="status"
                    key="status"
                    label="Status"
                    initialValue={queryString.get("status") === null ? "All" : queryString.get("status")}
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
                >
                    <Input
                        allowClear
                        className="input-text fixed-size smaller"
                        onChange={(item) => {
                            item.target.value === "" ? queryString.delete("clinician") : queryString.set("clinician", item.target.value);
                        }}
                    />
                </Form.Item>
                {/* <Form.Item
                    name="no"
                    key="no"
                    label="No."
                    initialValue={queryString.get("no")}
                    style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}
                >
                    <Input
                        allowClear
                        className="input-text"
                        onChange={(item) => {
                            item.target.value === "" ? queryString.delete("no") : queryString.set("no", item.target.value);
                        }}
                        style={{width:"200px"}} />
                </Form.Item> */}
                <Form.Item
                    name="from"
                    key="from"
                    label="From"
                    initialValue={queryString.get("from") === null ? null : moment(new Date(queryString.get("from")))}
                >   
                    <DatePicker
                        onChange={(date) => {
                            date === null ? queryString.delete("from") : queryString.set("from", date.startOf('day').toDate().toLocaleString("sv-SE"));
                        }}
                        style={{ width:"200px" }} />
                </Form.Item>
                <Form.Item
                    name="to"
                    key="to"
                    label="To"
                    initialValue={queryString.get("to") === null ? null : moment(new Date(queryString.get("to")))}
                >
                    <DatePicker
                        onChange={(date) => {
                            date === null ? queryString.delete("to") : queryString.set("to", date.startOf('day').toDate().toLocaleString("sv-SE"));
                        }}
                        style={{ width:"200px" }} />
                </Form.Item>
                <Form.Item
                    name="model"
                    key="model"
                    label="Model"
                    initialValue={queryString.get("model") === null ? "all" : queryString.get("model")}
                >                
                    <Select
                        className="search-component"
                        onChange={(value) => {
                            value === "all" ? queryString.delete("model") : queryString.set("model", value);
                        }}>
                            {model.map((m, i) => (
                                <Option key={i} value={m.name}>
                                    {m.shown}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label=" "
                    colon={false}
                >
                    <Button
                        className="primary-btn smaller"
                        onClick={() => {
                            history.push(`/viewresults/?${queryString}`);
                            // window.location.reload();
                            reload === "" ? setReload("reload") : setReload("");
                            setLoaded(false);
                        }}>
                            Search
                    </Button>
                    {window.location.search && <label
                        style={{ color: "#f32424", fontWeight: 500, marginLeft: "15px", cursor: "pointer" }}
                        onClick={() => window.location.search = ""}
                    >
                        Clear all filters
                    </label>}
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
                <Row justify="space-between" style={{ margin: "40px 0 8px 0" }}>
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
                    <label style={{ fontWeight: 500, marginRight: "5px" }}>
                        {`${uploadedItem.length} report(s)`}
                    </label>
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
                                }, []),
                            position: ["bottomRight"],
                        }
                        }
                />}
        </div>
    )
}
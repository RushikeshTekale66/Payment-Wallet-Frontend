import React, { useEffect } from 'react'
import PageTitle from '../../Components/PageTitle';
import { Table, Tabs, message } from 'antd'
import NewRequestModel from './newRequestModel';
import { getAllRequestByUser, updateRequestStatus } from '../../apicalls/request';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ReloadUser } from '../../Redux/userSlice';
const { TabPane } = Tabs;

const Request = () => {
    const [data, setData] = React.useState([]);
    const [showNewRequestModel, setShowNewRequestModel] = React.useState(false);
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const updateStatus = async (record, status) => {
        try {

            console.log("Current status", status);

            if (status === "accepted" && record.amount > user.balence) {
                message.error("Insufficient funds");
                return;
            }
            else {
                // dispatch(showLoading());
                const responce = await updateRequestStatus({
                    ...record,
                    status
                });
                // dispatch(HideLoading());
                if (responce.success) {
                    message.success(responce.message);
                    getData();
                    dispatch(ReloadUser(true));
                }
                else {
                    message.error(responce.message);
                }
            }
        }
        catch (error) {
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: "Request ID",
            dataIndex: "_id"
        },
        {
            title: "Sender",
            dataIndex: "sender",
            render(sender) {
                return sender.firstName + " " + sender.lastName;
            }
        },
        {

            title: "Receiver",
            dataIndex: "receiver",
            render(receiver) {
                return receiver.firstName + " " + receiver.lastName
            }
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Date",
            dataIndex: "date",
            render(text, record) {
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
            }
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                if (record.status === "pending" && record.receiver._id === user._id) {
                    return (
                        <div className='flex gap-1'>
                            <h1 className='text-sm underline' onClick={() => updateStatus(record, "rejected")}>Reject</h1>
                            <h1 className='text-sm underline' onClick={() => updateStatus(record, "accepted")}>Accept</h1>
                        </div>
                    )
                }
            }

        }
    ]

    const getData = async () => {
        try {
            // dispatch(showLoading());
            const responce = await getAllRequestByUser();
            if (responce.success) {
                const sendData = responce.data.filter((item) => item.sender._id === user._id);
                setData(responce.data);
                const receivedData = responce.data.filter((item) => item.receiver._id === user._id);

                setData({
                    sent: sendData,
                    received: receivedData,
                })
            }
            // dispatch(HideLoading());
        }
        catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className='flex justify-between'>
                <PageTitle title="Requests" />
                <button className='primary-outlined-btn' onClick={() => setShowNewRequestModel(true)}>Request Funds</button>
            </div>

            <Tabs defaultActiveKey='1'>
                <TabPane tab="Sent" key="1">
                    <Table columns={columns} dataSource={data.sent} />
                </TabPane>
                <TabPane tab="Received" key="2">
                    <Table columns={columns} dataSource={data.received} />
                </TabPane>
            </Tabs>

            {showNewRequestModel && (
                <NewRequestModel showNewRequestModel={showNewRequestModel}
                    setshowNewRequestModel={setShowNewRequestModel}
                    reloadData={getData} />
            )}
        </div>
    )
}

export default Request
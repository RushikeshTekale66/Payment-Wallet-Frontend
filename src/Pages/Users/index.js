import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { GetAllUsers, UpdateUserVerifiedStatus } from '../../apicalls/users';
import { message, Table } from 'antd';
import PageTitle from '../../Components/PageTitle';

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            // dispatch(ShowLoading());
            const responce = await GetAllUsers();
            // dispatch(HideLoading());
            if (responce.success) {
                setUsers(responce.data);
            }
            else {
                message.error(responce.error);
            }
        }
        catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const updateStatus = async (record, isVerified) => {
        try {
            // dispatch(ShowLoading());
            const responce = await UpdateUserVerifiedStatus({
                selectedUser: record._id,
                isVerified
            })
            // dispatch(HideLoading());
            if (responce.success) {
                message.success(responce.message);
                getData();
            }
            else {
                message.error(responce.message)
            }
        }
        catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const column = [
        {
            title: "First Name",
            dataIndex: "firstName"
        },
        {
            title: "Last Name",
            dataIndex: "lastName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber"
        },
        {
            title: "Verified",
            dataIndex: "isVerified",
            render: (text, record) => {
                return text ? "Yes" : "No"
            }
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return (
                    <div className='flex gap-1'>
                        {record.isVerified ? (<button className='primary-outlined-btn' onClick={()=>updateStatus(record, false)}>Suspend</button>) : (<button className='primary-outlined-btn' onClick={()=>updateStatus(record, true)}>Activate</button>)}
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <PageTitle title={Users} />
            <Table dataSource={users} columns={column} className='mt-2' />

        </div>
    )
}

export default Users
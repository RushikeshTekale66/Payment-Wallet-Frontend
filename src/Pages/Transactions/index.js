import React, { useEffect } from 'react'
import PageTitle from '../../Components/PageTitle'
import { message, Table } from 'antd';
import TransactionFundsModel from './TransactionFundsModel'
// import { useDispatch } from 'react-redux';
import { GetTransactionsOfUser } from '../../apicalls/transactions';
import moment from "moment";
import { useSelector } from 'react-redux';
import DepositModle from './DepositModle';

const Transactions = () => {
  const [showTransferFundsModel, setshowTransactionFundsModel] = React.useState(false);
  const [showDepositeModel, setShowDepositModel] = React.useState(false);
  // const dispatch = useDispatch();
  const [data = [], setData] = React.useState([]);
  const { user } = useSelector(state => state.users);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      }
    },
    {
      title: "Transaction ID",
      dataIndex: "_id"
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        if(record.sender._id === record.receiver._id){
              return "Deposit"
        }
        else if(record.sender._id === user._id){
          return "Debit";
        }
        else{
          return "Credit";
        }
      }
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user._id ?
          <div>
            <h1 className='text-sm'>{record.receiver.firstName} {record.receiver.lastName}</h1>
          </div>
          :
          <div>
            <h1 className='text-sm'>{record.sender.firstName} {record.sender.lastName}</h1>
          </div>
      }
    },
    {
      title: "Reference",
      dataIndex: "reference"
    },
    {
      title: "Status",
      dataIndex: "status"
    }
  ]

  const getData = async () => {
    try {
      // dispatch(showLoading());
      const responce = await GetTransactionsOfUser();
      if (responce.success) {
        setData(responce.data);
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
        <PageTitle title="Transactions" />

        <div className='flex gap-1'>
          <button className='primary-outlined-btn' onClick={()=>setShowDepositModel(true)}>Deposit </button>
          <button className='primary-contained-btn' onClick={() => setshowTransactionFundsModel(true)}>Transfer </button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} className='mt-2' />

      {showTransferFundsModel && <TransactionFundsModel showTransferFundsModel={showTransferFundsModel} setshowTransactionFundsModel={setshowTransactionFundsModel} 
      reloadData={getData}/>}

      {showDepositeModel && <DepositModle showDepositeModel={showDepositeModel}
      setShowDepositModel = {setShowDepositModel}
      reloaddata={getData}/>}

    </div>
  )
}

export default Transactions
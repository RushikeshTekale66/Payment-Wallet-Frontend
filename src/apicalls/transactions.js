const { axiosInstance } = require(".");

//verify receiver account

export const VerifyAccount = async (payload) => {
    try {
        const { data } = await axiosInstance.post(
            "/api/transactions/verify-account",
            payload
        );
        return data;
    }
    catch (error) {
        return error.responce.data;
    }
}

//transfer funds
export const TransferFunds = async (payload) => {
    try {
        const { data } = await axiosInstance.post("/api/transactions/transfer-funds", payload);
        return data;
    }
    catch (error) {
        return error.responce.data;
    }
}

//get all transaction for a user
export const GetTransactionsOfUser = async ()=>{
    try{
        const {data} = await axiosInstance.post("/api/transactions/get-all-transactions-by-user");
        return data;
    }
    catch(error){
        return error.responce.data;
    }
}

//deposite funds using stripe
export const DepositeFunds = async(payload)=>{
    try{
        const {data} = await axiosInstance.post("/api/transactions/deposit-funds", payload);
        return data;
    }
    catch(error){
        return error.responce.data;
    }
}
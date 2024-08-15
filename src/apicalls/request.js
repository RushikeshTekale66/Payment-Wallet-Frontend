import { axiosInstance } from ".";

//get all requests for a user
export const getAllRequestByUser = async()=>{
    try{
        const {data} = await axiosInstance.post("/api/requests/get-all-requests-by-user");
        return data;
    }
    catch(error){
        return error.responce.data;
    }
}

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

//send a request to another user
export const sendRequest = async (request)=>{
    try{
        const {data} = await axiosInstance.post(
            "/api/requests/send-request",
            request
        );
        return data;
    }
    catch(error){
        return error.responce.data;
    }
}

//update a request status
export const updateRequestStatus = async(request)=>{
    try{
        const {data} = await axiosInstance.post(
            "/api/requests/update-request-status",
            request
        );
        return data
    }
    catch(error){
        return error.responce.data;
    }
}
import React, { useEffect } from 'react'
import { GetUserInfo } from '../apicalls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadUser, SetUser } from '../Redux/userSlice';
import DefaultLayout from './DefaultLayout';

const ProtectedRoute = (props) => {

    const {user, reloadUser} = useSelector(state=>state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async()=>{
        try{
            const response = await GetUserInfo();
            if(response.success){
                dispatch(SetUser(response.data));
            }
            else{
                message.error(response.message);
                navigate("/login");
            }
            dispatch(ReloadUser(false));
        }
        catch(error){
            message.error(error.message);
            navigate("/login");
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            if(!user){
                getData();
            }
        }
        else{
            navigate("/login");
        }
    }, []);

    useEffect(()=>{
        if(reloadUser){
            getData();
        }
    }, [reloadUser])

  return user && (
    <div>
        <DefaultLayout>{props.children}</DefaultLayout>
    </div>
  )
}

export default ProtectedRoute
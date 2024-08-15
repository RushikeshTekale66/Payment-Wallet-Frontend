import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoutes = (props) => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate("/");
        }
    }, []);

  return <div>{props.childern}</div>
}

export default PublicRoutes;
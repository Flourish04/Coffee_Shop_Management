import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ element, allowedRoles }) {

    const role = localStorage.getItem("role");


    if (allowedRoles.includes(role)) {
        return element
    }
    else {
        return <Navigate to={"/login"} />
    }


}

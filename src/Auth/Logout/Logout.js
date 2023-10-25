import React from "react";
import { Navigate } from 'react-router-dom'
import sessionStorage from "src/Services/storage/session.service";

class Logout extends React.Component{

    render(){
        sessionStorage.clearSession()
        return <Navigate to='/' />
    }
}

export default Logout;
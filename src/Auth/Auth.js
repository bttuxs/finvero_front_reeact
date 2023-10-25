import './Auth.scss';
import React from 'react';
import  sessionStorage from 'src/Services/storage/session.service';
import {NotificationContext} from '../Provider/Notification/NotificactionContextProvider'

const LoginComponent = React.lazy(() => import('./Login/Login'))
const RegistryComponent = React.lazy(() => import('./Registry/Registry'))

class Auth extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            authLogin: false,
        }
    }
    static contextType = NotificationContext

    componentDidMount(){
        if(sessionStorage.validSession()){
            this.setState({authLogin: true})
        }
    }


    render() {
        return <div id='entry-page'>
            <div className="min-h-full flex items-center justify-center sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <LoginComponent />
                    <br></br>
                    <RegistryComponent />
                </div>
            </div>
        </div>;
    }
}

export default Auth;

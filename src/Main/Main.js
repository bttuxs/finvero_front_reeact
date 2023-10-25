import './Main.scss';
import React from 'react';
import {
    Outlet,
    Navigate
} from "react-router-dom";
import Sidebar from './Layout/Sidebar/Sidebar'
import Header from './Layout/Header/Header'
import sessionStorage from 'src/Services/storage/session.service';


class Main extends React.Component{

    componentDidUpdate(){
        console.log('aqui')
    }

    validSession (){

    }
    

    render(){
        let session = sessionStorage.validSession()

        return session?(<div className="flex overflow-x-hidden h-screen">
                <Sidebar />
                <div className="flex-1">
                    <Header />
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>):(
                <Navigate to='/' />
            )
    }
}

export default Main;
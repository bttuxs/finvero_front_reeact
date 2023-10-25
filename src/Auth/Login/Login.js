import './Login.scss'
import React from 'react';
import  sessionStorage from 'src/Services/storage/session.service';
import {NotificationContext} from 'src/Provider/Notification/NotificactionContextProvider'
import { LoginService } from 'src/Services/Http/Login-service';
import { Navigate } from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            authLogin: false,
            user: "",
            form: {
                email: ''
            }
        }
    }
    static contextType = NotificationContext

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const objValue = this.state.form;
        objValue[name] = value        
        this.setState({form: objValue});
    }

    async getUsers(e){
        e.preventDefault();
        this.context.setGlobalSpinner(true)
        try{
            if(this.state.form.email){
                let dataUser =await LoginService.login(this.state.form.email);
                sessionStorage.setSession(JSON.stringify(dataUser.data))
                this.context.setGlobalSpinner(false)
                this.context.setGlobalAlert({show: true, message: 'Autenticacion Exitosa', type: 'success'})
                this.context.setUserValid(dataUser)
                this.setState({authLogin: true})
            }else{
                this.context.setGlobalAlert({show: true, message: 'Complete el formulario', type: 'error'})
            }
        }catch(e){
            console.log(e)
        }
    }

    render() {
        const { authLogin } = this.state;
        if(!authLogin){
            return this.cmp()
        }else{
            return <Navigate to='/main' />
        }
    }


    cmp(){
        return <div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className='text-2xl'>Ingresar</div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                            <label htmlFor="email-address" className="sr-only">Usuario</label>
                            <input id="email-address" name="email" type="text" value={this.state.form.email || ''} onChange={this.handleInputChange} autoComplete="off" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" onClick={(e) => this.getUsers(e)} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-5">
                                <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Entrar
                            </button>
                        </div>
                    </form>
                </div>
    }
}

export default Login
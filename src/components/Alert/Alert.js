import React, {useContext}  from 'react';
import { NotificationContext } from '../../Provider/Notification/NotificactionContextProvider'

const Alert = props => {
    const {isGlobalAlertOn, setGlobalAlert} = useContext(NotificationContext)
    const typeAlert = {
        success : "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
        info: "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800",
        error: "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800",
    }
    const alertSelect = typeAlert[isGlobalAlertOn.type]
    let timer = null;
    if(isGlobalAlertOn.show){
        
        // eslint-disable-next-line no-unused-vars
        timer = setTimeout(() => {
            setGlobalAlert(false)
        }, 5000)     
    }
    return isGlobalAlertOn.show? <div hidden={!isGlobalAlertOn.show} className={"transition duration-150 ease-out float absolute p-4 mb-4 text-sm rounded-lg "+alertSelect} role="alert">
    <span className="font-medium">{isGlobalAlertOn.message}</span>
  </div>:null
}

export default Alert;
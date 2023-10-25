import React, { useState, createContext } from 'react'

export const NotificationContext = createContext();
const configAlert = {
    show: false,
    message: 'aqui',
    type: 'info'
}
const NotificationContextProvider = (props) => {
    const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false)
    const [isGlobalAlertOn, setGlobalAlert] = useState(configAlert)
    const [userValid, setUserValid] = useState(null)
    return (
        <NotificationContext.Provider value={{isGlobalSpinnerOn, setGlobalSpinner, isGlobalAlertOn, setGlobalAlert, userValid, setUserValid}}>
            {props.children}
        </NotificationContext.Provider>
      )
}


export default NotificationContextProvider;
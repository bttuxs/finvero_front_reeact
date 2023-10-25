import React from "react";
import { NavLink } from "react-router-dom";
class Header extends React.Component{

    render(){
        return(
            <header className="flex h-20 items-center p-4 text-semibold text-gray-100 bg-blue-900 md:order-2">
                Creacion de QR
                <div className="flex absolute top-3 right-1 r-0 p-1">
                    <NavLink exact="true" to="/logout" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700">
                        <img className="w-10 h-10 " src="/assets/icons/exit.svg" alt=""/>
                    </NavLink>
                </div>
            </header>
        )
    }
}

export default Header;
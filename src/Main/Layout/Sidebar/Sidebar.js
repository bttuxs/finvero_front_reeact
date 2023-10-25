import React from 'react'
import { Link } from "react-router-dom"

class Sidebar extends React.Component{
    render (){
        return (<aside className="flex-shrink-0 w-60 flex flex-col transition-all duration-300 dark:bg-gray-800">
        <div className="flex h-20 bg-blue-900 grid content-center justify-center">
            <div className='text-gray-100 align-center'>
            </div>
        </div>
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2">
                <li>
                    <Link to="/main" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="ml-3">Ordenes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/main/crear" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="ml-3">Nueva Orden</span>
                    </Link>
                </li>
            </ul>
        </div>
    </aside>)
    }
}

export default Sidebar;
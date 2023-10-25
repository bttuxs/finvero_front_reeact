import React from "react";
import { OrdenService } from 'src/Services/Http/Orden-service'
import { ProductoService } from "src/Services/Http/Producto-service";
import SessionStorage from 'src/Services/storage/session.service';
import { NotificationContext } from 'src/Provider/Notification/NotificactionContextProvider';
class Ordenes extends React.Component {
    static contextType = NotificationContext;
    listProductos = [];
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            items: [],
            orden: '',
            productos: []
        };

    }


    componentDidMount(){
        this.getProductos()
        this.getOrders()
    }

    async getProductos(){
        try{
            let user = await SessionStorage.getSession()
            let data = await ProductoService.getOrdersUser(user.id)
            this.setState({productos: data.data})
        }catch(e){
            
        }
    }

    getNombreProducto(id){
        const productos = this.state.productos
        const data = productos.filter(item => item.id === id)
        return data[0].producto_description
    }

    makeTableItems(itemList){
        let productoList = []
        let totalOrden = 0
        for(let idx=0; idx < itemList.length; idx++){
            let total = itemList[idx].cantidad * itemList[idx].precio
            totalOrden+=total
            productoList.push(<tr key={"row-"+idx} className="bg-white border-b cursor-pointer hover:bg-gray-200">
                <td className="text-center">{idx+1}</td>
                <td className="text-center">{itemList[idx].producto}</td>
                <td className="text-center">{itemList[idx].cantidad}</td>
                <td className="text-center">{itemList[idx].precio}</td>
                <td className="text-center">{total}</td>
                <td className="text-center">
                    <div className="text-red-500 hover:bg-red-300 hover:text-white" onClick={() => this.removeItem(itemList[idx])}>Eliminar</div>
                </td>
            </tr>)                
        }
        this.setState({totalOrden})
        return productoList
    }


    async getOrders() {
        this.context.setGlobalSpinner(true)
        let rows = []
        try{
            let user = await SessionStorage.getSession()
            let data = await OrdenService.getOrdersUser(user.id)
            let dataRow = data.data
            this.setState({data: []})
            for(let idx=0;idx < dataRow.length; idx++){
                rows.push(
                <tr key={"row-"+idx} onClick={() => this.getItems(dataRow[idx])} className="bg-white border-b hover:bg-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {idx+1}
                    </th>
                    <td className="px-6 py-4">
                        {dataRow[idx].orden}
                    </td>
                    <td className="px-6 py-4">
                        {dataRow[idx].createdAt}
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="text-red-500 hover:bg-red-300 hover:text-white">Eliminar</div>
                    </td>
                </tr>
                )
            }
            this.setState({data: rows})
            this.context.setGlobalSpinner(false)
        }catch(e){
            this.context.setGlobalSpinner(false)
        }
    }

    getItems(data){
        let rows = []
        try{
            let dataRow = data.items
            this.setState({items: []})
            this.setState({orden: data.orden})
            for(let idx=0;idx < dataRow.length; idx++){
                let nombreProducto = this.getNombreProducto(dataRow[idx].id_producto)
                rows.push(
                <tr key={"row-"+idx} className="bg-white border-b hover:bg-gray-200">
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-center">
                        {idx+1}
                    </td>
                    <td className="px-6 py-4 text-center">
                        {nombreProducto}
                    </td>
                    <td className="px-6 py-4 text-center">
                        {dataRow[idx].cantidad}
                    </td>
                    <td className="px-6 py-4 text-center">
                        {dataRow[idx].precio}
                    </td>
                    <td className="px-6 py-4 text-center">
                        {dataRow[idx].precio * dataRow[idx].cantidad}
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="text-red-500 hover:bg-red-300 hover:text-white">Eliminar</div>
                    </td>
                </tr>
                )
            }
            this.setState({items: rows})
            this.context.setGlobalSpinner(false)
        }catch(e){
            this.context.setGlobalSpinner(false)
        }
    }

    render(){
        return <div className="relative overflow-x-auto flex flex-row">
            <div className="1/2-full text-sm m-2">
                <table className="text-sm">
                    <thead className="text-xs uppercase bg-gray-10 dark:bg-gray-300 ">
                        <tr>
                            <th scope="col" colSpan={4} className="px-6 py-3 text-lg text-center">
                                Ordenes
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Creada
                            </th>
                            <th scope="col" className="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data}
                    </tbody>
                </table>
            </div>
            <div className="1/2-full text-sm m-2">
                <table className="text-sm">
                    <thead className="text-xs uppercase bg-gray-10 dark:bg-gray-300 ">
                        <tr>
                            <th scope="col" colSpan={6} className="px-6 py-3 text-lg text-center">
                                Productos Orden:  <span className="underline">{this.state.orden}</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Producto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio Unidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                total
                            </th>
                            <th scope="col" className="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items}
                    </tbody>
                </table>
            </div>
        </div>
        
    }
}

export default Ordenes;
import React from 'react';
import SessionStorage from 'src/Services/storage/session.service';
import { OrdenService } from 'src/Services/Http/Orden-service'
import { ProductoService } from "src/Services/Http/Producto-service";
import { NotificationContext } from 'src/Provider/Notification/NotificactionContextProvider';

class Ventas extends React.Component{
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            totalOrden: 0,
            productos: [],
            items: [],
            form: {
                fecha_inicio:'',
                fecha_termino: ''
            }
        };
    }
    static contextType = NotificationContext;


    async componentDidMount(){
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

    async getVentas(){
        this.setState({items: []})
        const fechas = this.state.form
        const user = await SessionStorage.getSession()
        await this.getProductos()        
        const params = {
            id_usuario: user.id,
            fecha_inicio: fechas.fecha_inicio + 'T00:00:02.666Z',
            fecha_termino: fechas.fecha_termino + 'T23:59:59.666Z'
        }
        const data = await OrdenService.ventas(params)  
        await this.getItems(data.data)
    }

    async getItems(data){
        let rows = []
        try{
            let dataRow = data.sort((tmp1,tmp2)=> parseInt(tmp2.cantidad) - parseInt(tmp1.cantidad))
            for(let idx=0;idx < dataRow.length; idx++){
                let nombreProducto = this.getNombreProducto(dataRow[idx].producto)
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
            console.log(rows)
            this.setState({items: rows})
            this.context.setGlobalSpinner(false)
        }catch(e){
            console.log(e)
            this.context.setGlobalSpinner(false)
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const objValue = this.state.form;
        objValue[name] = value        
        this.setState({form: objValue});
    }

    setFechaInicio(date){
        let form = this.state.form;
        form.fechaOficio = date
        this.setState({form})
    }

    render () {
        return <div>
            <div className="flex flex-row">
                <div className="rounded-md shadow-sm mr-3">
                    <label htmlFor="fecha_inicio" className="sr-only">Precio</label>
                    <input id="fecha_inicio" name="fecha_inicio" type="date" value={this.state.form.fecha_inicio || ''} onChange={this.handleInputChange} autoComplete="off" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Producto" />
                </div>
                <div className="rounded-md shadow-sm mr-3">
                    <label htmlFor="fecha_termino" className="sr-only">Precio</label>
                    <input id="fecha_termino" name="fecha_termino" type="date" value={this.state.form.fecha_termino || ''} onChange={this.handleInputChange} autoComplete="off" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Cantidad" />                    
                </div>
                <div className="rounded-md shadow-sm mr-3">
                    <button type="submit" onClick={(e) => this.getVentas(e)} className="w-full justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Buscar
                    </button>
                </div>
            </div>            
            <div className="1/2-full text-sm m-2">
                Total Orden: {this.state.totalOrden}
            </div>
            <div className="1/2-full text-sm m-2">
                <table className="text-sm">
                    <thead className="text-xs uppercase bg-gray-10 dark:bg-gray-300 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                producto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                total
                            </th>
                            <th></th>
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

export default Ventas;
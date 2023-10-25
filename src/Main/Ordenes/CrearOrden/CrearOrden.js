import React from "react";
import { OrdenService } from 'src/Services/Http/Orden-service'
import SessionStorage from 'src/Services/storage/session.service';
import { NotificationContext } from 'src/Provider/Notification/NotificactionContextProvider';
class CrearOrden extends React.Component{
    static contextType = NotificationContext;
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            data: [],
            items: [],
            orden: '',
            totalOrden: 0,
            productos: [],
            form: {
                producto: '',
                precio: '',
                cantidad: ''
            },
            dataList: [],
            orden_id: ''
        };

    }

    componentDidMount(){
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const objValue = this.state.form;
        objValue[name] = value        
        this.setState({form: objValue});
    }

    resetForm(){
        this.setState({form: {precio: '', cantidad: '', producto: ''}})
    }

    resetListItems(){

    }

    async removeItem(item){
        let itemList = this.state.items.filter((itemlist) => itemlist.producto !== item.producto)
        console.log('delete: '+ JSON.stringify(item))
        const productoList = this.makeTableItems(itemList)
        this.setState({items: itemList, productos: productoList})
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

    limpiarNombreProducto(cadena){
        cadena = cadena.toLowerCase().replace(/ /g, '');
        cadena = cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return cadena;
    }

    findItem(itemNew){
        const _this = this
        const itemList = this.state.items.filter((item) => {
            const itemInter = _this.limpiarNombreProducto(item.producto)
            const itemNewInter = _this.limpiarNombreProducto(itemNew.producto)
            if(itemInter === itemNewInter){
                return item;
            }
            return false
        })
        if(itemList.length !== 0){
            let cantidad = Number(itemNew.cantidad);
            const producto = this.limpiarNombreProducto(itemNew.producto)
            const precio = Number(itemNew.precio)
            for(let idx=0; idx< itemList.length; idx++){
                cantidad += Number(itemList[idx].cantidad)
            }
            itemNew = {
                producto,
                cantidad,
                precio
            }
        }
        return itemNew
    }

    async getForm(event){
        event.preventDefault()

        if(this.state.form.cantidad.trim() !== "" && this.state.form.precio.trim() !== "" && this.state.form.producto.trim() !== ""){
            let item = this.state.form
            item = this.findItem(item)
            let itemList = this.state.items.filter((itemTmp) => this.limpiarNombreProducto(itemTmp.producto) !== this.limpiarNombreProducto(item.producto))
            itemList.push(item)
            itemList = itemList.filter(item => item)
            const productoList = this.makeTableItems(itemList)
            await this.setState({items: itemList, productos: productoList})
            await this.resetForm();
        }

    }
    async saveItems(){
        this.context.setGlobalSpinner(true)
        try{
            const items = this.state.items
            const user = await SessionStorage.getSession()
            const data = await OrdenService.createOrden(items,user.id);
            console.log(items)
            console.log(data)
            if(data.data.length > 0){
                this.context.setGlobalAlert({show: true, message: 'Registro exitoso', type: 'success'})
                this.setState({items: [], productos: [], totalOrden: 0})
            }
            this.context.setGlobalSpinner(false)
        }catch(e){
            console.log(e)
            this.context.setGlobalSpinner(false)
        }

    }

    render(){
        return <div>
        <form className=" mt-8 space-y-6" action="#" method="POST">
            <div className="flex flex-row">
            <div className="rounded-md shadow-sm mr-3">
                    <label htmlFor="producto" className="sr-only">Precio</label>
                    <input id="producto" name="producto" type="text" value={this.state.form.producto || ''} onChange={this.handleInputChange} autoComplete="off" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Producto" />
                </div>
                <div className="rounded-md shadow-sm mr-3">
                    <label htmlFor="precio" className="sr-only">Precio</label>
                    <input id="precio" name="precio" type="number" value={this.state.form.precio || ''} onChange={this.handleInputChange} autoComplete="off" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Precio" />
                </div>
                <div className="rounded-md shadow-sm mr-3">
                    <label htmlFor="cantidad" className="sr-only">Cantidad</label>
                    <input id="cantidad" name="cantidad" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} type="text" value={this.state.form.cantidad || ''} onChange={this.handleInputChange} autoComplete="off" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Cantidad" />
                </div>
                <div className="rounded-md shadow-sm mr-3">
                    <button type="submit" onClick={(e) => this.getForm(e)} className="w-full justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Agregar
                    </button>
                </div>
                <div className="rounded-md shadow-sm mr-3">
                    <button onClick={(e) => this.saveItems(e)} className="w-full justify-center py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Crear
                    </button>
                </div>
            </div>
        </form>
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
                        {this.state.productos}
                    </tbody>
                </table>
            </div>        

    </div>
    }
}

export default CrearOrden;
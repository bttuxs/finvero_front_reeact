import { httpClient } from "./Http-service"
const urlBase = process.env.REACT_APP_BASE_ORDEN
export const OrdenService = {
    getOrdersUser: (idUser) => {
        const path = "orden/user/" + idUser
        return httpClient.get(urlBase, path)
    },
    createOrden: (params, idUser) => {
        const path = "orden/detalle/items/" + idUser
        return httpClient.post(urlBase, path, params)
    },
    ventas: (params) => {
        const path = 'orden/detalle/ventas/user'
        return httpClient.get(urlBase, path, params)
    }
}
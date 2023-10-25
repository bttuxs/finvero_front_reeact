import { httpClient } from "./Http-service"
const urlBase = process.env.REACT_APP_BASE_PRODUCTO
export const ProductoService = {
    getOrdersUser: (idUser) => {
        const path = "producto/user/" + idUser
        return httpClient.get(urlBase, path)
    },
}
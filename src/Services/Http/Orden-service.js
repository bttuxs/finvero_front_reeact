import { httpClient } from "./Http-service"
const urlBase = process.env.REACT_APP_BASE_ORDEN
export const OrdenService = {
    getOrdersUser: (idUser) => {
        const path = "orden/user/" + idUser
        return httpClient.get(urlBase, path)
    },
}
import { httpClient } from "./Http-service"
const urlBase = process.env.REACT_APP_BASE_USER
export const LoginService = {
    login: (email) => {
        const path = "user/id"
        return httpClient.get(urlBase, path, {email})
    },
    register: (params) => {
        const path = "user"
        return httpClient.post(urlBase, path, {...params})
    }
}
import axios from "axios"

const client = axios.create()
client.defaults.withCredentials = true;
/*
client.interceptors.response.use(response => {
  return response
}, error => {
  if (error?.status?.code === 401) {
    //Unauthorized
    //redirect to Login
  } else {
   //dispatch your error in a more user friendly manner
   console.log(error)
}})
*/

export const httpClient = {
    get: (urlBase, path, params) => {
        let url = urlBase+path
        return client.get(url,{params})
    },
    post: (urlBase, path, params) => {
      let url = urlBase+path
      return client.post(url,params)
    },
    delete: (urlBase, path, params) => {
      let url = urlBase+path
      return client.delete(url,{params})
    },
    put: (urlBase, path, params) => {
      let url = urlBase+path
      return client.put(url,{params})
    },
}
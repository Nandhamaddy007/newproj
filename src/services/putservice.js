import {axios} from 'axios'
export default function putService(url,data){
    return axios.put(url,data).catch(error=>console.log(error))
}
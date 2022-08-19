import {axios} from 'axios'
export default function deleteService(url){
    return axios.delete(url).catch(error=>console.log(error))
}
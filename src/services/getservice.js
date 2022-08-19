import axios from 'axios'
export default function getService(url){
    return axios.get(url).catch(error=>console.log(error))
}
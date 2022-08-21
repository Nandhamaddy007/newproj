import axios from 'axios'
export default function postService(url,data){
    return axios.post(url,data).catch(error=>console.log(error))
}
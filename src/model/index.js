import axios from "./axios";
import qs from "qs";

let get = (url,info)=>{
    return axios({
        method:"get",
        url,
        params:info
    })
}

let post = (url,info)=>{
    return axios({
        method:"post",
        url,
        data:qs.stringify(info)
    })
}

let del = (url)=>{
    return axios({
        method:"delete",
        url,
    })
}

export  {get,post,del};
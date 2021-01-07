import {get,post,del} from "./index";

let routerInfo = {
    query:(info)=>{
        return get("/api/routerList",info)
    },
    add:(info)=>{
        return post("/api/routerList",info)
    },
    delete:(id)=>{
        return del("/api/routerList/"+id)
    }
}

export default routerInfo;
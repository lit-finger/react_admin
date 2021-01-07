import {get,post,del} from "./index";

let userrouterInfo = {
    query:(info)=>{
        return get("/api/userrouter",info)
    },
    add:(info)=>{
        return post("/api/userrouter",info)
    },
    delete:(id)=>{
        return del("/api/userrouter/"+id)
    }
}

export default userrouterInfo;
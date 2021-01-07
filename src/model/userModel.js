import {get,post} from "./index";

let userInfo = {
    query:(info)=>{
        return get("/api/userinfo",info)
    },
    add:(info)=>{
        return post("/api/userinfo",info)
    }
}

export default userInfo;
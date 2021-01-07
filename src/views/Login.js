import React, { Component } from 'react'
import userInfo from "../model/userModel"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameTips: "",
            usernameFlag:false,
            userpwd: "",
        }
    }
    changeUsername(e) {
        var reg = /^\w{3,12}$/;
        var username = e.target.value;
        if(reg.test(username)){
            this.setState({ username,usernameTips:"√",usernameFlag:true });
        }else{
            this.setState({ username: e.target.value,usernameTips:"用户名由3-12位数字字母下划线组成",usernameFlag:false });
        }
    }
    login(){
        if(!this.state.usernameFlag) return false;
        userInfo.query({username:this.state.username,userpwd:this.state.userpwd}).then(res=>{
            if(res.data.length>0){
                localStorage.setItem("userid",res.data[0].id)
                localStorage.setItem("usertype",res.data[0].type)
                this.props.history.push("/home")
            }else{
                alert("用户名与密码不匹配");
            }
        })
    }
    render() {
        return (
            <div className="home">
                <div>
                    用户名：<input value={this.state.username} onInput={(e) => { this.changeUsername(e) }} />
                </div>
                <div>
                    <span className={this.state.usernameFlag?"success":"error"}>{this.state.usernameTips}</span>
                </div>
                <div>
                    密&emsp;码：<input value={this.state.userpwd} onInput={(e) => { this.setState({userpwd:e.target.value})}} />
                </div>
                <button onClick={()=>{this.login()}}>登录</button>
            </div>
        )
    }
}

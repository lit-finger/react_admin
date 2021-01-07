import React, { Component } from 'react'
import userModel from "../../model/userModel"

export default class Adduser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameTips: "",
            usernameFlag: false,
            userpwd: "",
            userpwdTips: "",
            userpwdFlag: false
        }
    }
    changeUsername = (e) => {
        var reg = /^\w{3,12}$/;
        var username = e.target.value;
        if (reg.test(username)) {
            this.setState({ username, usernameTips: "√", usernameFlag: true });
        } else {
            this.setState({ username: e.target.value, usernameTips: "用户名由3-12位数字字母下划线组成", usernameFlag: false });
        }
    }
    changeUserpwd = (e) => {
        var reg = /^\w{3,12}$/;
        var userpwd = e.target.value;
        if (reg.test(userpwd)) {
            this.setState({ userpwd, userpwdTips: "√", userpwdFlag: true });
        } else {
            this.setState({ userpwd: e.target.value, userpwdTips: "密码由3-12位数字字母下划线组成", userpwdFlag: false });
        }
    }
    adduser() {
        if (!this.state.usernameFlag || !this.state.userpwdFlag) return false;
        userModel.query({ username: this.state.username }).then(res => {
            if (res.data.length > 0) {
                alert("用户名已存在");
            } else {
                userModel.add({ username: this.state.username, userpwd: this.state.userpwd, type: 2 }).then(() => {
                    alert("添加成功")
                })
            }
        })
    }
    render() {
        return (
            <div className="adduser">
                <h3>新增用户</h3>
                <div>
                    用户名：<input value={this.state.username} onInput={(e) => { this.changeUsername(e) }} />
                    <span className={this.state.usernameFlag ? "success" : "error"}>{this.state.usernameTips}</span>
                </div>
                <div>
                    密&emsp;码：<input value={this.state.userpwd} onInput={(e) => { this.changeUserpwd(e) }} />
                    <span className={this.state.userpwdFlag ? "success" : "error"}>{this.state.userpwdTips}</span>
                </div>
                <div>
                    <button onClick={() => { this.adduser() }}>确认添加</button>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Adduser from "../components/admin/Adduser"
import Addmenu from "../components/admin/Addmenu"
import Authority from "../components/admin/Authority"

export default class Admin extends Component {
    render() {
        return (
            <div className="admin">
                <div className="nav">
                    <a href="#/home/adduser">新增用户</a>&emsp;|&emsp;
                    <a href="#/home/addmenu">新增菜单</a>&emsp;|&emsp;
                    <a href="#/home/authority">设置权限</a>
                </div>
                <Switch>
                    <Route path="/home" component={Adduser} exact />
                    <Route path="/home/adduser" component={Adduser} />
                    <Route path="/home/addmenu" component={Addmenu} />
                    <Route path="/home/authority" component={Authority} />
                    <Redirect to="/404"></Redirect>
                </Switch>
            </div>
        )
    }
}

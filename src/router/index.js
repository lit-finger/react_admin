import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import loadable from '../utils/loadable.js'
import Login from '../views/Login';
import NotFound from "../views/404";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routerList: [
                {
                    path: "/",
                    com: Login,
                    exact: true
                },
                {
                    path: "/login",
                    com: Login
                },
                {
                    path:"/home",
                    com:loadable(()=>import("../views/Home"))
                },
                {
                    path: "/404",
                    com: NotFound
                }
            ]
        }
    }
    render() {
        return (
            <>
                <HashRouter>
                    <Switch>
                        {this.state.routerList.map((item, index) => {
                            return <Route key={index} path={item.path} component={item.com} exact={item.exact} />
                        })}
                        <Redirect to="/404"></Redirect>
                    </Switch>
                </HashRouter>
            </>
        )
    }
}

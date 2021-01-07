import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import userRouterModel from "../model/userrouterModel"
import Menu1 from "../components/custom/Menu1"
import Menu2 from "../components/custom/Menu2"
import Menu3 from "../components/custom/Menu3"
import Menu4 from "../components/custom/Menu4"

export default class Custom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: { Menu1, Menu2, Menu3, Menu4 },
            routerList: []
        }
    }
    componentDidMount() {
        let userid = localStorage.getItem("userid")
        userRouterModel.query({ userid }).then(res => {
            this.setState({
                routerList: res.data.map(item => {
                    item.comname = this.state.menuList[item.comname];
                    return item;
                })
            })
        })
    }
    render() {
        let homePage = this.state.routerList.length ? <Route path="/home" component={this.state.routerList[0].comname} exact ></Route> : <></>;
        return (
            <>
                <div>
                    {this.state.routerList.map(item => {
                        return <a href={"#" + item.menupath} key={item.id}>{item.menuname}</a>
                    })}
                </div>
                <Switch>
                    {homePage}
                    {this.state.routerList.map(item => {
                        return <Route path={item.menupath} key={item.id} component={item.comname}></Route>
                    })}
                    <Redirect to="/404"></Redirect>
                </Switch>
            </>
        )
    }
}

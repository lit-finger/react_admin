import React, { Component } from 'react'
import userModel from "../../model/userModel"
import routerModel from "../../model/routerModel"
import userRouterModel from "../../model/userrouterModel"

export default class Authority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            userList: [],
            menuList: [],
            userRouter: [],
            checkAll: false,
        }
    }
    componentDidMount() {
        userModel.query({ type: 2 }).then(res => {
            this.setState({ userList: res.data });
        });
        routerModel.query().then(res => {
            this.setState({
                menuList: res.data.map(item => {
                    item.checked = false;
                    return item;
                })
            })
        });
    }
    changeCheckAll = () => {
        this.setState({ checkAll: !this.state.checkAll, menuList: this.state.menuList.map(item => { item.checked = !this.state.checkAll; return item }) })
    }
    changeCheckOne = (id) => {
        var list = this.state.menuList.map(item => {
            if (item.id === id) {
                item.checked = !item.checked;
            }
            return item;
        });
        this.setState({ checkAll: list.every(item => item.checked), menuList: list });
    }
    changeSelect = (e) => {
        userRouterModel.query({ userid: e.target.value }).then(res => {
            let list = this.state.menuList.map(item => {
                item.checked = false;
                return item;
            })
            list.map(item => {
                if (res.data.some(obj => obj.routerid * 1 === item.id)) {
                    item.checked = true;
                }
                return item;
            })
            this.setState({ userid: e.target.value, userRouter: res.data, menuList: list, checkAll: list.every(item => item.checked) });
        })
    }
    submit = () => {
        if (this.state.userid && this.state.menuList.some(item => item.checked)) {
            this.del();
            this.add();
            alert("设置成功");
        } else {
            alert("请选择用户或权限");
        }
    }
    del = async () => {
        let list = this.state.userRouter;
        for (let i = 0; i < list.length; i++) {
            await userRouterModel.delete(list[i].id);
        }
    }
    add = async () => {
        let list = this.state.menuList.filter(item => item.checked);
        for (let i = 0; i < list.length; i++) {
            let obj = {};
            obj.userid = this.state.userid;
            obj.routerid = list[i].id;
            obj.menuname = list[i].menuname;
            obj.menupath = list[i].menupath;
            obj.comname = list[i].comname;
            await userRouterModel.add(obj);
        }
    }
    render() {
        return (
            <div className="authority">
                <div>
                    <select onChange={(e) => { this.changeSelect(e) }}>
                        <option value="">请选择</option>
                        {this.state.userList.map((item) => {
                            return <option value={item.id} key={item.id}>{item.username}</option>
                        })}
                    </select>
                    <table>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" checked={this.state.checkAll} onChange={() => { }} onClick={() => { this.changeCheckAll() }} />全选</td>
                                <td>菜单名称</td>
                                <td>路径</td>
                                <td>路由名称</td>
                            </tr>
                            {this.state.menuList.map(item => {
                                return <tr key={item.id}>
                                    <td><input type="checkbox" checked={item.checked} onChange={() => { }} onClick={() => { this.changeCheckOne(item.id) }} /></td>
                                    <td>{item.menuname}</td>
                                    <td>{item.menupath}</td>
                                    <td>{item.comname}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => { this.submit() }}>确认设置</button>
            </div>
        )
    }
}

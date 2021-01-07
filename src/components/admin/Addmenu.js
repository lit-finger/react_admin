import React, { Component } from 'react'
import routerModel from "../../model/routerModel"

export default class Addmenu extends Component {
    constructor(props){
        super(props);
        this.state={
            menuname:"",
            menupath:"",
            comname:""
        }
    }
    add=async()=>{
        let flag = true;
        await routerModel.query({menuname:this.state.menuname}).then(res=>{
            if(res.data.length)flag=false;
        })
        await routerModel.query({menupath:this.state.menupath}).then(res=>{
            if(res.data.length)flag=false;
        })
        await routerModel.query({comname:this.state.comname}).then(res=>{
            if(res.data.length)flag=false;
        })
        if(flag){
            routerModel.add({menuname:this.state.menuname,menupath:this.state.menupath,comname:this.state.comname}).then(()=>{
                alert("添加成功");
            })
        }else{
            alert("菜单重复");
        }
    }
    checkMenu = async (fn)=>{
        await routerModel.query({menuname:this.state.menuname}).then(res=>{
            console.log(111);
            if(res.data.length)return false;
        })
        await routerModel.query({menupath:this.state.menupath}).then(res=>{
            console.log(222);
            if(res.data.length)return false;
        })
        await routerModel.query({comname:this.state.comname}).then(res=>{
            console.log(333);
            if(res.data.length)return false;
        })
        console.log(444);
        return true;
    }
    render() {
        return (
            <div className="addmenu">
                菜单名称:<input value={this.state.menuname} onInput={(e)=>{this.setState({menuname:e.target.value})}} />&emsp;
                路径:<input value={this.state.menupath} onInput={(e)=>{this.setState({menupath:e.target.value})}} />&emsp;
                路由名称:<input value={this.state.comname} onInput={(e)=>{this.setState({comname:e.target.value})}} />&emsp;
                <button onClick={()=>{this.add()}}>添加</button>
            </div>
        )
    }
}

import React, { Component } from 'react'
import Admin from "./Admin"
import Custom from "./Custom"

export default class Home extends Component {
    render() {
        return (
            <div>
                {localStorage.getItem("usertype")==="1"?<Admin></Admin>:<Custom></Custom>}
            </div>
        )
    }
}

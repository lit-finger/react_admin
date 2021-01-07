import React, { Component } from 'react';
import Router from "./router";
import "./css/commen.scss";

export default class App extends Component {
    render() {
        return (
            <>
                <div className="main">
                    <Router></Router>
                </div>
            </>
        )
    }
}

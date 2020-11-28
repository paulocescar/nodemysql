import React, { useState, useEffect, Component } from "react";

import api from "../../services/api";
import Header from "../Header";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const user = { name: "Lydia", age: 21 };
        const admin = { admin: true, ...user };
        console.log(admin);
    }

    render() {
        return (
            <div>
            <Header></Header>
                <div className="container">
                    <h1>Dashboard</h1>
                    
                </div>
            </div>
        );
    }
}

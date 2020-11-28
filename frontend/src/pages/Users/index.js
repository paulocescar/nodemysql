import React, { useState, useEffect, Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo2.svg";
import api from "../../services/api";
import { login } from "../../services/auth";
import Header from "../Header";

import { Form, Container } from "./styles";

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        const users = [];
        this.state = { users };
    }

    componentDidMount() {
        api.get("/users", {
            headers: {
              'x-access-token': localStorage.getItem('x-access-tokenSECRET')
            }
        }).then(res => {
            console.log(res.data)
            const data = res.data;
            this.setState({ users: data })
         }).catch(error => {
            this.props.history.push("/"); 
        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Container>
                    <h1>Clientes</h1>
                    <div>
                        {this.state.users.map((dt, index) => (
                            <p>Olá, {dt.username} {dt.email}!</p>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

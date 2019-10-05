import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            id: 0
        }
    };
    redirect = () => {
        this.props.history.push({
            pathname: '/game',
            state: {
                username: this.state.username,
                id: this.state.id
            }
        });
    }
    sendData = () => {

        var apiBaseUrl = "http://localhost:5000/api/user/";
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        };

        axios.post(apiBaseUrl + "authenticate", payload).then((response) => {
            if (response.status === 200) {
                this.setState({ id: response.data.id });
                this.redirect();
                //console.log(this.state.id);
            }
            if (response.status === 204) {
                alert("Incorrect credentials!");
            }
        });
    }
    render() {
        return (
            <div>Enter credentials<br />
                Username: <input onChange={(e) => this.setState({ username: e.target.value })} /><br />
                Password: <input type="password" onChange={(e) => this.setState({ password: e.target.value })} /><br />
                <button id="login" onClick={() => this.sendData()}>Login</button>
            </div>
        );
    }
};
export default Login;
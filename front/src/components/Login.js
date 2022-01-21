import React, { Component } from 'react';
import "../css/Login.css";
import { post, get } from '../Controllers';
import { userRoute } from '../Routes';
import { setId } from '../Utils'


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: ''
            },

        };
    };
    

    login = async () => {
        let res = await post(userRoute + "/login", this.state.user)
        if (res.ok) {
            setId(res.id);
            let nextPage = await get(userRoute, res.id);
            if (nextPage.categUser === "TST") {
                this.props.history.push({
                    pathname: "/tester",
                    state: { pers: nextPage },
                  });
            } else {
                this.props.history.push({
                    pathname: "/user",
                    state: { pers: nextPage },
                  });
            }
        } else {
            alert(res.msg);
        }
    };

    handleChange = (e) => {
        e.preventDefault();
        let newUser = this.state.user;
        newUser[e.target.name] = e.target.value;
        this.setState({ user: newUser });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.login()
    };

    render() {
        return (
            <div>
                <div className="login-box">
                    <h1>Login</h1>
                    <div className="textbox">
                        <input type="text" placeholder="Email" name="email" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </div>

                    <input className="btn" type="button" value="Sign In" onClick={this.handleSubmit} />
                    <a href="/register"><input className="btn" type="button" value="Register" /></a>
                </div>
            </div>
        )
    }
}

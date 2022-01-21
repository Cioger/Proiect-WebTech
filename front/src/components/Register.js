import React, { Component } from 'react';
import '../css/Register.css';
import { post } from '../Controllers';
import { userRoute } from '../Routes';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                password2: '',
                categUser: ''
            },
        };
    }

    register = async () => {

        await post(userRoute + "/register", this.state.user).then(user => {
            if (user.msg === undefined) {
                user.msg = "User-ul a fost creat";
            } else {
                alert(user.msg);
                if (user.msg === "User-ul a fost creat") {
                    this.props.history.push('/');
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.register()

    };

    handleChange = (e) => {
        e.preventDefault();
        let newUser = this.state.user;
        newUser[e.target.name] = e.target.value;
        this.setState({ user: newUser });
    };

    render() {
        return (
            <div>
                <div className="register-box">
                    <h1>Sign up</h1>
                    <div className="textbox">
                        <input type="text" placeholder="Username" name="name" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="text" placeholder="Email" name="email" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="password" placeholder="Confirm password" name="password2" onChange={this.handleChange} />
                    </div>

                    <div className="box">
                        <select name="categUser" onChange={this.handleChange} >
                            <option value="default" id="select-hide">Categories</option>
                            <option value="TST" id="TST">TST</option>
                            <option value="MP" id="MP">MP</option>
                        </select>
                    </div>

                    <input className="btn" type="button" value="Submit" onClick={this.handleSubmit} />

                </div>
            </div>
        )
    }
}

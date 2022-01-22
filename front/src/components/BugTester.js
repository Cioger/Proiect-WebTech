import React, { Component } from 'react'
import "../css/BugTester.css"
import { Button, Input } from 'antd';
import { PlusCircleOutlined,LogoutOutlined } from '@ant-design/icons';
import { bugRoute } from '../Routes';
import { postBug } from '../Controllers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default class BugTester extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bug:{
                severity: null, 
                priority: null, 
                description: null, 
                projectID: null, 
                userID: null
            }       
        };
    }


 createBug = async () => {
    try {
        await postBug(bugRoute, this.state.bug);
    }
    catch (err) {
        toast.error("Nu s-a adaugat!");
    }
};

handleChange = (e) => {
    e.preventDefault();
    let newBug = this.state.bug;
    newBug[e.target.name] = e.target.value;
    this.setState({ bug: newBug });
};

handleSubmit = (e) => {
    e.preventDefault();
    this.createBug();
    toast.success("Bug Added!");
};
async LogOut() {
        
    this.props.history.push({
        pathname: "/tester",
        
    });
}

    render() {
        return (
            <div>
                <h1>Tester Bug Dashboard</h1>
                <div className="tabele-bug-tester">
                    <div className="addBugTester">
                        <div className="titlu-add-bug-tester"><p>Add project</p></div>
                        <div><Input placeholder="Severity 1-5" onChange={this.handleChange}/></div>
                        <div><Input placeholder="Priority 1-5" onChange={this.handleChange}/></div>
                        <div><Input placeholder="Description" onChange={this.handleChange}/></div>
                        <div><Input placeholder="Link" onChange={this.handleChange}/></div>
                        <div><Input placeholder="projectID" onChange={this.handleChange}/></div>
                        <div><Input placeholder="userID" onChange={this.handleChange}/></div>
                        <div><PlusCircleOutlined style={{ color: "black", marginTop: "16px" }} onClick={()=>{this.handleSubmit()}}/></div>
                    </div>
                </div>
                <Button class="btnLogout" variant="primary"><LogoutOutlined onClick={()=>{this.LogOut()}}/></Button>
            </div>
        )
    }
}

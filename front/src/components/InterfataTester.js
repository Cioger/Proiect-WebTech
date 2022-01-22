import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserAddOutlined, SendOutlined, BugOutlined,LogoutOutlined } from '@ant-design/icons';
import "../css/InterfataTester.css";
import { Button } from 'antd';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()



function createData(name) {
    return { name };
}

const unassignedProjects = [
    createData('Unassigned Project1'),
    createData('Unassigned Project2'),
    createData('Unassigned Project3'),
    createData('Unassigned Project4'),
    createData('Unassigned Project5'),
    createData('Unassigned Project6'),
    
];

const assignedProjects = [
    createData('Assigned Project1'),
    createData('Assigned Project2'),
    createData('Assigned Project3'),
    createData('Assigned Project4'),
    createData('Assigned Project5'),
    createData('Assigned Project6'),
];

export default class InterfataTester extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null
        };
    }

    
     async goToBugs(parm) {
        await this.setState({
            nameToBug: parm,
        })
        this.props.history.push({
            pathname: "/bugtester",
            state: { bug: this.state.nameToBug },
        });
    }
    async LogOut() {
        
        this.props.history.push({
            pathname: "/",
            
        });
        toast.info("Logged out!");
    }

    render() {
        return (
            <div>
               
                <h1>Tester Dashboard</h1>
                <div className="tabele-tester">
                    <div className="tabel-tester-pr-neasumat">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell style={{fontWeight:'bold'}}>Unassigned Projects</TableCell>
                                    <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Project Name</TableCell>
                                        <TableCell align="right">Join Project</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {unassignedProjects.map((unassignedProjects) => (
                                        <TableRow key={unassignedProjects.name}>
                                            <TableCell component="th" scope="row">
                                                {unassignedProjects.name}
                                            </TableCell>
                                            <TableCell align="right"><UserAddOutlined style={{ fontSize: '20px', outline: 'none' }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="tabel-tester-pr-asumate">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight:'bold'}}>Assigned Projects</TableCell>
                                    <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Project Name</TableCell>
                                        <TableCell align="right">Add Bug <BugOutlined style={{ fontSize: '15px', outline: 'none' }} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assignedProjects.map((assignedProjects) => (
                                        <TableRow key={assignedProjects.name}>
                                            <TableCell component="th" scope="row">
                                                {assignedProjects.name}
                                            </TableCell>
                                            <TableCell align="right"><SendOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={() =>{this.goToBugs(assignedProjects.name)}}/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <Button class="btnLogout" variant="primary"><LogoutOutlined onClick={()=>{this.LogOut()}}/></Button>
            </div>
        )
    }
}

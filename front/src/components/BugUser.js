import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../css/BugUser.css"
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import Modal from './Modal.js';
import { Input } from 'antd';
import { getBugsProject, getBugs, getProjectByName, getBugCommit } from "../Controllers";
import { bugRoute, projectRoute, commitRoute } from "../Routes";

export default class BugUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            projectBug: this.props.location.state.bug,
            bugProject: [],
            bugs: [],
            idProject: [],
            nameBug: {},
            commit: {},
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    async componentDidMount() {
        try {
            //get bug project
            let bugprj = await getBugsProject(bugRoute, this.state.projectBug);
            this.setState({
                bugProject: bugprj,
            })
            //end

            //get proiecte
            let bgs = await getBugs(bugRoute);
            this.setState({
                bugs: bgs,
            })
            //end

            let idpr = await getProjectByName(projectRoute, this.state.projectBug)
            this.setState({
                idProject: idpr,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async nameBug(parm) {
        await this.setState({
            nameBug: parm,
        })
        console.log(this.state.nameBug)
        try {
            console.log(this.state.nameBug)
            let cmt = await getBugCommit(commitRoute, this.state.nameBug)
            this.setState({
                commit: cmt,
            })
            console.log(this.state.commit)
        }
        catch (err) {
            console.log(err);
        }
    }

    editEdit = async () => {
        // try {
        //     await updateProject(projectRoute, this.state.infoProject, this.state.nameUpdateProject);
        //     let prUser = await getProjectsUser(projectRoute, this.props.location.state.pers.id);
        //     this.setState({
        //         projectsUser: prUser,
        //     })
        //     let prjs = await getProjects(projectRoute);
        //     this.setState({
        //         projects: prjs,
        //     })
        //     this.filterProjects()
        // }
        // catch (err) {

        // }
    };

    handleSubmitEdit = (e) => {
        e.preventDefault();
        // this.editProject();
    };

    handleChangeEdit = (e) => {
        e.preventDefault();
        let newCommit = this.state.commit;
        newCommit[e.target.link] = e.target.value;
        this.setState({ commit: newCommit });
    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <div>
                <h1>Project Member Bug Dashboard</h1>

                <div className="tabeleUserBug">
                    <div className="tabel-bug-user-nealoc">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Add</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.bugs.map((item) => {
                                        if (item.projectID !== this.state.idProject.id) {
                                            return (<TableRow key={item.description}>
                                                <TableCell component="th" scope="row">
                                                    {item.description}
                                                </TableCell>
                                                <TableCell align="right"><PlusCircleOutlined style={{ fontSize: '20px', outline: 'none' }} /></TableCell>
                                                <TableCell align="right"><UploadOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={() => { this.showModal(); this.nameBug(item.description) }} /></TableCell>
                                            </TableRow>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="tabel-bug-user-aloc">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.bugProject.map((item) => {
                                        return (
                                            <TableRow key={item.description}>
                                                <TableCell component="th" scope="row">
                                                    {item.description}
                                                </TableCell>
                                                <TableCell align="right"><UploadOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={() => { this.showModal(); this.nameBug(item.description) }} /></TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>


                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Edit bug</p>
                    <div><Input placeholder="Link" name="link" value={this.state.commit.link} onChange={this.handleChangeEdit} /></div>
                    <div><PlusCircleOutlined style={{ fontSize: '20px', outline: 'none' }} onclick={this.handleSubmitEdit} /></div>
                </Modal>
            </div>
        )
    }
}


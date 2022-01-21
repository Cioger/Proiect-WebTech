import React, { Component } from 'react';
import { Input } from 'antd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserAddOutlined, SendOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import "../css/InterfataUser.css"
import Modal from './Modal.js';
import { get, postProject, getProjectsUser, getProjects, getProjectByName, getTeamNameById, updateProject } from '../Controllers';
import { userRoute, projectRoute, teamRoute } from '../Routes';

export default class InterfataUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pers: [],
            name: null,
            show: false,
            project: {
                projectName: null,
                repository: null,
                teamName: null
            },
            projectsUser: [],
            projects: [],
            nonProjects: [],
            nameProject: null,
            infoProject: {},
            team: {
                projectName: null,
                repository: null,
                teamName: null
            },
            nameUpdateProject: null,
            nameToBug:null,
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.filterProjects = this.filterProjects.bind(this);
    }

    async componentDidMount() {
        try {
            //preluare id din login
            let prs = await get(userRoute, this.props.location.state.pers.id);
            this.setState({
                pers: prs,
            });
            //end 

            //get proiecte user
            let prUser = await getProjectsUser(projectRoute, this.props.location.state.pers.id);
            this.setState({
                projectsUser: prUser,
            })
            //end

            //get proiecte
            let prjs = await getProjects(projectRoute);
            this.setState({
                projects: prjs,
            })
            //end
        }
        catch (err) {
            console.log(err)
        }

        //apelare filtru
        this.filterProjects();
    }


    //post proiect in BD 
    createProject = async () => {
        try {
            await postProject(projectRoute, this.state.project);
            let prUser = await getProjectsUser(projectRoute, this.props.location.state.pers.id);
            this.setState({
                projectsUser: prUser,
            })
            let prjs = await getProjects(projectRoute);
            this.setState({
                projects: prjs,
            })
            this.filterProjects()
        }
        catch (err) {

        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.createProject();
    };

    handleChange = (e) => {
        e.preventDefault();
        let newProject = this.state.project;
        newProject[e.target.name] = e.target.value;
        this.setState({ project: newProject });
    };
    //end

    //filtru proiecte
    filterProjects() {
        let pr = [];
        let ok = true;
        this.state.projects.map(item1 => {
            ok = true;
            this.state.projectsUser.map(item2 => {
                if (item1.id === item2.id) {
                    ok = false;
                }
                return null;
            })
            if (ok === true) {
                pr.push(item1);
            }
            return null;
        })
        this.setState({
            nonProjects: pr,
        })
    }
    //end

    //edit
    async nameprj(parm) {
        await this.setState({
            nameProject: parm,
        })
        try {
            let infpr = await getProjectByName(projectRoute, this.state.nameProject);
            this.setState({
                infoProject: infpr,
            })
            let tm = await getTeamNameById(teamRoute, this.state.infoProject.teamID)
            this.setState({
                team: tm
            })
            this.setState({
                nameUpdateProject: this.state.nameProject
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    editProject = async () => {
        try {
            await updateProject(projectRoute, this.state.infoProject, this.state.nameUpdateProject);
            let prUser = await getProjectsUser(projectRoute, this.props.location.state.pers.id);
            this.setState({
                projectsUser: prUser,
            })
            let prjs = await getProjects(projectRoute);
            this.setState({
                projects: prjs,
            })
            this.filterProjects()
        }
        catch (err) {

        }
    };

    handleSubmitEdit = (e) => {
        e.preventDefault();
        this.editProject();
    };

    handleChangeEdit = (e) => {
        e.preventDefault();
        let newProject = this.state.infoProject;
        newProject[e.target.name] = e.target.value;
        this.setState({ infoProject: newProject });
    };
    //end  

    //bugpage
    async goToBugs(parm) {
        await this.setState({
            nameToBug: parm,
        })
        this.props.history.push({
            pathname: "/buguser",
            state: { bug: this.state.nameToBug },
        });
    }
    //end

    //modal
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    //end

    render() {
        return (
            <div>
                <h1>Users</h1>
                <div className="tabele-user">
                    <div className="form-proiect">
                        <div className="titlu-add-project"><p>Add project</p></div>
                        <div><Input placeholder="Project name" name="projectName" onChange={this.handleChange} /></div>
                        <div><Input placeholder="Repository" name="repository" onChange={this.handleChange} /></div>
                        <div><Input placeholder="Team name" name="teamName" onChange={this.handleChange} /></div>
                        <div><PlusCircleOutlined style={{ color: "black", marginTop: "16px", outline: "none" }} onClick={this.handleSubmit} /></div>
                    </div>
                    <div className="tabel-user-pr-neasumat">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">Add</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.nonProjects.map(item => {
                                        return (<TableRow key={item.projectName}>
                                            <TableCell component="th" scope="row">
                                                {item.projectName}
                                            </TableCell>
                                            <TableCell align="right"><EditOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={() => { this.showModal(); this.nameprj(item.projectName) }} /></TableCell>
                                            <TableCell align="right"><UserAddOutlined style={{ fontSize: '20px', outline: 'none' }} /></TableCell>
                                        </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="tabel-user-pr-asumate">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">Go</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.projectsUser.map((item) => {
                                        return (
                                            <TableRow key={item.projectName}>
                                                <TableCell component="th" scope="row">
                                                    {item.projectName}
                                                </TableCell>
                                                <TableCell align="right"><EditOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={() => { this.showModal(); this.nameprj(item.projectName) }} /></TableCell>
                                                <TableCell align="right"><SendOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={() => { this.goToBugs(item.projectName)}} /></TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Edit project</p>
                    <div><Input placeholder="Project name" name="projectName" value={this.state.infoProject.projectName} onChange={this.handleChangeEdit} /></div>
                    <div><Input placeholder="Repository" name="repository" value={this.state.infoProject.repository} onChange={this.handleChangeEdit} /></div>
                    <div><Input placeholder="Team name" name="teamName" value={this.state.team.name} onChange={this.handleChangeEdit} /></div>
                    <div><PlusCircleOutlined style={{ fontSize: '20px', outline: 'none' }} onClick={this.handleSubmitEdit} /></div>
                </Modal>
            </div >
        )
    }
}

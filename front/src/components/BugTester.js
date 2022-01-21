import React, { Component } from 'react'
import "../css/BugTester.css"
import { Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// function createData(name) {
//     return { name };
// }

// const bugTester = [
//     createData('BugRaportat'),
//     createData('BugRaportat2'),
// ];

export default class BugTester extends Component {
    render() {
        return (
            <div>
                <h1>Bug-uri tester</h1>
                <div className="tabele-bug-tester">
                    <div className="addBugTester">
                        <div className="titlu-add-bug-tester"><p>Add project</p></div>
                        <div><Input placeholder="Severity" /></div>
                        <div><Input placeholder="Priority" /></div>
                        <div><Input placeholder="Description" /></div>
                        <div><Input placeholder="Link" /></div>
                        <div><PlusCircleOutlined style={{ color: "black", marginTop: "16px" }} /></div>
                    </div>
                    {/* <div className="tabel-bug-tester">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bugTester.map((bugTester) => (
                                        <TableRow key={bugTester.name}>
                                            <TableCell component="th" scope="row">
                                                {bugTester.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div> */}
                </div>
            </div>
        )
    }
}

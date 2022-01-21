import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserAddOutlined, SendOutlined } from '@ant-design/icons';
import "../css/InterfataTester.css";

function createData(name) {
    return { name };
}

const proiecteDeAsumatTester = [
    createData('ProiectTNeasumat'),
    createData('ProiectTNeasumat2'),
    
];

const proiecteAsumateTester = [
    createData('ProiectTAsumat'),
    createData('ProiectTAsumat2'),
];

export default class InterfataTester extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null
        };
    }

    render() {
        return (
            <div>
                <h1>Testers</h1>
                <div className="tabele-tester">
                    <div className="tabel-tester-pr-neasumat">
                        <TableContainer component={Paper}>
                            <Table className={"useStyles"} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Add</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {proiecteDeAsumatTester.map((proiecteDeAsumatTester) => (
                                        <TableRow key={proiecteDeAsumatTester.name}>
                                            <TableCell component="th" scope="row">
                                                {proiecteDeAsumatTester.name}
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
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Go</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {proiecteAsumateTester.map((proiecteAsumateTester) => (
                                        <TableRow key={proiecteAsumateTester.name}>
                                            <TableCell component="th" scope="row">
                                                {proiecteAsumateTester.name}
                                            </TableCell>
                                            <TableCell align="right"><SendOutlined style={{ fontSize: '20px', outline: 'none' }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        )
    }
}

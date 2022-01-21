const express = require('express');
const router = express.Router();

const Project = require('../models/project');
const Team = require('../models/team');
const User = require('../models/user');

const controller = {
    addProject: async (req, res) => {
        const { projectName, repository } = req.body;
        let errors = [];

        if (projectName.length < 6) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (repository.length < 6) {
            errors.push({ msg: 'Repository-ul trebuie sa fie specificat' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            Project.findOne({ where: { projectName: projectName } }).then(async project => {
                if (project) {
                    errors.push({ msg: 'Numele e folosit deja' });

                    res.send({ msg: 'Proiectul exista' });
                } else {

                    Team.findOne({
                        where: { name: req.params.teamName }
                    }).then(team => {
                        Project.create({ projectName: projectName, repository: repository, teamID: team.id }).then(pr => {
                            res.status(201).send(pr);
                        }).catch(err => {
                            res.status(500).send({ msg: 'N-a mers' });
                        })
                        // res.send({ msg: 'Proiectul a fost creat' });
                    }).catch(err => {
                        res.status(500).send({ msg: 'Echipa nu exista' });
                    })
                }
            })
        }

    },

    getProject: async (req, res) => {
        Project.findOne({
            where: { projectName: req.params.projectName }
        }).then((project) => {
            res.status(200).send(project);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getProjects: async (req, res) => {
        Project.findAll({

        }).then((projects) => {
            res.status(200).send(projects);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getProjectByIdUser: async (req, res) => {
        try {
            let user = await User.findOne({
                where: { id: req.params.id },
                include: [{
                    model: Team,
                    attributes: ['id'],
                }]
            })
            let teams = [];
            user.teams.forEach(team => {
                teams.push(team.id)
            });

            let projects = await Project.findAll({
                where: {
                    teamID: teams
                }
            })
            res.send(projects)
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    // postProjectsUser: async (req, res) => {
    //     try {
    //         let user = await User.findOne({
    //             where: { id: req.params.id },
    //             include: [{
    //                 model: Team,
    //                 attributes: ['id'],
    //             }]
    //         })
    //         let teams = [];
    //         user.teams.forEach(team => {
    //             teams.push(team.id)
    //         });

    //         let projects = await Project.findAll({
    //             where: {
    //                 teamID: teams
    //             }
    //         })
    //         res.send(projects)
    //     }
    //     catch (err) {
    //         res.status(500).send(err);
    //     }
    // },

    updateProject: async (req, res) => {
        const projectToBeSent = {
            projectName: req.body.projectName,
            repository: req.body.repository
        }

        let errors = [];

        const project = await Project.findOne({ where: { projectName: req.body.projectName } });

        if (projectToBeSent.projectName.length < 6) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (projectToBeSent.repository.length < 6) {
            errors.push({ msg: 'Repository-ul trebuie sa fie specificat' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (project != null) {
                res.send({ msg: 'Numele exista' });
            } else {
                try {
                    projectDB = await Project.update(projectToBeSent, {
                        where: { projectName: req.params.projectName },
                    });
                    res.status(200).send({ msg: 'Numele proiectului a fost schimbat' });
                }

                catch (err) {
                    res.status(500).send({ msg: 'Proiectul nu exista' });
                }
            }
        }
    },

    // changeTeam: async (req, res) => {
    //     Project.findOne({
    //         where: { projectName: req.params.projectName }
    //     }).then(project => {
    //         Team.findOne({
    //             where: { id: req.body.teamID }
    //         }).then(project => {
    //             project.teamID = req.body.teamID;
    //             res.status(200).send({ msg: 'S-a schimbat echipa de pe proiect' });
    //             project.save();
    //         }).catch(err => {
    //             res.status(500).send({ msg: 'Echipa nu exista' });
    //         })

    //     }).catch(err => {
    //         res.status(500).send({ msg: 'Proiectul nu exista' });
    //     })
    // },

    deleteTeam: async (req, res) => {
        try {
            const project = await Project.findOne({ where: { projectName: req.params.projectName } });
            if (project) {
                await project.destroy();
                res.status(200).send({ msg: "Proiectul a fost sters" });
            }
            else {
                res.status(404).send({ msg: "Proiectul nu a fost gasit" });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = controller;
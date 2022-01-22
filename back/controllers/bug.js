const express = require('express');
const router = express.Router();

const Bug = require('../models/bug');
const User = require('../models/user');
const Project = require('../models/project');

const controller = {
    addBug: async (req, res) => {
        const { severity, priority, description } = req.body;
        let errors = [];


        if (severity < 1 && severity > 5) {
            errors.push({ msg: 'Necesita o valoare intre 1 si 5 a severitatii' });
        }

        if (priority < 1 && priority > 5) {
            errors.push({ msg: 'Necesita o valoare intre 1 si 5 a prioritatii' });
        }


        if (errors.length > 0) {
            res.send(errors);
        } else {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                Project.findOne({
                    where: { projectName: req.body.projectName }
                }).then(project => {
                    const newBug = Bug.create({ severity: severity, priority: priority, description: description, projectID: project.id, userID: user.id });
                    res.send({ msg: 'Bug-ul a fost inregistrat' });
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista proiectul' });
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' });
            })
        }
    },

    getBug: async (req, res) => {
        Project.findOne({
            where: { projectName: req.body.projectName }
        }).then((project) => {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                Bug.findAll({
                    where: { projectID: project.id, userID: user.id }
                }).then(bug => {
                    res.status(500).send(bug);
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista bug-ul' });
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' })
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })
    },

    getBugUser: async (req, res) => {
        User.findOne({
            where: { name: req.params.name }
        }).then(user => {
            Bug.findAll({
                where: { userID: user.id }
            }).then(bug => {
                res.status(500).send(bug);
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista bug-ul' });
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista user-ul' })
        })
    },

    getBugProject: async (req, res) => {
        await Project.findOne({
            where: { projectName: req.params.projectName }
        }).then(async project => {
            await Bug.findAll({
                where: { projectID: project.id }
            }).then(bug => {
                res.status(200).send(bug);
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista bug-ul' });
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })
    },

    getBugsProject: async (req, res) => {
        await Bug.findAll({

        }).then(bug=>{
            res.status(200).send(bug);
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista bug-uri' })
        })
    },

    updateBug: async (req, res) => {
        const bugToBeSent = {
            severity: req.body.severity,
            priority: req.body.priority,
            description: req.body.description
        }

        let errors = [];
        let bug = [];
        Project.findOne({
            where: { projectName: req.body.projectName }
        }).then((project) => {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                bug = Bug.findOne({
                    where: { projectID: project.id, userID: user.id }
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' })
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })

        if (bugToBeSent.severity < 1 && bugToBeSent.severity > 5) {
            errors.push({ msg: 'Necesita o valoare intre 1 si 5 a severitatii' });
        }

        if (bugToBeSent.priority < 1 && bugToBeSent.priority > 5) {
            errors.push({ msg: 'Necesita o valoare intre 1 si 5 a prioritatii' });
        }

        if (bugToBeSent.description.length < 6) {
            errors.push({ msg: 'Lasati o descriere a problemei' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (!bug) {
                res.send({ msg: 'Bug-ul nu exista' });
            } else {
                Project.findOne({
                    where: { projectName: req.body.projectName }
                }).then((project) => {
                    User.findOne({
                        where: { name: req.body.name }
                    }).then(user => {
                        try {
                            bugDB = Bug.update(bugToBeSent, {
                                where: { projectID: project.id, userID: user.id },
                            });
                            res.status(200).send({ msg: 'Bug schimbat' });
                        }

                        catch (err) {
                            res.status(200).send(err);
                        }
                    }).catch(err => {
                        res.status(500).send({ msg: 'Nu exista user-ul' })
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista proiectul' })
                })

            }
        }
    },

    deleteBug: async (req, res) => {
        try {
            Project.findOne({
                where: { projectName: req.body.projectName }
            }).then((project) => {
                User.findOne({
                    where: { name: req.body.name }
                }).then(user => {
                    Bug.findOne({
                        where: { projectID: project.id, userID: user.id }
                    }).then(bug => {
                        if (bug) {
                            bug.destroy();
                            res.status(200).send({ msg: "Bug-ul a fost sters" });
                        }
                        else {
                            res.status(404).send({ msg: "Bug-ul nu a fost gasit" });
                        }
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista user-ul' })
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista proiectul' })
            })

        }
        catch (err) {
            console.log(err);
        }
    }
}
module.exports = controller;
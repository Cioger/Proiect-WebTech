const express = require('express');
const router = express.Router();

const Commit = require('../models/commit');
const Bug = require('../models/bug');
const User = require('../models/user');
const Project = require('../models/project');

const controller = {
    addCommit: async (req, res) => {
        const { link } = req.body;
        let errors = [];

        if (link.length < 6) {
            errors.push({ msg: 'Link-ul trebuie sa aiba minim 6 caractere' });
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
                    Bug.findOne({
                        where: { projectID: project.id, userID: user.id }
                    }).then(bug => {
                        Commit.create({ link: link, bugID: bug.id });
                        res.send({ msg: 'Commit-ul a fost creat' });
                    }).catch(err => {
                        res.status(500).send({ msg: 'Bug-ul nu exista' });
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista proiectul' });
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' });
            })


        }

    },

    getCommit: async (req, res) => {
        Project.findOne({
            where: { projectName: req.body.projectName }
        }).then((project) => {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                Bug.findOne({
                    where: { projectID: project.id, userID: user.id }
                }).then(bug => {
                    Commit.findOne({
                        where: { bugID: bug.id }
                    }).then(commit => {
                        res.status(200).send(commit);
                    }).catch(err => {
                        res.status(500).send({ msg: 'Nu exista commit-ul' });
                    })
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

    get: async (req, res) => {
        await Bug.findOne({
            where: { description: req.params.description }
        }).then(async bug => {
            await Commit.findOne({
                where: { bugID: bug.id }
            }).then(commit => {
                res.status(200).send(commit);
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    updateCommit: async (req, res) => {
        const commitToBeSent = {
            link: req.body.link,
        }

        let errors = [];
        let commit = [];
        Project.findOne({
            where: { projectName: req.body.projectName }
        }).then((project) => {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                Bug.findOne({
                    where: { projectID: project.id, userID: user.id }
                }).then(bug => {
                    commit = Commit.findOne({
                        where: { bugID: bug.id }
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista bug-ul' })
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' })
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })

        if (commitToBeSent.link.length < 6) {
            errors.push({ msg: 'Link-ul trebuie sa aiba minim 6 caractere' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (!commit) {
                res.send({ msg: 'Commit-ul nu exista' });
            } else {
                Project.findOne({
                    where: { projectName: req.body.projectName }
                }).then((project) => {
                    User.findOne({
                        where: { name: req.body.name }
                    }).then(user => {
                        Bug.findOne({
                            where: { projectID: project.id, userID: user.id }
                        }).then(bug => {
                            try {
                                commitDB = Commit.update(commitToBeSent, {
                                    where: { bugID: bug.id },
                                });
                                res.status(200).send({ msg: 'Commit schimbat' });
                            }

                            catch (err) {
                                res.status(200).send(err);
                            }
                        })
                    }).catch(err => {
                        res.status(500).send({ msg: 'Nu exista user-ul' })
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista proiectul' })
                })

            }
        }
    },

    deleteCommit: async (req, res) => {
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
                        Commit.findOne({
                            where: { bugID: bug.id }
                        }).then(commit => {
                            if (commit) {
                                commit.destroy();
                                res.status(200).send({ msg: "Commit-ul a fost sters" });
                            }
                            else {
                                res.status(404).send({ msg: "Commit-ul nu a fost gasit" });
                            }
                        }).catch(err => {
                            res.status(500).send({ msg: 'Nu exista bug-ul' })
                        })
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
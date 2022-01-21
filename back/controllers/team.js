const express = require('express');
const router = express.Router();

const Team = require('../models/team');

const controller = {
    addTeam: async (req, res) => {
        const { name } = req.body;
        let errors = [];

        if (name.length < 6) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            Team.findOne({ where: { name: name } }).then(async team => {
                if (team) {
                    errors.push({ msg: 'Numele e folosit deja' });

                    res.send({ msg: 'Echipa exista' });
                } else {
                    const newTeam = Team.create({ name });
                    res.send({ msg: 'Echipa a fost creata' });
                }
            })
        }

    },

    get: async (req, res) => {
        Team.findOne({
            where: { id: req.params.id }
        }).then((team) => {
            res.status(200).send(team);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getTeam: async (req, res) => {
        Team.findOne({
            where: { name: req.params.name }
        }).then((team) => {
            res.status(200).send(team);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    updateTeam: async (req, res) => {
        const teamToBeSent = {
            name: req.body.name
        }

        let errors = [];

        const team = await Team.findOne({ where: { name: req.body.name } });

        if (teamToBeSent.name.length < 6) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (team != null) {
                res.send({ msg: 'Echipa exista' });
            } else {
                try {
                    teamDB = await Team.update(teamToBeSent, {
                        where: { name: req.params.name },
                    });
                    res.status(200).send({ msg: 'Echipa schimbata' });
                }

                catch (err) {
                    res.status(200).send(err);
                }
            }
        }
    },

    deleteTeam: async (req, res) => {
        try {
            const team = await Team.findOne({ where: { name: req.params.name } });
            if (team) {
                await team.destroy();
                res.status(200).send({ msg: "Echipa a fost stersa" });
            }
            else {
                res.status(404).send({ msg: "Echipa nu a fost gasita" });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
module.exports = controller;

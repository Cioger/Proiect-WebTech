const connection = require("../models").connection;

const controller = {
    reset: (req, res) => {
        connection.sync({ force: true }).then(() => {
            res.status(200).send({ message: "S-a resetat BD" })

        }).catch((err) => {
            res.status(500).send({ message: "Eroare" } + err)
        })
    },
};

module.exports = controller;
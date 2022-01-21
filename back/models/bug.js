const Sequelize = require('sequelize');
const db = require('../config/db');

const Bug = db.define('bug', {
    severity: {
        type: Sequelize.INTEGER
    },
    priority: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
})

module.exports = Bug;
const Sequelize = require('sequelize');
const db = require('../config/db');

const Project = db.define('project', {
    projectName: {
        type: Sequelize.STRING
    },
    repository: {
        type: Sequelize.STRING
    },
})

module.exports = Project;
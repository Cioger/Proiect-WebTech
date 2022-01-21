const Sequelize = require('sequelize');
const db = require('../config/db');

const Commit = db.define('commit', {
    link: {
        type: Sequelize.STRING
    },
})

module.exports = Commit;
const resetController = require('./reset');
const user = require('./user');
const team = require('./team');
const project = require('./project');
const bug = require('./bug');
const commit = require('./commit');

const controller = {
    resetController,
    user,
    team,
    project,
    bug,
    commit
};

module.exports = controller;
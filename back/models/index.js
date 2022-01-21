const Sequelize = require('sequelize');

const db = require('../config/db');

const User = require('./user');
const Team = require('./team');
const Project = require('./project');
const Commit = require('./commit');
const Bug = require('./bug');

User.belongsToMany(Team, { through: 'userTeam' });
Team.belongsToMany(User, { through: 'userTeam' });

User.belongsToMany(Project, { through: 'userProject' });
Project.belongsToMany(User, { through: 'userProject' });

Team.hasMany(Project, { foreignKey: 'teamID' });
Project.belongsTo(Team, { foreignKey: 'teamID' });

Project.hasMany(Bug, { foreignKey: 'projectID' });
Bug.belongsTo(Project, { foreignKey: 'projectID' });

Bug.hasOne(Commit, { foreignKey: 'bugID' });
Commit.belongsTo(Bug, { foreignKey: 'bugID' });

User.hasOne(Bug, { foreignKey: 'userID' });
Bug.belongsTo(User, { foreignKey: 'userID' });


module.exports = {
    User,
    Team,
    Project,
    Commit,
    Bug,
    connection: db
}

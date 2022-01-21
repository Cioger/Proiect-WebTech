const Sequelize = require('sequelize');

module.exports = new Sequelize('bugzilla', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
      },
});


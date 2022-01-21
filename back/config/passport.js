const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            User.findOne({
                where: { email: email }
            }).then(user => {
                if (!user) {
                    return done(null, false, { msg: 'Email-ul/Parola sunt incorecte' });
                }


                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { msg: 'Email-ul/Parola sunt incorecte' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findByPk(id, function (err, user) {
            done(err, user);
        });
    });
};
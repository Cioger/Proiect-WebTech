const express = require('express');
const router = express.Router();
const otherRouter = require('./db.js');
const userRouter = require('./user');
const teamRouter = require('./team');
const projectRouter = require('./project');
const bugRouter = require('./bug');
const commitRouter = require('./commit');

router.use("/", otherRouter);
router.use("/user", userRouter);
router.use("/team", teamRouter);
router.use("/project", projectRouter);
router.use("/bug", bugRouter);
router.use("/commit", commitRouter);

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});
module.exports = router;
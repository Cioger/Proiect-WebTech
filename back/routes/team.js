const express = require('express');
const router = express.Router();
const team = require('../controllers/team');


router.get('/:id', team.get);
router.post('/add/', team.addTeam);
router.get('/getTeam/:name', team.getTeam);
router.put('/update/:name', team.updateTeam);
router.delete('/delete/:name', team.deleteTeam);

module.exports = router;
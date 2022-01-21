const express = require('express');
const router = express.Router();
const bug = require('../controllers/bug');

router.post('/add/', bug.addBug);
router.get('/getBug/', bug.getBug);
router.get('/', bug.getBugsProject);
router.get('/getBugUser/:name', bug.getBugUser);
router.get('/getBugProject/:projectName', bug.getBugProject);
router.put('/update/', bug.updateBug);
router.delete('/delete/', bug.deleteBug);

module.exports = router;
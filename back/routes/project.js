const express = require('express');
const router = express.Router();
const project = require('../controllers/project');

router.post('/add/:teamName', project.addProject);
router.get('/getProject/:projectName', project.getProject);
router.get('/getProjectByIdUser/:id', project.getProjectByIdUser);
router.get('/getProjects/', project.getProjects);
router.put('/update/:projectName', project.updateProject);
// router.put('/change/:name', project.changeTeam);
router.delete('/delete/:projectName', project.deleteTeam);

module.exports = router;
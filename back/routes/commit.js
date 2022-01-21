const express = require('express');
const router = express.Router();
const commit = require('../controllers/commit');

router.post('/add/', commit.addCommit);
router.get('/getCommit/', commit.getCommit);
router.get('/:description', commit.get);
router.put('/update/', commit.updateCommit);
router.delete('/delete/', commit.deleteCommit);

module.exports = router;
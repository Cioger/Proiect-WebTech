const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const passport = require('passport');

router.post('/register/', user.register);
router.post('/login/', user.login);
router.get('/getUser/:name', user.getUser);
router.put('/update/:name', user.updateUser);
router.delete('/delete/:name', user.deleteUser);
router.get('/:id', user.getUser);





module.exports = router;
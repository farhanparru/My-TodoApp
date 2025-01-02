const express = require("express");
const router = express.Router();
const UserCtrl = require('../controller/UserCtrl')

router


.post('/register', UserCtrl.userRegister)
.post('/login', UserCtrl.userLogin)
.post('/sendPasswordLink', UserCtrl.sendPasswordLink)
router.post('/UpdatePassword/:id/:token', UserCtrl.Resetpassword);


module.exports = router
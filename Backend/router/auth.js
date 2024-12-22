const express = require("express");
const router = express.Router();
const UserCtrl = require('../controller/UserCtrl')

router


.post('/register', UserCtrl.userRegister)
.post('/login', UserCtrl.userLogin)


module.exports = router
const express = require("express");
const router = express.Router();
const verifayiToken = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')
const UserCtrl = require('../controller/UserCtrl')

router

.post('/AddTodo',verifayiToken,authorizeRoles("admin", "manager"), UserCtrl.addTodo)
.get('/getTodo',verifayiToken,authorizeRoles("admin","user","manager"), UserCtrl.getTodo)
.put('/updateTodo/:id',verifayiToken,authorizeRoles("admin", "manager","user"), UserCtrl.updateTodo)
.delete('/deleteTodo/:id',verifayiToken,authorizeRoles("admin", "manager","user"), UserCtrl.TodoDelete)
.get('/getIdData/:id',verifayiToken,authorizeRoles("admin", "manager","user"),UserCtrl.getByIdTodo)



module.exports = router
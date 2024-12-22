const express = require("express");
const router = express.Router();
const verifayiToken = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware')
const UserCtrl = require('../controller/UserCtrl')

router

.post('/AddTodo',  authorizeRoles("admin", "manager"), UserCtrl.addTodo)
.get('/getTodo',verifayiToken, authorizeRoles("admin"), UserCtrl.getTodo)
.put('/updateTodo/:id', authorizeRoles("admin", "manager"), UserCtrl.updateTodo)
.delete('/deleteTodo/:id', authorizeRoles("admin", "manager"), UserCtrl.TodoDelete)
.get('/getIdData/:id',  authorizeRoles("admin", "manager","user"),UserCtrl.getByIdTodo)



module.exports = router
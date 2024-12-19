const express = require("express");
const router = express.Router();
const UserCtrl = require('../controller/UserCtrl')

router

.post('/AddTodo', UserCtrl.addTodo)
.get('/getTodo', UserCtrl.getTodo)
.put('/updateTodo/:id', UserCtrl.updateTodo)
.delete('/deleteTodo/:id', UserCtrl.TodoDelete)
.get('/getIdData/:id', UserCtrl.getByIdTodo)


module.exports = router
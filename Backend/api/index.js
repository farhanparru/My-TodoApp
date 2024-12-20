const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('../router/User');



app.use(cors({
  origin:["https://my-todo-app-brown-seven.vercel.app"],
  methods: ["GET,POST,PUT,DELETE,PATCH"],
}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user/api', router)

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect('mongodb://localhost:27017/myTodoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.get('/',(req,res)=>{
    res.send('MY TodoApplication')
})



app.listen(PORT,()=>{
console.log(`Server is Runing on http://localhost:${PORT}`);

})
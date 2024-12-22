const express = require('express')
const dontenv = require('dotenv').config()
const app = express()
const PORT = 8000
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRouter = require('../router/User');
const authUser = require('../router/auth')


app.use(cors({
  origin:["http://localhost:5173"],
  methods: ["GET,POST,PUT,DELETE,PATCH"],

}))

// middlwares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));




mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.get('/',(req,res)=>{
    res.send('MY TodoApplication')
})



app.use('/api/user/', userRouter)
app.use('/api/auth/', authUser)


app.listen(PORT,()=>{
console.log(`Server is Runing on http://localhost:${PORT}`);

})
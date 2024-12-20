const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRouter = require('../router/User');



app.use(cors({
  origin:["https://my-todo-frondent.vercel.app"],
  methods: ["GET,POST,PUT,DELETE,PATCH"],
  credentials: true,
}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));




mongoose
  .connect('mongodb+srv://shaminmuhammad116:Parru123@cluster0.rd6fx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.get('/',(req,res)=>{
    res.send('MY TodoApplication')
})



app.use('/user/api', userRouter)


app.listen(PORT,()=>{
console.log(`Server is Runing on http://localhost:${PORT}`);

})
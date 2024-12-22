const TodoDB = require("../Model/TodoModel");
const userDB = require("../Model/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
  addTodo: async (req, res) => {
    try {
      const { title } = req.body;

      // create new Todo

      const createnewTodo = new TodoDB({
        title,
      });

      // save the databse

      const saveTod = await createnewTodo.save();

      return res.status(201).json({
        message: "Todo created successfully",
        data: saveTod,
      });
    } catch (error) {
      console.log(error);
      
      // return res.status(500).json({
      //   message: "An error",
      // });
    }
  },

  getTodo: async (req, res) => {
    try {
      const AllgetDatas = await TodoDB.find();
      return res
        .status(200)
        .json({ message: "Successfully Fetch datas", AllgetDatas });
    } catch (error) {
      return res.status(500).json({
        message: "An error",
      });
    }
  },

  getByIdTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const getTodoIdData = await TodoDB.findById(id);
      if (!getTodoIdData) {
        return res.status(404).json({ message: "Note found Todo" });
      }
      return res
        .status(200)
        .json({ message: "get Id base datas", getTodoIdData });
    } catch (error) {
      console.log(error);
    }
  },
  

  updateTodo: async (req, res) => {
    try {
      const { title } = req.body;
      const { id } = req.params;

      const todo = await TodoDB.findById(id);

      if (!todo) {
        return res.status(404).json({
          message: "Todo Note found",
        });
      }

      todo.title = title || todo.title;

      const EditTodo = await todo.save();

      return res.status(200).json({
        message: "Todo updated successfully",
        data: EditTodo,
      });
    } catch (error) {
      console.log(error);
    }
  },

  TodoDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteTodo = await TodoDB.findByIdAndDelete(id);

      if (!deleteTodo) {
        return res.status(201).json({ message: "Note found" });
      }

      return res.status(200).json({
        message: "Succesfully Delete",
        deleteTodo,
      });
    } catch (error) {
      console.log(error);
    }
  },



  userRegister:async(req,res)=>{
    const {username,password,email,role} = req.body
    try {
      if(!username,!password,!email){
        return res.status(402).json({message:"Please fill this feild"})
      }
      const hashedPassword = await bcrypt.hash(password,10)
      const newUser = new userDB({username, password:hashedPassword, email, role})
      await newUser.save()

      return res.status(201).json({message:"User Successfully Register"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Internel server error"})
    }
  },


    userLogin:async(req,res)=>{
     const {username, password} = req.body
     try {
      const user = await userDB.findOne({username})
      if(!user){
        return res.status(404).json({message:"User note Found"})
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
        return res.status(400).json({message:"Password Note Match"})
      }

      // JWT token
       
      const token = jwt.sign(
        {id:user._id, role: user.role}, process.env.JWT_SECRET,
        {expiresIn:"1h"}
      )
  
      return res.status(201).json({message:"User Successfully login", token})
     } catch (error) {
      
     }
  },


};



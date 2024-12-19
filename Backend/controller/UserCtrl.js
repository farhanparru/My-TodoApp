const UserDB = require("../Model/UserModel");

module.exports = {
  addTodo: async (req, res) => {
    try {
      const { title } = req.body;

      // create new Todo

      const createnewTodo = new UserDB({
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
      const AllgetDatas = await UserDB.find();
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
      const getTodoIdData = await UserDB.findById(id);
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

      const todo = await UserDB.findById(id);

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

      const deleteTodo = await UserDB.findByIdAndDelete(id);

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
};

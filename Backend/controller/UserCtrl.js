const TodoDB = require("../Model/TodoModel");
const userDB = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Email configuration

const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service (e.g., gmail, yahoo, etc.)
  auth: {
    user: process.env.SM_EMAIL,
    pass: process.env.SM_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

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

  userRegister: async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
      if ((!username, !password, !email)) {
        return res.status(402).json({ message: "Please fill this feild" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userDB({
        username,
        password: hashedPassword,
        email,
        role,
      });
      await newUser.save();

      return res.status(201).json({ message: "User Successfully Register" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internel server error" });
    }
  },

  userLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userDB.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Customer note Found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password Note Match" });
      }

      // JWT token

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .status(201)
        .json({ message: "User Successfully login", token });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({message:"Internel Server error"})
    }
  },

  // send User E-mail verifayiToken

  sendPasswordLink: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(401)
          .json({ status: 401, message: "Enter Your Email" });
      }

      const userfind = await userDB.findOne({ email: email });
      if (!userfind) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }


    
      // Generate token
      const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
        expiresIn: "150s",
      });

      

      // Update verifytoken
      const setUserToken = await userDB.findByIdAndUpdate(
        userfind._id,
        { verifytoken: token },
        { new: true }
      );

      if (setUserToken) {
        const mailOptions = {
          from: "shaminmuhammad116@gmail.com",
          to: email,
          subject: "Reset Your Password - TodoApplication",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #d4af37;">Password Reset Request</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Please click the button below to reset your password. This link is valid for <strong>2 minutes</strong>.</p>
              <a href="http://localhost:5173/forgotpassword/${userfind.id}/${setUserToken.verifytoken}" 
                 style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #d4af37; text-decoration: none; border-radius: 5px;">
                 Reset Password
              </a>
              <p>If you did not request a password reset, please ignore this email or contact support.</p>
              <p>Thank you,<br>TodoApplication Team</p>
            </div>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res
              .status(500)
              .json({ status: 500, message: "Email not sent" });
          } else {
            console.log("Email sent:", info.response);
            return res
              .status(200)
              .json({
                status: 200,
                message: "Password reset email sent successfully",
              });
          }
        });
      } else {
        return res.status(500).json({ status: 500, message: "Token not set" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  },

  // change Password

  Resetpassword: async (req, res) => {
    const { id, token } = req.params;
 
    
    const { password, confirm } = req.body;

    if (password !== confirm) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }
    try {
      const validUser = await userDB.findOne({ _id: id, verifytoken: token });



      // token is valid
      try {
        const verifayiToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verifayiToken,"verifayiToken");
        

      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token expired, please generate a new reset link",
          });
        }
        return res.status(400).json({
          success: false,
          message: "Invalid token",
        });
      }
   
      // Password update proccess code

      if (validUser && verifayiToken._id) {
        // console.log("Password:", password); // Debugging
    const hashedPassword = await bcrypt.hash(password, 12); // Salt rounds: 12
    


        const setnewpassword = await userDB.findByIdAndUpdate(
          { _id: id },
          { password: hashedPassword }
        );

        setnewpassword.save();
        return res
          .status(201)
          .json({ message: "Successfully Change password" });
      } else {
        return res.status(404).json({ message: "User Dont Exist.!" });
      }
    } catch (error) {
      console.log(error,"error");
      
      return res.status(500).json({message:"Server Error "})
    }
  },

  // verifayi Customer ResetPassword Time

  VerifyCustomer:async(req,res)=>{
    const {id,token} = req.params
    try {
      const checkValidcustomer = await userDB.findOne({_id: id, verifytoken:token})

      if(!checkValidcustomer){
        return res.status(404).json({ message: "Invalid user or token" });
      }

      const checkToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      )
      
      if(checkValidcustomer && checkToken._id ){     
      return res.status(200).json({ message: "Customer verified successfully" });
      }

    } catch (error) {
      console.error("Error verifying customer:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

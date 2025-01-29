const TodoDB = require("../Model/TodoModel");
const userDB = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');

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


// OTP generation


const generateAndsendOTP = async (email)=>{
  const otp = otpGenerator.generate(4, {
    digits: true,              // Include digits
    lowerCaseAlphabets: false, // Exclude lowercase letters
    upperCaseAlphabets: false, // Exclude uppercase letters
    specialChars: false         // Exclude special characters
  });
  

  console.log(`Generated OTP: ${otp}`);

  
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  console.log(`OTP expires at: ${expiresAt}`);


  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SM_EMAIL,
      pass: process.env.SM_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    to: email, // Recipient email address
    subject: 'Todomaster - Seamless Task Management with OTP Security',
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>OTP Verification</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #f4f7ff;
            background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%;">
              <tbody>
                <tr style="height: 0;">
                  <td>
                    <img
                      alt="TodoMaster Logo"
                      src="https://tshop.r10s.jp/osanpo/cabinet/05784991/7570380-1.jpg?fitin=720%3A720"
                      height="60px"
                    />
                  </td>
                  <td style="text-align: right;">
                    <span
                      style="font-size: 16px; line-height: 30px; color: #ffffff;"
                      >${new Date().toDateString()}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Your OTP Code
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hi there,
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for using TodoMaster! Use the following OTP to verify your identity. This code is valid for 
                  <span style="font-weight: 600; color: #1f1f1f;">10 minutes</span>. Please do not share this OTP with anyone for security purposes.
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 60px;
                    font-size: 40px;
                    font-weight: 600;
                    letter-spacing: 25px;
                    color: #ba3d4f;
                  "
                >
                  ${otp}
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Contact us at 
              <a
                href="mailto:support@todomaster.com"
                style="color: #499fb6; text-decoration: none;"
                >support@todomaster.com</a
              >
              or visit our
              <a
                href="https://todomaster.com/help-center"
                target="_blank"
                style="color: #499fb6; text-decoration: none;"
                >Help Center</a
              >.
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              "
            >
              TodoMaster
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
              123 TodoMaster Lane, Your City, Your State
            </p>
            <div style="margin: 0; margin-top: 16px;">
              <a href="https://facebook.com/todomaster" target="_blank" style="display: inline-block;">
                <img
                  width="36px"
                  alt="Facebook"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                />
              </a>
              <a
                href="https://instagram.com/todomaster"
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Instagram"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
                />
              </a>
              <a
                href="https://twitter.com/todomaster"
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Twitter"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                />
              </a>
              <a
                href="https://youtube.com/todomaster"
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Youtube"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
                />
              </a>
            </div>
            <p style="margin: 0; margin-top: 16px; color: #434343;">
              Copyright © ${new Date().getFullYear()} TodoMaster. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    `
  });
  

  return { otp, expiresAt };
}



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
     
      const existingUser =  await userDB.findOne({email})
      if(existingUser) return res.status(400).json({message:"User already exists"})

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userDB({
        username,
        password: hashedPassword,
        email,
        role,
      });
      await newUser.save();

      const {otp,expiresAt} = await generateAndsendOTP(email)
      newUser.otp = otp;
      newUser.otpExpiresAt = expiresAt;
      await newUser.save()

      return res.status(201).json({ message: "User Successfully Register" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internel server error" });
    }
  },


  verifatOTP:async(req,res)=>{
     
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

      return res.status(500).json({ message: "Internel Server error" });
    }
  },

  // send User E-mail verifayiToken

  sendPasswordLink: async (req, res) => {
    try {
      const { email , username} = req.body;

      if (!email) {
        return res
          .status(401)
          .json({ status: 401, message: "Enter Your Email" });
      }

      const findCustomer = await userDB.findOne({username:username})
      if(!findCustomer){
        return res.status(404).json({message:"This Customer Note have Application"})
      }

      const userfind = await userDB.findOne({ email: email });
      if (!userfind) {
        return res.status(401).json({ status: 401, message: "This Email Note Enter Application" });
      }

      // Generate token
      const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
     expiresIn: "1m", // 1 minute
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
subject: "Reset Your Password - TodoMaster",
html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <!-- Header Section -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://images.squarespace-cdn.com/content/v1/572b90fa8a65e243d508a96d/1467917398510-XOS3LUIP0YTR1MDWLH7A/todo+logo.jpg" alt="TodoMaster Logo" style="width: 150px; margin-bottom: 10px;">
      <h1 style="color: #d4af37; font-size: 24px;">TodoMaster</h1>
    </div>
    
    <!-- Body Section -->
    <h2 style="color: #d4af37; text-align: center;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Please click the button below to reset your password. This link is valid for <strong>1 minute</strong>.</p>
    
    <!-- Reset Button -->
    <div style="text-align: center; margin: 20px 0;">
      <a href="http://localhost:5173/forgotpassword/${userfind.id}/${setUserToken.verifytoken}" 
         style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color: #d4af37; text-decoration: none; border-radius: 5px;">
         Reset Password
      </a>
    </div>
    
    <p>If you did not request a password reset, please ignore this email or contact support.</p>
    
    <!-- Footer Section -->
    <div style="border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; text-align: center;">
      <p style="font-size: 14px; color: #777;">Thank you,<br><strong>TodoMaster Team</strong></p>
    </div>
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
            return res.status(200).json({
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
    const { username, password, confirm } = req.body;
  
    if (password !== confirm) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }
  
    try {
      const findCustomer = await userDB.findOne({ username: username });
      if (!findCustomer) {
        return res.status(404).json({ message: "This customer is not found" });
      }
  
      const validUser = await userDB.findOne({ _id: id, verifytoken: token });
      if (!validUser) {
        return res.status(404).json({ message: "User does not exist" });
      }
  
      // Verify the token and handle token expiration error
      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifiedToken, "verifiedToken");
  
        // Proceed to update the password
        const hashedPassword = await bcrypt.hash(password, 12); // Salt rounds: 12
        validUser.password = hashedPassword;
        await validUser.save();
  
        return res.status(201).json({ message: "Password changed successfully" });
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
    } catch (error) {
      console.error(error, "error");
      return res.status(500).json({ message: "Server error" });
    }
  },
  

  // verifayi Customer ResetPassword Time

  VerifyCustomer: async (req, res) => {
    const { id, token } = req.params;
    try {
      const checkValidcustomer = await userDB.findOne({
        _id: id,
        verifytoken: token,
      });

      if (!checkValidcustomer) {
        return res.status(404).json({ message: "Invalid user or token" });
      }

      const checkToken = jwt.verify(token, process.env.JWT_SECRET);

      if (checkValidcustomer && checkToken._id) {
        return res
          .status(200)
          .json({ message: "Customer verified successfully" });
      }
    } catch (error) {
      console.error("Error verifying customer:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

const User = require("../models/Users");
const bcrypt = require("bcrypt");

class userController {
  //!Register logic

  static Register = async (req, res) => {
    try {
      //! Get Data from Req Body

      const { name, email, password, cpassword } = req.body;

      //! Email Exists in Database

      const isEmailExist = await User.findOne({ email: email });

      if (isEmailExist) {
        res
          .status(400)
          .json({ success: "Failed", message: "Email Already Exists" });
      } else {
        //! Vaildation Checking for the coming fields from the body
        if (name && email && password && cpassword) {
          //! password and cpassword are matching checking

          if (password === cpassword) {
            //! Password encryption using bcrypt
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = await User.create({
              name,
              email,
              password: passwordHash,
              cpassword: passwordHash,
            });

            //! password field no need to show on postman response
            user.password = undefined;
            user.cpassword = undefined;
            res.status(201).json({
              success: "Success",
              message: "Registration Successfully",
              User: user,
            });
          } else {
            res.status(400).json({
              success: "Failed",
              message: "Password and confirm password doesn't match",
            });
          }
        } else {
          res
            .status(400)
            .json({ success: "Failed", message: "All Fields Are Required" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  static Login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });

      if (user != null) {
        // Password compare with the Database
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (user.email && isPasswordMatched) {
          res
            .status(200)
            .json({ success: "success", message: "Login Success" });
        } else {
          res
            .status(400)
            .json({ success: "Failed", message: "Invalid Credentials" });
        }
      } else {
        res
          .status(400)
          .json({ success: "Failed", message: "Email Not Registered " });
      }
    } else {
      res
        .status(400)
        .json({ success: "Failed", message: "All fields are Required" });
    }
  };
}

module.exports = userController;

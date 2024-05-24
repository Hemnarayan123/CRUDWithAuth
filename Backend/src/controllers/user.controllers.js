import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'



// ................................................Registration


const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      ![username, email, password].every((field) => field?.trim())
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use",
        success: false,
        error: true,
      });
    }

    

    // const EncPaasword = await bcrypt.hash(password, 10)

    // // Create a new user instance
    // const newUser = new User({
    //   username,
    //   lastname,
    //   email,
    //   password : EncPaasword,
    // });

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });


    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: savedUser,
      token: await newUser.generateToken(),
      // userId : userCreated._id.toString(),
      error: false,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "User registration failed",
      error: true,
      success: false,
    });
  }
};












// .............................................Login


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const userExist = await User.findOne({ email });
    // console.log(userExist);
    if (!userExist) {
      return res.status(400).json({
        message: "Invalid Credentials",
        error: true,
        success: false,
      });
    }


    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        error: true,
        success: false,
      });
    }

    const token = await userExist.generateToken();

    res.status(200).json({
      message: "User Login Successfully !!",
      token: token,
      data : userExist._id,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      message: "Server Error",
      error: true,
      success: false,
    });
  }
};

export { userRegister, userLogin };

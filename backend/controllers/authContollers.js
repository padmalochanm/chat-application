import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(payload, secret, { expiresIn: "1hr" });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, gender } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePic = `https://robohash.org/${name}`;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    await newUser.save();

    const payload = { userId: newUser._id };
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(payload, secret, { expiresIn: "1hr" });
    
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

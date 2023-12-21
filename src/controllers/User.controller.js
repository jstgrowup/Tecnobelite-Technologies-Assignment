import generateAccessAndRefreshTokens from "../helpers/generateToken.js";
import { UserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
const checpass = async (password, user) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log("error:", error);
  }
};
const signUp = async (req, res) => {
  try {
    const { Email, password, Name } = req.body;
    if (!Email || !password) {
      return res.status(400).json("Email and password is required");
    }
    const foundUser = await UserModel.findOne({ Email });
    if (foundUser) {
      return res.status(400).json("Account already exists with this Email");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      Name,
      Email,
      password: hash,
    });
    if (!user) {
      return res.status(400).json("Something went wrong in user creation");
    }
    return res.status(201).json(user);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json("Server error");
  }
};
const signIn = async (req, res) => {
  try {
    const { Email, password } = req.body;
    if (!(password || Email)) {
      return res.status(400).json("Username or Email is required");
    }
    const user = await UserModel.findOne({
      Email,
    });
    if (!user) {
      return res.status(400).json("User does not exists");
    }
    const isMatch = checpass(password, user);
    if (!isMatch) {
      return res.status(400).json("Invalid password");
    }
    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({ refreshToken, accessToken });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json("Server error");
  }
};
export { signUp, signIn };

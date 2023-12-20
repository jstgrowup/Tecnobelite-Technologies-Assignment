import generateAccessAndRefreshTokens from "../helpers/generateToken";
import { UserModel } from "../models/User.model";

const signUp = async (res, res) => {
  try {
    const { Email, password } = req.body;
    if (!Email || !password) {
      return res.status(400).json("Email and password is required");
    }
    const foundUser = await UserModel.findOne({ Email });
    if (foundUser) {
      return res.status(400).json("Account already exists with this Email");
    }
    const user = await UserModel.create({
      Email,
      password,
    });
    if (!user) {
      return res.status(400).json("Something went wrong in user creation");
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};
const signIn = async (res, res) => {
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
    const isPassValid = await user.isPasswordCorrect(password);
    if (!isPassValid) {
      return res.status(400).json("Invalid Password");
    }
    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    return res.status(200).json({ refreshToken, accessToken });
  } catch (error) {}
};
export { signUp, signIn };

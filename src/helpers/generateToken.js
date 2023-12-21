import { UserModel } from "../models/User.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const userInstance = new UserModel();

    const accessToken = userInstance.generateAccessToken(
      { id: user._id, email: user.Email },
      (err, token) => {
        return token;
      }
    );
    const refreshToken = userInstance.generateRefreshToken(
      { id: user._id, email: user.Email },
      (err, token) => {
        return token;
      }
    );
    user.refreshToken = refreshToken;
    await user.save({ ValiditeBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};
export default generateAccessAndRefreshTokens;

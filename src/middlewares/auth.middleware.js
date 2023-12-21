import { UserModel } from "../models/User.model.js";

import jwt from "jsonwebtoken";
export const AuthMiddlewareForToken = async (req, res, next) => {
  try {
    const token = req.headers?.accesstoken;

    if (!token) {
      return res.status(400).json("Invalid User");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(400).json("Invalid User");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

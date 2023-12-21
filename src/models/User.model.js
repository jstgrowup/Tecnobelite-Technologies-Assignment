import { Schema, model } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  LateReturedFine: {
    type: Number,
    default: 0,
  },
  Role: {
    type: String,
    enum: ["user", "admin"],
  },
  refreshToken: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.isPasswordCorrect = async function (password) {
  console.log("password:", typeof password);
  const res = await bcrypt.compare(password, this.password);
  console.log("res:", res);
  return res;
};
UserSchema.methods.generateAccessToken = function (data, callback) {
  const token = Jwt.sign(
    {
      _id: data.id,
      email: data.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return callback(null, token);
};
UserSchema.methods.generateRefreshToken = function (data, callback) {
  const token = Jwt.sign(
    {
      _id: data.id,
      email: data.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  return callback(null, token);
};
export const UserModel = model("users", UserSchema);

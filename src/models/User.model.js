import { Schema, model } from "mongoose";
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
  },
  Role: {
    type: String,
    enum: ["user", "admin"],
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
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

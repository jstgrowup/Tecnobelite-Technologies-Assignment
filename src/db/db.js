import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/TecnobeliteTechnologies`);
    console.log(`mongoDB connected `);
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
    process.exit(1);
  }
};
export default connect;

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const woodSchema = new Schema({
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
    img: String
  }
);

export const Wood = Mongoose.model("Wood", woodSchema);

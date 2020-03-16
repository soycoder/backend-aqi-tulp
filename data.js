const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    time : String,
    light : Number,
    temp : Number,
    humidity : Number,
    pressure : Number,
    rain : Number,
    pm1 : Number,
    pm2_5 : Number,
    pm10 : Number,
    o3 : Number,
    no2 : Number,
    co : Number,
    so2 : Number,
    ws : Number,
    wdi : Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);

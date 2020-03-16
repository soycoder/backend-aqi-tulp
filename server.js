const mongoose = require("mongoose");
var cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");



const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();

mongoose.connect("mongodb+srv://admin_3:*mongo3@clusterew1-uogmd.mongodb.net/aqi_tulp");
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

router.get("/", (req, res) => {
  res.json({ message: "HELLOW WORLDUUHHHH" });
});

router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getOneData", (req, res) => {
  let { time } = req.body;
  let filter = { time : time };
  console.log(filter);
  Data.findOne(filter, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(user);
  });
});


router.post("/updateData", (req, res) => {
  const { time, update } = req.body;
  Data.findOneAndUpdate(time, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  Data.findOneAndDelete({id:id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/setInitialData", (req, res) => {
  console.log(req.query)
  let data = new Data();
  //Initial Data
  data.time = req.query.time,
  data.light = 0,
  data.temp = 0,
  data.humidity = 0,
  data.pressure = 0,
  data.rain = 0,
  data.pm1 = 0,
  data.pm2_5 = 0,
  data.pm10 = 0,
  data.o3 = 0,
  data.no2 = 0,
  data.co = 0,
  data.so2 = 0,
  data.ws = 0,
  data.wdi = 0
  
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));

//'mongodb://localhost/SWC_Media'
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
//const url = "mongodb://localhost/SWC_Media_BS";
//const config = require("config");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const url = process.env.MONGO_URL;
const session = require("express-session");
const cookieSession = require("cookie-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passportOutlook");

//Requiring Routes
const streamRoutes = require("./routes/streaming.routes");
const authRoutes = require("./routes/auth2.routes");
const testingRoutes = require("./routes/course.routes");
const adminRoutes = require("./routes/admin.routes");
//const uploadRoute = require('./routes/upload.routes');

//mongoose setup
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successful DB connection"))
  .catch((err) => console.error("DB connection fail"));

var corsOptions = {
  origin: "http://localhost:3000",
  //origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); //Change this later to restrict it to react app only
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-auth-token, Origin, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use(flash());

// SESSION MIDDLEWARE
app.use(
  cookieSession({
    name: "swc-courses-session",
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: false, //////////// CHANGE IT AFTERWARDS !!!
    // path: "http://localhost:3000/",
    keys: ["hello world"],
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Setup routes
// app.use("/api/", authRoutes); //// changed it temporarily to test outlookOauth
app.use("/", authRoutes);
app.use("/api/courses/:id/", streamRoutes);
app.use("/api/", testingRoutes);
app.use("/api/admin", adminRoutes);

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(
    err.status ? err : { message: "Internal server error, check server log" }
  );
  if (!err.status) {
    console.log(err);
  }
});

//Setup routes
// Serve static assets if in production
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  //set static folder
  console.log("i'm running");
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function () {
  console.log(`SWC Media server has started at port ${PORT}`);
});

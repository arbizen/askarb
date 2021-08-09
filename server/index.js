const epxress = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = epxress();
const path = require("path");

// import routers
const questionRouter = require("./api/questions");
const userRouter = require("./api/user");

// require dotenv.
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// use routers
app.use("/questions", questionRouter);
app.use("/user", userRouter);

/**** PRODUCTION MANAGEMENT *****/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  // after all the routes define above, if any other route is accessed, we should
  // resolve the index.html page of production build
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}
//================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

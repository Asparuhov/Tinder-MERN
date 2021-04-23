const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { resolveSoa } = require("dns");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/user", authenticateToken, (req, res, next) => {
  res.send(req.user);
});

app.post("/resetUser", (req, res, next) => {
  let id = req.body.id;
  console.log(id);
  User.findById(id, (err, user) => {
    if (user) {
      res.send(user);
    } else {
      res.send(err);
    }
  });
});

app.post("/verify", (req, res) => {
  let id = req.body.id;
  User.findByIdAndUpdate(id, { verified: true }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated User : ", docs);
    }
  });
});

app.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  User.findOne({ email }).then((user) => {
    if (user) {
      res.send("bad");
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPass,
        verified: false,
      });
      newUser
        .save()
        .then(() => res.send("success"))
        .catch((err) => console.log(err));
    }
  });
});

app.post("/login", (req, res, next) => {
  let { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) throw err;
        if (response) {
          const accessToken = jwt.sign(
            user.toJSON(),
            "2150b00546dd908c7357b9ff597711128cd6"
          );
          res.json({ accessToken: accessToken });
        } else {
          res.send("pass");
        }
      });
    } else {
      res.send("email");
    }
  });
});
function authenticateToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token === null) {
    res.status(401).send("Error");
  }
  jwt.verify(token, "2150b00546dd908c7357b9ff597711128cd6", (err, user) => {
    if (err) throw err;
    req.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    };
    next();
  });
}
mongoose
  .connect(
    "mongodb+srv://chris:parola123@cluster0.j5go7.mongodb.net/users?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then((res) => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => console.log(err));

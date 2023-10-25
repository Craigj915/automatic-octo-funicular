const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid")
const { Ad } = require("./models/event");
const { User } = require("./models/user")
require("dotenv").config();


const port = 3001;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());


app.post("/register", async (req, res, next) => {
  console.log("Creating User");

  try {
    const newUser = new User({
      username,
      password,
      company,
      picture,
      token,
    });

    const saveNewUser = await newUser.save();

    newUser.token = uuidv4();
        await newUser.save();
        res.send({
            token: newUser.token,
        });

    res.send({
      message: "User created successfully",
    });
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
  });



app.post("/auth", async (req, res, next) => {
    console.log("logging in");
    
    console.log(req.body);

    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
          console.log(user)
            return next(createError(404, "User not found"));
        }

        if(req.body.password !== user.password) {
            return next(createError(401, "Wrong password"));
        }

        user.token = uuidv4();
        await user.save();
        res.send({
            token: user.token,
        });
    } catch (err) {
        return next(createError(500, "Internal Server Error"));
    }
});


app.use(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const user = await User.findOne({ token: authHeader });
    if (user) {
        next();
    } else {
        return next(createError(401, "Unauthorized"));
    }
});


//Gets ads if user is authenticated
app.get("/", async (req, res, next) => {
  try {
    const data = await Ad.find();
    res.send(data);
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
});


app.post("/", async (req, res, next) => {
  try {
    const { name, description, location, maps } = req.body;
    if (!name || !description || !location || !maps) {
      return next(createError(400, "Bad Request"));
    }

    const newAd = new Ad({
      name,
      description,
      location,
      maps,
    });

    const saveAd = await newAd.save();

    res.send({
      message: "Event Ad created successfully",
    });
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
});


app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "Bad Request"));
    }

    const deleteAd = await Ad.findByIdAndDelete(id);

    res.send({
      message: "Event deleted",
    });
  } catch (err) {
    return next(createError(500, "Internal Server Error"));
  }
});


app.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await Ad.findByIdAndUpdate(id, req.body);
        res.send({
            message: "Event updated successfully",
        });
    } catch (err) {
        return next(createError(500, "Internal Server Error"));
    }
});


app.listen(port, () => {
  console.log(`Event app listening at http://localhost:${port}`);
});

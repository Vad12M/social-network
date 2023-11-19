import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    await doc.save();

    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isValidPassword = bcrypt.compare(req.body.password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid password',
      })
    }


    const token = jwt.sign({
      userId: user._id,
    }, 'secret', { expiresIn: '1h' });
    res.json({
      success: true,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}



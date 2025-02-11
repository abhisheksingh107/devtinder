const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const brycpt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 25,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid Emial Address" + value);
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter the Strong Password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("PhotoURL is not valid: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of the User",
    },
    skills: {
      type: [String],
      validate: [
        {
          validator: function (value) {
            return value.length <= 5; // ✅ Limit skills to 10
          },
          message: "You can add a maximum of 10 skills.",
        },
        {
          validator: function (value) {
            return new Set(value).size === value.length; // ✅ Prevent duplicates
          },
          message: "Duplicate skills are not allowed.",
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWTToken = async function () {
  const user = this;
  return await jwt.sign({ _id: user._id }, "DevTinder@123", {
    expiresIn: "7d",
  });
};

userSchema.methods.validatePassword = async function (passwordInputbyUser) {
  const user = this;
  const passwordHash = user.password;
  return await brycpt.compare(passwordInputbyUser, passwordHash);
};

module.exports = mongoose.model("User", userSchema);

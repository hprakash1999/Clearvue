import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * @module models/user
 * Mongoose model for users.
 *
 * Includes:
 * - firstName: User's first name
 * - lastName: User's last name
 * - avatar: User's avatar URL
 * - email: User's email
 * - phone: User's phone number
 * - address: User's address (street, city, state, country, pincode)
 * - password: User's password
 * - gender: User's gender
 * - role: User's role (admin or user)
 * - refreshToken: User's refresh token
 * - favorites: User's favorite products
 * - otp: User's one-time password
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      length: 10,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    otp: {
      code: { type: String },
      expiresAt: { type: Date },
    },
  },
  { timestamps: true }
);

/**
 * Hook to hash password before saving
 *
 * @async
 * @function save
 * @returns {Promise<void>}
 * @throws {Error} If password is not modified
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password isn't modified

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Method to check if password is correct
 *
 * @async
 * @function isPasswordCorrect
 * @param {string} password - Password to check
 * @returns {Promise<boolean>} True if password is correct, false otherwise
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Method to generate access token
 *
 * @function generateAccessToken
 * @returns {string} Access token
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

/**
 * Method to generate refresh token
 *
 * @function generateRefreshToken
 * @returns {string} Refresh token
 */
userSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  this.refreshToken = token;
  return token;
};

export const User = mongoose.model("User", userSchema);

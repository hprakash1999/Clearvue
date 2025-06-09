import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import mongoose, { Document, Model, Schema } from "mongoose";

// User interface
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface OTP {
  code?: string;
  expiresAt?: Date;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  phone: string;
  address: Address;
  password: string;
  gender: "male" | "female" | "other";
  role: "admin" | "user";
  refreshToken?: string;
  favorites: mongoose.Types.ObjectId[];
  otp?: OTP;
  createdAt?: Date;
  updatedAt?: Date;

  // Instance methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): Promise<string>;
}

// User schema
const userSchema = new Schema<IUser>(
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
      type: String, // Cloudinary URL
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
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    otp: {
      code: {
        type: String,
      },
      expiresAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password
userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Function to generate access token
userSchema.methods.generateAccessToken = function (): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("ACCESS_TOKEN_SECRET not set");

  const payload = {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    gender: this.gender,
  };

  const options: SignOptions = {
    expiresIn: "1d", // 1 day
  };

  return jwt.sign(payload, secret, options);
};

// Function to generate refresh token
userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error("REFRESH_TOKEN_SECRET not set");

  const payload = { _id: this._id };

  const options: SignOptions = {
    expiresIn: "10d", // 10 days
  };

  const token = jwt.sign(payload, secret, options);
  this.refreshToken = token;
  return token;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

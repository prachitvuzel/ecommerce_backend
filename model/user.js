import mongoose from "mongoose";
import bcrypt from "bcrypt";
import auth_service from "../services/auth.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("user_not_found");
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
      const token = auth_service.generateToken(payload);

      return token;
    } else {
      throw new Error("password mismatched");
    }
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user);

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  this.salt = salt;

  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  next();
});

const User = mongoose.model("user", userSchema);

// productSchema

export default User;

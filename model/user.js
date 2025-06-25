import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    const user = this
    console.log(user)
  
    const saltRounds = 10

     const salt = await bcrypt.genSalt(saltRounds);
     this.salt = salt;

    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  
    next()

})

const User = mongoose.model("user", userSchema)

export default User
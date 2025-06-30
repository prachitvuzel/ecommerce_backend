import authServices from "../services/auth.js";
import User from "../model/user.js";
import admin from "../controllers/admin.js";






function baseAuthenticate(role) {
  return async (req, res, next) => {
    const token = req.cookies["token"];

    if (!token) return res.end("Invalid access");

    try {
      const payload = authServices.verifyToken(token);
      const user = await User.findById(payload._id);
     
      if (user.role == "ADMIN" || user.role == "USER") {
        req.user = payload;
        next();
      } else {
        return res.end("Invalid User");
      }
    } catch (error) {
      return res.end("Not authorized to access this page");
    }
  };
}

async function adminAuthenticate(req, res, next) {
  try {
    const user = await User.findById(req.user._id)
    if (user.role == "ADMIN") {
      next()
    }
    else {
      return res.json({msg:"You are not allowed to access this page"})
    }
  } 
  catch (error) {
    return res.json({msg:"Some error occured"})
  }
  
}
export default { baseAuthenticate,adminAuthenticate};

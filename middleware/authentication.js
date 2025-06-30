import authServices from "../services/auth.js";
import User from "../model/user.js";

function baseAuthenticate(role) {
  return async (req, res, next) => {
    const token = req.cookies["token"];

    if (!token) return res.end("Invalid access");

    try {
      const payload = authServices.verifyToken(token);
      const user = await User.findById(payload._id);
      console.log("payload",payload)
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

// async function authenticateAdminAccess(req, res, next) {
//   const token = req.cookies["token"];

//   if (!token) return res.end("Invalid access");

//   try {
//     const payload = authServices.verifyToken(token);
//     const user = await User.findById(payload._id);
//     if (user.role == "ADMIN") {
//       req.user = payload;
//       next();
//     } else {
//       return res.end("Invalid User");
//     }
//   } catch (error) {
//     return res.end("Not authorized to access this page");
//   }
// }

export default { baseAuthenticate};

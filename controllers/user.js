import User from "../model/user.js";

async function handleUserRegistration(req, res) {
  const { firstName, lastName, email, password } = req.body;
  await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  return res.json({ msg: "User successfully registered" });
}

async function handleUserlogin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    res.cookie("token", token);
    return res.json({ msg: "User successfully loggedIn" });
  } catch (error) {
    return res.end("Either password or email is invalid");
  }
}

export default { handleUserRegistration, handleUserlogin };

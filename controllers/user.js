import User from "../model/user.js"


async function handleUserRegistration(req, res) {
    const { firstName, lastName, email, password } = req.body
    await User.create({
        firstName,
        lastName,
        email,
        password
    })

    return res.json({msg: "User successfully registered"})
}


export default handleUserRegistration
const User = require("../models/userModels")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/auth');
const store = require('store');
var sessionstorage = require('sessionstorage');
var ls = require('local-storage');



exports.register = async (req, res) => {
    // console.log(req.user);
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ Error: "Plz fill all the field properly.." })
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ Error: "User exist" })
        }
        const user = new User({ name, email, password, pic });

        const newUser = await user.save();
        res.status(201).json({ message: "success", newUser})
    } catch (error) {
        console.log(err)
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //  console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ error: "fill proper details" })
        }
        const userLogin = await User.findOne({ email }).select("+password");
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);


            if (!isMatch) {
                console.log("password not match");
                res.status(400).json({ error: "invailid login details" })
            } else {
                res.status(200).json({ message: "login sucessfull", userLogin })
            }
        } else {
            res.status(400).json({ error: "user error" })
        }
    } catch (error) {
        console.log(error);
    }
}
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const update = await User.findByIdAndUpdate({ _id: id }, body)
    const resulet = await User.find({ _id: id });
    res.send(resulet);
}
exports.getUser = async (req, res) => {
    try {

        res.status(200).send(req.rootUser);
    } catch (error) {
        res.status(400).send({ message: "no jwt to found" });
    }
}
exports.logout = async (req, res) => {
    // console.log("hello from getData router");
    res.clearCookie('jwttoken', { path: '/' });
    res.status(200).send("user logOut");
}

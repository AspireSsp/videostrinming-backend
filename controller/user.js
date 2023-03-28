const User = require("../models/userModels")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/auth');
const store = require('store');
var sessionstorage = require('sessionstorage');
var ls = require('local-storage');



exports.register = async (req, res) => {
    // console.log(req.user);
    try {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ Error: "Plz fill all the field properly.." })
        }
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ Error: "User exist" })
        }
        const user = new User(req.body);

        const newUser = await user.save();
        res.status(200).json({ message: "success", newUser})
    } catch (error) {
        res.status(200).json({ message: error.message})
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
exports.updatePassword = async (req, res)=>{
    try {
        const {userId, oldPassword, newPassword} = req.body;
        if(!oldPassword && !newPassword){
            res.status(422).json({message : "old and new password is required"})
        }
        console.log(userId, oldPassword, newPassword);
        const user = await User.findById(userId).select("+password")
        console.log(user);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            console.log("password not match");
            res.status(400).json({ error: "old Password is not matched" })
        } else {
            // res.status(200).json({ message: "login sucessfull", userLogin })
            const password = await bcrypt.hash(newPassword, 12)
            console.log("psssss-->", password)
            const updateUser = await User.updateOne({_id: userId} , {password : password}).select("+password");
            res.status(200).json({message : "successs", updateUser});
        }
    } catch (error) {
        
    }
}
exports.getfollower = async(req, res)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    const following = user.following;
    console.log(following);
    var followings =[];
    for(let id of following){
        const user = await User.findById(id);
        followings.push(user)
    }
    res.status(200).json(followings);
}
exports.getUser = async (req, res) => {
    try {
        res.status(200).send(req.rootUser);
    } catch (error) {
        res.status(400).send({ message: "no jwt to found" });
    }
}
exports.getallUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ message: "no jwt to found" });
    }
}
exports.logout = async (req, res) => {
    // console.log("hello from getData router");
    res.clearCookie('jwttoken', { path: '/' });
    res.status(200).send("user logOut");
}

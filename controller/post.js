const Post = require("../models/post");
const User = require("../models/userModels");



exports.addVideo = async (req, res) => {
    // console.log(req.body);
    const { user, video,title, thombnail} = req.body;
    const postdata = await Post.create({
        user, video,title, thombnail
    })
    res.status(200).send(postdata);
}

exports.deleteVideo = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const postdata = await Post.findByIdAndDelete(id);
    res.status(200).send(postdata);
}


exports.getAllVideo = async (req, res) => {
    try {
        const allvideos = await Post.find();
        var newResponse = [];
        for (var obj of allvideos) {
            const info = await User.findOne({ _id: obj.user })
            // console.log(info.pic);
            const newObj = {
                ...obj._doc,
                userPic: info.pic,
                userName: info.name,
            }
            newResponse.push(newObj);
        }
        res.status(200).json(newResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.addLike = async (req, res) => {
    try {
        const { videoId, userId } = req.query;
        var post = await Post.findById(videoId);
        post.isLiked.push(userId);
        const neww = await Post.findByIdAndUpdate(videoId, post)
        const result = await Post.findOne({ _id: videoId });
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.removeLike = async (req, res) => {
    try {
        const { videoId, userId } = req.query;
        var post = await Post.findOne({ _id: videoId });
        // console.log(post);
        result = post.isLiked.filter(ele => ele !== userId)
        // console.log(result);
        const neww = await Post.findByIdAndUpdate(videoId, { isLiked: result });
        var post = await Post.findOne({ _id: videoId });
        res.send(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.addComment = async (req, res) => {
    try {
        const { videoId, userId, message, userName } = req.body;
        var myVideo = await Post.findOne({ _id: videoId });
        // console.log(post);
        myVideo.isComment.push({ userId, message: message, userName: userName });
        const neww = await Post.findByIdAndUpdate(videoId, myVideo)
        const result = await Post.findOne({ _id: videoId });
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.removeComment = async (req, res) => {
    try {
        const { videoId, userId } = req.query;

        var post = await Post.findOne({ _id: videoId });
        // console.log(userId);
        result = post.isComment.filter(ele => ele.userId !== userId)

        // console.log(result);
        const neww = await Post.findByIdAndUpdate(videoId, { isComment: result });
        var post = await Post.findOne({ _id: videoId });
        res.send(post);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.getMyAllvideos = async (req, res) => {
    try {
        const id = req.params.id;
        var post = await Post.find({ user: id });
        res.send(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.addViews = async (req, res) => {
    try {
        const {videoId} = req.query;
        var myVideo = await Post.findOne({ _id: videoId });
        newViews = myVideo.views + 1;
        const neww = await Post.findByIdAndUpdate(videoId, {views :newViews})
        const result = await Post.findOne({ _id: videoId });
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getVideoById = async(req, res)=>{
    try {
        const id = req.params.id;
        var myVideo = await Post.findOne({ _id: id });
        newViews = myVideo.views + 1;
        const neww = await Post.findByIdAndUpdate(id, {views :newViews})
        const result = await Post.findOne({ _id: id });
        const user = await User.findById(result._doc.user);
        res.status(200).json({...result._doc, name: user.name, pic:user.pic });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
















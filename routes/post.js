const express = require('express');
const { addLike, removeLike, addComment, removeComment, addVideo, deleteVideo, getAllVideo, getMyAllvideos, addViews } = require('../controller/post');
const router = express.Router();


router.route("/upload/video").post(addVideo)
router.route("/delete/video/:id").delete(deleteVideo)
router.route("/allvideos").get(getAllVideo)
router.route("/addlike").put(addLike);
router.route("/removelike").put(removeLike);
router.route("/addcomment").post(addComment);
router.route("/removecomment").put(removeComment);
router.route('/myallvideos/:id').get(getMyAllvideos)
router.route("/addviews").get(addViews)

 


module.exports = router; 
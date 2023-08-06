const router = require('express').Router();
const {getThoughts, getSingleThought, createThought, updateThought, deleteThought, addThoughtReaction, deleteThoughtReaction} = require('../../controllers/thought-controller.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

 // /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(addThoughtReaction);
// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reaction/reactionId').delete(deleteThoughtReaction);
module.exports = router;
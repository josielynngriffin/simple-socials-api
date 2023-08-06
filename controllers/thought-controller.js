const { Thought, User} = require("../models");

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId})
        .then((thoughtData) => {
            if(!thoughtData){
                res.status(404).json({message: 'No thought found with that ID!'});
                return
            } 
                res.json(thoughtData);
        })
        .catch((err) => res.status(500).json(err));
    },
    createThought (req, res) {
        Thought.create(req.body)
        .then((thoughtData) => {
            console.log(thoughtData);
            console.log(thoughtData._id);
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: {thoughts: thoughtData._id}}, 
                { new: true}
            );
        })
        .then((userData) => {
            if(!userData){
                return res.status(404).json({message: "No User found with this id!"});
            }
            console.log('User updated with thought:' + userData);
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },
    updateThought (req, res) {
        Thought.findOneandUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: 'No thought with this id, failed to update!'})
                return
            }
            res.json(thoughtData);
        }))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought (req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: 'No thought with this id, failed to delete!'})
                return;
            }
            User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: {thoughts: req.params.thoughtId}},
                { new: true}
            )
            
        }).then((userData) => {
                if(!userData) {
                    res.status(404).json({ message: 'No user with this id, failed to delete'})
                    return;
                }
                res.json({ message: 'Thought successfully deleted'})
            })
            .catch((err) => res.status(500).json(err));
    },
    addThoughtReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body}},
            { runValidators: true, new: true}
        )
        .then((thoughtReactionData) => {
            if(!thoughtReactionData) {
                res.status(404).json({ message: 'No thought with this id'});
                return
            }
            res.json(thoughtReactionData);
        })
        .catch((err) => res.status(500).json(err));
    },
    deleteThoughtReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            //Remove reaction from reactions by its ID
            { $pull: { reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true}
        )
        .then((thoughtReactionData) => {
            if(!thoughtReactionData) {
                res.status(404).json({ message: 'No thought with this id'});
                return
            }
            res.json(thoughtReactionData);
        })
        .catch((err) => res.status(500).json(err));
    }
}
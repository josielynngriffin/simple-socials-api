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
            return User.findOneandUpdate(
                { _id: req.body.userId},
                { $addToSet: {thoughts: thoughtData._id}}, 
                { new: true}
            );
        })
        .then((userData) => {
            if(!userData){
                res.status(404).json({message: "No User found with this id!"});
                return
            }
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
        Thought.findOneandRemove(
            {_id: req.params.thoughtId}
        )
        .then((thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: 'No thought with this id, failed to delete!'})
                return
            }
            User.findOneandUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: {thoughts: req.params.thoughtId}},
                { new: true}
            )
            .then((userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user with this id, failed to delete'})
                    return;
                }
                res.json({ message: 'Thought successfully deleted'})
            }))
            .catch((err) => res.status(500).json(err));
        }))
    }
}
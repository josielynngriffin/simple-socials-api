const { Thought, User} = require("../models");

module.exports = {
    //Get all thoughts, send in json response
    getThoughts(req,res) {
        Thought.find()
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    //Get single user by id
    getSingleThought(req, res){
        //Find one user by id in request params
        Thought.findOne({ _id: req.params.thoughtId})
        .then((thoughtData) => {
            //If no user matches by id, return an error message
            if(!thoughtData){
                res.status(404).json({message: 'No thought found with that ID!'});
                return
            } 
                res.json(thoughtData);
        })
        .catch((err) => res.status(500).json(err));
    },
    //Create thought
    createThought (req, res) {
        //Create new thought from information in request body
        Thought.create(req.body)
        .then((thoughtData) => {
            console.log(thoughtData);
            console.log(thoughtData._id);
            //Add thought to associated user's thoughts
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
    //Update thought
    updateThought (req, res) {
        //Find user by id in request params
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            //Set thought to request body, updating with new information passed in request
            { $set: req.body},
            //Validate response is new
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
    //Delete thought
    deleteThought (req, res) {
        //Find id by request param id, remove
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({message: 'No thought with this id, failed to delete!'})
                return;
            }
            //Update a user's thoughts to remove targeted thought
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: {thoughts: req.params.thoughtId}},
                { new: true}
            );
            
        }).then((userData) => {
                if(!userData) {
                    res.status(404).json({ message: 'No user with this id, but thought still deleted.'})
                    return;
                }
                res.json({ message: 'Thought successfully deleted'})
            })
            .catch((err) => res.status(500).json(err));
    },
    //Add thought reaction
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
    //Delete thought reaction
    deleteThoughtReaction (req, res) {
        Thought.findOneAndUpdate(
            //Find targeted thought by id
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
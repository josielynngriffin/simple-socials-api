const { Thought, User } = require('../models/user');

module.exports = {
    getUsers(req,res) {
        User.find({})
        .then((usersData) => res.json(usersData))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res){
        User.findOne({ _id: req.params.id})
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with that ID!'});
                return;
            };
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },
    createUser (req, res) {
        User.create(req.body)
        .then((userData) => {res.json(userData)})
        .catch((err) => res.status(500).json(err));
    },
    updateUser (req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with that ID!'});
                return;
            };
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },
    deleteUser (req, res) {
        User.findOneAndRemove({_id: req.params.id})
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with that ID!'});
                return;
            };
            Thought.deleteMany({ _id: {$in: userData.thoughts}})
            res.json(userData);
        })
        .then(() => {
        res.json({message: 'User and associated thoughts successfully deleted'})
        })
        .catch((err) => res.status(500).json(err));
    },
    ///api/users/:userId/friends/:friendId
    addFriend (req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true}
        )
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with that ID!'});
                return;
            };
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },
    deleteFriend (req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            { runValidators: true, new: true}
        )
        .then((userData) => {
            if(!userData){
                res.status(404).json({message: 'No friend found with that ID!'});
                return;
            };
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    }
}
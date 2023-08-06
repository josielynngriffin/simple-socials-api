const { Thought, User } = require('../models');

module.exports = {
    //Get all users, send in json response
    getUsers(req,res) {
        User.find({})
        .then((usersData) => res.json(usersData))
        .catch((err) => res.status(500).json(err));
    },
    //Get single user by id
    getSingleUser(req, res){
        User.findOne({ _id: req.params.id})
        //Find one user by id in request params
        .then((userData) => {
            //If no user matches the id, return an error message
            if(!userData) {
                res.status(404).json({message: 'No user found with that ID!'});
                return;
            };
            //Return user in json response
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },
    //Create new user
    createUser (req, res) {
        //Create new user from information in request body
        User.create(req.body)
        .then((userData) => {res.json(userData)})
        .catch((err) => res.status(500).json(err));
    },
    //Update user
    updateUser (req, res) {
        //Find user by id in request params
        User.findOneAndUpdate(
            {_id: req.params.id},
            //Set user to request body, updating with new information passed in request
            { $set: req.body},
            //Validate that response is new
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
    //Delete user
    deleteUser (req, res) {
        //Query to delete user by id in request params
        User.findOneAndRemove({_id: req.params.id})
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with that ID!'});
                return;
            };
            //Delete user's associated thoughts 
            Thought.deleteMany({ _id: {$in: userData.thoughts}})
            res.json(userData);
        })
        .then(() => {
        res.json({message: 'User and associated thoughts successfully deleted'})
        })
        .catch((err) => res.status(500).json(err));
    },
    ///api/users/:userId/friends/:friendId
    //Add friend to user's friends
    addFriend (req, res) {
        User.findOneAndUpdate(
            //Find primary user by id
            {_id: req.params.id},
            //Add friend by id to user's friends
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
    //Delete friend
    deleteFriend (req, res) {
        User.findOneAndUpdate(
            //Find primary user by id
            {_id: req.params.id},
            //Pull friend by id, removing them
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
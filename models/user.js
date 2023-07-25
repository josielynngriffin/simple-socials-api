const User = require('./User');
const Thoughts = require('./Thoughts');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //matches email val to email regex
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [
        
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
        },
    ],
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})
const User = model('User', userSchema);
module.exports = { User, Thoughts };
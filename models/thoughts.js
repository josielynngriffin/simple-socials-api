const {Schema, Types} = require('mongoose');
const {format_date} = require('../utils/time');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            minLength: 1,
            maxLength:280,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt:{ 
            type: Date,
            default: Date.now,
            get: createdAtVal => format_date(createdAtVal)
        }
    },
    {
        toJSON: {
          getters: true
        }
    }
);

const thoughtSchema = new Schema (
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength:280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => format_date(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: { 
            virtuals:true,
            getters:true
        },
        id: false
    }
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
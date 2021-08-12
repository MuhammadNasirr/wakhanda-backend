const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    tag: Object,
    media: Array,
    reply: [{ type: mongoose.Types.ObjectId, ref: 'reply' }],
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentSchema)
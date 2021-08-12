const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    content: {
        type: String,
    },
    tag: Object,
    media: Array,
    commentId: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('reply', replySchema)
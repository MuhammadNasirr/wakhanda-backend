const router = require('express').Router()
const commentCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

router.post('/comment', auth, commentCtrl.createComment)

router.post('/comment/reply', auth, commentCtrl.createReply)

router.patch('/comment/reply/:id/like', auth, commentCtrl.likeReply)

router.patch('/comment/reply/:id/unlike', auth, commentCtrl.unLikeReply)

router.patch('/comment/:id', auth, commentCtrl.updateComment)

router.patch('/comment/:id/like', auth, commentCtrl.likeComment)

router.patch('/comment/:id/unlike', auth, commentCtrl.unLikeComment)

router.delete('/comment/:id', auth, commentCtrl.deleteComment)



module.exports = router
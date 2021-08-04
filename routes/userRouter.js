const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")


router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/user', auth, userCtrl.updateUser)

router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow)

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)
router.get('/users', auth, userCtrl.getAllUsers)
router.patch('/users/:id/createrequest', auth, userCtrl.createFriendRequest)
router.patch('/users/:id/approverequest', auth, userCtrl.approveFriendRequest)
router.patch('/users/:id/removerequest', auth, userCtrl.removeFriendRequest)
router.patch('/users/:id/rejectrequest', auth, userCtrl.rejectFriendRequest)



module.exports = router
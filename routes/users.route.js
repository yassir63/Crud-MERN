const express = require('express')
const { AddUser, Findallusers, FindSingleUser, UpdateUser, DeleteUser } = require('../controllers/users.controller')
const router = express.Router()


router.get('/api' , (req,res)=>{
res.send('work')
console.log('hello')
}
)


// add user
router.post('/users', AddUser )

// find all user
router.get('/users', Findallusers)


// find one user
router.get('/users/:id', FindSingleUser)


// update user
router.put('/users/:id', UpdateUser)


// delete user
router.delete('/users/:id', DeleteUser)




module.exports = router;
const express = require('express');
const router = express.Router();
const { create, createCMSUser,getCMSUsers, find, update, destroy } = require('./controller') 

const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth')


// router.get('/organizer', index)
// router.get('/organizer/:id', find)
// router.put('/organizer/:id', update)
// router.delete('/organizer/:id', destroy)

router.post('/organizer', authenticateUser, authorizeRoles('owner'), create);
router.post('/user', authenticateUser, authorizeRoles('organizer'), createCMSUser);
router.get('/user', authenticateUser, authorizeRoles('owner'), getCMSUsers);

module.exports = router

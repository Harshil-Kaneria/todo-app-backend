var express = require('express');
var router = express.Router();

const user = require('./user');


// Without Login Routes Here
router.use('/', user);

router.use(auth_middleware)

// With Login Routes Here
router.use('/user', user);

module.exports = router;
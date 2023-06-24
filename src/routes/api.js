import express from 'express';
import { profile }from '../controllers/user/user.controller';
import validate from 'express-validation';
import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/user-details', profile);

module.exports = router;

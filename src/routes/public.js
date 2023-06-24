import express from "express";
import validate from "express-validation";
import { login as userLogin , register as userRegister } from "../controllers/user/user.controller";
import { login as userValidatorLogin , register as userValidatorRegister } from "../controllers/user/user.validator";

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post("/login", validate(userValidatorLogin), userLogin);
router.post("/register",validate(userValidatorRegister),userRegister);


module.exports = router;

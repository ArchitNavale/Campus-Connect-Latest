// import express from "express";
const express = require('express')
// import { login } from "../controllers/auth.js";
const {login} = require ('../controllers/auth.js')

const router = express.Router();

router.post("/login", login);

// export default router;
module.exports = router;

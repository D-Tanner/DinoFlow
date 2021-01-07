const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const { Question, Answer } = require('../db/models')
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');



router.post(("/answers/:id/votes", csrfProtection, asyncHandler( async(req, res) =>{

})))
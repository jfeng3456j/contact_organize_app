const express = require('express');
const router = express.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get('/', (req, res) => { res.send('GET logged in user') });

//@route    POST api/auth
//@desc     Auth user & get jwt token
//@access   Public
router.post('/', (req, res) => { res.send('Logging in user') });

module.exports = router;
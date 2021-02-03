const express = require('express');

const router = express.Router();

router.use('/', require('./app'));

module.exports = router;

// express
const express = require('express');

// packages

// settings
// const appSettings = require('../settings');

// models
const General = require('../models/general');

// libs
// const techLib = require('../helpers/technical');
const asyncLib = require('../helpers/async');

// specific

// router
const router = express.Router();

router.get('/test/', (req, res) => res
  .json({
    status: 'OK',
  })
  .end());

/*
  For this you need to connect have a collection names test
  With at least one object like {action:'dbTest'}
  */
router.get('/testFindDB/', async (req, res) => {
  const [error, arrayOfObjects] = await asyncLib.to(General.getTestFind());
  if (error) {
    return res
      .status(500)
      .json({
        status: 'ERROR',
        info: error,
      })
      .end();
  }
  return res
    .json({
      status: 'OK',
      data: arrayOfObjects
    })
    .end();
});

/*
  For this you need to connect have a collection names test
  With at least one object like {action:'dbTest'}
  */
router.get('/testFindOneDB/', async (req, res) => {
  const [error, object] = await asyncLib.to(General.getTestFindOne('dbTest'));
  if (error) {
    return res
      .status(500)
      .json({
        status: 'ERROR',
        info: error,
      })
      .end();
  }
  return res
    .json({
      status: 'OK',
      data: object
    })
    .end();
});

module.exports = router;

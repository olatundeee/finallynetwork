const express = require('express');
const router = express.Router();
const User = require('../models/user')
const util = require('../modules/util');

router.post('/:username/theme', (req, res) => {
  const username = req.params.username
  const theme = req.body.theme
  const tag = req.body.tag
  User.findOneAndUpdate({user: username}, {theme: theme }, {upsert: true}, (result) => res.json({result}));
});

router.post('/:username/update', util.isAuthorized, (req, res) => {
  const username = req.params.username
  const authorizedUser = req.session.steemconnect.name
  const theme = req.body.theme
  const tag = req.body.tag
  const nav = req.body.nav.split(',').map(n => n.trim().toLowerCase())

  if(username === authorizedUser){
    User.findOneAndUpdate({user: username}, {
        theme: theme,
        tag: tag,
        navigation: nav
    }, {upsert: true}, (result) => res.json({result}));
  } else {
    res.json({
      status: 'fail',
      msg: 'Please sign in.'
    })
  }
});

module.exports = router;

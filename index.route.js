const express = require('express');
const { handleRegister } = require('./handlers');

const router = express.Router();

router.route('/customer/register')
  .post(handleRegister);

module.exports = router;

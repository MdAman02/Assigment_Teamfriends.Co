const cron = require('node-cron');
const moment = require('moment');
const fs = require('fs');
const { registerCustomer, storeWishRecord, getCustomers } = require('./storage/repository');

const sendWishEmail = customer => {
  const { name, ID } = customer;
  // Demo Email Sending
  storeWishRecord({
    ID,
    name,
    email: {
      Title: 'Birthday',
      Body: 'Happy Birthday!!'
    }
  })
}

const scheduleBirthday = customer => {
  const { birthday } = customer;
  const date = moment(birthday);
  
  cron.schedule(`* * * ${date.daysInMonth()} ${date.month()} *`, () => {
    sendWishEmail(customer);
  });
}

exports.scheduleBirthdays = () => {
  const customers = getCustomers();
  customers.forEach(customer => {
    scheduleBirthday(customer);
  });
}

exports.handleRegister = (req, res, next) => {
  try {
    const { body } = req;
    if (!body.name || !body.birthday || !body.email)
      next({
        status: 400,
        message: 'Request Body Error'
      });
    if (!customer.ID) customer.ID = uniqid('cust_');

    scheduleBirthday(body);
    registerCustomer(body);

    res.status(200).send({
      message: 'Birthday Scheduled'
    });
  } catch (error) {
    console.log('Error Registering Customer', error);
    next(error);
  }
}
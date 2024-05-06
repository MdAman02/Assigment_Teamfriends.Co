const cron = require('node-cron');
const moment = require('moment');
const uniqid = require('uniqid');
const { registerCustomer, storeWishRecord, getCustomers } = require('./storage/repository');

const sendWishEmail = customer => {
  console.log(`Sending Wish to ${customer.name}`);
  const { name, ID } = customer;
  // Demo Email Sending
  storeWishRecord({
    customerID: ID,
    name,
    emailDetails: {
      Title: 'Birthday',
      Body: `Happy Birthday ${customer.name}!!`
    }
  })
}

const scheduleBirthday = customer => {
  const { birthday } = customer;
  const date = moment(birthday);
  
  cron.schedule(`1 0 ${date.date()} ${date.month() + 1} *`, () => {
    sendWishEmail(customer);
  });
}

exports.scheduleBirthdays = () => {
  const customers = getCustomers();
  customers.forEach(customer => {
    scheduleBirthday(customer);
  });
}

const validateRequest = req => {
  const { body } = req;
  if (!body.name || !body.birthday || !body.email) {
    const error = new Error('Request body invalid');
    error.status = 400;
    throw error;
  }
  const customers = getCustomers();
  if (customers.some(cust => cust.email === body.email)) {
    const error = new Error('Customer already scheduled');
    error.status = 400;
    throw error;
  }
}

exports.handleRegister = (req, res, next) => {
  try {
    const { body } = req;
    validateRequest(req);
    if (!body.ID) body.ID = uniqid('cust_');

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
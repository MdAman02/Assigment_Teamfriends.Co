const fs = require('fs');

exports.registerCustomer = customer => {
  const fileBuf = fs.readFileSync('./customers.json');
  const customers = fileBuf.length ? JSON.parse(fileBuf) : [];
  customers.push(customer);
  fs.writeFileSync('./customers.json', JSON.stringify(customers));
  return;
}

exports.getCustomers = () => {
  const fileBuf = fs.readFileSync('./customers.json');
  if (!fileBuf.length) return [];
  const customers = JSON.parse(fileBuf) || [];
  return customers;
}

exports.getWishes = () => {
  const fileBuf = fs.readFileSync('./Birthday_Wishes.json');
  if (!fileBuf.length) return [];
  return JSON.parse(fileBuf);
}

exports.storeWishRecord = wish => {
  const wishes = this.getWishes();
  wishes.push(wish);
  fs.writeFileSync('./Birthday_Wishes.json', JSON.stringify(wishes));
}

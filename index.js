const { server } = require('./app');
const { scheduleBirthdays } = require('./handlers');

// Schedule existing customers upon starting server
scheduleBirthdays();

server.listen(8000, () => {
  console.log('Server Started at port: 8000');
})

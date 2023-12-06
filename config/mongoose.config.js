const mongoose = require('mongoose');
const config = require('./config');
 
(async () => {
  await mongoose.connect(config.MONGO_URL, { serverSelectionTimeoutMS: 600000 })
        .then(() => {
            mongoose.set('debug', (collectionName, method, query, doc) => {
              console.info(`${collectionName}.${method}`, JSON.stringify(query), doc);
            });
        }).catch(err => console.error(err));
})();

module.exports = mongoose;